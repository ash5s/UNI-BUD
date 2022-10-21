// boiler plate code required to create an express server
const express = require('express');// allows the use of the express server
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser')
var formidable = require('formidable');
let fs = require('fs');
// allows apps on diferent servers to make a request
var cors = require('cors')

app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret:"secret"
  
}))


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
let cartCollection;

// function connects to mongo database
client.connect(err => {
  usersCollection = client.db("assignment").collection("users");
  currCollection = client.db("assignment").collection("products");
  cartCollection = client.db("assignment").collection("shoppingCart");
  casesCollection = client.db("assignment").collection("cases");
  businessCollection = client.db("assignment").collection("business");
  studentCollection = client.db("assignment").collection("student");
  solutionsCollection = client.db("assignment").collection("solutions");
  // perform actions on the collection object
  console.log ('Database is up and running!')
 
});

// get data from cloud database
// app.get('/getData', function (req, res) {
//     count++;
//     // returns a collection of data from database
//     currCollection.find({}, {projection:{_id:0}}).toArray( function(err, docs) {
//       if(err) {
//         console.log("Some error.. " + err);
//       } else {
//          console.log(JSON.stringify(docs) + " have been retrieved "+count);
//          res.send(JSON.stringify(docs));
//       }

//   });

// });

// get user by email id
app.get('/getData', function (req, res) {
    count++;
    usersCollection.find({ "email":req.query.email}, {"_id": 0 }).toArray(function(err, docs) {
      if(err) {
        console.log("Some error.. " + err);
      } else {
        // console.log(req.cookies)
        res.send(JSON.stringify(docs));
        
      }

  });

});

var sess;

// login user
app.get('/login', function (req, res) {
  count++;
  usersCollection.find({ "email": req.query.email, "password": req.query.password }, { "_id": 0 }).toArray(function (err, docs) {
    res.header("Access-Control-Allow-Origin", "../View/login-signup.html");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    try {
      if (docs[0].email === req.query.email) {

        // req.session.email = req.query.email;

        sess = req.session;
        sess.email = req.query.email;

        sess.firstName = docs[0].firstName;
        console.log(sess.firstName)
        sess.lastName = docs[0].lastName;
        console.log(sess.lastName)
        

        res.jsonp({ login: 1, userType:docs[0].userType })
        res.end('done');
        // console.log(req.session.email)
        // res.cookie('xxxx', 'xxxxxx')
        // res.clearCookie("xxxx");
        
        // console.log("user exists")
        // console.log(JSON.stringify(docs) + " have xxx been retrieved " + count);      
        // res.send("1")
        // res.send(JSON.stringify({ a: 1 }));
        // return res.redirect("/View/case-upload")
        // res.jsonp(docs)
        

      } else {
        console.log("user does not exists")
      }
    }
    catch(err) {
      console.log(err)
      console.log("user does not exists")
      res.jsonp({login:0})
    }


    if(err) {
      console.log("Some error.. " + err);
    } else {
      // console.log(JSON.stringify(docs) + " have xxx been retrieved " + count);      
    }

});

});

// logout the user
app.get('/checkIfSignedIn', function (req, res) {
  console.log("checking login status");

  // get session
  sess = req.session;
  
  if (sess.email) {
    console.log("session is set");
    res.jsonp({loggedIn:1})
  } else {
    console.log("session is not set");
    res.jsonp({loggedIn:0});
  }

});

// logout the user
app.post('/logout', function (req, res) {
  console.log("xxxxxxxxxxxxxxxx xxxxxxxxxxxxx");
  // destroy the session
  req.session.destroy((err) => {
    // res.redirect('/') // will always fire after session is destroyed
    console.log("you are logged out");
    res.end();
  })

});

// post case data to cloud database
app.get('/saveCase', function (req, res) {
  count++;

  if (req.session.email) {
      // currCollection.insertMany([req.body], function(err, result) {
        casesCollection.insertOne({id: Date.now(), caseEmail: req.session.email, caseImage: req.query.caseImage, caseDescription: req.query.caseDescription, caseInstructions: req.query.caseInstructions, caseFileUpload: req.query.caseFileUpload, repositoryLink: req.query.repositoryLink, dateTime: Date.now() }, function (err, result) {
          // inserts data into the database
          if (err) {
            console.log(err);
          } else {
            console.log("" + count + " your case is uploaded");
            res.jsonp({ uploaded: 1 })
          }// end
        });

  } else {
    // user not logged in
    console.log("" + count + " you need to login please");
    res.jsonp({ uploaded: 0 })
  }

});

app.get('/retrieveSolutions', function (req, res) {
  count++;

  console.log("" + req.query.caseId + " your xxxx solution is uploaded");

  solutionsCollection.find({ "caseId": req.params.caseId }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {

      // ============================
      solutionsCollection.find({ "caseId": req.params.caseId }, { "_id": 0 }).toArray(function (err, results) {
        if (err) {
          console.log("Some error.. " + err);
        } else { 

        }

      });
      // =============================

      //  console.log(results + " retrieved solutions"+count);
      res.jsonp(results)
    }
  });

});


// ==========================================
// post case data to cloud database
app.get('/saveSolutions', function (req, res) {
  count++;

  console.log("" + req.query.solutionsDescription + " your solution is uploaded");

  if (req.session.email) {
      // currCollection.insertMany([req.body], function(err, result) {
        solutionsCollection.insertOne({ id: Date.now(), firstName:req.session.firstName, lastName:req.session.lastName,solutionsEmail: req.session.email, solutionsImage: req.query.solutionsImage, solutionsDescription: req.query.solutionsDescription, solutionsInstructions: req.query.solutionsInstructions, solutionsFileUpload: req.query.solutionsFileUpload, repositoryLink: req.query.repositoryLink, caseId: req.query.caseId, dateTime: Date.now() }, function (err, result) {
          // inserts data into the database
          if (err) {
            console.log(err);
          } else {
            console.log("" + count + " your solution is uploaded");
            res.jsonp({ uploaded: 1 })
          }// end
        }); 
  } else {
    // user not logged in
    res.jsonp({ uploaded: 0 })
  }
});

// ==========================================

// save business profile
app.get('/saveBusiness', function (req, res) {
  count++;

  if (req.session.email) {
      // currCollection.insertMany([req.body], function(err, result) {
      businessCollection.insertOne({ businessEmail: req.session.email, businessName: req.query.businessName, description: req.query.description, profileImage: req.query.profileImage, dateTime: Date.now()}, function (err, result) {
        // inserts data into the database
        if (err) {
          console.log(err);
        } else {
          // console.log("" + count + " your profile has been uploaded");
          res.jsonp({ uploaded: 1 })
        }// end
      });
  } else {
    // user not logged in
    res.jsonp({ uploaded: 0 })
  }
});

// get business profile
app.get('/getBusiness', function (req, res) {
  count++;

  // console.log(" testyng get business"+req.session.email);
  // returns a collection of data from database
  // cartCollection.find({}, { projection: { _id: 0 } }).toArray(function (err, docs) {
    businessCollection.find({ "email": req.params.email, }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      res.jsonp(results)
    }

  });

});

// get data from cloud database
app.get('/getCases', function (req, res) {
  count++;
  
  // returns a collection of data from database
  // cartCollection.find({}, { projection: { _id: 0 } }).toArray(function (err, docs) {
    casesCollection.find().toArray( function(err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      //  console.log(JSON.stringify(results) + " have been retrieved "+count);
       res.send(results);
    }

  });

});

// get one case from cloud database
app.get('/getCase', function (req, res) {
  count++;

  // console.log("checking 101 " + req.params.email);
  // returns a collection of data from database
  // cartCollection.find({}, { projection: { _id: 0 } }).toArray(function (err, docs) {
    casesCollection.find({ "email": req.params.email, }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
       res.send(results);
    }
  });
});

// get solutions from the cloud database
app.get('/getSolutions', function (req, res) {
  count++;
  console.log("checking 101 " + req.params.email);
  // returns a collection of data from database
  // cartCollection.find({}, { projection: { _id: 0 } }).toArray(function (err, docs) {
    solutionsCollection.find({ "caseId": req.params.caseId }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      //  console.log(JSON.stringify(results) + " retrieved solutions"+count);
       res.send(results);
    }
  });
});

// get solutions from the cloud database
app.get('/getTest', function (req, res) {
  count++;
  console.log("test checking 101 " + req.body.test);
  // returns a collection of data from database
  
});


// test file upload
app.post('/upload', function (req, res) {

  sess = req.session;
  sess.email;
  console.log(sess.email);

  if (sess.email) {
    console.log("session is set");
  } else {
    console.log("session is not set");
  }

  
//Create an instance of the form object
let form = new formidable.IncomingForm();
    //Process the file upload in Node
    form.parse(req, function (error, fields, file) {
      let filepath = file.fileupload.filepath;
      // let newpath = 'C:/upload-example/';
      let newpath = '../View/uploads/';
      newpath += file.fileupload.originalFilename;
      //Copy the uploaded file to a custom folder
      fs.rename(filepath, newpath, function (err) {
        //Send a NodeJS file upload confirmation message
        console.log(err);
        res.write('NodeJS File Upload Success!');
        res.end();
        
      });

   });
});


// post data to cloud database
app.post('/postData', function (req, res) {
    // inserts data into the database  
    currCollection.insertMany([req.body], function(err, result) {
         if (err) {
              console.log(err);
         }else {
                  res.send(JSON.stringify(req.body));
       }// end
      
  });
     
});

// save new user to cloud database
app.post('/postUserData', function (req, res) {
    // inserts data into the database  
    usersCollection.insertMany([req.body], function(err, result) {
        if (err) {
              console.log(err);
        }else {
          console.log(JSON.stringify(req.body) + "" + count + " have been uploaded");
                  res.send(JSON.stringify(req.body));
      }// end
      
    });
});

// post shopping cart items cloud database
app.post('/postCartData', function (req, res) {
  // inserts data into the database  
  cartCollection.insertMany([req.body], function(err, result) {
       if (err) {
            console.log(err);
       }else {
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

// deletes all data frome shopping cart
app.delete('/deleteAllCartData', (req, res) => {
    
  var myquery = { address: /^O/ };
  // method performs deletion
  cartCollection.deleteMany();

  res.send("All Cart Data Deleted")
  console.log("cart data deleted");

})


 /// Back-end: Node.js + Mongoose (MongoDB)
 app.delete('/deleteOneItem/:id', (req, res) => {

  //  cartCollection.deleteOne({ _id: req.params.id })
   cartCollection.deleteOne({"productCode":req.params.id})
  .then(() => {
    res.json({ success: true });
    console.log(req.params.id);
  })
  .catch(err => {
      res.status.json({ err: err });
  });
});

/// delete inventory one item
app.delete('/deleteInventoryItem/:id', (req, res) => {

  //  cartCollection.deleteOne({ _id: req.params.id })
  currCollection.deleteOne({"productCode":req.params.id})
  .then(() => {
    res.json({ success: true });
    console.log(req.params.id);
  })
  .catch(err => {
      res.status.json({ err: err });
  });
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) 
});