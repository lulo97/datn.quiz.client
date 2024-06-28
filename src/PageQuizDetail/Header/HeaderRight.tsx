import { HeaderRightInformation } from "./HeaderRightInformation";
import { HeaderRightRating } from "./HeaderRightRating";
import { QuizDetailProps } from "../QuizDetail";

export function HeaderRight(props: QuizDetailProps) {
    return (
        <div className="w-1/3 flex flex-col gap-3">
            <HeaderRightInformation {...props} />
            <HeaderRightRating {...props} />
        </div>
    );
}
