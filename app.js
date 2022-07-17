const request =require("request");
const express= require("express");
const bodyParser=require("body-parser");
const https=require("https");
const mailchimp=require("@mailchimp/mailchimp_marketing");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

res.sendFile(__dirname+"/signup.html");
});


app.post("/", function(req, res){
const firstName=req.body.fName;
const lastName= req.body.lName;
const email= req.body.email;

const data={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_feilds:{
        FNAME: firstName,
        LNAME: lastName
      }

    }
  ]
};


var jsonData=JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/cec74719ad";
const options={
method:"POST",
auth:"nik:99e65a9d45d3980c03e3f9a17495828f-us17"

}
const request = https.request(url,options,function(response){

if(response.statusCode == 200){

  res.sendFile(__dirname+"/success.html");
}
else{

  res.sendFile(__dirname+"/failure.html");
}

response.on(data ,function(data){
console.log(JSON.parse(data));

})


})
request.write(jsonData);
request.end();


});

//99e65a9d45d3980c03e3f9a17495828f-us17  api key
//cec74719ad unique list id
app.post("/failure",function(res,req){
res.redirect("/");

})

app.listen(process.env.PORT || 3000 ,function(){

console.log("Server is running");


});
