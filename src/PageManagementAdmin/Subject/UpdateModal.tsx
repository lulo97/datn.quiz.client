import { Subject } from "@/InterfacesDatabase";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenBox } from "lucide-react";
import { useState } from "react";
import { updateOne } from "./UtilApi";
import { toast } from "react-toastify";

interface DeleteModalProps {
    record: Subject;
    fetchData: () => Promise<void>;
}

export function UpdateModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        ...record,
        Description: record.Description || "",
    });

    const handleAddClick = async () => {
        try {
            if (data.Name == "") return;
            const result = await updateOne(data);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.log(result);
            } else {
                toast.success("Cập nhật thành công!");
                setIsOpen(false);
                await fetchData();
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.log(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <PenBox className="text-green-500 hover:text-green-600" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sửa</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <Label>Id: </Label>
                        {record.SubjectId}
                    </div>
                    <div>
                        <Label>Tên</Label>
                        <Input
                            value={data.Name}
                            onChange={(e) =>
                                setData({ ...data, Name: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label>Mô tả</Label>
                        <Input
                            value={data.Description}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    Description: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddClick}>Sửa</Button>{" "}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
