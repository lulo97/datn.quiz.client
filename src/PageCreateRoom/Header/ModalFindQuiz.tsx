import { ModelWidthClass } from "@/Utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/mydialog/mydialog";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { QuizDetail } from "@/PageCreateQuiz/Utils";
import { getAllByUser } from "@/api/QuizDetail";
import { getOneByClerkId } from "@/api/User";
import { BaseScreen } from "@/components/base_screen/BaseScreen";
import { useUser } from "@clerk/clerk-react";
import { TableColumnsType } from "antd";
import { Plus } from "lucide-react";
import { CreateRoomProps } from "../Utils";
import { ActionType } from "../Action";
import { User } from "@/InterfacesDatabase";

export function ModalFindQuiz(props: CreateRoomProps) {
    const { state, dispatch } = props;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<QuizDetail[]>([]);
    const { user } = useUser();

    async function fetchData() {
        const ClerkId = user?.id || "";
        const currentUser: User = await getOneByClerkId(ClerkId);
        const data_fetched = await getAllByUser(currentUser.UserId);
        setData(data_fetched);
    }

    function handleChangeQuiz(record: QuizDetail) {
        dispatch({ type: ActionType.ChangeQuiz, payload: record });
        setOpen(!open)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.length);
    }, [data]);

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
                        <Plus
                            onClick={() => handleChangeQuiz(_record)}
                            className="text-green-500 hover:text-green-600"
                        />
                    </div>
                ),
                width: "10%",
            },
        ],
        [fetchData]
    );
    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Tìm đề thi</Button>
                    </DialogTrigger>
                    <DialogContent
                        className={`${ModelWidthClass} bg-gray-200 overflow-y-scroll h-[95%]`}
                    >
                        <BaseScreen
                            screen_title="Đề thi đã tạo"
                            columns={columns}
                            data={data}
                            defaultPageSize={6}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
