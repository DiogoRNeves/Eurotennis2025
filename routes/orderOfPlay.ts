import { Router, Request, Response } from "express";
// import your models as needed

const router = Router();

// Serve orderofplay.ejs for the orderofplay route
router.get("/", async (req: Request, res: Response) => {
  // Fetch order of play and pass to view
  res.render("orderOfPlay", { title: "Order of Play" });
});

export default router;