import { useEffect, useState } from "react";
import { CommentDetail } from "./Utils";
import { useUser } from "@clerk/clerk-react";
import { User } from "@/InterfacesDatabase";
import { getOneByClerkId } from "@/api/User";
import { Label } from "../ui/label";
import { CommentInput } from "./CommentInput/CommentInput";
import { CommentCard } from "./CommentCard/CommentCard";
import { getAllByQuiz } from "./API/getAllByQuiz";

interface Props {
    QuizId: string;
}

export function CommentSection(props: Props) {
    const { QuizId } = props;
    const { user } = useUser();

    const [comments, setComments] = useState<CommentDetail[]>();
    const [currentUser, setCurrentUser] = useState<User>();

    async function fetchData() {
        setComments(await getAllByQuiz(QuizId));
    }

    async function fetchUser() {
        const ClerkId = user?.id;
        setCurrentUser(await getOneByClerkId(ClerkId || ""));
    }

    useEffect(() => {
        fetchData();

        fetchUser();
    }, []);

    if (comments == undefined || currentUser == undefined)
        return <div>Đang tải</div>;

    return (
        <div>
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
