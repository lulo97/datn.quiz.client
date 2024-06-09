import { QuizCardCollection } from "@/PageHomepage/Content/QuizCardCollection";
import { PlayDetail } from "../Utils";
import { CommentSection } from "@/components/comment/CommentSection";

export function Footer(data: PlayDetail) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <QuizCardCollection label="Các đề liên quan" />
            <CommentSection QuizId="80087190-8619-476c-8cac-ab0119cb3c25" />
        </div>
    );
}
