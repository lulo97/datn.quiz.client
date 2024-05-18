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
import { useEffect, useState } from "react";
import { createOne } from "./UtilApi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Subject } from "@/InterfacesDatabase";
import { getAll as getAllSubjectApi } from "../Subject/UtilApi";

interface AddModalProps {
    fetchData: () => Promise<void>;
}

export function AddModal(props: AddModalProps) {
    const { fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    async function fetchSubjects() {
        setSubjects(await getAllSubjectApi());
    }

    useEffect(() => {
        fetchSubjects();
    }, []);

    const [data, setData] = useState({
        SubjectId: "",
        Name: "",
        Description: "",
    });

    const handleAddClick = async () => {
        if (data.Name == "" || data.SubjectId == "") return;
        await createOne(data);
        await fetchData();
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
                        <Label>Chủ đề</Label>
                        <Select
                            onValueChange={(value) =>
                                setData({ ...data, SubjectId: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chủ đề..." />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((ele) => (
                                    <SelectItem
                                        key={ele.SubjectId}
                                        value={ele.SubjectId}
                                    >
                                        {ele.Name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Chủ đề phụ</Label>
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
