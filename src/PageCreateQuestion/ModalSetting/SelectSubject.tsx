import SettingSelect from "./SettingSelect";

const subject = {
    placeholder: "Chủ đề",
    options: [
        { value: "math", label: "Toán" },
        { value: "literature", label: "Văn" },
        { value: "anh", label: "Anh" },
    ],
    defaultValue: "math",
};

export default function SelectSubject() {
    return <SettingSelect {...subject} />;
}
