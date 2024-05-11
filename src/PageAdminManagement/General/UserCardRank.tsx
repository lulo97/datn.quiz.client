import { getRandomAvatar } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export function UserCardRank() {
    return (
        <div className="py-1 px-3">
            <div className="flex gap-2 h-20">
                <div className="flex items-center justify-end">
                    <Avatar className="border">
                        <AvatarImage src={getRandomAvatar()} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <ul className="flex flex-col justify-center items-start">
                    <li>
                        <Label>Hoàng Lê Lương</Label>
                    </li>
                    <li>
                        <Label>Đề tạo: </Label> 1234
                    </li>
                    <li>
                        <Label>Đề làm: </Label> 1000
                    </li>
                </ul>
            </div>
        </div>
    );
}
