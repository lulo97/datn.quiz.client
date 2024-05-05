import SettingSelect from "./SettingSelect";

const penaty_point = {
    placeholder: "Điểm phạt",
    options: [
        { value: "10", label: "10" },
        { value: "50", label: "50" },
        { value: "100", label: "100" },
    ],
    defaultValue: "10",
};

export default function SelectPenaltyPoint() {
    return <SettingSelect {...penaty_point} />;
}
