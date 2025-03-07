const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");
const seedDatabase = require("./seed");


// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routes
const indexRouter = require("./routes/index");
const tournamentsRouter = require("./routes/tournaments");
const orderOfPlayRouter = require("./routes/orderOfPlay");
const teamsRouter = require("./routes/teams");


// Serve static files from the public directory
app.use(express.static("./public"));

// Use routes
app.use("/", indexRouter);
app.use("/home", indexRouter);
app.use("/tournaments", tournamentsRouter);
app.use("/orderOfPlay", orderOfPlayRouter);
app.use("/teams", teamsRouter);

const PORT = process.env.PORT || 3000;

// Sync models with the database without dropping tables
db.sequelize.sync({ alter: true }).then(async () => {
  // Seed the database
  await seedDatabase();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}!`);
  });
});
