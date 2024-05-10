import QuizCardRank from "@/PageAdminManagement/General/QuizCardRank";
import QuizCard from "../Content/QuizCard";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { getObjectId, getRandomAvatar, getRandomWallpaper } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ChevronRight, Star } from "lucide-react";

/*
Search by Quiz Name

Filter by:
- Rating
- Number of play
- IsVerified
- CreatedAt
- EducationLevel
- Number of Question
*/

const data = {
    Name: "Đề toán 12 chương Hàm số",
    User: {
        Fullname: "Hoàng Lê Lương",
        Username: "luongpysl",
        Email: "luongpysl@gmail.com",
        Biography: "Hello world",
        AvatarUrl: getRandomAvatar(),
    },
    ImageUrl: getRandomWallpaper(),
    Rating: 4.5,
    TotalPlayTime: 1000,
    IsVerified: true,
    CreatedAt: "20/04/2023",
    EducationLevel: "Lớp 12",
    NumberOfQuestion: 50,
    TotalTime: 45,
};

export default function SubjectCard() {
    return (
        <div className="flex flex-row gap-3">
            <img
                className="w-1/3 rounded-xl shadow object-contain"
                src={data.ImageUrl}
            ></img>
            <div className="w-full border rounded-lg py-1 px-2">
                <Label className="text-xl">{data.Name}</Label>
                <div className="flex gap-1 items-center">
                    <Avatar className="border">
                        <AvatarImage src={getRandomAvatar()} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>{data.User.Fullname}</div>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <div>
                            <Label>Trình độ học vấn: </Label>
                        </div>
                        <div>
                            <Label>Số câu hỏi: </Label>
                        </div>
                        <div>
                            <Label>Thời gian làm: </Label>
                        </div>
                        <div>
                            <Label>Đánh giá: </Label>
                        </div>
                    </div>
                    <div>
                        <div>{data.EducationLevel}</div>
                        <div>{data.NumberOfQuestion}</div>
                        <div>{data.TotalTime}m</div>
                        <div>
                            <div className="flex">
                                <Star fill="yellow" />
                                <Star fill="yellow" />
                                <Star fill="yellow" />
                                <Star fill="yellow" />
                                <Star />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <Label>Số lượt chơi: </Label>
                        {data.TotalPlayTime}
                    </div>
                    <div>
                        <Label>Đã kiểm duyệt: </Label>
                        {data.IsVerified == true ? "Rồi" : "Chưa"}
                    </div>
                    <div>
                        <Label>Ngày tạo: </Label>
                        {data.CreatedAt}
                    </div>
                </div>
            </div>
        </div>
    );
}
