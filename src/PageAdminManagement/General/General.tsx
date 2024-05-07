import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import Information from "./Information";
import QuizRankCollection from "./QuizRankCollection";
import UserRankCollection from "./UserRankCollection";

export default function General() {
    return (
        <div className="bg-gray-200 py-2 w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Tổng quan</CardTitle>
                </CardHeader>
                <CardContent>
                    <Information />

                    <div className="mt-5 flex justify-between gap-5">
                        <QuizRankCollection />
                        <UserRankCollection />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
