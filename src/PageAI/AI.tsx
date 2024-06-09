import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { CardParentClass } from "@/Utils";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { useState } from "react";
import { InputAI } from "./Utils";

export function AI() {
    const [state, setState] = useState<InputAI>({
        Text: "",
        DifficultLevel: "",
        Type: "",
        Language: "",
        NumberOfQuestion: 0,
        Output: null
    });
    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <Header />
                </CardHeader>
                <CardContent>
                    <Content state={state} setState={setState} />
                </CardContent>
                <CardFooter>
                    <Footer state={state} setState={setState} />
                </CardFooter>
            </Card>
        </div>
    );
}
