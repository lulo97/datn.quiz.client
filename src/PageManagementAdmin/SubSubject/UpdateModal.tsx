import { EducationLevel, Subject } from "@/InterfacesDatabase";
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
import { SubSubjectDetail, updateOne } from "./UtilApi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
interface UpdateModalProps {
    record: SubSubjectDetail;
    fetchData: () => Promise<void>;
}
import { getAll as getAllSubject } from "../Subject/UtilApi";
import { getAll as getAllEducationLevel } from "../EducationLevel/UtilApi";
import { toast } from "react-toastify";

export interface SubSubjectDetailForUpdate {
    SubSubjectId: string;
    SubjectId: string | undefined;
    EducationLevelId: string | undefined;
    Name: string;
    Description: string;
}

export function UpdateModal(props: UpdateModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<SubSubjectDetail>(record);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [educationLevels, setEducationLevels] = useState<EducationLevel[]>(
        []
    );

    useEffect(() => {
        async function fetchSubjects() {
            setSubjects(await getAllSubject());
        }

        async function fetchEducationLevels() {
            setEducationLevels(await getAllEducationLevel());
        }
        fetchSubjects();
        fetchEducationLevels();
    }, []);

    const handleAddClick = async () => {
        try {
            const record: SubSubjectDetailForUpdate = {
                SubSubjectId: data.SubSubjectId,
                SubjectId: data.Subject?.SubjectId,
                EducationLevelId: data.EducationLevel?.EducationLevelId,
                Name: data.Name,
                Description: data.Description,
            };
            if (record.Name == "") return;
            if (!record.SubjectId) return;
            if (!record.EducationLevelId) return;
            const result = await updateOne(record);
            if (!result || "error" in result) {
                toast.error("Cập nhật thất bại!");
                console.log(result);
            } else {
                toast.success("Cập nhật thành công!");
                await fetchData();
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("Cập nhật thất bại!");
            console.error(error);
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
                        {data.SubSubjectId}
                    </div>
                    <div>
                        <Label>Chủ đề</Label>{" "}
                        <Select
                            onValueChange={(value) =>
                                setData({ ...data, Subject: JSON.parse(value) })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={record.Subject?.Name}
                                />
                            </SelectTrigger>
                            <SelectContent className="h-60">
                                {subjects.map((ele) => (
                                    <SelectItem
                                        key={ele.SubjectId}
                                        value={JSON.stringify(ele)}
                                    >
                                        {ele.Name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Trình độ học vấn</Label>{" "}
                        <Select
                            onValueChange={(value) =>
                                setData({
                                    ...data,
                                    EducationLevel: JSON.parse(value),
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={record.EducationLevel?.Name}
                                />
                            </SelectTrigger>
                            <SelectContent className="h-52">
                                {educationLevels.map((ele) => (
                                    <SelectItem
                                        key={ele.EducationLevelId}
                                        value={JSON.stringify(ele)}
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
                    <Button onClick={handleAddClick}>Sửa</Button>{" "}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
