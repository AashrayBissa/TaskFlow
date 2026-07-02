const Task = require("../models/taskSchema");
const User = require('../models/userSchema');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

module.exports.prioritizeTasks = async (req, res) => {
  try {
    let { taskIds } = req.body;
    let tasks;
    if (taskIds && taskIds.length > 0) {
      tasks = await Task.find({ _id: { $in: taskIds }, owner: req.user._id });
    } else {
      tasks = await Task.find({ owner: req.user._id }).sort({ dueDate: 1 });
    }

    if (tasks.length === 0) {
      return res.status(400).json({ message: "No tasks to prioritize." });
    }

    const prompt = buildPrompt(tasks);

    const result = await callGemini(prompt);

    if (!result) {
      return res.status(200).json({
        message: "AI analysis unavailable. Tasks returned in default order.",
        tasks: tasks.map((t) => ({
          _id: t._id,
          title: t.title,
          priority: t.priority,
          dueDate: t.dueDate,
          isCompleted: t.isCompleted,
        })),
        aiUnavailable: true,
      });
    }

    res.status(200).json({
      prioritized: result.prioritizedTasks,
      summary: result.summary || null,
      executionSequence: result.executionSequence || null,
    });
  } catch (error) {
    console.error("Prioritize error:", error);
    res.status(500).json({ message: "Prioritization failed." });
  }
};

function buildPrompt(tasks) {
  const taskList = tasks
    .map(
      (t, i) =>
        `${i + 1}. "${t.title}" | Description: ${t.description || "N/A"} | Priority: ${t.priority} | Due: ${t.dueDate ? new Date(t.dueDate).toISOString().split("T")[0] : "N/A"} | Status: ${t.isCompleted ? "Completed" : "Pending"}`
    )
    .join("\n");

  return `You are a task prioritization assistant. Analyze these tasks and return a JSON response.

Tasks:
${taskList}

Consider: urgency (deadlines), importance (impact), effort (description length/complexity), current priority labels.

Return valid JSON only (no markdown, no explanation):
{
  "prioritizedTasks": [
    {
      "taskId": "<original _id>",
      "rank": <number>,
      "reasoning": "<why this rank>"
    }
  ],
  "summary": "<one-sentence takeaway>",
  "executionSequence": "<suggested order to tackle them>"
}

Order prioritizedTasks by rank ascending (1 = most urgent/important).`;
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) return null;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return null;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*$/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini call failed:", err);
    return null;
  }
}

module.exports.savePrioritization = async (req, res) => {
  try {
    const { results } = req.body;
    await User.findByIdAndUpdate(req.user._id, { prioritization: results || null });
    res.json({ message: "Prioritization saved." });
  } catch (error) {
    console.error("Save prioritization error:", error);
    res.status(500).json({ message: "Failed to save prioritization." });
  }
};

module.exports.getPrioritization = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("prioritization");
    res.json({ results: user?.prioritization || null });
  } catch (error) {
    console.error("Get prioritization error:", error);
    res.status(500).json({ message: "Failed to get prioritization." });
  }
};
