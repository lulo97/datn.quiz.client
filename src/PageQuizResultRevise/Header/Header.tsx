import { QuizDetail } from "@/PageRoomMonitor/Utils";
import { HeaderLeft } from "./HeaderLeft";
import { HeaderRight } from "./HeaderRight";

export function Header(Quiz: QuizDetail) {
    return (
        <div className="flex gap-5">
            <HeaderLeft {...Quiz} />
            <HeaderRight {...Quiz} />
        </div>
    );
}
