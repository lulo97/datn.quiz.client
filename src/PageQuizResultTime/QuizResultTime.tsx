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
import { PlayDetail } from "./Utils";
import { getOne } from "@/api/PlayDetail";

export function QuizResultTime() {
    const { PlayId } = useParams();
    const [data, setData] = useState<PlayDetail>()
    useEffect(() => {
        async function fetchData() {
            setData(await getOne(PlayId || ""))
        }
        fetchData()
    }, [])

    if (data == undefined) return <div>Đang tải</div>

    return (
            <Card>
                <CardHeader>
                    <Header {...data} />
                </CardHeader>
                <CardContent>
                    <Content {...data} />
                </CardContent>
                <CardFooter>
                    <Footer {...data} />
                </CardFooter>
            </Card>
    );
}
