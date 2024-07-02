import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { createOne } from "../../API/Rating";
import { RateLikeProps } from "./RateLike";

export function ModalRate(props: RateLikeProps) {
    const { quiz, currentUser, setRender } = props;
    const QuizId = quiz.QuizId;
    const UserId = currentUser.UserId;

    const [stars, setStars] = useState([false, false, false, false, false]);
    const [Content, setContent] = useState("");

    function handleFetchError(result: any) {
        toast.error("Có lỗi!");
        console.log(result);
    }

    function handleTryCatchError(error: any) {
        toast.error("Có lỗi!");
        console.error(error);
    }

    function handleClickStar(num: number) {
        const newStars = stars.map((_, index) => index <= num);
        setStars(newStars);
    }

    async function handleSendRating() {
        if (!stars.includes(true)) {
            toast.warning("Hãy cho điểm đánh giá!");
            return;
        }
        const Score = stars.filter((ele) => ele == true).length;

        try {
            const result = await createOne({
                QuizId: QuizId,
                UserId: UserId,
                Score: Score,
                Content: Content,
            });
            if (!result || "error" in result) {
                handleFetchError(result);
            } else {
                toast.success("Đánh giá thành công!");
                setStars([false, false, false, false, false]);
                setContent("");
                setRender(true);
            }
        } catch (error) {
            handleTryCatchError(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Viết đánh giá
                </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[90vh]">
                <div className="flex flex-col">
                    <div className="font-semibold">Đánh giá đề thi</div>
                    <div className="text-gray-500 text-sm">
                        Bạn sẽ đánh giá đề thi này như nào?
                    </div>
                    <div className="flex flex-col gap-3 h-full mt-5">
                        <div className="flex justify-evenly">
                            {[0, 1, 2, 3, 4].map((index) => (
                                <Star
                                    size={50}
                                    key={index}
                                    onClick={() => handleClickStar(index)}
                                    fill={stars[index] ? "yellow" : "none"}
                                    className="hover:scale-125 cursor-pointer transition ease-in-out"
                                />
                            ))}
                        </div>
                        <Textarea
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Viết đánh giá..."
                            className="h-full resize-none"
                        />
                        <Button onClick={handleSendRating}>Gửi đánh giá</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
