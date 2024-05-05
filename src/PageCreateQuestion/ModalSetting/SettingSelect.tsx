import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

interface SettingSelectProps {
    placeholder: string;
    options: { value: string; label: string }[];
    defaultValue: string;
}

export default function SettingSelect(props: SettingSelectProps) {
    const { placeholder, options, defaultValue } = props;
    return (
        <div>
            <Label>{placeholder}</Label>
            <Select defaultValue={defaultValue}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
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
