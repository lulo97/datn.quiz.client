import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizCardOverSimple } from "@/components/quiz_card/QuizCardOverSimple";
import { UserCardOverSimple } from "@/components/user_card/UserCardOverSimple";
import { ChevronRight } from "lucide-react";

export function Header() {
    return (
        <div className="flex flex-col gap-5">
            <Label>Tên phòng</Label>
            <Input placeholder="Phòng ABC..." />
            <div className="flex flex-row gap-6">
                <div className="w-1/3">
                    <QuizCardOverSimple />
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                    <div>
                        <Label>Thời gian bắt đầu: </Label>12:00:00 11/05/2024
                    </div>
                    <div>
                        <Label>Thời gian kết thúc: </Label>13:00:00 11/05/2024
                    </div>
                    <div>
                        <Label>Số người hiện tại: </Label>9/10
                    </div>
                    <div>
                        <Label>Đếm ngược vào thi: </Label>4p:32s
                    </div>
                    <div>
                        <Label>Đường dẫn: </Label>https://www.example.com
                    </div>
                </div>
            </div>
            <div className="rounded-lg flex border p-2">
                <div className="w-full flex justify-start gap-4">
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                    <UserCardOverSimple />
                </div>
                <div className="w-fit flex items-center">
                    <ChevronRight size={50} />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Button>Hủy phòng</Button>
                <Button>Bắt đầu thi</Button>
            </div>
        </div>
    );
}
