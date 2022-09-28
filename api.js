var ex = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const mongoClient = require('mongodb').MongoClient;
const readHelper=require('./crud/read')
const updateHelper=require('./crud/update')
const createHelper=require('./crud/create')
const deleteHelper=require('./crud/delete')
var app = ex();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/fetch",async (req,res)=>{
    var userid=req.body.userid
    var data=await readHelper.readData(mongoClient,userid)
    return res.send(data)
})

app.post("/addNewApp",async(req,res)=>{
    var data= await updateHelper.addNewApp(mongoClient,req.body.userid,req.body.appname)
    return res.send(data)

})

app.post("/addNewKey",async(req,res)=>{
  var data= await updateHelper.addNewKey(mongoClient,req.body.userid,req.body.appname,req.body.keyname,req.body.keyvalue)
  return res.send(data)

})

app.post("/addUser",async(req,res)=>{
  var data=await createHelper.createUser(mongoClient,req.body.userid)
  return res.send(data)
})

app.post("/deleteUser",async(req,res)=>{
  var data=await deleteHelper.deleteUser(mongoClient,req.body.userid)
  return res.send(data)
})

app.post("/deleteApp",async(req,res)=>{
  var data=await deleteHelper.deleteApp(mongoClient,req.body.userid,req.body.appname)
  return res.send(data)
})

app.post("/deleteKey",async(req,res)=>{
  var data=await deleteHelper.deleteKey(mongoClient,req.body.userid,req.body.appname,req.body.keyname)
  return res.send(data)
})


app.listen(process.env.PORT || 5000, function () {
    console.log(
      "Express server listening on port %d in %s mode",
      this.address().port,
      app.settings.env
    );
  });