//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "My name is Rameez and this is my personal blog page. I post about the movies I watch and review them.";
const aboutContent = "I am a Engineering student and a movie enthusiast.";
const contactContent = "This is my letterboxd link";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var posts = [];
app.get("/", function(req,res){
  res.render("home", {home:homeStartingContent,
    posts:posts
  
  });
  
})
app.get("/about", function(req,res){
  res.render("about", {about:aboutContent});
})
app.get("/contact", function(req,res){
  res.render("contact", {contact:contactContent});
})
app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  var post={
    title:req.body.postTitle,
    body:req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postName", function(req,res){
  var requestedTitle= _.lowerCase( req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",
      {title:post.title,
      body:post.body}
      )

    }
  })
})

















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
