import { BACKEND_URL, MY_HEADER } from "@/Utils";

const BACKEND_PAGE = "QuizDetail";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getOne(QuizId: string) {
    try {
        const response = await fetch(API_URL + `/${QuizId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export async function getAllByUser(UserId: string) {
    try {
        const response = await fetch(API_URL + `/ReadAllByUser/${UserId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
