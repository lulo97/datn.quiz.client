import { getRandomAvatar } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function NavbarAvatar() {
    return (
        <div className="bg-white w-full h-fit border shadow rounded-lg flex justify-center py-2">
            <Avatar>
                <AvatarImage src={getRandomAvatar()} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    );
}