import { RoomDetail } from "@/PageRoomMonitor/Utils";
import { getDummyImage, BACKEND_URL } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

export function QuizCardDetail(room: RoomDetail) {
    return (
        <div className="flex flex-row gap-1">
            <img
                className="w-1/3 rounded-xl border bg-white shadow object-contain"
                src={BACKEND_URL + room.Quiz.ImageUrl || getDummyImage()}
            ></img>
            <div className="w-full border rounded-lg py-1 px-2 shadow bg-white">
                <Label className="text-xl">{room.Quiz.Name}</Label>
                <div className="flex gap-2 items-center">
                    <Avatar className="border">
                        <AvatarImage src={room.User.ImageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>{room.User.Fullname}</div>
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
                        <div>{room.Quiz.EducationLevel?.Name}</div>
                        <div>{room.Quiz.Questions.length}</div>
                        <div>{room.Quiz.Subject?.Name}</div>
                        <div>{room.Quiz.Time?.Value} phút</div>
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
                        <div>{100}</div>
                        <div>
                            {room.Quiz.UserVertify ? "Đã kiểm duyệt" : "NULL"}
                        </div>
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
