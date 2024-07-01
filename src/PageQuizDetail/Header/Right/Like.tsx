import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { QuizDetailProps } from "../../QuizDetail";
import { createOne, deleteOne, getOne } from "../../API/Like";
import { toast } from "react-toastify";

export function Like(props: QuizDetailProps) {
    const { quiz, currentUser } = props;
    const QuizId = quiz.QuizId;
    const UserId = currentUser.UserId;
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
            } else {
                setLike(true);
                toast.success("Lưu vào mục yêu thích!")
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
        <div className="flex gap-5 justify-between items-center">
            <Label>Yêu thích</Label>
            <Heart
                onClick={isLike ? handleDislike : handleLike}
                fill={isLike ? "red" : "none"}
                className="hover:scale-125 cursor-pointer transition ease-in-out"
            />
        </div>
    );
}
