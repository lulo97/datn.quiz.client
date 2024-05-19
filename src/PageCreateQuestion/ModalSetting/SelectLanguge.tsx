import { Language } from "@/InterfacesDatabase";
import { SettingSelect, SettingSelectProps } from "./SettingSelect";
import { getAll } from "@/PageAdminManagement/Language/UtilApi";
import { useState, useEffect } from "react";

export function SelectLanguage() {
    const [data, setData] = useState<SettingSelectProps>({
        placeholder: "",
        options: [],
        defaultValue: ""
    })

    async function fetchData() {
        const data: Language[] = await getAll()
        const select_data: SettingSelectProps = {
            placeholder: "Ngôn ngữ",
            options: data.map(ele => ({
                value: ele.LanguageId,
                label: ele.Name
            })),
            defaultValue: data[0].LanguageId,
        }
        setData(select_data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <SettingSelect {...data} />;
}
