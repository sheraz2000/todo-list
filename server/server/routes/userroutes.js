import express from "express";
import {
  create,
  getallusers,
  getuserbyid,
  update,
  deleteUser,
} from "../controller/usercontroller.js";

const router = express.Router();


router.post("/", create);
router.get("/", getallusers);
router.get("/:id", getuserbyid);
router.put("/:id", update);
router.delete("/:id", deleteUser);

export default router;