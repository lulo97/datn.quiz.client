import { getRandomAvatar, getDummyImage } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

const data = {
    Name: "Đề toán 12 chương Hàm số",
    User: {
        Fullname: "Hoàng Lê Lương",
        Username: "luongpysl",
        Email: "luongpysl@gmail.com",
        Biography: "Hello world",
        AvatarUrl: getRandomAvatar(),
    },
    ImageUrl: getDummyImage(),
    Rating: 4.5,
    TotalPlayTime: 1000,
    IsVerified: true,
    VerifiedAt: "12/05/2023",
    CreatedAt: "20/04/2023",
    UpdatedAt: "09/06/2023",
    EducationLevel: "Lớp 12",
    NumberOfQuestion: 50,
    TotalTime: 45,
    Subject: "Toán học",
};

export function QuizCardDetail() {
    return (
        <div className="flex flex-row gap-3">
            <img
                className="w-1/3 rounded-xl border bg-white shadow object-contain"
                src={data.ImageUrl}
            ></img>
            <div className="w-full border rounded-lg py-1 px-2 shadow bg-white">
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
                            <Label>Chủ đề: </Label>
                        </div>
                        <div>
                            <Label>Thời gian làm: </Label>
                        </div>
                    </div>
                    <div>
                        <div>{data.EducationLevel}</div>
                        <div>{data.NumberOfQuestion}</div>
                        <div>{data.Subject}</div>
                        <div>{data.TotalTime}m</div>
                    </div>
                    <div className="ml-8">
                        <div>
                            <Label>Số lượt chơi: </Label>
                        </div>
                        <div>
                            <Label>Đã kiểm duyệt: </Label>
                        </div>
                        <div>
                            <Label>Ngày tạo: </Label>24/4/2024
                        </div>
                        <div>
                            <Label>Đánh giá: </Label>
                        </div>
                    </div>
                    <div>
                        <div>{data.TotalPlayTime}</div>
                        <div>{data.IsVerified == true ? "Rồi" : "Chưa"}</div>
                        <div>
                            <Label>Ngày sửa: </Label>12/5/2024
                        </div>
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
            </div>
        </div>
    );
}
