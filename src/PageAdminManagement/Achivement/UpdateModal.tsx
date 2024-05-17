import { Achievement } from "@/InterfacesDatabase";
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

interface DeleteModalProps {
    record: Achievement;
    fetchData: () => Promise<void>;
}

export function UpdateModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState(record);

    const handleAddClick = async () => {
        if (data.Name == "") return
        await updateOne(data)
        await fetchData()
        setIsOpen(false)
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const selectedFile = fileList[0];
            setFile(selectedFile);
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
                        <Label>Id: </Label>{record.AchievementId}
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
                    <div>
                        <Label>Đường dẫn ảnh</Label>
                        <Input
                            value={data.ImageUrl}
                            onChange={(e) =>
                                setData({ ...data, ImageUrl: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <Label>File Ảnh</Label>
                        <Input type="file" onChange={handleFileChange} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddClick}>Sửa</Button>{" "}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
