import { BACKEND_URL, MY_HEADER } from "@/Utils";
import { QuizVertifyUpdate } from "../VertifyQuiz/Utils";

const BACKEND_PAGE = "Moderator/QuizVertify";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getAll() {
    try {
        const response = await fetch(API_URL + "/ReadAll");
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function updateOne(data: QuizVertifyUpdate) {
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
