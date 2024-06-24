import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IRoomSocketData } from "../Utils";
import dayjs from "dayjs";

function getRemainingTime(endTime: string) {
    const endTimeObject = dayjs(endTime);
    const currentTime = dayjs();
    const diffMilliseconds = endTimeObject.diff(currentTime);
    const remainingSeconds = Math.floor(diffMilliseconds / 1000);
    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;
    return `${minute} phút ${second} giây`;
}

export function Header(roomSocketData: IRoomSocketData) {
    return (
        <div>
            <div>
                <Label>Tên phòng</Label>
                <Input
                    className="shadow"
                    defaultValue={roomSocketData.Room?.Name}
                />
            </div>

            <div className="mt-2 flex justify-between gap-5">
                <Label className="w-full border shadow p-4 rounded-xl">
                    Số người tham gia: {roomSocketData.PlayDatas.length}/
                    {roomSocketData.Room?.Capacity}
                </Label>
                <Label className="w-full border shadow p-4 rounded-xl">
                    Đếm ngược kết thúc:{" "}
                    {roomSocketData.Room
                        ? getRemainingTime(
                              roomSocketData.Room.EndTime.toString()
                          )
                        : ""}
                </Label>
            </div>
        </div>
    );
}
