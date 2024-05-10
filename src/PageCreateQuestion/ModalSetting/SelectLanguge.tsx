import { SettingSelect } from "./SettingSelect";

const language = {
    placeholder: "Ngôn ngữ",
    options: [
        { value: "en", label: "Tiếng Anh" },
        { value: "vi", label: "Tiếng Việt" },
    ],
    defaultValue: "vi",
};

export function SelectLanguage() {
    return <SettingSelect {...language} />;
}
