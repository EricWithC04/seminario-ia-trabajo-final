import { Router } from "express";
import ChatControllers from "../controllers/ChatControllers";
import FileController  from "../controllers/fileControllers";

const router = Router();

router.post("/", ChatControllers.getAnswer);
router.post("/upload_pdf", FileController.uploadFile);

export default router;