// boiler plate code required to create an express server
const express = require('express');// allows the use of the express server
const app = express();
// sets paths of the app
const path = require('path');

// imports the required library
const session = require('express-session')
const cookieParser = require('cookie-parser')
var formidable = require('formidable');
let fs = require('fs');
// allows apps on diferent servers to make a request
var cors = require('cors')

// allows setting of cookies
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret:"secret"
}))

// server listens on this port
const port = 80;
let count = 0;

app.use(express.json());// process json
app.use(express.urlencoded({ extended: true })); // coverts content into format that is compatible with request

// cores library
app.use(cors({
  origin: "*",
  credentials: true,
}));

// momgoo connection
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

// returns the uploads resources
app.use(express.static("../View/uploads"));

// returns the home page index.html
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../View') });
});

// returns files in uploads
app.get('/View/uploads/*', (req, res) => {
  console.log("check request.. " + req.params[0]);
  res.sendFile(req.params[0], { root: path.join(__dirname, '../View/uploads') });
  
});

// returns the all css fils
app.get('/View/css/all.css/', (req, res) => {
  res.sendFile('all.css', { root: path.join(__dirname, '../View/css') });
  
});

// returns the controller get and post js file
app.get('/Controller/getAndPosts.js', (req, res) => {
  res.sendFile('getAndPosts.js', { root: path.join(__dirname, '../Controller') });
});

// returns the all js file
app.get('/View/js/all.js', (req, res) => {
  res.sendFile('all.js', { root: path.join(__dirname, '../View/js/') });
});

// returns the index js file
app.get('/View/js/index.js', (req, res) => {
  res.sendFile('index.js', { root: path.join(__dirname, '../View/js/') });
});

// used test purposes
app.get('/Controller/test.js', (req, res) => {
  res.sendFile('test.js', { root: path.join(__dirname, '../Controller') });
});

// gets and returns a user by email id
app.get('/getData', function (req, res) {
    count++;
    usersCollection.find({ "email":req.query.email}, {"_id": 0 }).toArray(function(err, docs) {
      if(err) {
        console.log("Some error.. " + err);
      } else {
        res.send(JSON.stringify(docs));
      }
  });
});

// initiates session variable
var sess;
// logins in the user
app.get('/login', function (req, res) {
  count++;
  usersCollection.find({ "email": req.query.email, "password": req.query.password }, { "_id": 0 }).toArray(function (err, docs) {
    res.header("Access-Control-Allow-Origin", "../View/login-signup.html");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    try {
      if (docs[0].email === req.query.email) {

        sess = req.session;
        sess.email = req.query.email;
        sess.firstName = docs[0].firstName;
        console.log(sess.firstName)
        sess.lastName = docs[0].lastName;
        console.log(sess.lastName)
        
        res.jsonp({ login: 1, userType:docs[0].userType })
        res.end('done');

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

    }

});

});

// checks if the user is logged in
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

// logouts the user out
app.post('/logout', function (req, res) {
  // destroy the session
  req.session.destroy((err) => {
    console.log("you are logged out");
    res.end();
  })

});

// saves a case to cloud database
app.get('/saveCase', function (req, res) {
  count++;

  if (req.session.email) {
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

// retrieves a solution form database in form of a jsonp array
app.get('/retrieveSolutions', function (req, res) {
  count++;
  console.log("getting solutions .. " + req.query.caseId);

  solutionsCollection.find({"caseId": req.query.caseId}, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      res.jsonp(results)
    }
  });

});

// saves a solution to cloud database
app.get('/saveSolutions', function (req, res) {
  count++;

  console.log("" + req.query.solutionsDescription + " your solution is uploaded");

  if (req.session.email) {
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

// used for test purposes
app.get('/testitem', function (req, res) {
  console.log("checking test item " + req.query.love);
});

// saves a business profile on signup
app.get('/saveBusinessOnSignup', function (req, res) {
  count++;

      businessCollection.insertOne({ businessEmail: req.query.email, businessName: req.query.businessName, description: req.query.description, profileImage: req.query.profileImage, dateTime: Date.now()}, function (err, result) {
        // inserts data into the database
        if (err) {
          console.log(err);
        } else {
          res.jsonp({ uploaded: 1 })
        }// end
      });
});

// saves a student profile on signup
app.get('/saveStudentOnSignup', function (req, res) {
  count++;

      studentCollection.insertOne({ studentEmail: req.query.email, educationInstituteName: req.query.educationInstituteName, description: req.query.description, profileImage: req.query.profileImage, dateTime: Date.now()}, function (err, result) {
        // inserts data into the database
        if (err) {
          console.log(err);
        } else {
          // console.log("" + count + " your profile has been uploaded");
          res.jsonp({ uploaded: 1 })
        }// end
      });
});

// saves a business profile
app.get('/saveBusiness', function (req, res) {
  count++;

  if (req.session.email) {
      businessCollection.insertOne({ businessEmail: req.session.email, businessName: req.query.businessName, description: req.query.description, profileImage: req.query.profileImage, dateTime: Date.now()}, function (err, result) {
        // inserts data into the database
        if (err) {
          console.log(err);
        } else {
          res.jsonp({ uploaded: 1 })
        }// end
      });
  } else {
    // user not logged in
    res.jsonp({ uploaded: 0 })
  }
});

// saves a student profile
app.get('/saveStudent', function (req, res) {
  count++;

  if (req.session.email) {
        studentCollection.insertOne({ studentEmail: req.session.email, educationInstituteName: req.query.educationInstituteName, description: req.query.description, profileImage: req.query.profileImage, dateTime: Date.now()}, function (err, result) {
        // inserts data into the database
        if (err) {
          console.log(err);
        } else {
          res.jsonp({ uploaded: 1 })
        }// end
      });
  } else {
    // user not logged in
    res.jsonp({ uploaded: 0 })
  }
});

// returns a business profile
app.get('/getBusiness', function (req, res) {
  count++;
    businessCollection.find({ "email": req.params.email, }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      res.jsonp(results)
    }
  });
});

// checks if a particular business exists and returns the business
app.get('/checkBusinessStatus', function (req, res) {
  count++;
  console.log("check business status"+req.session.email);

    businessCollection.find({ "businessEmail": req.session.email, }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      res.jsonp(results)
    }
  });
});

// returns an array of students
app.get('/getStudent', function (req, res) {
  count++;
    studentCollection.find({ "email": req.params.email, }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      res.jsonp(results)
    }
  });
});

// checks if student exists in database
app.get('/checkStudentStatus', function (req, res) {
  count++;
  console.log("check student status");

    studentCollection.find({ "studentEmail": req.session.email, }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
      res.jsonp(results)
    }
  });
});

// gets cases from cloud database
app.get('/getCases', function (req, res) {
  count++;
  
  // returns a collection of data from database
    casesCollection.find().toArray( function(err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
       res.send(results);
    }

  });

});

// gets one case from cloud database
app.get('/getCase', function (req, res) {
  count++;

  console.log("checking 101 " + req.query.id);
  // returns a collection of data from database
    casesCollection.find({ "id":parseInt(req.query.id)}, { "_id": 0 }).toArray(function (err, results) {
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
    solutionsCollection.find({ "caseId": req.params.caseId }, { "_id": 0 }).toArray(function (err, results) {
    if(err) {
      console.log("Some error.. " + err);
    } else {
       res.send(results);
    }
  });
});

// used for testing purposes to get
app.get('/getTest', function (req, res) {
  count++;
  console.log("test checking 101 " + req.body.test);
  // returns a collection of data from database
  
});


// save files to database
app.post('/upload', function (req, res) {
  
  console.log("inner upload check");
  sess = req.session;
  sess.email;
  console.log(sess.email);

  if (sess.email) {
    console.log("session is set");
  } else {
    console.log("session is not set");
  }

  console.log("inner upload check");
//Create an instance of the form object
let form = new formidable.IncomingForm();
    //Process the file upload in Node
    console.log("inner upload check");
    form.parse(req, function (error, fields, file) {
      let filepath = file.fileupload.filepath;
      // let newpath = 'C:/upload-example/'; http://35.163.61.63/View/
      let newpath = '../View/uploads/';
      console.log("inner upload check");
      // let newpath = 'http://35.163.61.63/View/uploads/';
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
  console.log(req.body.businessOrUniversityName+"testing");
  console.log(req.body.businessOrStudentAbout+"testing");
    // inserts data into the database  
    usersCollection.insertMany([req.body], function(err, result) {
        if (err) {
              console.log(err);
        } else {
          console.log(JSON.stringify(req.body) + "" + count + " have been uploaded");
          res.send(JSON.stringify(req.body));
      }// end
      
    });
});

// deletes all data in the specified table
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