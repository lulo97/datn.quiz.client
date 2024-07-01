import { useEffect, useState } from "react";
import { Language } from "@/InterfacesDatabase";
import { getAll } from "@/PageManagementAdmin/Language/UtilApi";
import { ActionType, CreateQuestionProps } from "../Utils";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
export function SelectLanguage(props: CreateQuestionProps) {
    const { state, dispatch } = props;
    const [options, setOptions] = useState<Language[]>();

    async function fetchData() {
        const records: Language[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        dispatch({
            type: ActionType.ChangeLanguage,
            payload: JSON.parse(value),
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Label>Ngôn ngữ</Label>
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={state.Language?.Name || "Ngôn ngữ..."}
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.LanguageId}
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
