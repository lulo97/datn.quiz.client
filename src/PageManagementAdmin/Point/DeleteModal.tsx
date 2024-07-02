import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import { Point } from "@/InterfacesDatabase";
import { deleteOne } from "./UtilApi";
import { toast } from "react-toastify";

interface DeleteModalProps {
    record: Point;
    fetchData: () => Promise<void>;
}

export function DeleteModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);

    async function handleClick() {
        try {
            if (record.PointId == "") return;
            const result = await deleteOne(record.PointId);
            if (!result || "error" in result) {
                toast.error("Xóa thất bại!");
                console.log(result);
            } else {
                toast.success("Xóa thành công!");
                await fetchData();
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("Xóa thất bại!");
            console.error(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <X className="text-red-500 hover:text-red-600" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xóa</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <Label>Id: </Label> {record.PointId}
                    </div>
                    <div>
                        <Label>Tên: </Label> {record.Value}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleClick}>Xác nhận xóa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
