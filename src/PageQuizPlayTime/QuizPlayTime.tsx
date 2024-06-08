import { CardParentClass, nowSecond } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Content } from "./Content/Content";

import { useReducer, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reducer } from "./Reducer";
import {
    ActionType,
    LocalPlaying,
    PlayTime,
    getInitialState,
    getRecords,
} from "./Utils";
import { getOne } from "@/api/QuizDetail";
import { getOneByClerkId } from "@/api/User";
import { createOne as createOnePlay } from "./Api/Play";
import { createOne as createOneSelectedAnswer } from "./Api/SelectedAnswer";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

export function QuizPlayTime() {
    const { QuizId, Sort } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const SubmitPath = `/QuizResultTime/TodoAddPlayIdToThis`;
    const [temp_state, dispatch] = useReducer(reducer, getInitialState());
    //LocalStorage does change but using useState to render that change
    const [state, setState] = useState<PlayTime>();

    function handleLocalStorageChange() {
        const storedData = localStorage.getItem(LocalPlaying);
        if (storedData) {
            const localPlaying: PlayTime = JSON.parse(storedData);
            if (localPlaying) {
                setState(localPlaying);
            }
        }
    }

    // Listen for changes in localStorage
    window.addEventListener("storage", handleLocalStorageChange);

    useEffect(() => {
        async function fetchData() {
            const data = await getOne(QuizId || "");
            //Todo
            dispatch({ type: ActionType.ChangeQuiz, payload: data });
            dispatch({ type: ActionType.Sort, payload: Sort });
            dispatch({ type: ActionType.InitialResponse, payload: null });
        }
        fetchData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const _LocalPlaying = localStorage.getItem(LocalPlaying);
            if (_LocalPlaying != null) {
                dispatch({
                    type: ActionType.ChangeCurrentTime,
                    payload: nowSecond(),
                });
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch]);

    async function CreatePlay() {
        try {
            const ClerkId = user?.id || "";
            const currentUser = await getOneByClerkId(ClerkId);
            const data = getRecords(currentUser.UserId);

            if (data != undefined) {
                const { pr, sa } = data;
                await createOnePlay(pr);
                for (const answer of sa) {
                    await createOneSelectedAnswer(answer);
                }
            }

            localStorage.clear();
            toast.success("Hết giờ!");
            navigate(SubmitPath);
        } catch (error) {
            console.error(error);
            toast.warning("Nộp bài thất bại!");
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem(LocalPlaying);
        if (storedData != null) {
            const localPlaying: PlayTime = JSON.parse(storedData);
            console.log(localPlaying.CurrentTime - localPlaying.StartTime);
            if (localPlaying.EndTime - localPlaying.CurrentTime <= 0) {
                CreatePlay();
            }
        }
        return () => {
            // Cleanup function if needed
        };
    }, [state?.CurrentTime]);

    if (!state) return <div>Đang tải</div>;

    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <Header state={state} dispatch={dispatch} />
                </CardHeader>
                <CardContent>
                    <Content state={state} dispatch={dispatch} />
                </CardContent>
                <CardFooter>
                    <Footer state={state} dispatch={dispatch} />
                </CardFooter>
            </Card>
        </div>
    );
}
