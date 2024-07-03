import { SubSubject } from "@/InterfacesDatabase";
import { MY_HEADER, BACKEND_URL } from "@/Utils";
import { SubSubjectDetailForUpdate } from "./UpdateModal";

const BACKEND_PAGE = "SubSubject";
const API_URL = BACKEND_URL + BACKEND_PAGE;

export async function getAll(
    field: string | undefined,
    sort: string | undefined,
    subjectFilter: string | undefined,
    educationFilter: string | undefined
) {
    let url = API_URL;
    const _field = encodeURIComponent(field ? field : "undefined");
    const _sort = encodeURIComponent(sort ? sort : "undefined");
    const _subjectFilter = encodeURIComponent(
        subjectFilter ? subjectFilter : "undefined"
    );
    const _educationFilter = encodeURIComponent(
        educationFilter ? educationFilter : "undefined"
    );
    const option_path = `/${_field}/${_sort}/${_subjectFilter}/${_educationFilter}`;
    try {
        const response = await fetch(url + option_path);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function getBySubjectAndEducationLevel(
    SubjectId: string,
    EducationLevelId: string
) {
    try {
        const response = await fetch(
            API_URL +
                `/GetBySubjectAndEducationLevel/${SubjectId}/${EducationLevelId}`
        );
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function getBySubject(SubjectId: string) {
    try {
        const response = await fetch(API_URL + `/GetBySubject/${SubjectId}`);
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function deleteOne(SubSubjectId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: MY_HEADER,
            body: JSON.stringify({ SubSubjectId: SubSubjectId }),
        });
        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function updateOne(data: SubSubjectDetailForUpdate) {
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

export async function createOne(
    data: Omit<SubSubject, "SubSubjectId" | "CreatedAt" | "UpdatedAt">
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
