import React from "react";
import ReactDOM from "react-dom/client";
import App from "./PageApp/App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateQuestion from "./PageCreateQuestion/CreateQuestion";
import Homepage from "./PageHomepage/Homepage";
import CreateQuiz from "./PageCreateQuiz/CreateQuiz";
import QuizDetail from "./PageQuizDetail/QuizDetail";
import QuizPlayTime from "./PageQuizPlayTime/QuizPlayTime";
import QuizPlayRevise from "./PageQuizPlayRevise/QuizPlayRevise";
import QuizResultRevise from "./PageQuizResultRevise/QuizResultRevise";
import QuizResultTime from "./PageQuizResultTime/QuizResultTime";
import AdminManagement from "./PageAdmin/AdminManagement";

export const components = [
    CreateQuestion,
    Homepage,
    CreateQuiz,
    QuizDetail,
    QuizPlayTime,
    QuizPlayRevise,
    QuizResultRevise,
    QuizResultTime,
    AdminManagement
];

const browser_routes = components.map((Component) => ({
    path: `/${Component.name.toLowerCase()}`, // Ensure path is lowercase
    element: <Component />, // Render component element
}));

browser_routes.push({
    path: "/",
    element: <App />,
});

const router = createBrowserRouter(browser_routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
