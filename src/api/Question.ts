import { BACKEND_URL, MY_HEADER } from "@/Utils";

import { Question, Answer, QuestionInformation } from "@/InterfacesDatabase";

const BACKEND_PAGE = "Question";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export interface InterfaceAPI {
    QuestionRecord: Question;
    QuestionInfoRecord: Omit<QuestionInformation, "CreatedAt" | "UpdatedAt">;
    AnswerRecords: Answer[];
    ImageUrl: string;
    AudioUrl: string;
}

export async function updateOne(data: InterfaceAPI) {
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: MY_HEADER,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function createOne(data: InterfaceAPI) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: MY_HEADER,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function deleteOne(QuestionId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: MY_HEADER,
            body: JSON.stringify({ QuestionId: QuestionId }),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
