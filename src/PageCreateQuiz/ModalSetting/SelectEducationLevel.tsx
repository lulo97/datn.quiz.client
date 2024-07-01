import { useEffect, useState } from "react";
import { EducationLevel } from "@/InterfacesDatabase";
import { getAll } from "@/PageManagementAdmin/EducationLevel/UtilApi";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { CreateQuizProps } from "../Utils";
import { ActionType } from "../Action";

export function SelectEducationLevel(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<EducationLevel[]>();

    async function fetchData() {
        const records: EducationLevel[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangeEducationLevel,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Trình độ câu hỏi</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={
                            state.EducationLevel?.Name || "Trình độ..."
                        }
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.EducationLevelId}
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
