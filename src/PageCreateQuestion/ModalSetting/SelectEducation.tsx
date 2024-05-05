import SettingSelect from "./SettingSelect";

const education_level = {
    placeholder: "Trình độ học vấn",
    options: [
        { value: "lop1", label: "Lớp 1" },
        { value: "lop2", label: "Lớp 2" },
        { value: "lop3", label: "Lớp 3" },
    ],
    defaultValue: "lop3",
};

export default function SelectEducationLevel() {
    return <SettingSelect {...education_level} />;
}
