import express from "express";
import { getStudents, postStudent, updateJohn, deleteStudent } from "../controllers/students.js";

const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);
studentsRouter.post("/", postStudent);
studentsRouter.put("/", updateJohn)
studentsRouter.delete("/:id", deleteStudent)


export default studentsRouter;
