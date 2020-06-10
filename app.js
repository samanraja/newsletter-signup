const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const JSONData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/10e1a44855"

    const option = {
        method: "POST",
        auth: "saman:a5a8b8e7a859e933a41d49fe3024548f-us10"
    }

    const request = https.request(url, option, function(response) {
       response.on("data", function(data){
           console.log(JSON.parse(data));
       }) 
    })

    request.write(JSONData);
    request.end();

    
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

// api key 
// a5a8b8e7a859e933a41d49fe3024548f-us10
//a5a8b8e7a859e933a41d49fe3024548f-us10

// list id
// 10e1a44855