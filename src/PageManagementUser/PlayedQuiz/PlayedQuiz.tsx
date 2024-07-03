import { TableColumnsType } from "antd";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { PlayDetail } from "@/PageQuizResultTime/Utils";
import { useEffect, useState } from "react";
import { getAllByUserId } from "@/api/PlayDetail";
import { User } from "@/InterfacesDatabase";
import { toast } from "react-toastify";
import { getOneByClerkId } from "@/api/User";
import { useUser } from "@clerk/clerk-react";
import { toDDMMYYY } from "@/Utils";
import { X } from "lucide-react";
import { ModalRead } from "./ModalRead";
import { getTime } from "./Utils";

export function PlayedQuiz() {
    const [data, setData] = useState<PlayDetail[]>([]);
    const { user } = useUser();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        async function fetchUserData() {
            if (!user) return;
            try {
                const ClerkId = user.id;
                const result = await getOneByClerkId(ClerkId);
                if (!result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                    return;
                }
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setCurrentUser(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        async function fetchPlaysData() {
            if (!currentUser) return;
            try {
                const result = await getAllByUserId(currentUser.UserId);
                if (!result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                    return;
                }
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setData(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.error(error);
            }
        }
        fetchPlaysData();
    }, [currentUser]);

    const columns: TableColumnsType<PlayDetail> = [
        {
            title: "Tên đề",
            render: (_value, record, _item) => record.Quiz.Name,
        },
        {
            title: "Điểm",
            render: (_value, record, _item) => record.Score,
        },
        {
            title: "Thời gian (s)",
            render: (_value, record, _item) =>
                getTime(record.StartTime, record.SubmitTime),
        },
        {
            title: "Ngày làm đề",
            render: (_value, record, _item) =>
                toDDMMYYY(record.StartTime.toString()),
        },
        {
            title: "Phòng thi",
            render: (_value, record, _item) =>
                record.RoomId ? record.RoomId : "NULL",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_item, record, _index) => (
                <div className="flex justify-evenly">
                    <ModalRead {...record} />
                    <X className="text-red-500 hover:text-red-600 hover:cursor-pointer" />
                </div>
            ),
            width: "12%",
        },
    ];

    return (
        <BaseScreen
            screen_title="Đề đã làm"
            columns={columns}
            data={data}
            defaultPageSize={5}
        />
    );
}
