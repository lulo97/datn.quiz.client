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
import { redirect, useNavigate } from "react-router-dom";

export function ModalModeContentRight(quiz: QuizDetail) {
    const navigate = useNavigate();
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
                    <div className="w-full">
                        <Label>Số câu</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Số câu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="40">40</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Label>Lọc độ khó</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Mặc định" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="default">
                                        Mặc định
                                    </SelectItem>
                                    <SelectItem value="easy_first">
                                        Dễ nhất trước
                                    </SelectItem>
                                    <SelectItem value="hard_first">
                                        Khó nhất trước
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() =>
                        navigate(`/QuizPlayRevise/${quiz.QuizId}/${quiz.Questions.length}/easy`)
                    }
                    className="w-full"
                >
                    Ôn tập
                </Button>
            </CardFooter>
        </Card>
    );
}
