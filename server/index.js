const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config({ path: require("path").resolve(__dirname, ".env.local") });
require("dotenv").config({ path: require("path").resolve(__dirname, ".env.production") });

const decoded = Buffer.from(process.env.FIREBASE_ADMIN_KEY, 'base64').toString('utf-8')
const serviceAccount = JSON.parse(decoded)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tahmid-sarker.github.io"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
initializeApp({
  credential: cert(serviceAccount)
});

// Create Token:
app.post("/jwt", (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.JWT_ACCESS_SECRET, {expiresIn: '10d'});
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });
  res.send({token});
})

// Verify Cookie Token:
const VerifyJWTToken = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).send({message: "Unauthorize Access"})
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decode) => {
    if(error) {
      return res.status(401).send({message: "Unauthorize Access"})
    }
    req.decode = decode;
    next();
  })
}

// Verify Firebase Token:
const VerifyFirebaseToken = async(req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader) {
    return res.status(401).send({message: "Unauthorize Access"})
  }
  const token = authHeader.split(" ")[1];
  const decode = await getAuth().verifyIdToken(token)
  req.decode = decode;
  next();
}

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@main-cluster.gpxkwmd.mongodb.net/?retryWrites=true&w=majority&appName=main-cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const serviceCollection = client.db("serviceDB").collection("services");
const userCollection = client.db("userDB").collection("users");

//SERVICE PART:
// Get all the service data (Read)
app.get("/services", async (req, res) => {
  const result = await serviceCollection.find().toArray();
  res.send(result);
});

// Create a Service (Create)
app.post("/services", VerifyJWTToken, async (req, res) => {
  const serviceInfo = req.body;
  if(serviceInfo.userEmail !== req.decode.email) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const result = await serviceCollection.insertOne(serviceInfo);
    res.send(result);
  }
});

// Get a user services (Read)
app.get("/user-services", VerifyFirebaseToken, async (req, res) => {
  const email = req.query.email;
  if(email !== req.decode.email) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const filter = { userEmail: email };
    const result = await serviceCollection.find(filter).toArray();
    res.send(result);
  }
});

// Create a Review (Create)
app.patch("/service-details/:id", VerifyJWTToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const newReview = req.body;
  const updateReviews = {
    $push: {
      reviews: newReview,
    },
  };
  const result = await serviceCollection.updateOne(filter, updateReviews);
  res.send(result);
});

// Get limited service data (Read)
app.get("/services/featured", async (req, res) => {
  const cursor = serviceCollection.find().limit(6);
  const result = await cursor.toArray();
  res.send(result);
});

// Get a service data (Read)
app.get("/service-details/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await serviceCollection.findOne(filter);
  res.send(result);
});

// Update a Service (Update)
app.patch("/update-service/:id", VerifyJWTToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedService = req.body;
  if(updatedService.userEmail !== req.decode.email) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const updateDoc = {
      $set: updatedService,
    };
    const result = await serviceCollection.updateOne(filter, updateDoc);
    res.send(result);
  }
});

// Delete a Service (Delete)
app.delete("/services/:id", VerifyJWTToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  if(req.decode.email !== req.body.userEmail) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const result = await serviceCollection.deleteOne(filter);
    res.send(result);
  }
});

// USER PART:
// Create a User (Create)
app.post("/users", VerifyFirebaseToken, async (req, res) => {
  const newUser = req.body;
  if(newUser.email !== req.decode.email) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const result = await userCollection.insertOne(newUser);
    res.send(result);
  }
});

// Get All user info (Read)
app.get("/users", async (req, res) => {
  const result = await userCollection.find().toArray();
  res.send(result);
});

// Get user logged info (Update)
app.patch("/users/login", VerifyFirebaseToken, async (req, res) => {
  const { email, lastSignInTime } = req.body;
  if(email !== req.decode.email) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const filter = { email: email };
    const updateDoc = {
      $set: {
        lastSignInTime: lastSignInTime,
      },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
  }
});

// Update partial user info (Update)
app.patch("/users/update-profile", VerifyFirebaseToken, async (req, res) => {
  const { email, name, photo } = req.body;
  if(email !== req.decode.email) {
    return res.status(403).send({message: "Forbidden Access"});
  } else {
    const filter = { email: email };
    const updateDoc = {
      $set: {
        name: name,
        photo: photo,
      },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
  }
});

app.get("/", (req, res) => {
  res.send("Rate Cloud Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: http://localhost:${port}`);
});

module.exports = app;
