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

export function SelectQuizTime(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<Time[]>();

    async function fetchData() {
        const records: Time[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangeQuizTime,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Thời gian đề</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={state.QuizTime?.Value || "Thời gian..."}
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
                                {option.Value}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
