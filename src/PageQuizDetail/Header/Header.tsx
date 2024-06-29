import { HeaderLeft } from "./Left/HeaderLeft";
import { HeaderRight } from "./Right/HeaderRight";
import { QuizDetailProps } from "../QuizDetail";

export function Header(props: QuizDetailProps) {
    return (
        <div className="flex gap-10">
            <HeaderLeft {...props} />
            <HeaderRight {...props} />
        </div>
    );
}
