import { getRandomAvatar, getDummyImage } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export function QuizCardSimple() {
    return (
        <div className="w-fit">
            <img
                className="object-contain rounded-lg"
                src={getDummyImage()}
            ></img>
            <div className="font-bold text-sm">Đề toán 12 chương Hàm số</div>
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={getRandomAvatar()} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label>Hoàng Lê Lương</Label>
            </div>
            <div className="text-[14.5px] text-gray-500">
                Lượt chơi: 12 | ★★★★☆ | 12/06/2024
            </div>
        </div>
    );
}
