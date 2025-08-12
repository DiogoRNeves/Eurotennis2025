// filepath: /c:/Users/neo16/Downloads/EurotennisTest/EurotennisTest/routes/teams.js
import { Router, Request, Response } from "express";
import { getTeamsDetails, Tournament } from "../models";

const router = Router();

// Serve teams.ejs for the teams route
router.get("/", async (req: Request, res: Response) => {
  try {
    const teamsDetails = await getTeamsDetails();
    // Sort teams by name
    teamsDetails.sort((a, b) => a.name.localeCompare(b.name));
    const tournamentAcronymsDb = await Tournament.findAll({
      attributes: ["acronym"],
      order: [["displayOrder", "ASC"]],
    })
    const tournamentAcronyms = tournamentAcronymsDb.map((tournament) => tournament.acronym);

    res.render("teams", { title: "Teams", teamsDetails, tournamentAcronyms });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
