import { ActionType, CreateQuestionProps } from "../Utils";
import { Answer } from "./Answer";
import { Reorder } from "framer-motion";
import { Answer as IAnswer } from "@/InterfacesDatabase";

export function Content(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    function handleDragDrop(Answers: IAnswer[]) {
        dispatch({type: ActionType.ReorderAnswers, payload: Answers})
    }
    return (
        <Reorder.Group
            className="flex flex-col gap-1"
            axis="y"
            values={state.Answers}
            onReorder={(values) => handleDragDrop(values)}
        >
            {state.Answers.map((ele) => (
                <Reorder.Item
                    key={ele.AnswerId}
                    value={ele}
                >
                    <Answer
                        key={ele.AnswerId}
                        answer={ele}
                        state={state}
                        dispatch={dispatch}
                    />
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
}
