import { SettingSelect } from "./SettingSelect";

const point = {
    placeholder: "Điểm",
    options: [
        { value: "10", label: "10" },
        { value: "50", label: "50" },
        { value: "100", label: "100" },
    ],
    defaultValue: "10",
};

export function SelectPoint() {
    return <SettingSelect {...point} />;
}
