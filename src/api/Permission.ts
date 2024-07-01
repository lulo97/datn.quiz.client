import { BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "Permission";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getAllByRole(RoleId: string) {
    try {
        const response = await fetch(API_URL + `/ReadAllByRole/${RoleId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function getAllByClerkId(ClerkId: string) {
    try {
        const response = await fetch(API_URL + `/ReadAllByClerkId/${ClerkId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}