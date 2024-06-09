import { VITE_OPENAI_KEY } from "@/Utils";
import { InputAI, QuestionAI } from "./Utils";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
});

const guide = `
Output: Array of Question Objects
Question Object:
{
    "Question": Question, // Placeholder for the text of the question.
    "Answers": [
        {
            "Answer": Answer, // Placeholder for the text of the first answer option.
            "IsCorrect": true // Indicates if the first answer is correct.
        },
        {
            "Answer": Answer, // Placeholder for the text of the second answer option.
            "IsCorrect": false // Indicates if the second answer is correct.
        },
        {
            "Answer": Answer, // Placeholder for the text of the third answer option.
            "IsCorrect": true // Indicates if the third answer is correct.
        }
        // Additional answer options can be added here if needed.
    ],
    "Explanation": Explanation  // Placeholder for the explanation of the answer.
}   
`;

function generatePrompt(data: InputAI) {
    let Difficult = "medium";

    if (data.DifficultLevel == "Nhận biết") Difficult = "easy";
    if (data.DifficultLevel == "Vận dụng") Difficult = "hard";
    if (data.DifficultLevel == "Vận dụng cao") Difficult = "extreme";

    let Type = "single response";
    if (data.Type == "Nhiều đáp án") Type = "multiple response";

    let Language = "vietnamese";
    if (data.Type == "Tiếng Anh") Type = "English";

    const output = `
Input Parameters:
{
    Text: ${data.Text}, // Text content to generate questions from.
    Language: ${Language}, // Language for question generation.
    Difficulty: ${Difficult}, // Difficulty level of questions.
    NumberOfQuestions: ${data.NumberOfQuestion}, // Number of questions to generate.
    Type: ${Type} // Type of question.
}
    `;
    return output;
}

export async function generateQuestion(data: InputAI) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: guide },
                { role: "user", content: generatePrompt(data) },
            ],
            model: "gpt-3.5-turbo-0125",
        });
        let output = completion.choices[0].message.content;
        if (output) {
            const startIndex = output.indexOf("[");
            const endIndex = output.lastIndexOf("]");
            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                output = output.substring(startIndex, endIndex + 1);
                const final: QuestionAI[] = JSON.parse(output);
                return final;
            }
        }
    } catch (error) {
        console.error(error);
    }
}
