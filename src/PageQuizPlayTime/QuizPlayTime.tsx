import { nowSecond } from "@/Utils";
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
import { getRecords } from "./Utils";
import { getOne } from "@/api/QuizDetail";
import { getOneByClerkId } from "@/api/User";
import { createOne as createOnePlay } from "./Api/Play";
import { createOne as createOneSelectedAnswer } from "./Api/SelectedAnswer";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import { getInitalState } from "@/PageCreateQuiz/Utils";
import { ActionTypeState, reducerState } from "./ReducerState";
import {
    ActionTypeLS,
    dispatchLS,
    getDataFromStorage,
} from "./ReducerLocalStorage";
import { User } from "@/InterfacesDatabase";

export function QuizPlayTime() {
    const { QuizId, Sort, RoomId } = useParams();
    const { user } = useUser();
    const [currentUser, setCurrectUser] = useState<User>();
    const navigate = useNavigate();

    const [state, dispatchState] = useReducer(reducerState, getInitalState());
    const [forceRender, setForceRender] = useState(false);

    //LocalStorage does change but using useState to render that change
    // Listen for changes in localStorage
    window.addEventListener("storage", () => {
        const localPlaying = getDataFromStorage();
        if (localPlaying) {
            setForceRender(!forceRender);
        }
    });

    useEffect(() => {
        async function fetchData() {
            const ClerkId = user?.id || "";
            const currentUser = await getOneByClerkId(ClerkId);
            setCurrectUser(currentUser);
        }
        fetchData();
    }, []);

    useEffect(() => {
        //First fetch the quiz than inital localstorage
        async function fetchData() {
            if (!currentUser) {
                console.log("currentUser = ", currentUser);
                return;
            }
            const quiz_detail = await getOne(QuizId || "");
            dispatchState({
                type: ActionTypeState.SetQuiz,
                payload: { Sort, quiz_detail },
            });
            dispatchLS(quiz_detail, {
                type: ActionTypeLS.SetData,
                payload: {
                    RoomId: RoomId,
                    User: currentUser,
                },
            });
        }
        fetchData();
    }, [currentUser]);

    useEffect(() => {
        if (!state.QuizId) return;

        const intervalId1 = setInterval(() => {
            const localPlay = getDataFromStorage();
            if (!localPlay) return;
            if (localPlay.EndTime <= localPlay.CurrentTime) {
                //CreatePlayByTimeOut();
            }
        }, 1000);

        const intervalId2 = setInterval(() => {
            const localPlay = getDataFromStorage();
            if (!localPlay) return;
            dispatchLS(state, {
                type: ActionTypeLS.ChangeTime,
                payload: nowSecond(),
            });
        }, 1000);

        return () => {
            clearInterval(intervalId1);
            clearInterval(intervalId2);
        };
    }, [state]);

    async function CreatePlayByTimeOut() {
        try {
            if (!currentUser) return;
            const data = getRecords(state, currentUser.UserId);

            if (data == undefined) return;

            const { PlayRecordInsert, SelectedAnswersInsert } = data;
            await createOnePlay(PlayRecordInsert);
            for (const answer of SelectedAnswersInsert) {
                await createOneSelectedAnswer(answer);
                const SubmitPath = `/QuizResultTime/${PlayRecordInsert.PlayId}`;
                localStorage.clear();
                toast.success("Hết giờ!");
                navigate(SubmitPath);
            }
        } catch (error) {
            console.error(error);
            toast.warning("Nộp bài thất bại!");
        }
    }

    const localPlay = getDataFromStorage();

    if (state.Questions.length == 0 || !localPlay) return <div>Đang tải</div>;

    const props = {
        state: state,
        localPlay: localPlay,
        dispatchLS: dispatchLS,
    };

    return (
        <Card>
            <CardHeader>
                <Header {...props} />
            </CardHeader>
            <CardContent>
                <Content {...props} />
            </CardContent>
            <CardFooter>
                <Footer {...props} />
            </CardFooter>
        </Card>
    );
}
