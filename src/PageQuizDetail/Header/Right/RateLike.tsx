import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { QuizDetailProps } from "../../QuizDetail";
import { Like } from "./Like";
import { Rate } from "./Rate";
import { ModalRate } from "./ModalRate";
import { useState } from "react";

export interface RateLikeProps extends QuizDetailProps {
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RateLike(props: QuizDetailProps) {
    const [_render, setRender] = useState(true);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Đánh giá</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Like {...props} />
                <Rate {...props} />
                <ModalRate
                    quiz={props.quiz}
                    currentUser={props.currentUser}
                    setRender={setRender}
                />
            </CardContent>
        </Card>
    );
}
