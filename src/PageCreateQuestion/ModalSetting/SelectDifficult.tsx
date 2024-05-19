import { useEffect, useState } from "react";
import { SettingSelect, SettingSelectProps } from "./SettingSelect";
import { DifficultLevel } from "@/InterfacesDatabase";
import { getAll } from "@/PageAdminManagement/DifficultLevel/UtilApi";

export function SelectDifficult() {
    const [data, setData] = useState<SettingSelectProps>({
        placeholder: "",
        options: [],
        defaultValue: ""
    })

    async function fetchData() {
        const data: DifficultLevel[] = await getAll()
        const select_data: SettingSelectProps = {
            placeholder: "Độ khó",
            options: data.map(ele => ({
                value: ele.DifficultLevelId,
                label: ele.Name
            })),
            defaultValue: data[0].DifficultLevelId,
        }
        setData(select_data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <SettingSelect {...data} />;
}
