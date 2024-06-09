import { useEffect, useState } from "react";
import { DifficultLevel } from "@/InterfacesDatabase";
import { getAll } from "@/PageAdminManagement/DifficultLevel/UtilApi";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { AIProps } from "../Utils";

export function SelectDifficultLevel(props: AIProps) {
    const { state, setState } = props;

    const [options, setOptions] = useState<DifficultLevel[]>();

    async function fetchData() {
        const records: DifficultLevel[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        setState({ ...state, DifficultLevel: value });
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
                        placeholder={state.DifficultLevel || "Độ khó..."}
                    />
                </SelectTrigger>
                <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                    {options &&
                        options.map((option) => (
                            <SelectItem
                                className="break-words"
                                key={option.Name}
                                value={option.Name}
                            >
                                {option.Name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
