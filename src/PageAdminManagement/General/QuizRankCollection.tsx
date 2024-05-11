import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { QuizCardCompact } from "@/components/quiz_card/QuizCardCompact";

export function QuizRankCollection() {
    return (
        <Card className="w-1/2 min-h-full flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Xếp hạng đề</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <QuizCardCompact />
                <QuizCardCompact />
                <QuizCardCompact />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="link">Xem thêm</Button>
            </CardFooter>
        </Card>
    );
}
