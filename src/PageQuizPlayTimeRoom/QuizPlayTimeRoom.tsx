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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message, QuizPlayTimeRoomProps } from "./Utils";
import { getOneByClerkId } from "@/api/User";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { io } from "socket.io-client";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { toast } from "react-toastify";

export function QuizPlayTimeRoom() {
    const { RoomId } = useParams();
    const { user } = useUser();
    const [state, setState] = useState<Message>();
    const [quiz, setQuiz] = useState<QuizDetail>();
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(VITE_SERVER_PATH_SOCKET);

        async function fetchData() {
            if (!user) return;
            const ClerkId = user.id;
            const currentUser: User = await getOneByClerkId(ClerkId);

            // Once currentUser is fetched, set up interval
            const interval_id = setInterval(() => {
                if (!currentUser || !RoomId) return;
                socket.emit("REQUEST_MESSAGE_CLIENT_TO_SERVER", {
                    RoomId: RoomId,
                    UserId: currentUser.UserId,
                });
            }, 1000);

            // Clean up interval and disconnect socket on unmount or when currentUser changes
            return () => {
                clearInterval(interval_id);
                socket.disconnect();
            };
        }

        fetchData();

        socket.on("SEND_MONITOR", (data: any) => {
            const RoomData = data.find((ele: any) => ele.Room.RoomId == RoomId);
            if (!RoomData) {
                toast.warning("Phòng không tồn tại!");
                return;
            }
            const { Room } = RoomData;
            setQuiz(Room.Quiz);
        });

        socket.on("SEND_MESSAGE_SERVER_TO_CLIENT", (data) => {
            setState(data);
            if (data.EndTimePlay != -1) {
                navigate(`/phong-thi-xep-hang/${RoomId}`);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [user, RoomId]);

    useEffect(() => {
        const socket = io(VITE_SERVER_PATH_SOCKET);

        if (state) {
            socket.emit("SEND_MESSAGE_CLIENT_TO_SERVER", state);
        }

        return () => {
            socket.disconnect();
        };
    }, [state]);

    if (!state) return <div>Chưa vào phòng thi!</div>;
    if (!quiz) return <div>Đang tải đề thi!</div>;

    const props: QuizPlayTimeRoomProps = {
        state: state,
        setState: setState,
        quiz: quiz,
    };

    return (
        <Card>
            <CardHeader>
                <Header {...props} />
            </CardHeader>
            <CardContent>
                <Content {...props} />
            </CardContent>
            <CardFooter>
                <Footer {...props} />
            </CardFooter>
        </Card>
    );
}
