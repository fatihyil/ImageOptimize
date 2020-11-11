const express = require('express');
const app  = express();
var Request = require("request");

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.set('view engine','ejs');

//Get Main Page
app.get('/', (req,res) => {    
    res.render('index');
});

//Post image to Kraken
app.post('/Image',(req,res)=> {       
    const image = {
        file : req.body.file        
    }

    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://api.kraken.io/v1/url",
        "body": JSON.stringify({
            "auth":{
                "api_key": "19018bd62b1bd63b3801be918ce09bdf", 
                "api_secret": "bf4aaed0bff16af25237cf1bd88c15f2472c5a00"
            }, 
            "wait":true, 
            "url": image.file           
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }        
        var status = JSON.parse(body)
        if(status.success){
            res.render('Image',{url : status.kraked_url});
        }
        res.send(status.message)
    });
})

const PORT = process.env.PORT || 3000;
app.listen(3000, ()=> console.log(`Listening on port ${PORT}....`));