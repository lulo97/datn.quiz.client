import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ActionType, CreateQuestionProps } from "../Utils";

export function SwitchPenaltyAllow(props: CreateQuestionProps) {
    const { state, dispatch } = props;

    function handleTogglePenaltyPoint() {
        dispatch({ type: ActionType.TogglePenaltyPoint, payload: null });
    }

    return (
        <div className="flex gap-2 items-center">
            <Label>Cho phép phạt</Label>
            <Switch
                checked={state.PenaltyAllow}
                onCheckedChange={handleTogglePenaltyPoint}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
            />
        </div>
    );
}
