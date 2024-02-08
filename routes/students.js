import express from "express";
import { getStudents, postStudent, updateJohn } from "../controllers/students.js";

const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);
studentsRouter.post("/", postStudent);
studentsRouter.put("/", updateJohn)

export default studentsRouter;
