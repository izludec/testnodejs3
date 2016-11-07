var http = require('http')
var express = require('express')
var app = express()
 var mongo = require('mongodb').MongoClient




var app = app.get('/',function (req, res) {
     res.end("Welcome")
})

app = app.get('/*',function (req, res) {
   //console.log(req.url)
   //console.log('---------------------')
   var mass = []
   var count = 0
   mongo.connect("mongodb://izludec:123456789data@ds147267.mlab.com:47267/izludec", 
    function(err, db){
     if(err){console.log(err)}
     //db.collection("links").remove({})
     if((!String(req.url)[req.url.length-1].match("/"))
     &&req.url.split("/")[1].match("new")){
      res.redirect("https://testworkspace-izludec.c9users.io"+req.url+"/")
     }
      db.collection("links").count({},function(err,data){
       app.count = data 
      })
    
     if(req.url.split("/")[1].match("new")){
      db.collection("links").insert({
       _id: app.count,
       url: String(req.url).substr(5,req.url.length)
      },function(err,data){
       res.end(String(app.count))
      })
     }else{
     // console.log(String(req.url).replace("/",""))
     //console.log(parseInt(String(req.url).replace("/","")))
     db.collection("links").find({
      _id: (parseInt(String(req.url).replace("/",""))-1)
     }).toArray(
       function(err,doc){
        for(var i in doc){mass.push(doc[i])}
        //console.log(mass)
        res.redirect(mass[0].url)
       })
     }
       db.close()
    })
})

app.listen(process.env.PORT || 8080,function(){
      console.log("Started 8080")
})






 
 
    
    
    
  