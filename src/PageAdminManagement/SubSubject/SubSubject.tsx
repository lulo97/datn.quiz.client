import { useState, useEffect } from "react";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { AddModal } from "./AddModal";
import { SubjectFilter } from "./SubjectFilter";
import { SubSubjectDetail, getAll } from "./UtilApi";
import { getColumns, getSorter } from "./UtilsTable";

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

    const handleTableChange = getSorter(data, setData, fetchData)

    return (
        <BaseScreen
            screen_title="Chủ đề phụ"
            columns={columns}
            data={data}
            defaultPageSize={5}
            addModal={<AddModal fetchData={fetchData} />}
            filter={
                <SubjectFilter
                    data={data}
                    setData={setData}
                    fetchData={fetchData}
                />
            }
            onChange={handleTableChange}
        />
    );
}
