import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useEffect, useReducer } from "react";
import { CardParentClass } from "@/Utils";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { ActionType, getInitalState } from "./Utils";
import { reducer } from "./Reducer";
import { getAll } from "@/PageAdminManagement/Type/UtilApi";
import { Type, User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";

interface CreateQuestionProps {
    is_in_quiz?: boolean;
}

export function CreateQuestion(props: CreateQuestionProps) {
    const { is_in_quiz } = props;

    const [state, dispatch] = useReducer(reducer, getInitalState());

    useEffect(() => {
        async function initalType() {
            const types: Type[] = await getAll();
            dispatch({
                type: ActionType.ChangeType,
                payload: types[0],
            });
        }

        async function initalUserId() {
            const { user } = useUser();
            const ClerkId = user?.id || "";
            const currentUser: User = await getOneByClerkId(ClerkId)
            dispatch({
                type: ActionType.ChangeUserId,
                payload: currentUser.UserId,
            });
        }
        
        initalType();
        initalUserId();
    }, []);

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
                    <Footer
                        state={state}
                        dispatch={dispatch}
                        is_in_quiz={is_in_quiz}
                    />
                </CardFooter>
            </Card>
        </div>
    );
}
