import { Card, CardHeader } from "@/components/ui/card";
import { Header } from "./Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoomDetail } from "./Utils";
import { getOne as getOneRoomDetail } from "@/api/RoomDetail";
import { VITE_SERVER_PATH } from "@/Utils";
import { io } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";

export function RoomView() {
    const { RoomId } = useParams();
    const { user } = useUser();
    const [room, setRoom] = useState<RoomDetail>();
    useEffect(() => {
        async function fetchData() {
            if (RoomId == undefined) return;
            const _room: RoomDetail = await getOneRoomDetail(RoomId);
            setRoom(_room);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const socket = io(VITE_SERVER_PATH);

        socket.on("connect", async () => {
            if (user) {
                const currectUser: User = await getOneByClerkId(user.id);
                socket.emit("AddUser", currectUser);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    if (!room) return <div>Đang tải!</div>;

    return (
        <Card>
            <CardHeader>
                <Header {...room} />
            </CardHeader>
        </Card>
    );
}
