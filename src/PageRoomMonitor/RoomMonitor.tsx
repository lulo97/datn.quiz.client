import { CardParentClass, VITE_SERVER_PATH } from "@/Utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Content } from "./Content/Content";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOne } from "@/api/RoomDetail";
import { User } from "@/InterfacesDatabase";
import io from "socket.io-client";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";
import { RoomDetail } from "@/PageRoomView/Utils";
import { IRoomSocketData } from "./Utils";

export function RoomMonitor() {
    const { RoomId } = useParams();
    const { user } = useUser();
    const [room, setRoom] = useState<RoomDetail>();
    const [isRoomCreator, setIsRoomCreator] = useState(false);
    const [roomSocketData, setRoomSocketData] = useState<IRoomSocketData>();

    useEffect(() => {
        console.log("User is the room creator.");
    }, [isRoomCreator]);

    useEffect(() => {
        async function fetchData() {
            if (user?.id && room && !("error" in room)) {
                const ClerkId = user.id;
                const currentUser: User = await getOneByClerkId(ClerkId);
                if (currentUser.UserId == room.User.UserId) {
                    setIsRoomCreator(true);
                }
            }
        }
        fetchData();
    }, [room, user]); // Include user as a dependency to watch for changes

    useEffect(() => {
        async function fetchData() {
            if (!RoomId) return;
            const _room: RoomDetail = await getOne(RoomId);
            setRoom(_room);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (room) console.log("Get RoomDetail by RoomId success!", room);
    }, [room]);

    useEffect(() => {
        const socket = io(VITE_SERVER_PATH);

        socket.on("connect", () => {
            if (!room || "error" in room) {
                console.log("Room is not available or has an error.");
                return;
            }
            socket.emit("SetRoom", room);
        });

        // This event listener should be outside the interval
        socket.on("GetRoomSocketData", (payload: IRoomSocketData) => {
            if (!payload) return;
            setRoomSocketData(payload);
        });

        const intervalId = setInterval(() => {
            socket.emit("RequestRoomSocketData");
        }, 1000);

        return () => {
            clearInterval(intervalId);
            socket.disconnect();
        };
    }, [room]);

    if (!room) return <div>Không tìm thấy phòng trên CSDL!</div>;
    if ("error" in room) return <div>Lỗi tìm phòng thi!</div>;
    if (!isRoomCreator) return <div>Bạn không phải chủ phòng!</div>;
    if (!roomSocketData) return <div>Không tìm thấy phòng trên Socket!</div>;

    return (
        <Card>
            <CardHeader>
                <Header {...roomSocketData} />
            </CardHeader>
            <CardContent>
                <Content {...roomSocketData} />
            </CardContent>
            <CardFooter>
                <Footer {...roomSocketData} />
            </CardFooter>
        </Card>
    );
}
