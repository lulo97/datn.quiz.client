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

interface AddModalProps {
    fetchData: () => Promise<void>;
}

const initial_data = {
    Value: 0,
};

export function AddModal(props: AddModalProps) {
    const { fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(initial_data);

    const handleAddClick = async () => {
        if (data.Value == null) return;
        await createOne(data);
        await fetchData();
        setData(initial_data);
        setIsOpen(false);
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
                        <Label>Giá trị</Label>
                        <Input
                            value={data.Value}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    Value: Number(e.target.value),
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
