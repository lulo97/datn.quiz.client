import { ThumbsDown, ThumbsUp } from "lucide-react";
import { CommentCardProps } from "../Utils";
import { GREEN500_HEX, RED500_HEX } from "@/Utils";
import {
    createOne as createOneUpvote,
    deleteOne as deleteOneUpvote,
} from "@/api/Upvotecomment";
import {
    createOne as createOneDownvote,
    deleteOne as deleteOneDownvote,
} from "@/api/Downvotecomment";
import { toast } from "react-toastify";

export function VoteCard(props: CommentCardProps) {
    const { comment, currentUser, fetchData } = props;

    const flatUpvotesToUserId = comment.Upvotes.map((ele) => ele.UserId);
    const isCurrentUserUpvoted = flatUpvotesToUserId.includes(
        currentUser.UserId
    );

    const flatDownvotesToUserId = comment.Downvotes.map((ele) => ele.UserId);
    const isCurrentUserDownvoted = flatDownvotesToUserId.includes(
        currentUser.UserId
    );

    async function handleUpvote() {
        if (!isCurrentUserUpvoted && isCurrentUserDownvoted) {
            toast.warning("Hãy bỏ Downvote bình luận");
            return;
        }
        try {
            if (isCurrentUserUpvoted) {
                const Upvote = comment.Upvotes.find(
                    (ele) => ele.UserId == currentUser.UserId
                );
                if (Upvote?.UpvoteCommentId) {
                    await deleteOneUpvote(Upvote?.UpvoteCommentId);
                }
            } else {
                const data = {
                    CommentId: comment.CommentId,
                    UserId: currentUser.UserId,
                };
                await createOneUpvote(data);
            }
        } catch (error) {
            console.error(error);
        }
        fetchData();
    }

    async function handleDownvote() {
        if (isCurrentUserUpvoted && !isCurrentUserDownvoted) {
            toast.warning("Hãy bỏ Upvote bình luận");
            return;
        }
        try {
            if (isCurrentUserDownvoted) {
                const Downvote = comment.Downvotes.find(
                    (ele) => ele.UserId == currentUser.UserId
                );
                if (Downvote?.DownvoteCommentId) {
                    await deleteOneDownvote(Downvote?.DownvoteCommentId);
                }
            } else {
                const data = {
                    CommentId: comment.CommentId,
                    UserId: currentUser.UserId,
                };
                await createOneDownvote(data);
            }
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex gap-3 items-center">
            <div className="flex gap-1 items-center text-green-600">
                <ThumbsUp
                    onClick={handleUpvote}
                    fill={isCurrentUserUpvoted == true ? GREEN500_HEX : "none"}
                    className="hover:scale-125 hover:cursor-pointer transition ease-in-out"
                    size={16}
                />
                <div>{comment.Upvotes.length}</div>
            </div>
            <div className="flex gap-1 items-center text-red-600">
                <ThumbsDown
                    onClick={handleDownvote}
                    fill={isCurrentUserDownvoted == true ? RED500_HEX : "none"}
                    className="hover:scale-125 hover:cursor-pointer transition ease-in-out"
                    size={16}
                />
                <div>{comment.Downvotes.length}</div>
            </div>
        </div>
    );
}
