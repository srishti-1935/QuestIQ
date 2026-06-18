const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/analyze', async (req, res) => {
  const { thought } = req.body;

  if (!thought) {
    return res.status(400).json({ error: 'No thought provided' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a cognitive bias detection expert. When given a thought, argument, or decision, you must:
1. Identify the cognitive bias at play (if any)
2. Explain it in simple, friendly, non-judgmental language (2-3 lines)
3. Reframe the thinking — show what clear, unbiased reasoning looks like
4. Give a short bias name (e.g. "Sunk Cost Fallacy")

Always respond in this exact JSON format:
{
  "biasDetected": true or false,
  "biasName": "Name of the bias or null",
  "explanation": "Simple explanation of the bias",
  "reframe": "How to think about this more clearly",
  "severity": "low, medium, or high"
}

Respond with ONLY the JSON object. No markdown, no backticks, no explanation before or after.`
        },
        {
          role: 'user',
          content: thought
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const raw = completion.choices[0].message.content;

    // Clean the response in case AI wraps it in markdown code blocks
    const cleaned = raw.replace(/```json|```/g, '').trim();

    try {
      const parsed = JSON.parse(cleaned);
      res.json(parsed);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw response was:', raw);
      res.status(500).json({ error: 'AI response could not be parsed' });
    }

  } catch (error) {
    console.error('Groq error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;