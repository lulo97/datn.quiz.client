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
import { Ranking } from "./Utils";
import { getOne } from "./API";
import { toast } from "react-toastify";

export function RoomRanking() {
    const { RoomId } = useParams();
    const [rankData, setRankData] = useState<Ranking>();

    useEffect(() => {
        async function fetchData() {
            if (!RoomId) return;
            const result = await getOne(RoomId);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Lỗi lấy dữ liệu!");
                console.log(result);
            } else {
                setRankData(result);
            }
        }
        fetchData();
    }, []);

    if (!rankData) return <div>Đang tải!</div>;

    return (
        <Card>
            <CardHeader>
                <Header {...rankData} />
            </CardHeader>
            <CardContent>
                <Content {...rankData} />
            </CardContent>
            <CardFooter>
                <Footer />
            </CardFooter>
        </Card>
    );
}
