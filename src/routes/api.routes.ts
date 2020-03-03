import { Router } from "express";
import StoryController from "../controllers/story.controller"
const router = Router();

router.post('/story',StoryController.AddStory)
router.get('/story/:id',StoryController.SelectStory)
router.post('/vote/:id',StoryController.AddVote)
router.get('/vote/:id',StoryController.GetVotes)

export default router;
