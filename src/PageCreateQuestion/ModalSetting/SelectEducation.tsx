import { EducationLevel } from "@/InterfacesDatabase";
import { SettingSelect, SettingSelectProps } from "./SettingSelect";
import { getAll } from "@/PageAdminManagement/EducationLevel/UtilApi";
import { useState, useEffect } from "react";

export function SelectEducationLevel() {
    const [data, setData] = useState<SettingSelectProps>({
        placeholder: "",
        options: [],
        defaultValue: ""
    })

    async function fetchData() {
        const data: EducationLevel[] = await getAll()
        const select_data: SettingSelectProps = {
            placeholder: "Trình độ học vấn",
            options: data.map(ele => ({
                value: ele.EducationLevelId,
                label: ele.Name
            })),
            defaultValue: data[0].EducationLevelId,
        }
        setData(select_data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <SettingSelect {...data} />;
}
