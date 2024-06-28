import { Label } from "@/components/ui/label";
import { SelectQuestionNumber } from "./SelectQuestionNumber";
import { AutosizeTextarea } from "@/components/ui/AutoSizeTexarea/AutosizeTextarea";
import { AIProps } from "../Utils";
import { SelectDifficultLevel } from "./SelectDifficultLevel";
import { SelectLanguage } from "./SelectLanguge";
import { SelectType } from "./SelectType";

export function Left(props: AIProps) {
    const { state, setState } = props;
    return (
        <div className="w-1/2 border p-2 rounded-lg max-h-full bg-gray-100">
            <Label htmlFor="content">Văn bản</Label>
            <AutosizeTextarea
                value={state.Text}
                onChange={(e) => setState({ ...state, Text: e.target.value })}
                minHeight={300}
                placeholder="Văn bản..."
            />

            <div className="flex flex-col justify-evenly gap-1">
                <div className="flex-grow">
                    <SelectQuestionNumber state={state} setState={setState} />
                </div>
                <div className="flex-grow">
                    <SelectDifficultLevel state={state} setState={setState} />
                </div>
                <div className="flex-grow">
                    <SelectLanguage state={state} setState={setState} />
                </div>
                <div className="flex-grow">
                    <SelectType state={state} setState={setState} />
                </div>
            </div>
        </div>
    );
}
