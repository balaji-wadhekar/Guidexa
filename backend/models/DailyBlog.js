import mongoose from 'mongoose';

const dailyBlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    excuseEvaluated: {
      type: Boolean,
      default: false,
    },
    evaluationResult: {
      type: String,
    },
  },
  { 
    timestamps: true 
  }
);

const DailyBlog = mongoose.model('DailyBlog', dailyBlogSchema);
export default DailyBlog;
