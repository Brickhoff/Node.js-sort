var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var cookieParser = require('cookie-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'brickhoff',  //your username
  database : 'projects'         //the name of your db
});





app.get("/", function(req, res){
    var q = "SELECT categories.description, ilance_projects.date_added, ilance_projects.project_title, ilance_users.username FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id LEFT JOIN categories ON ilance_projects.cid = categories.cid";
    connection.query(q, function(err, results){
       if (err) throw err;
       res.render("home", {projects: results});
    });
});

app.get("/date", function(req, res){
    var q = "SELECT categories.description, ilance_projects.date_added, ilance_projects.project_title, ilance_users.username FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id LEFT JOIN categories ON ilance_projects.cid = categories.cid ORDER BY date_added";
    connection.query(q, function(err, results){
       if (err) throw err;
       res.render("date", {projects: results});
    });
});

app.get("/category", function(req, res){
    var q = "SELECT categories.description, ilance_projects.date_added, ilance_projects.project_title, ilance_users.username FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id LEFT JOIN categories ON ilance_projects.cid = categories.cid ORDER BY categories.description";
    connection.query(q, function(err, results){
       if (err) throw err;
       res.render("category", {projects: results});
    });
});


app.get("/username", function(req, res){
    var q = "SELECT categories.description, ilance_projects.date_added, ilance_projects.project_title, ilance_users.username FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id LEFT JOIN categories ON ilance_projects.cid = categories.cid ORDER BY ilance_users.username";
    connection.query(q, function(err, results){
       if (err) throw err;
       res.render("username", {projects: results});
    });
});


app.get("/title", function(req, res){
    var q = "SELECT categories.description, ilance_projects.date_added, ilance_projects.project_title, ilance_users.username FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id LEFT JOIN categories ON ilance_projects.cid = categories.cid ORDER BY ilance_projects.project_title";
    connection.query(q, function(err, results){
       if (err) throw err;
       res.render("title", {projects: results});
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!!");
});