import { QuizCardCollection } from "@/PageHomepage/Content/QuizCardCollection";
import { PlayDetail } from "../Utils";
import { CommentSection } from "@/components/comment/CommentSection";

export function Footer(data: PlayDetail) {
    return (
        <div className="flex flex-col gap-5 w-full">
            <QuizCardCollection label="Các đề liên quan" />
            <CommentSection QuizId={data.QuizId} />
        </div>
    );
}
