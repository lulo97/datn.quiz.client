import { BACKEND_URL, MY_HEADER } from "@/Utils";
import { Quiz, QuizInformation, QuizQuestion } from "@/InterfacesDatabase";

const BACKEND_PAGE = "Quiz";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export type QIForInsert = Omit<QuizInformation, "CreatedAt" | "UpdatedAt">;

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

export async function deleteOne(QuizId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: MY_HEADER,
            body: JSON.stringify({ QuizId: QuizId }),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}