import "dotenv/config";
import express from "express";
import { connectDatabase } from "./db/client.js";
import studentsRouter from "./routes/students.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/students", studentsRouter);

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.log(error, "Failed to start server");
});
