import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./PageHomepage/Homepage";
import { QuizDetail } from "./PageQuizDetail/QuizDetail";
import { QuizPlayTime } from "./PageQuizPlayTime/QuizPlayTime";
import { QuizPlayRevise } from "./PageQuizPlayRevise/QuizPlayRevise";
import { QuizResultRevise } from "./PageQuizResultRevise/QuizResultRevise";
import { QuizResultTime } from "./PageQuizResultTime/QuizResultTime";
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
import { smi } from "./layouts/Header/Header";

const browser_routes = [];

browser_routes.push({
    path: "/",
    element: <Homepage />,
});

browser_routes.push({
    path: "/quan-ly-kiem-duyet",
    element: <ModeratorManagement />,
});

browser_routes.push({
    path: "/quan-tri",
    element: <AdminManagement />,
});

browser_routes.push({
    path: "/trang-ca-nhan",
    element: <UserManagement />,
});

browser_routes.push({
    path: "/tao-cau-hoi",
    element: <CreateQuestion />,
});

browser_routes.push({
    path: "/tao-cau-hoi-chatgpt",
    element: <AI />,
});

browser_routes.push({
    path: "/tao-de-thi",
    element: <CreateQuiz />,
});

browser_routes.push({
    path: "/tao-phong",
    element: <CreateRoom />,
});

browser_routes.push({
    path: "/xuat-de-thi",
    element: <ExportPdf />,
});

browser_routes.push({
    path: "/quet-to-dap-an",
    element: <ScanAnswerSheet />,
});

browser_routes.push({
    path: "/vao-phong",
    element: <RoomJoin />,
});

browser_routes.push({
    path: "/de-thi/:QuizId",
    element: <QuizDetail />,
});

browser_routes.push({
    path: "/lam-de-on-tap/:QuizId/:QuestionNum/:Sort",
    element: <QuizPlayRevise />,
});

browser_routes.push({
    path: "/lam-de-on-tap-ket-qua/:QuizId",
    element: <QuizResultRevise />,
});

browser_routes.push({
    path: "/lam-de-tinh-gio/:QuizId/:Sort/:RoomId",
    element: <QuizPlayTime />,
});

browser_routes.push({
    path: "/lam-de-tinh-gio/:QuizId/:Sort",
    element: <QuizPlayTime />,
});

browser_routes.push({
    path: "/lam-de-tinh-gio-ket-qua/:PlayId",
    element: <QuizResultTime />,
});

browser_routes.push({
    path: "/quan-tri-phong/:RoomId",
    element: <RoomMonitor />,
});

browser_routes.push({
    path: "/phong-thi-xem/:RoomId",
    element: <RoomView />,
});

browser_routes.push({
    path: "/phong-thi-lam-de/:RoomId",
    element: <QuizPlayTimeRoom />,
});

browser_routes.push({
    path: "/phong-thi-xep-hang/:RoomId",
    element: <RoomRanking />,
});

smi.forEach((ele) => {
    browser_routes.push({
        path: `/chu-de/${ele.UrlName}`,
        element: <QuizSubject SubjectId={ele.SubjectId} />, // Render Subject component with props
    });
});

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/dang-nhap/*", element: <SignInPage /> },
            { path: "/dang-ky/*", element: <SignUpPage /> },
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
