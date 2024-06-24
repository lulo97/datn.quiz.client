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
import { getInitalState } from "./Utils";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";
import { ActionType } from "./Action";

export function CreateQuiz() {
    const [state, dispatch] = useReducer(reducer, getInitalState());
    const { user } = useUser();

    useEffect(() => {
        async function fetchUserData() {
            const ClerkId = user?.id;
            if (!ClerkId) return;
            const currentUser: User = await getOneByClerkId(ClerkId);
            dispatch({
                type: ActionType.SetCurrentUser,
                payload: currentUser,
            });
        }
        fetchUserData();
    }, []);

    return (
        <div className="w-full mb-16">
            <Card
                className={`flex flex-col px-6 py-2 gap-2`}
            >
                <div>
                    <Header state={state} dispatch={dispatch} />
                </div>
                <Content state={state} dispatch={dispatch} />
            </Card>
            <div className="shadow-inner fixed p-2 left-0 right-0 bottom-0 bg-white">
                <Footer state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
