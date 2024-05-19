import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export interface SettingSelectOption {
    value: string;
    label: string;
}

export interface SettingSelectProps {
    placeholder: string;
    options: SettingSelectOption[];
    defaultValue: string;
}

export function SettingSelect(props: SettingSelectProps) {
    const { placeholder, options, defaultValue } = props;
    return (
        <div>
            <Label>{placeholder}</Label>
            <Select defaultValue={defaultValue}>
                <SelectTrigger>
                    <SelectValue placeholder={options[0]?.label} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
