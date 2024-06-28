import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RoomSocketData, getRemainingTime } from "../Utils";

export function Header(room: RoomSocketData) {
    return (
        <div>
            <div className="flex gap-3">
            <div className="flex-1">
                <Label>Tên phòng</Label>
                <Input readOnly className="shadow" defaultValue={room.Room.Name} />
            </div>
            <div className="flex-1">
                <Label>Đề thi</Label>
                <Input readOnly className="shadow" defaultValue={room.Room.Quiz.Name || ""} />
            </div>
            </div>


            <div className="mt-2 flex justify-between gap-3">
                <div className="text-sm w-full border shadow px-2 py-3 rounded-md">
                    Số người tham gia: {room.UserDatas.length}/{room.Room.Capacity}
                </div>
                <div className="text-sm w-full border shadow px-2 py-3 rounded-md">
                    Đếm ngược kết thúc:{" "}
                    {getRemainingTime(room.Room.EndTime.toString())}
                </div>
            </div>
        </div>
    );
}
