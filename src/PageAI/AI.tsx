import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { useState } from "react";
import { InputAI } from "./Utils";

export function AI() {
    const [state, setState] = useState<InputAI>({
        Text: "",
        DifficultLevel: null,
        Type: null,
        Language: null,
        NumberOfQuestion: 0,
        Output: [],
    });
    return (
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
    );
}
