function Habit(name, freq) {
    this.name = name;
    this.freq = freq || "0";
    this.logged = [];

    this.load = function() {
        $("#habit-table").append(this.toElement());
    }

    this.toElement = function() {
        var ret = $("<tr>");
        ret.append($("<td>" + this.name + "</td>"));
        ret.append($("<td><button class='edit-button'>Edit</button></td>"));
        ret.append($("<td><button class='delete-button'>Delete</button></td>"));
        ret.append($("<td><button class='log-habit'>Log</button></td>"));
        return ret;
    }

    this.log = function() {
        this.logged.push(new Date());
    }
}