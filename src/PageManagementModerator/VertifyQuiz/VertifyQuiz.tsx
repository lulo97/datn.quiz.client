import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { useEffect, useState } from "react";
import { QuizForVertify } from "./Utils";
import { getAll } from "../API/VertifyQuiz";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";
import { getOneByClerkId } from "@/api/User";
import { getColumn } from "./Column";

export function VertifyQuiz() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [data, setData] = useState<QuizForVertify[]>([]);
    const [currentUser, setCurrentUser] = useState<User>();

    async function fetchDataUser() {
        try {
            if (!user) return;
            const ClerkId = user.id;
            const result = await getOneByClerkId(ClerkId);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi");
                console.log(result);
            } else {
                setCurrentUser(result);
            }
        } catch (error) {
            toast.error("Có lỗi");
            console.log(error);
        }
    }

    async function fetchDataQuizForVertify() {
        try {
            const result = await getAll();
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi");
                console.error(result);
            } else {
                setData(result);
            }
        } catch (error) {
            toast.error("Có lỗi");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDataUser();
        fetchDataQuizForVertify();
    }, []);

    if (!currentUser) return <div>Đang tải!</div>;

    return (
        <BaseScreen
            screen_title="Kiểm duyệt đề"
            columns={getColumn(currentUser, fetchDataQuizForVertify, navigate)}
            data={data}
            defaultPageSize={5}
        />
    );
}
