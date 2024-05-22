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
import { Type } from "@/InterfacesDatabase";

export function CreateQuestion() {
    const [state, dispatch] = useReducer(reducer, getInitalState());

    useEffect(() => {
        async function initalType() {
            const types: Type[] = await getAll();
            dispatch({
                type: ActionType.TypeChange,
                payload: types[0],
            });
        }
        initalType();
    }, []);

    useEffect(
        function () {
            //console.log(state)
        },
        [state]
    );

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
