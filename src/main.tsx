import ReactDOM from "react-dom/client";
import "./index.css";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Homepage } from "./PageHomepage/Homepage";
import { QuizDetail } from "./PageQuizDetail/QuizDetail";
import { QuizPlayTime } from "./PageQuizPlayTime/QuizPlayTime";
import { QuizPlayRevise } from "./PageQuizPlayRevise/QuizPlayRevise";
import { QuizResultRevise } from "./PageQuizResultRevise/QuizResultRevise";
import { QuizResultTime } from "./PageQuizResultTime/QuizResultTime";
import { smi } from "./PageHomepage/Header/Header";
import { QuizSubject } from "./PageQuizSubject/QuizSubject";
import { ModeratorManagement } from "./PageModeratorManagement/ModeratorManagement";
import { RoomMonitor } from "./PageRoomMonitor/RoomMonitor";
import { RoomView } from "./PageRoomView/RoomView";
import { RoomRanking } from "./PageRoomRanking/RoomRanking";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { SignInPage } from "./PageSignIn/PageSignIn";
import { SignUpPage } from "./PageSignUp/PageSignUp";
import { QuizPlayTimeRoom } from "./PageQuizPlayTimeRoom/QuizPlayTimeRoom";
import { AdminManagement } from "./PageAdminManagement/AdminManagement";
import { UserManagement } from "./PageUserManagement/UserManagement";
import { CreateRoom } from "./PageCreateRoom/CreateRoom";
import { CreateQuestion } from "./PageCreateQuestion/CreateQuestion";
import { AI } from "./PageAI/AI";
import { CreateQuiz } from "./PageCreateQuiz/CreateQuiz";
import { ExportPdf } from "./PageExportPdf/ExportPdf";
import { ScanAnswerSheet } from "./PageScanAnswerSheet/ScanAnswerSheet";
import { RoomJoin } from "./PageRoomJoin/RoomJoin";

const browser_routes = [];

browser_routes.push({
    path: "/",
    element: <Homepage />,
});

browser_routes.push({
    path: "/ModeratorManagement",
    element: <ModeratorManagement />,
});

browser_routes.push({
    path: "/AdminManagement",
    element: <AdminManagement />,
});

browser_routes.push({
    path: "/UserManagement",
    element: <UserManagement />,
});

browser_routes.push({
    path: "/CreateQuestion",
    element: <CreateQuestion />,
});

browser_routes.push({
    path: "/AI",
    element: <AI />,
});

browser_routes.push({
    path: "/CreateQuiz",
    element: <CreateQuiz />,
});

browser_routes.push({
    path: "/CreateRoom",
    element: <CreateRoom />,
});

browser_routes.push({
    path: "/ExportPdf",
    element: <ExportPdf />,
});

browser_routes.push({
    path: "/ScanAnswerSheet",
    element: <ScanAnswerSheet />,
});

browser_routes.push({
    path: "/RoomJoin",
    element: <RoomJoin />,
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
    path: "/QuizPlayTime/:QuizId/:Sort/:RoomId",
    element: <QuizPlayTime />,
});

browser_routes.push({
    path: "/QuizPlayTime/:QuizId/:Sort",
    element: <QuizPlayTime />,
});

browser_routes.push({
    path: "/QuizResultTime/:PlayId",
    element: <QuizResultTime />,
});

browser_routes.push({
    path: "/RoomMonitor/:RoomId",
    element: <RoomMonitor />,
});

browser_routes.push({
    path: "/RoomView/:RoomId",
    element: <RoomView />,
});

browser_routes.push({
    path: "/QuizPlayTimeRoom/:RoomId",
    element: <QuizPlayTimeRoom />,
});

browser_routes.push({
    path: "/RoomRanking/:RoomId",
    element: <RoomRanking />,
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
