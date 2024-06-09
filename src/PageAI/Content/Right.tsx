import { RightQuestion } from "./RightQuestion";
import { AIProps } from "../Utils";

export function Right(props: AIProps) {
    const { state } = props;
    return (
        <div className="w-1/2 border rounded-l-lg p-2 overflow-y-scroll max-h-full bg-gray-100">
            {state.Output == null && <div>Kết quả...</div>}
            {state.Output != null &&
                state.Output.map((ele, idx) => (
                    <RightQuestion
                        key={idx}
                        question={ele}
                        question_idx={idx}
                    />
                ))}
        </div>
    );
}
