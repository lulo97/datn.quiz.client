import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { QuizDetailProps } from "../QuizDetail";
import { createOne, deleteOne, getOne } from "../API/Like";
import { toast } from "react-toastify";

export function HeaderRightRating(props: QuizDetailProps) {
    const { quiz, currentUser } = props;
    const QuizId = quiz.QuizId;
    const UserId = currentUser.UserId;
    //Todo: Get rating by UserId, QuizId
    //One Quiz can be Rate one time by one User
    //Quiz -1- Rate -1- User
    const [isLike, setLike] = useState(false);

    function handleFetchError(result: any) {
        toast.error("Có lỗi!");
        console.log(result);
    }

    function handleTryCatchError(error: any) {
        toast.error("Có lỗi!");
        console.error(error);
    }

    useEffect(() => {
        async function fetchDataLike() {
            try {
                const result = await getOne(QuizId, UserId);
                if (result != null && "error" in result) {
                    handleFetchError(result);
                    return;
                }
                if (result != null) {
                    setLike(true);
                } else {
                    setLike(false);
                }
            } catch (error) {
                handleTryCatchError(error);
            }
        }
        fetchDataLike();
    }, []);

    async function handleLike() {
        try {
            const result = await createOne({ QuizId, UserId });
            if ("error" in result) {
                handleFetchError(result);
                return;
            } else {
                setLike(true);
            }
        } catch (error) {
            handleTryCatchError(error);
        }
    }

    async function handleDislike() {
        try {
            const result = await deleteOne(QuizId, UserId);
            if ("error" in result) {
                handleFetchError(result);
            } else {
                setLike(false);
            }
        } catch (error) {
            handleTryCatchError(error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Đánh giá</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex gap-5 justify-between items-center">
                    <Label>Yêu thích</Label>
                    <Heart
                        onClick={isLike ? handleDislike : handleLike}
                        fill={isLike ? "red" : "none"}
                        className="hover:scale-125 transition ease-in-out"
                    />
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
