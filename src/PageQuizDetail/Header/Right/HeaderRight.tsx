import { Information } from "./Information";
import { QuizDetailProps } from "../../QuizDetail";
import { RateLike } from "./RateLike";

export function HeaderRight(props: QuizDetailProps) {
    return (
        <div className="w-1/3 flex flex-col gap-3">
            <Information {...props} />
            <RateLike {...props} />
        </div>
    );
}
