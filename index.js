import "dotenv/config";
import express from "express";
import { connectDatabase } from "./db/client.js";
import studentsRouter from "./routes/students.js";
import countriesRouter from "./routes/countries.js";
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentsRouter);
app.use("/countries", countriesRouter);

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.log(error, "Failed to start server");
});
