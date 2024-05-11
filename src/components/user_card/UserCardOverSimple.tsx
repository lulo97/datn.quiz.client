import { getRandomAvatar } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserCardOverSimple() {
    return (
        <div className="w-fit flex flex-col items-center">
            <Avatar className="border">
                <AvatarImage src={getRandomAvatar()} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-bold text-[10px]">Hoàng Lê Lương</div>
        </div>
    );
}
