import { Router, Request, Response } from "express";
// import your models as needed

const router = Router();

// Serve tournaments.ejs for the tournaments route
router.get("/", async (req: Request, res: Response) => {
  // Fetch tournaments and pass to view
  res.render("tournaments", { title: "Tournaments" });
});

export default router;