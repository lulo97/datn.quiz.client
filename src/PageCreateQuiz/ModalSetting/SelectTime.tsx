import { useEffect, useState } from "react";
import { Time } from "@/InterfacesDatabase";
import { ActionType, CreateQuizProps } from "../Utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { getAll } from "@/PageAdminManagement/Time/UtilApi";

export function SelectTime(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<Time[]>();

    async function fetchData() {
        const records: Time[] = await getAll();
        setOptions(records.sort((a, b) => a.Value - b.Value));
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangeTime,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Thời gian làm đề</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={state.Time?.Value || "Thời gian..."}
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.TimeId}
                                value={JSON.stringify(option)}
                            >
                                {option.Value} phút
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
