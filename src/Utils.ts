//Pure function: Not change input or state of system and always return output

import { CSSProperties } from "react";
import { MenuItem } from "./Interfaces";

export function getObjectId() {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
                return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
    );
}

export function getUUID() {
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) {
                //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
}

export function getRandomAvatar() {
    return `https://robohash.org/${getObjectId()}`;
}

export function getDummyImage() {
    const API_URL = BACKEND_URL + "public/Image/DummyImage.png";
    return API_URL;
}

export function initialAnswer() {
    return { id: getObjectId(), content: "", correct: false };
}

//Tailwind don't allow for dynamic className change
//export const ModalSizeClass = `min-h-[calc(100vh*${ModalWidthScale})] min-w-[calc(100vw*${ModalWidthHeight})]`
export const ModelWidthClass = `min-w-[95%]`;
export const ModalSizeClass = `min-w-[95%] min-h-[90%]`;
export const ModalScreenClass = `min-w-[100%] min-h-[100%]`;

export const CardParentClass = `bg-gray-200`;

export function getRandomDate(): string {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);

    const day = randomDate.getDate().toString().padStart(2, "0");
    const month = (randomDate.getMonth() + 1).toString().padStart(2, "0");
    const year = randomDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

export function strToDate(date: string): Date {
    const [day, month, year] = date.split("/");
    return new Date(`${year}-${month}-${day}`);
}

export function getRandomInt(a: number, b: number) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Recursive function to find an element by name
export function findMenuItemByName(
    menu: MenuItem[],
    name: string
): MenuItem | null {
    for (const item of menu) {
        if (item.name === name) {
            return item;
        }
        if (item.child) {
            const found = findMenuItemByName(item.child, name);
            if (found) {
                return found;
            }
        }
    }
    return null; // Return null if not found
}

export const BACKEND_URL = "http://localhost:3000/";

export function toDDMMYYY(date_str: string) {
    const date = new Date(date_str);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    return `${formattedDay}/${formattedMonth}/${year}`;
}

export const MY_HEADER = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export function getImgPath(file_name: string) {
    return `/image/${file_name}`;
}

export function getAnswerStyle(IsCorrect: boolean) {
    return IsCorrect == true ? "text-green-500" : "text-red-500";
}

export function getAnswerStyleBG(IsCorrect: boolean) {
    return IsCorrect == true ? "bg-green-200" : "bg-red-200";
}

export const VITE_SERVER_PATH = import.meta.env.VITE_SERVER_PATH;

if (!VITE_SERVER_PATH) {
    throw new Error("Missing VITE_SERVER_PATH");
}

export const VITE_SERVER_PATH_SOCKET = import.meta.env.VITE_SERVER_PATH_SOCKET;

if (!VITE_SERVER_PATH_SOCKET) {
    throw new Error("Missing VITE_SERVER_PATH_SOCKET");
}

export const VITE_OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

if (!VITE_OPENAI_KEY) {
    throw new Error("Missing VITE_OPENAI_KEY");
}

export const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

export const SCQ = "Một đáp án";
export const MCQ = "Nhiều đáp án";

const MCQCheckBoxClass =
    "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500";
const SCQCheckBoxClass =
    "rounded-full data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500";

export function getCheckBoxClass(TypeName: string | undefined) {
    return TypeName == MCQ ? MCQCheckBoxClass : SCQCheckBoxClass;
}

export const SORT = {
    REVISE_DEFAULT: "REVISE_DEFAULT",
    REVISE_EASY: "REVISE_EASY",
    REVISE_HARD: "REVISE_HARD",
    TIME_DEFAULT: "TIME_DEFAULT",
    TIME_QUESTION: "TIME_QUESTION",
    TIME_QA: "TIME_QA",
};

export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function nowSecond() {
    return Math.floor(Date.now() / 1000);
}

export function formatMySQLDatetime(dateStr: string) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("vi-VI", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    })
        .format(date)
        .replace("lúc", "");
}

export const GREEN500_HEX = "#16a34a";
export const RED500_HEX = "#dc2626";

export interface CustomCSSProperties extends CSSProperties {
    WebkitTextSecurity?: string;
}

export const ROLE = {
    ADMIN: "Quản trị viên",
    MODERATOR: "Người kiểm duyệt",
    USER: "Người dùng"
}

export const REPORT_TARGET = {
    QUIZ: "Đề",
    COMMENT: "Bình luận",
    USER: "Người dùng"
}