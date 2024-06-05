import { useEffect, useState } from "react";
import { SubSubject } from "@/InterfacesDatabase";
import { getBySubject } from "@/PageAdminManagement/SubSubject/UtilApi";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
export function SelectSubSubject(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<SubSubject[]>();

    async function fetchData() {
        if (state.Subject) {
            const records: SubSubject[] = await getBySubject(
                state.Subject.SubjectId
            );
            setOptions(records);
        }
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangeSubSubject,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, [state.Subject]);

    return (
        <div>
            <Label>Chủ đề phụ</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={state.SubSubject?.Name || "Chủ đề phụ..."}
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.SubSubjectId}
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
