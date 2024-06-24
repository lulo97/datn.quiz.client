import { PlayTimeProps } from "../Utils";
import { QContent } from "./QContent";
import { QAnswers } from "./QAnswers";
import { QMedia } from "./QMedia";

export function Content(props: PlayTimeProps) {
    return (
        <div className="flex gap-5">
            <div className="w-full">
                <QContent {...props} />
                <QAnswers {...props} />
            </div>
            <QMedia {...props} />
        </div>
    );
}
