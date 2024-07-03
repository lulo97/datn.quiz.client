import { useEffect, useMemo, useState } from "react";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";
import { TableColumnsType } from "antd";
import { Plus } from "lucide-react";
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
import { ReadModal } from "@/PageManagementUser/CreatedQuestion/ReadModal";
import { TONG_HOP } from "@/Utils";

export function QuestionTable(props: CreateQuizProps) {
    const { state, dispatch } = props;
    const [data, setData] = useState<QuestionDetail[]>([]);

    function handleAddQuestion(question: QuestionDetail) {
        dispatch({ type: ActionType.AddQuestion, payload: question });
        toast.success("Thêm thành công!");
    }

    async function fetchData() {
        try {
            if (!state.CurrentUser) return;
            let fetched_data: any[] = [];
            //1. Education = Subject = TONG_HOP
            if (
                state.Subject?.Name == TONG_HOP &&
                state.EducationLevel?.Name == TONG_HOP
            ) {
                fetched_data = await getAllByUser(state.CurrentUser.UserId);
            }
            //2. Education = Education, Subject = TONG_HOP
            else if (state.Subject?.Name == TONG_HOP && state.EducationLevel) {
                fetched_data = await getAllByEducationLevel(
                    state.EducationLevel.EducationLevelId
                );
            }
            //3. Education = TONG_HOP, Subject = Subject
            else if (state.EducationLevel?.Name == TONG_HOP && state.Subject) {
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
                toast.error("Không có bản ghi!");
                setData([]);
            } else {
                setData(fetched_data);
            }
        } catch (error) {
            toast.error("Có lỗi");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
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
        [fetchData]
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
