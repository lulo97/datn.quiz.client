import { useEffect, useState } from "react";
import { DifficultLevel } from "@/InterfacesDatabase";
import { getAll } from "@/PageManagementAdmin/DifficultLevel/UtilApi";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export function SelectDifficultLevel(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<DifficultLevel[]>();

    async function fetchData() {
        const records: DifficultLevel[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangeDifficultLevel,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Độ khó</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={state.DifficultLevel?.Name || "Độ khó..."}
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.DifficultLevelId}
                                value={JSON.stringify(option)}
                            >
                                {option.Name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
