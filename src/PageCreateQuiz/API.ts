import { BACKEND_URL, MY_HEADER } from "@/Utils";

import { Quiz, QuizQuestion } from "@/InterfacesDatabase";
import { QIForInsert } from "./Utils";

const BACKEND_PAGE = "CreateQuiz";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export interface InterfaceAPI {
    QuizRecord: Quiz;
    QuizInfoRecord: QIForInsert;
    QuizQuestionRecords: QuizQuestion[];
    ImageUrl: string;
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
