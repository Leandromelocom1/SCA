const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getSolution = async (req, res) => {
  const { problemDescription } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: problemDescription,
      max_tokens: 150,
    });

    const solution = response.data.choices[0].text.trim();
    res.json({ solution });
  } catch (error) {
    console.error('Error fetching solution from GPT-3:', error);
    res.status(500).json({ error: 'Failed to fetch solution from GPT-3' });
  }
};

module.exports = {
  getSolution,
};
