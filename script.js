const express = require('express');
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({ apiKey: "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" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/chat', async (req, res) => {
    const { input } = req.body;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "gpt-3.5-turbo",
        max_tokens: 100,
    });

    const response = completion.choices[0].message.content;
    
    res.json({response});
    console.log(response);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//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