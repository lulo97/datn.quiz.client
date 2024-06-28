import { VITE_SERVER_PATH_SOCKET } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Content } from "./Content/Content";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { RoomDetail, RoomSocketData, UserData, isRoomTimeout } from "./Utils";
import { toast } from "react-toastify";

export function RoomMonitor() {
    const { RoomId } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState<RoomSocketData>();

    useEffect(() => {
        const socket = io(VITE_SERVER_PATH_SOCKET);

        const interval_id = setInterval(() => {
            socket.emit("GET_MONITOR", null);
        }, 1000);

        socket.on("SEND_MONITOR", (data: RoomSocketData[]) => {
            if (!data) return;
            const room = data.find((ele) => ele.Room.RoomId == RoomId);
            if (!room) return;
            setRoom(room);
        });

        socket.emit("CREATE_ROOM", { RoomId });

        socket.on("END_ROOM_SERVER_TO_CLIENT", (data) => {
            console.log(data)
            if ("error" in data) {
                toast.error("Có lỗi xảy ra!");
                console.log(data);
            } else {
                toast.success("Tạo thành công!");
                navigate(`/RoomRanking/${RoomId}`);
            }
        });

        return () => {
            clearInterval(interval_id);
            socket.disconnect();
        };
    }, []);

    if (!room) return <div>Đang tải phòng!</div>;
    if (isRoomTimeout(room.Room.EndTime.toString()))
        return <div>{room.Room.EndTime.toString()}</div>;

    return (
        <Card className="flex flex-col h-[90vh]">
            <CardHeader>
                <Header {...room} />
            </CardHeader>
            <div className="flex-1 bg-gray-200 mx-6 p-3 shadow mb-2 rounded-lg">
                <Content {...room} />
            </div>
            <CardFooter>
                <Footer {...room} />
            </CardFooter>
        </Card>
    );
}
