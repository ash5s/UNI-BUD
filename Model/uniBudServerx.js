// boiler plate code required to create an express server
const express = require('express');// allows the use of the express server
// allows apps on diferent servers to make a request
// var cors = require('cors')
const app = express();
// server listens on this port
const port = 3000;
let count = 0;

app.use(express.json());// process json
app.use(express.urlencoded({ extended: true })); // coverts content into format that is compatible with request
app.use(cors());
// These lines will be explained in detail later in the unit

const MongoClient = require('mongodb').MongoClient;//library allows connectin to mongo database
const uri = "mongodb+srv://client:lCyOPC9ddNGpJUrj@cluster0.byjl5.mongodb.net/assignment?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Global for general use
let currCollection;

// function connects to mongo database
client.connect(err => {
   currCollection = client.db("assignment").collection("users");
  // perform actions on the collection object
  console.log ('Database up!')
 
});

// get data from cloud database
app.get('/getData', function (req, res) {
    count++;
    // returns a collection of data from database
    currCollection.find({}, {projection:{_id:0}}).toArray( function(err, docs) {
      if(err) {
        console.log("Some error.. " + err);
      } else {
         console.log(JSON.stringify(docs) + " have been retrieved "+count);
         res.send(JSON.stringify(docs));
      }

  });

});

// post data to cloud database
app.post('/postData', function (req, res) {
    // inserts data into the database  
    currCollection.insertMany([req.body], function(err, result) {
         if (err) {
              console.log(err);
         }else {
              console.log(JSON.stringify(req.body) + " have been uploaded"); 
                  res.send(JSON.stringify(req.body));
       }// end
      
  });
     
});

// deletes all data in the specified collection(equivalent to table)
app.delete('/deleteData', (req, res) => {
    
    var myquery = { address: /^O/ };
    // method performs deletion
    currCollection.deleteMany();

    res.send("All Cloud Data Deleted")
    console.log("have been deleted");

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) 
});