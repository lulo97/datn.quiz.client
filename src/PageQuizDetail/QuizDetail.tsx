import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuizDetail as IQuizDetail } from "@/PageCreateQuiz/Utils";
import { getOne } from "@/api/QuizDetail";
import { getOneByClerkId } from "@/api/User";
import { toast } from "react-toastify";
import { User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";

export interface QuizDetailProps {
    quiz: IQuizDetail;
    currentUser: User;
}

export function QuizDetail() {
    const { QuizId } = useParams();
    const [quiz, setQuiz] = useState<IQuizDetail>();
    const { user } = useUser();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        async function fetchDataUser() {
            try {
                if (!user) return;
                const ClerkId = user.id;
                setCurrentUser(await getOneByClerkId(ClerkId));
            } catch (error) {
                toast.error("Có lỗi!");
                console.error(error);
            }
        }
        fetchDataUser();
    }, []);

    useEffect(() => {
        async function fetchDataQuiz() {
            try {
                if (!QuizId) return;
                const result = await getOne(QuizId);
                if (!result || "error" in result) {
                    toast.error("Có lỗi");
                    console.log(result);
                } else {
                    setQuiz(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.error(error);
            }
        }
        fetchDataQuiz();
    }, []);

    if (!quiz || !currentUser) return "Đang tải";
    const props = { quiz, currentUser };
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
