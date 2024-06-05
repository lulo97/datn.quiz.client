import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionType, CreateQuizProps } from "../Utils";

export function Header(props: CreateQuizProps) {
    const { state, dispatch } = props;
    function handleChangeName(Name: string) {
        dispatch({ type: ActionType.ChangeName, payload: Name });
    }
    return (
        <div className="flex flex-col justify-between gap-5">
            <div className="flex-grow">
                <Label>Tên đề</Label>
                <Input
                    value={state.Name ? state.Name : ""}
                    onChange={(event) =>
                        handleChangeName(event.currentTarget.value)
                    }
                    placeholder="Tên đề..."
                ></Input>
            </div>
        </div>
    );
}
