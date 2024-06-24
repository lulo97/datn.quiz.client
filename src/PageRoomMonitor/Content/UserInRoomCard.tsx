import { getRandomAvatar } from "@/Utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { PlayData } from "../Utils";

export function UserInRoomCard(playdata: PlayData) {
    return (
        <div className="rounded-lg border shadow p-2 w-fit">
            <div className="flex items-center gap-2">
                <Avatar className="border">
                    <AvatarImage src={playdata.User.ImageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>
                            <Label>Câu:</Label>
                        </div>
                        <div>
                            <Label>Điểm:</Label>
                        </div>
                    </div>
                    <div>
                        <div>{playdata.QuestionIdx + 1}</div>
                        <div>x</div>
                    </div>
                </div>
            </div>
            <div className="text-gray-500 italic">{playdata.User.Username}</div>
        </div>
    );
}
