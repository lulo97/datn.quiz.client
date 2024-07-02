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
import { useState } from "react";
import { createOne } from "./UtilApi";
import { toast } from "react-toastify";

interface AddModalProps {
    fetchData: () => Promise<void>;
}
const initial_data = {
    Name: "",
    Description: "",
};
export function AddModal(props: AddModalProps) {
    const { fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(initial_data);

    const handleAddClick = async () => {
        try {
            if (data.Name == "") return;
            const result = await createOne(data);
            if (!result || "error" in result) {
                toast.error("Thêm thất bại!");
                console.log(result);
            } else {
                toast.success("Thêm thành công!");
                await fetchData();
                setData(initial_data);
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("Thêm thất bại!");
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Thêm</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm</DialogTitle>
                </DialogHeader>
                <div>
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
                    <Button onClick={handleAddClick}>Thêm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
