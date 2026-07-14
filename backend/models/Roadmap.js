import mongoose from 'mongoose';

const microTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    goal: {
      type: String,
      required: true,
    },
    dailyTasks: [
      {
        day: {
          type: Number,
          required: true,
        },
        tasks: [microTaskSchema],
      },
    ],
  },
  { timestamps: true }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
