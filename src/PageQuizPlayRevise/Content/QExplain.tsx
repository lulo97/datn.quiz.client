import { ReviseProps } from "../Utils";
export function QExplain(props: ReviseProps) {
    const { state } = props;
    const question = state.Quiz?.Questions[state.QuestionIdx];
    const Response = state.Response[state.QuestionIdx];

    return (
        <div className="text-sm">
            <div className="font-semibold">Giải thích:</div>
            {Response.ShowExplanation && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: question?.Explanation || "",
                    }}
                ></div>
            )}
        </div>
    );
}
