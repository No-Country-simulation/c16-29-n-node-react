import { Router } from "express";
import {
  getSubjects,
  getSubjectById,
  getSubjectsByTeacherId,
  createSubject,
  updateSubject,
} from "../controllers/subject.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const subjectRouter = Router();
/*   GET /api/subjects/current [TEACHER] */
/* GET /api/subjects/:id [PRINCIPAL, TEACHER] */
/* GET /api/subjects [PRINCIPAL] */
/* DELETE /api/subjects/:id [PRINCIPAL] */ //no hay delete//
/* POST /api/subjects [PRINCIPAL] */
/* PUT /api/subjects/:id [PRINCIPAL] */
subjectRouter
  .get("/", getSubjects)
  .get("/:id", getSubjectById)
  .get("/current", verifyToken, getSubjectsByTeacherId)
  .post("/", verifyToken, createSubject)
  .put("/:id", verifyToken, updateSubject);
/*    .delete("/:id", deleteSubject); */

export default subjectRouter;
