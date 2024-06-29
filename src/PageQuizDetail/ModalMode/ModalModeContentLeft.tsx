import { SORT } from "@/Utils";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizDetailProps } from "../QuizDetail";

export function ModalModeContentLeft(props: QuizDetailProps) {
    const { quiz } = props;
    const navigate = useNavigate();
    const [sort, setSort] = useState(SORT.TIME_DEFAULT);
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
                <Select onValueChange={(value) => setSort(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Mặc định" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={SORT.TIME_DEFAULT}>
                                Mặc định
                            </SelectItem>
                            <SelectItem value={SORT.TIME_QUESTION}>
                                Trộn câu hỏi
                            </SelectItem>
                            <SelectItem value={SORT.TIME_QA}>
                                Trộn câu hỏi và phương án
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() =>
                        navigate(`/lam-de-tinh-gio/${quiz.QuizId}/${sort}`)
                    }
                    className="w-full"
                >
                    Tính giờ
                </Button>
            </CardFooter>
        </Card>
    );
}
