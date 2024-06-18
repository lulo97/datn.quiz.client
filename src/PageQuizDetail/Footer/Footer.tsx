import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { CommentSection } from "@/components/comment/CommentSection";

export function Footer(quiz: QuizDetail) {
    return <CommentSection QuizId={quiz.QuizId} />;
}
