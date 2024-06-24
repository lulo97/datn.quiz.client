import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Information } from "./Information";
import { QuizRankCollection } from "./QuizRankCollection";
import { UserRankCollection } from "./UserRankCollection";
import { useEffect, useState } from "react";
import { Admin } from "./Utils";
import { getOne } from "./API";
import { toast } from "react-toastify";

export function General() {
    const [data, setData] = useState<Admin>();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getOne();
                if ("error" in result) {
                    console.log(result);
                } else {
                    setData(result);
                }
            } catch (error) {
                toast.error("Lỗi hệ thống!");
                console.log(error);
            }
        }
        fetchData();
    }, []);

    if (!data) return <div>Đang tải!</div>

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tổng quan</CardTitle>
            </CardHeader>
            <CardContent>
                <Information {...data} />

                <div className="mt-5 flex justify-between gap-5">
                    <QuizRankCollection />
                    <UserRankCollection />
                </div>
            </CardContent>
        </Card>
    );
}
