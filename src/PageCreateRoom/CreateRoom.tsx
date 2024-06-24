import { Card, CardHeader } from "@/components/ui/card";
import { Header } from "./Header/Header";
import { useEffect, useReducer } from "react";
import { getInitalState } from "./Utils";
import { reducer } from "./Reducer";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";
import { ActionType } from "./Action";

export function CreateRoom() {
    const { user } = useUser();
    const [state, dispatch] = useReducer(reducer, getInitalState());

    useEffect(() => {
        async function fetchData() {
            if (user) {
                const ClerkId = user.id;
                const currentUser: User = await getOneByClerkId(ClerkId);
                dispatch({
                    type: ActionType.ChangeUserId,
                    payload: currentUser.UserId,
                });
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        //Update Endtime everytime select Quiz
        if (state.StartQuizTimeHMS == null) return;
        dispatch({
            type: ActionType.ChangeStartQuizTimeHMS,
            payload: state.StartQuizTimeHMS,
        });
    }, [state.Quiz]);

    return (
        <Card>
            <CardHeader>
                <Header state={state} dispatch={dispatch} />
            </CardHeader>
        </Card>
    );
}
