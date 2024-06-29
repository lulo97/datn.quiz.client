import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { QuizDetailProps } from "../../QuizDetail";

export function Information(props: QuizDetailProps) {
    const { quiz, currentUser } = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>
                        <Label>Lượt chơi: </Label>
                        {quiz.Attempts}
                    </li>
                    <li>
                        <Label>Người tạo: </Label>
                        {currentUser?.Username}
                    </li>
                    <li>
                        <Label>Ngày tạo: </Label>
                        {quiz.CreatedAt?.split(" ")[0]}
                    </li>
                    <li>
                        <Label>Số câu: </Label>
                        {quiz.Questions.length}
                    </li>
                    <li>
                        <Label>Loại đề: </Label>Nhiều đáp án
                    </li>
                    <li>
                        <Label>Trình độ: </Label>
                        {quiz.EducationLevel?.Name}
                    </li>
                    <li>
                        <Label>Chủ đề: </Label>
                        {quiz.Subject?.Name}
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
}
