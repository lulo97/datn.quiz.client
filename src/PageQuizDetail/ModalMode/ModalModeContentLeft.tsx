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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";

export function ModalModeContentLeft(quiz: QuizDetail) {
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Chế độ tính giờ</CardTitle>
                <CardDescription>
                    Đề thi sẽ được đếm ngược và khi kết thúc dữ liệu chơi sẽ
                    được lưu lại.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Chế độ trộn</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Mặc định" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="sort-default">
                                Mặc định
                            </SelectItem>
                            <SelectItem value="sort-question">
                                Trộn câu hỏi
                            </SelectItem>
                            <SelectItem value="sort-question-answer">
                                Trộn câu hỏi và phương án
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Tính giờ</Button>
            </CardFooter>
        </Card>
    );
}
