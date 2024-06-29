import { ReviseProps } from "../Utils";
import { QContent } from "./QContent";
import { QAnswers } from "./QAnswers";
import { QExplain } from "./QExplain";
import { QMedia } from "./QMedia";

export function Content(props: ReviseProps) {
    const { state, dispatch } = props;

    return (
        <div>
            <div className="min-h-[50vh] flex gap-5">
                <div className="w-full flex flex-col justify-between">
                    <div>
                        <QContent state={state} dispatch={dispatch} />
                        <QAnswers state={state} dispatch={dispatch} />
                    </div>

                    <QExplain state={state} dispatch={dispatch} />
                </div>
                <QMedia state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
