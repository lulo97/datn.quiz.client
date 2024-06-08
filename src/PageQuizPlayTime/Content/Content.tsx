import { PlayTimeProps } from "../Utils";
import { QContent } from "./QContent";
import { QAnswers } from "./QAnswers";
import { QMedia } from "./QMedia";

export function Content(props: PlayTimeProps) {
    const { state, dispatch } = props;

    return (
        <div className="flex gap-5">
            <div className="w-full">
                <QContent state={state} dispatch={dispatch} />
                <QAnswers state={state} dispatch={dispatch} />
            </div>
            <QMedia state={state} dispatch={dispatch} />
        </div>
    );
}
