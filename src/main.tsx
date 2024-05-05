import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './PageApp/App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateQuestion from './PageCreateQuestion/CreateQuestion';
import Homepage from './PageHomepage/Homepage';
import CreateQuiz from './PageCreateQuiz/CreateQuiz';
import QuizDetail from './PageQuizDetail/QuizDetail';
import QuizPlayTime from './PageQuizPlayTime/QuizPlayTime';
import QuizPlayRevise from './PageQuizPlayRevise/QuizPlayRevise';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/createquestion",
    element: <CreateQuestion />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/createquiz",
    element: <CreateQuiz />,
  },
  {
    path: "/quizdetail",
    element: <QuizDetail />,
  },
  {
    path: "/quizplaytime",
    element: <QuizPlayTime />,
  },
  {
    path: "/quizplayrevise",
    element: <QuizPlayRevise />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
