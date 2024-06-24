import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useEffect, useReducer } from "react";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import {
    ActionType,
    CreateQuestionProps,
    InterfaceFromOutside,
    QuestionDetail,
    getInitalState,
} from "./Utils";
import { reducer } from "./Reducer";
import { getAll } from "@/PageAdminManagement/Type/UtilApi";
import { Type, User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";

export function CreateQuestion(props: InterfaceFromOutside) {
    const {
        IsUpdate,
        DataFromUpdate,
        IsInModal,
        QuestionFromAI,
        FetchDataAfterUpdate,
    } = props;
    let initialState = getInitalState();
    if (QuestionFromAI) {
        initialState.Language = QuestionFromAI.Language;
        initialState.Type = QuestionFromAI.Type;
        initialState.DifficultLevel = QuestionFromAI.DifficultLevel;
        initialState.Content = QuestionFromAI.Content;
        initialState.ExplainAllow = true;
        initialState.Explanation = QuestionFromAI.Explanation;
        initialState.Answers = QuestionFromAI.Answers.map((ele) => ({
            AnswerId: ele.AnswerId,
            QuestionId: initialState.QuestionId,
            Content: ele.Content,
            IsCorrect: ele.IsCorrect,
        }));
    }
    if (DataFromUpdate) {
        initialState = DataFromUpdate;
        if (initialState.Explanation) {
            initialState.ExplainAllow = true;
        } else {
            initialState.ExplainAllow = false;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user } = useUser();

    useEffect(() => {
        async function initalType() {
            const types: Type[] = await getAll();
            dispatch({
                type: ActionType.ChangeType,
                payload: types[0],
            });
        }
        initalType();
    }, []);

    useEffect(() => {
        async function initalUserId() {
            const ClerkId = user?.id || "";
            const currentUser: User = await getOneByClerkId(ClerkId);
            dispatch({
                type: ActionType.ChangeUserId,
                payload: currentUser.UserId,
            });
        }
        initalUserId();
    }, []);

    const data: CreateQuestionProps = {
        IsUpdate,
        DataFromUpdate,
        IsInModal,
        QuestionFromAI,
        FetchDataAfterUpdate,
        state,
        dispatch
    }

    if (state.UserId == "") return <div>Đang tải!</div>;

    return (
        <Card>
            <CardHeader>
                <Header state={state} dispatch={dispatch} />
            </CardHeader>
            <CardContent>
                <Content state={state} dispatch={dispatch} />
            </CardContent>
            <CardFooter>
                <Footer {...data} />
            </CardFooter>
        </Card>
    );
}
