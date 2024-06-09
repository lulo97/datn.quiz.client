import { AIProps } from "../Utils";
import { Left } from "./Left";
import { Right } from "./Right";

export function Content(props: AIProps) {
    const {state, setState} = props;
    return (
        <div className="flex justify-between gap-2">
            <Left state={state} setState={setState} />
            <Right state={state} setState={setState} />
        </div>
    );
}
