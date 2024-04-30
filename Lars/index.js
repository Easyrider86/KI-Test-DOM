import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "" // This is also the default, can be omitted
});

const runPrompt = async () => {

    const prompt = "Tell me a joke about a cat eating pasta.";

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_Tokens: 2048,
        temperature: 1,
    });

    console.log(response.data);

};

runPrompt();