import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import QuizCardRank from "./QuizCardRank";

export default function QuizRankCollection() {
    return (
        <div className="w-1/2">
            <Card className="shadow">
                <CardHeader>
                    <CardTitle>Xếp hạng đề</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <QuizCardRank />
                    <QuizCardRank />
                    <QuizCardRank />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="link">Xem thêm</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
