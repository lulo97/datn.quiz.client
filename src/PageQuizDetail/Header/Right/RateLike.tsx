import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { QuizDetailProps } from "../../QuizDetail";
import { Like } from "./Like";
import { Rate } from "./Rate";
import { ModalRate } from "./ModalRate";
import { useState } from "react";

export interface RateLikeProps extends QuizDetailProps {
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RateLike(props: QuizDetailProps) {
    const [render, setRender] = useState(true);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Đánh giá</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Like {...props} />
                <Rate
                    quiz={props.quiz}
                    currentUser={props.currentUser}
                    render={render}
                    setRender={setRender}
                />
                <ModalRate
                    quiz={props.quiz}
                    currentUser={props.currentUser}
                    render={render}
                    setRender={setRender}
                />
            </CardContent>
        </Card>
    );
}
