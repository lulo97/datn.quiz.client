import { ReviseProps } from "../Utils";
export function QContent(props: ReviseProps) {
    const { state } = props;
    const question = state.Quiz?.Questions[state.QuestionIdx];

    return (
        <div
            className="font-semibold"
            dangerouslySetInnerHTML={{
                __html: question?.Content || "",
            }}
        ></div>
    );
}
