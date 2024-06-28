import { VITE_SERVER_PATH_SOCKET } from "@/Utils";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { RoomSocketData } from "../Utils";
import { toast } from "react-toastify";

export function Footer(room: RoomSocketData) {
    function handleEndRoom() {
        const socket = io(VITE_SERVER_PATH_SOCKET);
        socket.emit("END_ROOM", { RoomId: room.Room.RoomId });
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(room.Room.RoomId)
            .then(() => {
                toast.success("Copy!");
            })
            .catch(() => {
                toast.error("Lỗi copy!");
            });
    };
    return (
        <div className="flex justify-between items-center w-full">
            <div onClick={handleCopy} className="text-sm hover:underline cursor-pointer">
                <span className="font-semibold">Mã phòng:</span> {room.Room.RoomId}
            </div>
            <Button onClick={handleEndRoom}>Kết thúc</Button>
        </div>
    );
}
