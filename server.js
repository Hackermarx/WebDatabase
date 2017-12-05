var express = require("express");
var url = require("url");
var http = require("http");
var fs = require('fs');
var bodyParser = require("body-parser");

var habits = JSON.parse(fs.readFileSync('C:/Users/arend/Documents/Visual Studie Sheite/Web & Database/client/habits.json', 'utf8'));

var app = express();

http.createServer(app).listen(3000);

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.text({
    extended : true
}));
app.use(bodyParser.json());

console.log("Server listening on port 3000 mm");

app.get("/", function(req, res) {
    res.sendFile("/index.html");
    console.log("User connected");
});

app.get("/main", function(req, res) {
    res.sendFile("C:/Users/arend/Documents/Visual Studie Sheite/Web & Database/client/main.html");
    console.log("User connected");
});

app.get("/gethabits", function(req, res) {
    res.json(habits);
});

app.post("/sethabits", function(req, res){
    fs.writeFileSync("C:/Users/arend/Documents/Visual Studie Sheite/Web & Database/client/habits.json", req.body, 'utf8');
    habits = JSON.parse(fs.readFileSync('C:/Users/arend/Documents/Visual Studie Sheite/Web & Database/client/habits.json', 'utf8'));
});