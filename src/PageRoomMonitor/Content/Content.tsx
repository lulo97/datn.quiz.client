import { IRoomSocketData } from "../Utils";
import { UserInRoomCard } from "./UserInRoomCard";

export function Content(roomSocketData: IRoomSocketData) {
    return (
        <div className="grid grid-cols-5 gap-3">
            {roomSocketData.PlayDatas.map((ele) => (
                <UserInRoomCard key={ele.User.UserId} {...ele} />
            ))}
        </div>
    );
}
