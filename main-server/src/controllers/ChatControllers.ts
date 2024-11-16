import { Request, Response } from 'express';
import AnswerService from '../services/AnswerGeneration.service';

class ChatController {

    constructor() {}

    async getAnswer (req: Request, res: Response) {
        const { question } = req.body;
        try {
            const answer = await AnswerService.getAnswer(question);
            res.json({ answer });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}


export default new ChatController();