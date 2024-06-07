import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Heart, Star } from "lucide-react";

export function HeaderRightRating(quiz: QuizDetail) {
    //Todo: Get rating by UserId, QuizId
    //One Quiz can be Rate one time by one User 
    //Quiz -1- Rate -1- User
    return (
        <Card>
            <CardHeader>
                <CardTitle>Đánh giá</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex gap-5 justify-between items-center">
                    <Label>Yêu thích</Label>
                    <Heart fill="red" />
                </div>
                <div className="flex gap-5 justify-between items-center">
                    <Label>Điểm đánh giá</Label>
                    <div className="flex">
                        <Star fill="yellow" />
                        <Star fill="yellow" />
                        <Star fill="yellow" />
                        <Star fill="yellow" />
                        <Star />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
