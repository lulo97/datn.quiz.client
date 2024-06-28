import { CommentSection } from "@/components/comment/CommentSection";
import { QuizDetailProps } from "../QuizDetail";

export function Footer(props: QuizDetailProps) {
    return <CommentSection {...props} />;
}
