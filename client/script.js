var main = (function(){
    var habits = [];
    var latestFetch = 0;

    fetchHabits(true);

    $("#add-habit-box").hide();
    $("#edit-habit-box").hide();

    $("#add-habit").click(function(){
        $("#add-habit-box").show();
    });

    $("#edit-habit-submit").click(function(){
        var id = $("#edit-element-id").text() - 1;
        console.log(id)
        var current = habits[id];
        current.name = $("#edit-habit-name").val();
        current.freq = $("#edit-habit-freq").val();

        sendHabitsToServer();

        $("#habit-table tr").eq(id + 1).replaceWith(current.toElement());

        $(".edit-button").prop("disabled", false);
        $(".delete-button").prop("disabled", false);
        $("#edit-habit-box").hide();
    });

    $("#sort-habits-by").change(function(){
        console.log("Sorting");
        habits.sort(function(a, b) {
            return a.freq < b.freq;
        });
        reloadHabits();
    });

    $("#add-habit-submit").click(function(){
        habits.push(new Habit(
            $("#habit-name").val(),
            $("#habit-freq").val()
        ));

        sendHabitsToServer();

        reloadHabits();
        
        $("#add-habit-box").hide();
    });

    function sendHabitsToServer() {
        var postData = JSON.stringify({
            "lastChange" : (new Date()).getTime(),
            "habits" : habits
        });

        console.log({
            "lastChange" : (new Date()).getTime(),
            "habits" : habits
        })
        console.log(postData);

        $.ajax({
            url: '/sethabits',
            type: 'post',
            contentType: 'text/plain',
            data: postData
        });

        fetchHabits(true);
    }

    function addButtonListeners() {
        $(".edit-button").click(function(){
            $("#edit-habit-box").show();
            $("#edit-element-id").text($(this).parent().parent().index());
        });
    
        $(".delete-button").click(function(){
            if (confirm("Are you sure you want to remove this habit?")) {
                var id = $(this).parent().parent().index();
                habits.pop(id - 1);
                sendHabitsToServer();
                $(this).parent().parent().remove();
            }
        });
        
        $(".log-habit").click(function() {
            habits[$(this).parent().parent().index() - 1].log();
        });
    }

    function fetchHabits(isForced) {
        $.get("/gethabits", function(newHabits) {
            if (latestFetch < newHabits.lastChange || isForced) {
                habits = [];
                for (var i = 0; i < newHabits.habits.length; i++) {
                    habits.push(new Habit(newHabits.habits[i].name, newHabits.habits[i].frequency))
                }
            }
        });
        latestFetch = (new Date()).getTime();
        reloadHabits();
    }

    setInterval(fetchHabits, 500);

    function reloadHabits() {
        $("#habit-table").empty();
        $("#habit-table").append("<tr id='habit-table-header'><th>Habit</th><th>Edit</th><th>Delete</th><th>Log</th></tr>");

        for (var i = 0; i < habits.length; i++) {
            habits[i].load();
        }
        addButtonListeners();
    }
});

$("document").ready(main);