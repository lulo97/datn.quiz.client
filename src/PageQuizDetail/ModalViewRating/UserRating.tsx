import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatMySQLDatetime } from "@/Utils";
import { RatingDetail } from "../Header/Right/Rate";
import { Stars } from "./Starts";

export function UserRating(rate: RatingDetail) {
    let BorderColor = "border-green-300";
    if (rate.Score < 1.6) {
        BorderColor = "border-red-300";
    }
    if (rate.Score <= 3.2 && rate.Score >= 1.6) {
        BorderColor = "border-yellow-300";
    }
    return (
        <div className={`border-2 ${BorderColor} rounded-lg p-3`}>
            <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={rate.User.ImageUrl} />
                        <AvatarFallback>{rate.User.Fullname}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <div className="font-bold">{rate.User.Fullname}</div>
                        <div className="text-sm text-gray-500">
                            {formatMySQLDatetime(rate.CreatedAt)}
                        </div>
                    </div>
                </div>
                <Stars score={rate.Score} />
            </div>
            <div className="mt-2 text-gray-700">{rate.Content}</div>
        </div>
    );
}