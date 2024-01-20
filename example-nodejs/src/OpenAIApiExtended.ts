import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';


dotenv.config();

export class OpenAIExtended extends OpenAIApi{
    constructor() {
        super();
    }

    public async getDescription(productName: string) {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Wygeneruj opis plyty winylowej ${productName} wraz z tracklista` }],
        });
        return chatCompletion.data.choices[0].message;
    }
}