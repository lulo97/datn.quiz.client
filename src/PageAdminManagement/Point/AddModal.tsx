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
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

interface AddModalProps {
    fetchData: () => Promise<void>;
}

const initial_data = {
    Value: 10,
    IsPenalty: false,
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
                        <Label>Giá trị điểm</Label>
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
                    <div className="flex items-center gap-3 mt-5">
                        <Label>Là điểm phạt</Label>
                        <Switch
                            checked={data.IsPenalty}
                            onCheckedChange={() =>
                                setData({ ...data, IsPenalty: !data.IsPenalty })
                            }
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200"
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
