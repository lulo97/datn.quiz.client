import { useState, useEffect } from "react";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { AddModal } from "./AddModal";
import { SubSubjectDetail, getAll } from "./UtilApi";
import { getColumns, getOnChange } from "./UtilsTable";

export function SubSubject() {
    const [data, setData] = useState<SubSubjectDetail[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.length);
    }, [data]);

    async function fetchData() {
        setData(await getAll());
    }

    const columns = getColumns(fetchData);
    return (
            <BaseScreen
                screen_title="Chủ đề phụ"
                columns={columns}
                data={data}
                defaultPageSize={5}
                addModal={<AddModal fetchData={fetchData} />}
                onChange={getOnChange(setData)}
            />
    );
}
