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

const inital_data = {
    Name: "",
    Description: "",
    ImageUrl: "",
};

export function AddModal(props: AddModalProps) {
    const { fetchData } = props;
    const [_file, setFile] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(inital_data);

    const handleAddClick = async () => {
        if (data.Name == "") return;
        await createOne(data);
        await fetchData();
        setData(inital_data);
        setIsOpen(false);
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
                    <Button onClick={handleAddClick}>Thêm</Button>{" "}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
