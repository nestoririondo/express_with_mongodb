import "dotenv/config";
import express from "express";
import { connectDatabase } from "./db/client.js";
import studentsRouter from "./routes/students.js";
import countriesRouter from "./routes/countries.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentsRouter);
app.use("/countries", countriesRouter);
app.use("/users", usersRouter);

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.log(error, "Failed to start server");
});
