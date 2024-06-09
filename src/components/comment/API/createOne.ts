import { Comment } from "@/InterfacesDatabase";
import { MY_HEADER, BACKEND_URL } from "@/Utils";

const BACKEND_PAGE = "Comment";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function createOne(
    data: Omit<Comment, "CommentId" | "CreatedAt" | "UpdatedAt">
) {
    console.log(data)
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
