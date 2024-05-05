import SettingSelect from "./SettingSelect";

const type = {
    placeholder: "Loại câu hỏi",
    options: [
        { value: "mc", label: "Nhiều đáp án" },
        { value: "sc", label: "Một đáp án" },
    ],
    defaultValue: "mc",
};

export default function SelectType() {
    return <SettingSelect {...type} />;
}
