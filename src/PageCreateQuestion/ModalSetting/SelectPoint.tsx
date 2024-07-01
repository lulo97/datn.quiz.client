import { useEffect, useState } from "react";
import { Point } from "@/InterfacesDatabase";
import { getAll } from "@/PageManagementAdmin/Point/UtilApi";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
export function SelectPoint(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<Point[]>();

    async function fetchData() {
        const records: Point[] = await getAll();
        setOptions(records.filter((ele) => ele.IsPenalty != true));
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangePoint,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Điểm</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={state.Point?.Value || "Điểm..."}
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.PointId}
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
