import { BACKEND_URL, MY_HEADER } from "@/Utils";

import { Play, SelectedAnswer } from "@/InterfacesDatabase";

const BACKEND_PAGE = "CreatePlay";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export interface InterfaceAPI {
    PlayRecordInsert: Omit<Play, "CreatedAt">;
    SelectedAnswersInsert: Omit<SelectedAnswer, "SelectedAnswerId">[];
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
