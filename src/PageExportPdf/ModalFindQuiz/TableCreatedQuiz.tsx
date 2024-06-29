import { TableColumnsType } from "antd";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { useEffect, useMemo, useState } from "react";
import { getOneByClerkId } from "@/api/User";
import { User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { getAllByUser } from "@/api/QuizDetail";
import { Plus } from "lucide-react";
import { ReadModal } from "./ReadModal";

export function TableCreatedQuiz(props: {
    handleSetQuizAndCloseModal: (quiz: QuizDetail) => void;
}) {
    const { handleSetQuizAndCloseModal } = props;
    const [data, setData] = useState<QuizDetail[]>([]);
    const { user } = useUser();

    async function fetchData() {
        if (!user) return;
        const ClerkId = user.id;
        const currentUser: User = await getOneByClerkId(ClerkId);
        const data_fetched = await getAllByUser(currentUser.UserId);
        setData(data_fetched);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns: TableColumnsType<QuizDetail> = useMemo(
        () => [
            {
                title: "Tên",
                sorter: true,
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.Name}</p>
                ),
            },
            {
                title: "Mô tả",
                sorter: true,
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">
                        {record.Description || "NULL"}
                    </p>
                ),
            },
            {
                title: "Chủ đề",
                sorter: true,
                width: "11%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.Subject?.Name}</p>
                ),
            },
            {
                title: "Trình độ",
                sorter: true,
                width: "11%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">
                        {record.EducationLevel?.Name}
                    </p>
                ),
            },
            {
                title: "Thời gian (phút)",
                sorter: true,
                width: "16%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.Time?.Value}</p>
                ),
            },
            {
                title: "Số câu",
                sorter: true,
                width: "10%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">{record.Questions.length}</p>
                ),
            },
            {
                title: "Hành động",
                key: "action",
                render: (_item, _record, _index) => (
                    <div className="flex gap-2 justify-end">
                        <ReadModal record={_record} fetchData={fetchData} />
                        <Plus
                            className="text-green-500 hover:text-green-600"
                            onClick={() => handleSetQuizAndCloseModal(_record)}
                        />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );

    return (
        <BaseScreen
            screen_title="Đề thi đã tạo"
            columns={columns}
            data={data}
            defaultPageSize={6}
        />
    );
}
