import { Router, Request, Response } from "express";

const router = Router();

// Serve index.ejs for the root route
router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Home" });
});

export default router;