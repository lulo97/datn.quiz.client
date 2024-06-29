import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/Utils";
import { SendHorizonal } from "lucide-react";
import { CommentSectionProps } from "../Utils";
import { AutosizeTextarea } from "@/components/ui/AutoSizeTexarea/AutosizeTextarea";
import { useState } from "react";
import { createOne } from "../API/createOne";
import { toast } from "react-toastify";
const API_URL = BACKEND_URL + "public/Image/DummyImage.png";

export function CommentInput(props: CommentSectionProps) {
    const { currentUser, QuizId, fetchData } = props;
    const [content, setContent] = useState("");

    async function handlePostComment() {
        const NewComment = {
            ParentCommentId: "",
            QuizId: QuizId,
            CreateUserId: currentUser.UserId,
            Content: content,
        };
        try {
            await createOne(NewComment);
            toast.success("Bình luận thành công!");
            setContent("")
            fetchData()
        } catch (error) {
            console.error(error);
            toast.error("Bình luận thất bại!");
        }
    }

    return (
        <div className="mt-1 border p-2 rounded-lg w-full">
            <div className="flex items-center justify-between gap-1">
                <Avatar className="border">
                    <AvatarImage src={currentUser.ImageUrl || API_URL} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <AutosizeTextarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="Bình luận..."
                    maxHeight={200}
                    className="bg-gray-50"
                />
            </div>
            <div className="w-full flex justify-end mt-1">
                <Button onClick={handlePostComment}>
                    <SendHorizonal />
                </Button>
            </div>
        </div>
    );
}
