import { Request, Response } from "express";
import StoryModel from "../models/story.model";
import mongoose, { mongo } from "mongoose";
class StoryController {
  async AddStory(req: Request, res: Response) {
    const { title, description, createdBy } = req.body;
    if (title && description && createdBy) {
      try {
        const NewStory = await new StoryModel({
          title,
          description,
          createdBy
        });
        const StorySaved = await NewStory.save();
        res.json({
          message: "Successfully created Story",
          story_id: StorySaved.id
        });
      } catch (error) {
        res.status(500).json({
          message: error
        });
      }
    } else {
      res.status(400).json({
        message: "All the fields are required"
      });
    }
  }
  async SelectStory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (mongoose.isValidObjectId(id)) {
        const Story = await StoryModel.findById(id);
        if (Story) {
          if (Story.active === true) {
            res.json({
              message: "Welcome Back",
              story: Story
            });
          } else {
            res.json({
              message: "Session is Over",
              story: Story
            });
          }
        } else {
          res.status(404).json({
            message: "Story is not available"
          });
        }
      } else {
        res.status(404).json({
          message: "Parameter is not valid"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  }
  async AddVote(req: Request, res: Response) {
    const { name, card } = req.body;
    const { id } = req.params;
    const cardInt = parseInt(card);
    if (name && card) {
      try {
        const Story = await StoryModel.findById(id);
        if (Story) {
          Story.votes.push({ name, card: cardInt });
          await Story.save();
          res.json({
            message: "Vote added susccessfully"
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error
        });
      }
    } else {
      res.status(400).json({
        message: "All fields are required"
      });
    }
  }
  async GetVotes(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const Story = await StoryModel.findById(id)
    if(Story){
      res.json({
        votes:Story.votes
      })
    }
    } catch (error) {
      res.status(500).json({
        message: error
      })
    }
  }
}
const storycontroller = new StoryController();
export default storycontroller;
