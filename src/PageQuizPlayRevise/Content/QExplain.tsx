import { Label } from "@/components/ui/label";
import { ReviseProps } from "../Utils";
export function QExplain(props: ReviseProps) {
    const { state, dispatch } = props;
    const question = state.Quiz?.Questions[state.QuestionIdx];

    //if (!state.Response[state.QuestionIdx].ShowExplanation) return;

    return (
        <div className="flex items-center">
            <Label>Giải thích:</Label>
            <div
                className="text-sm ml-1"
                dangerouslySetInnerHTML={{
                    __html: question?.Explanation || "",
                }}
            ></div>
        </div>
    );
}
