import express from "express";
import { getStudents, postStudent, updateJohn, deleteStudent } from "../controllers/students.js";
import { authenticate } from "../middlewares/users.js";

const studentsRouter = express.Router();

studentsRouter.get("/", authenticate, getStudents);
studentsRouter.post("/", authenticate, postStudent);
studentsRouter.put("/", updateJohn)
studentsRouter.delete("/:id", authenticate, deleteStudent)


export default studentsRouter;
