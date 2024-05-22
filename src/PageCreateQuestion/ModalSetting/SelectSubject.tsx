import { useEffect, useState } from "react";
import { Subject } from "@/InterfacesDatabase";
import { getAll } from "@/PageAdminManagement/Subject/UtilApi";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
export function SelectSubject(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<Subject[]>();

    async function fetchData() {
        const records: Subject[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.SubjectChange,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Chủ đề</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder={state.Subject?.Name || "Chủ đề..."}  />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.SubjectId}
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
