import { BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "ranking";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getOne(RoomId: string) {
    try {
        const response = await fetch(API_URL + `/${RoomId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}