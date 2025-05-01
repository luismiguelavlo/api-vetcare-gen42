import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("This is a get method");
});

app.post("/", (req: Request, res: Response) => {
  res.send("This is a post method");
});

app.listen(3000, () => {
  console.log("El servidor chismoso esta chismoseando por el puerto 3000");
});
