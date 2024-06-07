import { BACKEND_URL, MY_HEADER } from "@/Utils";
import { QIForInsert } from "../Utils";

const BACKEND_PAGE = "QuizInformation";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function createOne(
    data: QIForInsert,
    ImageUrl: string
) {
    let _data = {...data}
    if (ImageUrl != "") {
        _data = {..._data, ImageUrl: ImageUrl}
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: MY_HEADER,
            body: JSON.stringify(_data),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}