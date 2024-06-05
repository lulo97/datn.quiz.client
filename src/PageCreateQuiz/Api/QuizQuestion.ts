import { QuizQuestion } from "@/InterfacesDatabase";
import { BACKEND_URL, MY_HEADER } from "@/Utils";

const BACKEND_PAGE = "QuizQuestion";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function createOne(
    data: QuizQuestion
) {
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