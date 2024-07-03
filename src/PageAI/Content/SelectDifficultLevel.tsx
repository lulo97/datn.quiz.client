import { useEffect, useState } from "react";
import { DifficultLevel } from "@/InterfacesDatabase";
import { getAll } from "@/PageManagementAdmin/DifficultLevel/UtilApi";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { AIProps } from "../Utils";
import { toast } from "react-toastify";

export function SelectDifficultLevel(props: AIProps) {
    const { state, setState } = props;

    const [options, setOptions] = useState<DifficultLevel[]>();

    async function fetchData() {
        try {
            const result = await getAll();
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                setOptions(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(record: string) {
        setState({ ...state, DifficultLevel: JSON.parse(record) });
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
