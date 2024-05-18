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
import { useEffect, useState } from "react";
import { SubSubjectDetail, toSubSubject, updateOne } from "./UtilApi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
interface DeleteModalProps {
    record: SubSubjectDetail;
    fetchData: () => Promise<void>;
}
import { getAll as getAllSubjectApi } from "../Subject/UtilApi";

export function UpdateModal(props: DeleteModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(toSubSubject(record));
    const [subjects, setSubjects] = useState<Subject[]>([]);

    async function fetchSubjects() {
        setSubjects(await getAllSubjectApi());
    }

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleAddClick = async () => {
        if (data.Name == "") return;
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
                        {data.SubSubjectId}
                    </div>
                    <Select
                        onValueChange={(value) =>
                            setData({ ...data, SubjectId: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={record.SubjectName} />
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
                    <Button onClick={handleAddClick}>Sửa</Button>{" "}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
