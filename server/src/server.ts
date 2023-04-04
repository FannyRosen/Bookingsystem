import express, { Request, Response } from "express";
const app = express();

app.get("/api", (req: Request, res: Response) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
