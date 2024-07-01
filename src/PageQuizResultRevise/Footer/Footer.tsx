import { QuizCardCollection } from "@/PageHomepage/Content/QuizCardCollection";
import { QuizDetail } from "@/PageRoomMonitor/Utils";
import { CommentSection } from "@/components/comment/CommentSection";

export function Footer(quiz: QuizDetail) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <QuizCardCollection label="Các đề liên quan" />
            <CommentSection QuizId={quiz.QuizId} />
        </div>
    );
}
