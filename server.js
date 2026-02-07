// Basic Express server setup
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
require('dotenv').config();
const dialectData = require('./dialects.json');
const { GoogleGenAI } = require("@google/genai");


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

//AI Gemini Integration
const ai = new GoogleGenAI({ GEMINI_API_KEY: process.env.GEMINI_API_KEY });

const examples = dialectData["Ahirani"].map(ex =>
    `Standard: ${ex.standard} -> Dialect: ${ex.dialect}`
).join("\n");


app.post('/convert-dialect', async (req, res) => {
    const { text, dialect } = req.body; // e.g., dialect = "Varhadi"
    console.log(`1 Converting to dialect: ${text}` + `${dialect}`);
    try {
        const prompt = `You are an expert linguist specializing in Marathi dialects. Convert the following Standard Marathi text into the "${dialect}" dialect. 
            Maintain the same meaning but use the specific vocabulary, grammar, and slang typical of that region.
            Please give only the converted text without any additional explanations.
            Here are some examples of the grammar and style:
            ${examples}
            Now, convert this text:
            Text: "${text}"  `;
        console.log("Prompt constructed:", prompt);

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });


        console.log("Generation result:", response.candidates[0].content.parts[0].text);
        res.json({ convertedText: response.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).send("Error converting text");
    }
});




// Fallback to index.html for React routing
app.get('/', (req, res) => {
    console.log("Serving React app");
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




// {
//   "Ahirani": [
//     {"std": "तू काय करतोयस?", "dialect": "तू काय करी रायना?", "context": "What are you doing?"},
//     {"std": "मी उद्या मुंबईला जाणार आहे.", "dialect": "मी उद्या मुंबईले जासूत.", "context": "I will go to Mumbai tomorrow."},
//     {"std": "मला खूप भूक लागली आहे.", "dialect": "मले लय भूक लागणी शे.", "context": "I am very hungry."},
//     {"std": "तुझे नाव काय आहे?", "dialect": "तुले नाव काय शे?", "context": "What is your name?"}
//   ],
//   "Varhadi": [
//     {"std": "तू कुठे चालला आहेस?", "dialect": "तू कोठं चालला बे?", "context": "Where are you going?"},
//     {"std": "पाऊस पडत आहे.", "dialect": "पाऊस पडून रायला.", "context": "It is raining."},
//     {"std": "जेवण झाले का?", "dialect": "जेवण झालं का बापा?", "context": "Did you eat?"},
//     {"std": "तो खोटे बोलत आहे.", "dialect": "तो खोटं बोलून रायला.", "context": "He is lying."}
//   ],
//   "Malvani": [
//     {"std": "मी घरी चाललो आहे.", "dialect": "मी घराकडे जाताय.", "context": "I am going home."},
//     {"std": "त्याला राग आला आहे.", "dialect": "त्याका राग आयलो असा.", "context": "He is angry."},
//     {"std": "तुला काय पाहिजे?", "dialect": "तुका काय होया?", "context": "What do you want?"},
//     {"std": "आम्ही खेळायला गेलो होतो.", "dialect": "आम्ही खेळूक गेलं होतं.", "context": "We had gone to play."}
//   ]
// }