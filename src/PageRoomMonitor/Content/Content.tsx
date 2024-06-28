import { RoomSocketData } from "../Utils";
import { UserInRoomCard } from "./UserInRoomCard";

export function Content(room: RoomSocketData) {
    return (
        <div className="h-full">
            {room.UserDatas.length == 0 && <div>Chưa có người vào phòng!</div>}
            <div className="grid grid-cols-5 gap-3 h-full overflow-y-scroll">
                {room.UserDatas.map((ele, idx) => (
                    <UserInRoomCard 
                        key={ele.User.UserId} 
                        userdata={ele}
                        message={room.Messages[idx]}
                    />
                ))}
            </div>
        </div>
    );
}
