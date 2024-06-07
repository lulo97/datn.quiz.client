import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { CardParentClass } from "@/Utils";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { useEffect, useReducer } from "react";
import { reducer } from "./Reducer";
import { ActionType, getInitalState } from "./Utils";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";

export function CreateQuiz() {
    const [state, dispatch] = useReducer(reducer, getInitalState());
    const { user } = useUser();

    useEffect(() => {
        async function initalUserId() {
            const ClerkId = user?.id || "";
            const currentUser: User = await getOneByClerkId(ClerkId)
            dispatch({
                type: ActionType.ChangeUserId,
                payload: currentUser.UserId,
            });
        }
        initalUserId();
        console.log(state)
    }, []);

    return (
        <div className={CardParentClass}>
            <Card className="mb-16">
                <CardHeader>
                    <Header state={state} dispatch={dispatch} />
                </CardHeader>
                <CardContent>
                    <Content state={state} dispatch={dispatch} />
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
            <div className="shadow-inner fixed p-2 left-0 right-0 bottom-0 bg-white">
                <Footer state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
