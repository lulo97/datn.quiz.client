import { BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "CommentDetail";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getAllByQuiz(QuizId: string) {
    try {
        const response = await fetch(API_URL + `/ReadAllByQuiz/${QuizId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}