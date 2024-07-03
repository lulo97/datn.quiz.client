import { useState, useEffect, useMemo } from "react";
import { BaseScreen } from "../../components/base_screen/BaseScreen";
import { AddModal } from "./AddModal";
import { toast } from "react-toastify";
import { SubSubjectDetail } from "./Utils";
import { TableColumnsType, TablePaginationConfig } from "antd";
import { FilterValue, TableCurrentDataSource } from "antd/es/table/interface";
import { EducationLevel, Subject } from "@/InterfacesDatabase";
import { getAll as getAllSubSubjects } from "./API";
import { getAll as getAllSubjects } from "../Subject/UtilApi";
import { getAll as getAllEducationLevels } from "../EducationLevel/UtilApi";
import { DeleteModal } from "./DeleteModal";
import { ReadModal } from "./ReadModal";
import { UpdateModal } from "./UpdateModal";

export function SubSubject() {
    const [data, setData] = useState<SubSubjectDetail[]>([]);
    const [field, setField] = useState<string>();
    const [sort, setSort] = useState<string | undefined>(undefined);
    const [subjects, setSubject] = useState<Subject[]>([]);
    const [educationLevels, setEducationLevels] = useState<EducationLevel[]>(
        []
    );
    const [subjectFilter, setSubjectFilter] = useState<string | undefined>(
        undefined
    );
    const [educationFilter, setEducationFilter] = useState<string | undefined>(
        undefined
    );

    async function fetchSubSubjectsData() {
        try {
            const result = await getAllSubSubjects(
                field,
                sort,
                subjectFilter,
                educationFilter
            );
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                setData(result);
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.log(error);
        }
    }

    async function fetchSubjectsData() {
        try {
            const result = await getAllSubjects();
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                setSubject(result);
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.log(error);
        }
    }

    async function fetchEducationLevelsData() {
        try {
            const result = await getAllEducationLevels();
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                setEducationLevels(result);
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSubSubjectsData();
        fetchSubjectsData();
        fetchEducationLevelsData();
    }, []);

    useEffect(() => {
        fetchSubSubjectsData();
    }, [sort, subjectFilter, educationFilter]);

    function onChange(
        _pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: any,
        _extra: TableCurrentDataSource<any>
    ) {
        const sf = filters.Subject ? filters.Subject[0].toString() : "";
        const ef = filters.EducationLevel
            ? filters.EducationLevel[0].toString()
            : "";
        setSubjectFilter(sf);
        setEducationFilter(ef);
        setSort(sorter.order);
        setField(sorter.field);
    }

    const columns: TableColumnsType<SubSubjectDetail> = useMemo(
        () => [
            {
                title: "Chủ đề phụ",
                dataIndex: "Name",
                sorter: true,
                width: "25%",
                render: (_, record) => (
                    <div className="line-clamp-1">{record.Name}</div>
                ),
            },
            {
                title: "Chủ đề",
                sorter: true,
                filters: subjects.map((ele) => ({
                    text: ele.Name,
                    value: ele.Name,
                })),
                filterMultiple: false,
                dataIndex: "Subject",
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">{record.Subject?.Name}</div>
                ),
                width: "20%",
            },
            {
                title: "Trình độ học vấn",
                sorter: true,
                filters: educationLevels.map((ele) => ({
                    text: ele.Name,
                    value: ele.Name,
                })),
                filterMultiple: false,
                dataIndex: "EducationLevel",
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">
                        {record.EducationLevel?.Name}
                    </div>
                ),
                width: "20%",
            },
            {
                title: "Mô tả",
                dataIndex: "Description",
                render: (_, record) => (
                    <div className="line-clamp-1">
                        {record.Description || "NULL"}
                    </div>
                ),
            },
            {
                title: "Hành động",
                key: "action",
                render: (_, record) => (
                    <div className="flex gap-2 justify-end">
                        <DeleteModal
                            record={record}
                            fetchData={fetchSubSubjectsData}
                        />
                        <ReadModal
                            record={record}
                            fetchData={fetchSubSubjectsData}
                        />
                        <UpdateModal
                            record={record}
                            fetchData={fetchSubSubjectsData}
                        />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchSubSubjectsData]
    );

    return (
        <BaseScreen
            screen_title="Chủ đề phụ"
            columns={columns}
            data={data}
            defaultPageSize={5}
            addModal={<AddModal fetchData={fetchSubSubjectsData} />}
            onChange={onChange}
        />
    );
}
