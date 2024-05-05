import SettingSelect from "./SettingSelect";

const sub_subject = {
    placeholder: "Chủ đề phụ",
    options: [
        { value: "math", label: "Hàm số" },
        { value: "literature", label: "Nghị luận" },
        { value: "anh", label: "Đại từ" },
    ],
    defaultValue: "math",
};

export default function SelectSubSubject() {
    return <SettingSelect {...sub_subject} />;
}
