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

export const components = [
    CreateQuestion,
    Homepage,
    CreateQuiz,
    QuizDetail,
    QuizPlayTime,
    QuizPlayRevise,
    QuizResultRevise,
    QuizResultTime,
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
];

const browser_routes = components.map((Component) => ({
    path: `/${Component.name.toLowerCase()}`, // Ensure path is lowercase
    element: <Component />, // Render component element
}));

browser_routes.push({
    path: "/",
    element: <App />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
