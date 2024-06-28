import { useEffect, useState } from "react";
import { CommentDetail } from "./Utils";
import { Label } from "../ui/label";
import { CommentInput } from "./CommentInput/CommentInput";
import { CommentCard } from "./CommentCard/CommentCard";
import { getAllByQuiz } from "./API/getAllByQuiz";
import { QuizDetailProps } from "@/PageQuizDetail/QuizDetail";

export function CommentSection(props: QuizDetailProps) {
    const { quiz, currentUser } = props;
    const QuizId = quiz.QuizId;
    const [comments, setComments] = useState<CommentDetail[]>();

    async function fetchData() {
        setComments(await getAllByQuiz(QuizId));
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (comments == undefined || currentUser == undefined)
        return <div>Đang tải</div>;

    return (
        <div className="w-full">
            <Label>Bình luận</Label>
            <CommentInput
                fetchData={fetchData}
                QuizId={QuizId}
                comments={comments}
                currentUser={currentUser}
            />
            {comments.length == 0 && <div>Chưa có bình luận nào</div>}
            {comments.map((comment) => (
                <CommentCard
                    fetchData={fetchData}
                    key={comment.CommentId}
                    QuizId={QuizId}
                    comment={comment}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}
