import { User } from "@/InterfacesDatabase";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { MySQLDatetimeFormat } from "@/Utils";
import { getOne } from "@/api/User";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function HeaderRightInformation(quiz: QuizDetail) {
    const [currentUser, setCurrectUser] = useState<User>();

    useEffect(() => {
        async function fetchData() {
            setCurrectUser(await getOne(quiz.UserId));
        }
        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>
                        <Label>Lượt chơi: </Label>
                        {quiz.Name}
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
