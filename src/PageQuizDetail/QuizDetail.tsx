import { CardParentClass } from "@/Utils";
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

export function QuizDetail() {
    const { QuizId } = useParams();
    const [quiz, setQuiz] = useState<IQuizDetail>();
    async function fetchData() {
        const data = await getOne(QuizId || "");
        setQuiz(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    if (quiz == undefined) return "Đang tải";

    return (
        <div className={CardParentClass}>
            <Card>
                <CardHeader>
                    <Header {...quiz} />
                </CardHeader>
                <CardContent>
                    <Content {...quiz} />
                </CardContent>
                <CardFooter>
                    <Footer {...quiz} />
                </CardFooter>
            </Card>
        </div>
    );
}
