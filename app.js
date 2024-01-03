//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const dateData = require(__dirname + "/dateData.js");
const app = express();
// let items = [];
// let schoolItems = [];
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = {
  name: String
};
const Item = mongoose.model("Item", itemSchema);



app.use(bodyParser.urlencoded({
  extended: true
}));
//ejs files will be in the views folder - views will have all the things users look at
app.set("view engine", "ejs");

// public folder will hold all the static content like photos
app.use(express.static("public"));




app.get("/", function(req, res) {
  date.hi();
  //  res.sendFile(__dirname+"/index.html");
  // res.render("index", {listType: "Homework", day:date.getDayName(), msg:date.getDailyMsg(), items:items});
  Item.find(function(error, listItems) {
    if (error) {
      console.log(error);
    } else {
      console.log("success");

      listItems.forEach(function(item) {
        console.log(item.name);
      });

      res.render("index", {
        listType: "Homework",
        day: date.getDayName(),
        msg: date.getDailyMsg(),
        items: listItems
      });
    }
  });
});

app.post("/delete", function(req, res) {
  const listName = req.body.listname;
  if (listName == "Homework")
  {
    console.log(req.body);
    Item.deleteOne({
      _id: req.body.button
    }, function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log("success");
      }
    });
    res.redirect("/");
  } else {
    // const customRoute = req.body.button;
    // console.log(customRoute);
    List.findOneAndUpdate({name:listName},{$pull: {items: {_id:req.body.button}}}).then(function(){
      res.redirect("/"+listName);
    });

  }

});


app.post("/", function(req, res) {

  console.log(req.body);
  if (req.body.button == "Homework") {
    //items.push(req.body.listitem);
    const toadd = new Item({
      name: req.body.listitem
    });
    toadd.save();
    res.redirect("/");
  }
  else
  {
    const customRoute = req.body.button;
    var item = req.body.listitem;

    List.findOne({name: customRoute},function(error, result){
      result.items.push(new Item({name:item}));
      result.save().then(function(){
        res.redirect("/"+customRoute);
      });
    });


  }

  /*
  } else if (req.body.button == "Schoolwork") {
    schoolItems.push(req.body.listitem);
    res.redirect("/school");
  }
  //  console.log(items);
  */

});


app.get("/school", function(req, res) {

  //  res.sendFile(__dirname+"/index.html");
  res.render("index", {
    listType: "Schoolwork",
    day: dateData.day,
    msg: dateData.dailyMsg,
    items: schoolItems
  });
});

app.post("/school", function(req, res) {
  schoolItems.push(req.body.listitem);
  //  console.log(items);
  res.redirect("/school");
});


/* custom/dynamic route
  syntax:Custom Route allows you to access the route the user is typing. "/:" is the imp part
  app.get("/:customRoute" ,function(req,res)
*/

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

/*
  const list = new List({
    name: customRoute,
    items: []
  });
  list.save();
  */
//find 1 particular object

app.get("/:customRoute", function(req,res){
  console.log(req.params.customRoute);
  const customRoute = req.params.customRoute;


  List.findOne({name: customRoute}, function(error,result){
    if (!error){
      if (!result){
      const list = new List({
        name: customRoute,
        items: []
      });

      list.save().then(function(){
        res.redirect(customRoute);
      });

      } else {
        console.log(result);
        res.render("index", { listType: customRoute, day: date.getDayName(), msg: date.getDailyMsg(), items: result.items
        });

      }
    } else {
      console.log(error);
    }
  });

});


app.listen(3000, function() {
  console.log("server started on port 3000");
});
