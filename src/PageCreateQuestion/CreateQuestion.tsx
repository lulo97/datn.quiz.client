import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useReducer } from "react";
import { CardParentClass } from "@/Utils";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { inital_state } from "./Utils";
import { reducer } from "./Reducer";

export function CreateQuestion() {

    const [state, dispatch] = useReducer(reducer, inital_state);

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
