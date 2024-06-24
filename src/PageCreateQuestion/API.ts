import { BACKEND_URL, MY_HEADER } from "@/Utils";

import { Question, Answer, QuestionInformation } from "@/InterfacesDatabase";

const CREATE_BACKEND_PAGE = "CreateQuestion";
const UPDATE_BACKEND_PAGE = "UpdateQuestion";

export interface InterfaceAPI {
    QuestionRecord: Question;
    QuestionInfoRecord: Omit<QuestionInformation, "CreatedAt" | "UpdatedAt">;
    AnswerRecords: Answer[];
    ImageUrl: string;
    AudioUrl: string;
}

export async function updateOne(data: InterfaceAPI) {
    try {
        const response = await fetch(BACKEND_URL + UPDATE_BACKEND_PAGE, {
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

export async function createOne(data: InterfaceAPI) {
    try {
        const response = await fetch(BACKEND_URL + CREATE_BACKEND_PAGE, {
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
