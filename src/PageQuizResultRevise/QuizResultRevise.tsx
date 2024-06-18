import { CardParentClass } from "@/Utils";
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
import { getOne } from "@/api/QuizDetail";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

export function QuizResultRevise() {
    const { QuizId } = useParams();
    const [Quiz, setQuiz] = useState<QuizDetail>();
    useEffect(() => {
        async function fetchData() {
            const data = await getOne(QuizId || "");
            setQuiz(data);
        }
        fetchData();
    }, []);

    if (!Quiz) return <div>Đang tải</div>;

    return (
            <Card>
                <CardHeader>
                    <Header {...Quiz} />
                </CardHeader>
                <CardContent>
                    <Content {...Quiz} />
                </CardContent>
                <CardFooter>
                    <Footer {...Quiz} />
                </CardFooter>
            </Card>
    );
}
