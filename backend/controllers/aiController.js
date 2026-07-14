import DailyBlog from '../models/DailyBlog.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your_api_key_here');

// @desc    Submit daily blog and get AI feedback
// @route   POST /api/blogs/submit
export const submitDailyBlog = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Please provide blog content' });
    }

    // Call Gemini API to evaluate excuses
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are an "Excuse Debugger" for a student's study tracker app. 
    The student has submitted the following daily reflection. 
    Analyze the text to see if the student is making excuses for not completing their goals. 
    Provide constructive, tough-love feedback.
    
    Student's text: "${content}"`;

    let evaluationResult = '';
    try {
      const result = await model.generateContent(prompt);
      evaluationResult = result.response.text();
    } catch (aiError) {
      console.error('Gemini API Error:', aiError);
      evaluationResult = 'AI evaluation failed at this time. Please make sure GEMINI_API_KEY is configured in the .env file.';
    }

    // Save to database
    const dailyBlog = await DailyBlog.create({
      user: req.user._id, // Available because of the auth middleware
      content,
      excuseEvaluated: true,
      evaluationResult,
    });

    res.status(201).json(dailyBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
