import { CreateQuizProps } from "../Utils";
import { MyImage } from "./MyImage";
import { InputImage } from "./InputImage";
import { Label } from "@/components/ui/label";

export function ModalSettingContentRight(props: CreateQuizProps) {
    const { state, dispatch } = props;

    return (
        <div className="w-1/2">
            <Label>Hình ảnh</Label>
            <MyImage state={state} dispatch={dispatch} />
            <div className="flex flex-col justify-between mt-1">
                <InputImage state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}
