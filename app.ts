import express from "express";
import path from "path";

import { settings } from './settings';

import { sequelize } from "./models";
import { seedDatabase } from "./seed";

// Import routes (make sure these are .ts files or have index.ts)
import indexRouter from "./routes/index";
import tournamentsRouter from "./routes/tournaments";
import orderOfPlayRouter from "./routes/orderOfPlay";
import teamsRouter from "./routes/teams";

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static("./public"));

// Use routes
app.use("/", indexRouter);
app.use("/home", indexRouter);
app.use("/tournaments", tournamentsRouter);
app.use("/orderOfPlay", orderOfPlayRouter);
app.use("/teams", teamsRouter);

const PORT = settings.appPort || 3000;

// Sync models with the database without dropping tables
sequelize.sync({ alter: true }).then(async () => {
  // Seed the database
  await seedDatabase();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}!`);
  });
});

export default app;
