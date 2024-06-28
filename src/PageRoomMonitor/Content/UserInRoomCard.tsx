import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/PageQuizPlayTimeRoom/Utils";
import { UserData } from "../Utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { EllipsisVertical, Menu } from "lucide-react";
import { numberToDateStringHSM } from "@/PageCreateRoom/Utils";

interface Props {
    userdata: UserData;
    message: Message;
}

export function UserInRoomCard(props: Props) {
    const { userdata, message } = props;
    return (
        <div className="rounded-lg border bg-white p-2 w-fit h-fit">
            <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger>
                            <EllipsisVertical />
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="font-semibold">Tên:</div>
                                <div>{userdata.User.Fullname}</div>
                                <div className="font-semibold">Vào phòng:</div>
                                <div>
                                    {numberToDateStringHSM(
                                        userdata.StartTimeJoin
                                    )}
                                </div>
                                <div className="font-semibold">Rời phòng:</div>
                                <div>
                                    {numberToDateStringHSM(
                                        userdata.EndTimeJoin
                                    )}
                                </div>
                                <div className="font-semibold">Vào thi:</div>
                                <div>
                                    {numberToDateStringHSM(
                                        message.StartTimePlay
                                    )}
                                </div>
                                <div className="font-semibold">Nộp bài:</div>
                                <div>
                                    {numberToDateStringHSM(message.EndTimePlay)}
                                </div>
                                <div className="font-semibold">Câu hiện tại:</div>
                                <div>{message.QuestionIdx + 1}</div>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Avatar className="border">
                    <AvatarImage src={userdata.User.ImageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                    <div>Câu: {message.QuestionIdx + 1}</div>
                    <div className="font-semibold">
                        {userdata.User.Username}
                    </div>
                </div>
            </div>
        </div>
    );
}
