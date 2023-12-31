const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");
const PORT = process.env.PORT || 3000;

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function (req,res) { 
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const data= {
        members:[{
                email_address:email,
                status:"subscribed",
                merge_fields:{
                            FNAME: firstName,
                            LNAME: lastName
                            } 
                }]
                };
    
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/8cc2df8ba6";
    const options={
        method:"POST",
        auth: "Amm:50360afe5f2c4270d5f99e064a9937cb-us8"
        };

    const request = https.request(url, options, function (response) { 
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function (data) {
        console.log(JSON.parse(data));
        });
    });
     request.write(jsonData);
     request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

 app.listen(PORT, function () {
    console.log(`Server is runing on port ${PORT}`);
   });

//api key  
//50360afe5f2c4270d5f99e064a9937cb-us8
//list id
//8cc2df8ba6
//url
// https://usX.api.mailchimp.com/3.0/lists