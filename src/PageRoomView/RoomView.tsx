import { Card, CardHeader } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VITE_SERVER_PATH_SOCKET } from "@/Utils";
import { io } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";
import { RoomDetail, RoomSocketData } from "@/PageRoomMonitor/Utils";
import { Header } from "./Header/Header";
import { toast } from "react-toastify";

export function RoomView() {
    const { RoomId } = useParams();
    const [room, setRoom] = useState<RoomDetail>();
    const [hasJoined, setHasJoined] = useState(false);
    const { user } = useUser();

    async function joinRoom(room: RoomDetail) {
        const socket = io(VITE_SERVER_PATH_SOCKET);
        if (!user) return;
        const ClerkId = user.id;
        try {
            const CurrentUser = await getOneByClerkId(ClerkId);
            socket.emit("JOIN_ROOM", {
                RoomId: room.RoomId,
                CurrentUser: CurrentUser,
            });
            toast.success("Vào phòng thành công!");
        } catch (error) {
            console.error(error);
            toast.error("Vào phòng thất bại!");
        }
    }

    useEffect(() => {
        const socket = io(VITE_SERVER_PATH_SOCKET);

        socket.on("SEND_MONITOR", (data: RoomSocketData[]) => {
            if (!data) return;
            const room = data.find((ele) => ele.Room.RoomId == RoomId);
            if (!room) return;
            setRoom(room.Room);
            if (!hasJoined) {
                joinRoom(room.Room);
                setHasJoined(true);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [RoomId, hasJoined]);

    if (!room) return <div>Đang tải phòng thi!</div>;

    return (
        <Card>
            <CardHeader>
                <Header {...room} />
            </CardHeader>
        </Card>
    );
}
