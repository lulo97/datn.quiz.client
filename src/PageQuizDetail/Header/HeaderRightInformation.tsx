import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function HeaderRightInformation(quiz: QuizDetail) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>
                        <Label>Lượt chơi: </Label>{quiz.Name}
                    </li>
                    <li>
                        <Label>Người tạo: </Label>{quiz.UserId}
                    </li>
                    <li>
                        <Label>Ngày tạo: </Label>{quiz.CreatedAt}
                    </li>
                    <li>
                        <Label>Số câu: </Label>{quiz.Questions.length}
                    </li>
                    <li>
                        <Label>Loại đề: </Label>Nhiều đáp án
                    </li>
                    <li>
                        <Label>Trình độ: </Label>{quiz.EducationLevel?.Name}
                    </li>
                    <li>
                        <Label>Chủ đề: </Label>{quiz.Subject?.Name}
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
}
