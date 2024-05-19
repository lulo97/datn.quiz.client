import { Point } from "@/InterfacesDatabase";
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
import { Switch } from "@/components/ui/switch";

interface DeleteModalProps {
    record: Point;
    fetchData: () => Promise<void>;
}

export function UpdateModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(record);

    const handleAddClick = async () => {
        if (data.Value == null) return;
        await updateOne(data);
        await fetchData();
        setIsOpen(false);
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
                        {record.PointId}
                    </div>
                    <div>
                        <Label>Tên</Label>
                        <Input
                            type="number"
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
                    <Button onClick={handleAddClick}>Sửa</Button>{" "}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
