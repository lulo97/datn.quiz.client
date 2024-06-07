import { useEffect, useMemo, useState } from "react";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { TableColumnsType } from "antd";

import { Plus } from "lucide-react";
import { getAllBySubject } from "@/api/QuestionDetail";
import { ActionType, CreateQuizProps } from "../Utils";
import { QuestionDetailList } from "./QuestionDetailList";
import { toast } from "react-toastify";

export function QuestionTable(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [data, setData] = useState<QuestionDetail[]>([]);

    function handleAddQuestion(question: QuestionDetail) {
        dispatch({ type: ActionType.AddQuestion, payload: question });
        toast.success("Thêm thành công!");
        console.log(state);
    }

    async function fetchData() {
        if (state.Subject?.SubjectId) {
            const data_fetched = await getAllBySubject(state.Subject.SubjectId);
            setData(data_fetched);
        }
    }

    useEffect(() => {
        fetchData();
    }, [state.Subject]);

    useEffect(() => {
        console.log(data.length, 123);
    }, [data]);

    const columns: TableColumnsType<QuestionDetail> = useMemo(
        () => [
            {
                title: "Câu hỏi",
                dataIndex: "Content",
                render: (_item, record, _index) => (
                    <div
                        className="line-clamp-1"
                        dangerouslySetInnerHTML={{
                            __html: record.Content || "",
                        }}
                    ></div>
                ),
                width: "30%",
            },
            {
                title: "Trắc nghiệm",
                sorter: true,
                width: "15%",
                render: (_item, record, _index) => record.Type?.Name,
            },
            {
                title: "Độ khó",
                render: (_item, record, _index) => record.DifficultLevel?.Name,
                sorter: true,
                width: "15%",
            },
            {
                title: "Trình độ",
                render: (_item, record, _index) => record.EducationLevel?.Name,
                sorter: true,
                width: "15%",
            },
            {
                title: "Chủ đề",
                render: (_item, record, _index) => record.SubSubject?.Name,
                sorter: true,
                width: "15%",
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, record, _index) => (
                    <div className="flex justify-center">
                        <Plus
                            onClick={() => handleAddQuestion(record)}
                            className="text-green-500 hover:text-green-600"
                        />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );

    if (data.length === 0) return <div>Hãy chọn chủ đề</div>;
    return (
        <QuestionDetailList columns={columns} data={data} defaultPageSize={4} />
    );
}
