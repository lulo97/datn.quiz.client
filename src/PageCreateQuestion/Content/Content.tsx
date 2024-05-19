import { CreateQuestionProps } from "../Utils";
import { Answer } from "./Answer";

export function Content(props: CreateQuestionProps) {
    const { state, dispatch } = props;

    return (
        <div className="flex flex-col gap-1">
            {state.Answers.map((ele) => (
                <Answer key={ele.Id} answer={ele} state={state} dispatch={dispatch} />
            ))}
        </div>
    );
}
