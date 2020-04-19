var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:5000
app.get('/', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/allTasks', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/allTasks.html'));
});

app.get('/createTask', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/createTask.html'));
});

app.get('/executors', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/executors.html'));
});

app.get('/task-another-view', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/task-another-view.html'));
});

app.get('/task-view', function (req, res) {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname + '/task-view.html'));
});

app.listen(process.env.PORT || 5000);

function loadLogin() {

}


