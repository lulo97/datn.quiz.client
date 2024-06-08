import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SelectQuestionNumber } from "./SelectQuestionNumber";
import { SortEasyHard } from "./SortEasyHard";
import { useState } from "react";
import { SORT } from "@/Utils";

export function ModalModeContentRight(quiz: QuizDetail) {
    const navigate = useNavigate();
    const [QuestionNumber, setQuestionNumber] = useState(quiz.Questions.length);
    const [Sort, setSort] = useState(SORT.REVISE_EASY);
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Chế độ ôn tập</CardTitle>
                <CardDescription>
                    Phục vụ mục đích ôn tập kiến thức, có thể tự do lựa chọn số
                    câu và độ khó. Dữ liệu chơi sẽ không được lưu lại.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full gap-3">
                    <SelectQuestionNumber
                        setQuestionNumber={setQuestionNumber}
                        TotalQuestionNumber={quiz.Questions.length}
                    />
                    <SortEasyHard setSort={setSort} />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() =>
                        navigate(
                            `/QuizPlayRevise/${quiz.QuizId}/${QuestionNumber}/${Sort}`
                        )
                    }
                    className="w-full"
                >
                    Ôn tập
                </Button>
            </CardFooter>
        </Card>
    );
}
