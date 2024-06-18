import { TableColumnsType } from "antd";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { useEffect, useMemo, useState } from "react";
import { getOneByClerkId } from "@/api/User";
import { User } from "@/InterfacesDatabase";
import { useUser } from "@clerk/clerk-react";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { useNavigate } from "react-router-dom";
import { getAllByUser } from "@/api/QuizDetail";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReadModal } from "./ReadModal";

export function CreatedQuiz(props: {
    handleFetchData: (Quiz: QuizDetail) => void;
}) {
    const { handleFetchData } = props;
    const [data, setData] = useState<QuizDetail[]>([]);
    const navigate = useNavigate();
    const { user } = useUser();

    async function fetchData() {
        const ClerkId = user?.id || "";
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
                width: "13%",
                render: (_item, record, _index) => (
                    <p className="line-clamp-1">
                        {record.Description || "NULL"}
                    </p>
                ),
            },
            {
                title: "Chủ đề",
                sorter: true,
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
                title: "Hành động",
                key: "action",
                render: (_item, _record, _index) => (
                    <div className="flex gap-2 justify-end">
                        <ReadModal record={_record} fetchData={fetchData} />
                        <Plus
                            className="text-green-500 hover:text-green-600"
                            onClick={() => handleFetchData(_record)}
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
