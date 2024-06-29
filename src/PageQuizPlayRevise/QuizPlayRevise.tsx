import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Content } from "./Content/Content";
import { getOne } from "@/api/QuizDetail";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { reducer } from "./Reducer";
import { ActionType, getInitialState } from "./Utils";
import { QuizDetail } from "@/PageRoomMonitor/Utils";

export function QuizPlayRevise() {
    const { QuizId, QuestionNum, Sort } = useParams();
    const [state, dispatch] = useReducer(reducer, getInitialState());

    useEffect(() => {
        async function fetchData() {
            if (!QuizId) return;
            const Quiz: QuizDetail = await getOne(QuizId);
            dispatch({
                type: ActionType.Initial,
                payload: { Quiz: Quiz, QuestionNum: QuestionNum, Sort: Sort },
            });
        }
        fetchData();
    }, []);

    if (!state.Quiz) return <div>Đang tải</div>;

    return (
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
    );
}
