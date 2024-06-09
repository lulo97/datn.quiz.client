import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./PageApp/App";
import "./index.css";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CreateQuestion } from "./PageCreateQuestion/CreateQuestion";
import { Homepage } from "./PageHomepage/Homepage";
import { CreateQuiz } from "./PageCreateQuiz/CreateQuiz";
import { QuizDetail } from "./PageQuizDetail/QuizDetail";
import { QuizPlayTime } from "./PageQuizPlayTime/QuizPlayTime";
import { QuizPlayRevise } from "./PageQuizPlayRevise/QuizPlayRevise";
import { QuizResultRevise } from "./PageQuizResultRevise/QuizResultRevise";
import { QuizResultTime } from "./PageQuizResultTime/QuizResultTime";
import { AdminManagement } from "./PageAdminManagement/AdminManagement";
import { UserManagement } from "./PageUserManagement/UserManagement";
import { smi } from "./PageHomepage/Header/Header";
import { QuizSubject } from "./PageQuizSubject/QuizSubject";
import { ExportPdf } from "./PageExportPdf/ExportPdf";
import { ScanAnswerSheet } from "./PageScanAnswerSheet/ScanAnswerSheet";
import { ModeratorManagement } from "./PageModeratorManagement/ModeratorManagement";
import { CreateRoom } from "./PageCreateRoom/CreateRoom";
import { RoomWait } from "./PageRoomWait/RoomWait";
import { RoomMonitor } from "./PageRoomMonitor/RoomMonitor";
import { RoomJoin } from "./PageRoomJoin/RoomJoin";
import { RoomView } from "./PageRoomView/RoomView";
import { RoomRanking } from "./PageRoomRanking/RoomRanking";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { SignInPage } from "./PageSignIn/PageSignIn";
import { SignUpPage } from "./PageSignUp/PageSignUp";
import { AI } from "./PageAI/AI";

export const components = [
    CreateQuestion,
    Homepage,
    CreateQuiz,
    AdminManagement,
    UserManagement,
    ExportPdf,
    ScanAnswerSheet,
    ModeratorManagement,
    CreateRoom,
    RoomWait,
    RoomMonitor,
    RoomJoin,
    RoomView,
    RoomRanking,
    AI
];

const browser_routes = components.map((Component) => ({
    path: `/${Component.name.toLowerCase()}`, // Ensure path is lowercase
    element: <Component />, // Render component element
}));

browser_routes.push({
    path: "/",
    element: <App />,
});

browser_routes.push({
    path: "/QuizDetail/:QuizId",
    element: <QuizDetail />,
});

browser_routes.push({
    path: "/QuizPlayRevise/:QuizId/:QuestionNum/:Sort",
    element: <QuizPlayRevise />,
});

browser_routes.push({
    path: "/QuizResultRevise/:QuizId",
    element: <QuizResultRevise />,
});

browser_routes.push({
    path: "/QuizPlayTime/:QuizId/:Sort",
    element: <QuizPlayTime />,
});

browser_routes.push({
    path: "/QuizResultTime/:PlayId",
    element: <QuizResultTime />,
});

smi.forEach((ele) => {
    browser_routes.push({
        path: `/subject/${ele.UrlName}`,
        element: <QuizSubject SubjectId={ele.SubjectId} />, // Render Subject component with props
    });
});

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/sign-in/*", element: <SignInPage /> },
            { path: "/sign-up/*", element: <SignUpPage /> },
            {
                element: <DashboardLayout />,
                path: "/",
                children: browser_routes,
            },
        ],
    },
]);

//Because of localStorage in QuizPlayTime, it has to disable StrictMode to make it work
//Detail is in reducer action change answers
ReactDOM.createRoot(document.getElementById("root")!).render(
    //<React.StrictMode>
        <RouterProvider router={router} />
    //</React.StrictMode>
);
