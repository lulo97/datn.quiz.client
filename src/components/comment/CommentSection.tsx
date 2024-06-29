import { useEffect, useState } from "react";
import { CommentDetail } from "./Utils";
import { Label } from "../ui/label";
import { CommentInput } from "./CommentInput/CommentInput";
import { CommentCard } from "./CommentCard/CommentCard";
import { getAllByQuiz } from "./API/getAllByQuiz";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";
import { useUser } from "@clerk/clerk-react";

interface CommentSection {
    QuizId: string;
}

export function CommentSection(props: CommentSection) {
    const { QuizId } = props;
    const { user } = useUser();
    const [comments, setComments] = useState<CommentDetail[]>();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        async function fetchUser() {
            const ClerkId = user?.id || "";
            if (ClerkId != "") {
                setCurrentUser(await getOneByClerkId(ClerkId));
            }
        }
        fetchUser();
    }, []);

    async function fetchComment() {
        setComments(await getAllByQuiz(QuizId));
    }

    useEffect(() => {
        fetchComment();
    }, []);

    if (!comments || !currentUser) return <div>Đang tải</div>;

    return (
        <div className="w-full">
            <Label>Bình luận</Label>
            <CommentInput
                fetchData={fetchComment}
                QuizId={QuizId}
                comments={comments}
                currentUser={currentUser}
            />
            {comments.length == 0 && <div>Chưa có bình luận nào</div>}
            {comments.map((comment) => (
                <CommentCard
                    fetchData={fetchComment}
                    key={comment.CommentId}
                    QuizId={QuizId}
                    comment={comment}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}
