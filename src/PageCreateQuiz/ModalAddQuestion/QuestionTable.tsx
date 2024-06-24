import { useEffect, useMemo, useState } from "react";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { TableColumnsType } from "antd";
import { Eye, Plus } from "lucide-react";
import {
    getAllByEducationLevel,
    getAllBySubject,
    getAllBySubjectAndEducationLevel,
    getAllByUser,
} from "@/api/QuestionDetail";
import { CreateQuizProps } from "../Utils";
import { QuestionDetailList } from "./QuestionDetailList";
import { toast } from "react-toastify";
import { ActionType } from "../Action";
import { ReadModal } from "@/PageUserManagement/CreatedQuestion/ReadModal";

export function QuestionTable(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [data, setData] = useState<QuestionDetail[]>([]);

    function handleAddQuestion(question: QuestionDetail) {
        dispatch({ type: ActionType.AddQuestion, payload: question });
        toast.success("Thêm thành công!");
    }

    async function fetchSubjectDatas() {
        if (!state.CurrentUser) return;
        let fetched_data: any[] = [];
        //1. Education = Subject = Tổng hợp
        if (
            state.Subject?.Name == "Tổng hợp" &&
            state.EducationLevel?.Name == "Tổng hợp"
        ) {
            fetched_data = await getAllByUser(state.CurrentUser.UserId);
        }
        //2. Education = Education, Subject = Tổng hợp
        else if (state.Subject?.Name == "Tổng hợp" && state.EducationLevel) {
            fetched_data = await getAllByEducationLevel(
                state.EducationLevel.EducationLevelId
            );
        }
        //3. Education = Tổng hợp, Subject = Subject
        else if (state.EducationLevel?.Name == "Tổng hợp" && state.Subject) {
            fetched_data = await getAllBySubject(state.Subject.SubjectId);
        }
        //4. Education = Education, Subject = Subject
        else if (state.Subject && state.EducationLevel) {
            fetched_data = await getAllBySubjectAndEducationLevel(
                state.Subject.SubjectId,
                state.EducationLevel.EducationLevelId
            );
        }
        if ("error" in fetched_data) {
            toast.warning("Không có bản ghi!");
            setData([]);
        } else {
            setData(fetched_data);
        }
    }

    useEffect(() => {
        fetchSubjectDatas();
    }, [state.Subject]);

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
            },
            {
                title: "Trắc nghiệm",
                sorter: true,
                width: "12%",
                render: (_item, record, _index) => record.Type?.Name,
            },
            {
                title: "Độ khó",
                render: (_item, record, _index) => record.DifficultLevel?.Name,
                sorter: true,
                width: "12%",
            },
            {
                title: "Trình độ",
                render: (_item, record, _index) => record.EducationLevel?.Name,
                sorter: true,
                width: "10%",
            },
            {
                title: "Chủ đề",
                render: (_item, record, _index) => record.Subject?.Name,
                sorter: true,
                width: "10%",
            },
            {
                title: "Chủ đề phụ",
                render: (_item, record, _index) => (
                    <div className="line-clamp-1">
                        {record.SubSubject?.Name}
                    </div>
                ),
                sorter: true,
                width: "12%",
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, record, _index) => (
                    <div className="flex justify-between">
                        <Plus
                            onClick={() => handleAddQuestion(record)}
                            className="text-green-500 hover:text-green-600"
                        />
                        <ReadModal record={record} />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchSubjectDatas]
    );

    if (!state.CurrentUser) return <div>Đang tải!</div>;
    if (data.length === 0) return <div>Hãy chọn chủ đề!</div>;

    return (
        <div>
            <QuestionDetailList
                columns={columns}
                data={data}
                defaultPageSize={5}
            />
        </div>
    );
}
