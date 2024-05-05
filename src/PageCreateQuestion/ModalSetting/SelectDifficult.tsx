import SettingSelect from "./SettingSelect";

const difficulty = {
    placeholder: "Độ khó",
    options: [
        { value: "nb", label: "Nhận biết" },
        { value: "th", label: "Thông hiểu" },
        { value: "vd", label: "Vận dụng" },
        { value: "vdc", label: "Vận dụng cao" },
    ],
    defaultValue: "nb",
};

export default function SelectDifficult() {
    return <SettingSelect {...difficulty} />;
}
