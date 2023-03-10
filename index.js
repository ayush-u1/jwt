const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  userRoutes = require("./routes/app");

//Connect to database
try {
  mongoose.connect("mongodb://127.0.0.1:27017/user", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

//using user route
app.use(userRoutes);

//setup server to listen on port 8080
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is live on port 8080");
})