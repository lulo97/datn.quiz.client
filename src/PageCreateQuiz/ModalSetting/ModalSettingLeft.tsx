import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreateQuizProps } from "../Utils";
import { SelectSubject } from "./SelectSubject";
import { SelectEducationLevel } from "./SelectEducationLevel";
import { SelectTime } from "./SelectTime";
import { ActionType } from "../Action";

export function ModalSettingContentLeft(props: CreateQuizProps) {
    const { state, dispatch } = props;
    function handleChangeName(Name: string) {
        dispatch({ type: ActionType.ChangeName, payload: Name });
    }
    function handleChangeDescription(Description: string) {
        dispatch({ type: ActionType.ChangeDescription, payload: Description });
    }
    function hanleToggleIsPublic() {
        dispatch({ type: ActionType.ToggleIsPublic, payload: null });
    }
    return (
        <div className="w-1/2">
            <Label>Tên đề</Label>
            <Input
                value={state.Name ? state.Name : ""}
                onChange={(event) =>
                    handleChangeName(event.currentTarget.value)
                }
                placeholder="Tên đề..."
            />
            <Label>Mô tả</Label>
            <Textarea
                onChange={(event) =>
                    handleChangeDescription(event.currentTarget.value)
                }
                placeholder="Giới thiệu về đề..."
            />
            <div className="grid grid-cols-2 gap-2">
                <SelectSubject state={state} dispatch={dispatch} />
                <SelectEducationLevel state={state} dispatch={dispatch} />
            </div>
            <div >
                <SelectTime state={state} dispatch={dispatch} />
            </div>
            <div className="flex items-center justify-between mt-1">
                <div className="flex gap-2 items-center">
                    <Label>Công khai</Label>
                    <Switch
                        onClick={hanleToggleIsPublic}
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
                    />
                </div>
            </div>
        </div>
    );
}
