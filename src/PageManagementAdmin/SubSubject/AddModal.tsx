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
import { createOne } from "./API";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getAll as getAllSubject } from "../Subject/UtilApi";
import { getAll as getAllEducationLevel } from "../EducationLevel/UtilApi";
import { toast } from "react-toastify";
import { EducationLevel, SubSubject, Subject } from "@/InterfacesDatabase";
import { SubSubjectDetailForInsert } from "./Utils";

interface AddModalProps {
    fetchData: () => Promise<void>;
}

const INITIAL_DATA: SubSubjectDetailForInsert = {
    Subject: null,
    EducationLevel: null,
    SubSubjectId: "",
    Name: "",
    Description: "",
};

export function AddModal(props: AddModalProps) {
    const { fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [educationLevels, setEducationLevels] = useState<EducationLevel[]>(
        []
    );
    const [data, setData] = useState<SubSubjectDetailForInsert>(INITIAL_DATA);

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const result = await getAllSubject();
                if (!result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                    return;
                }
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setSubjects(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.log(error);
            }
        }
        fetchSubjects();
    }, []);

    useEffect(() => {
        async function fetchEducationLevels() {
            try {
                const result = await getAllEducationLevel();
                if (!result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                    return;
                }
                if ("error" in result) {
                    toast.error("Có lỗi!");
                    console.log(result);
                } else {
                    setEducationLevels(result);
                }
            } catch (error) {
                toast.error("Có lỗi!");
                console.log(error);
            }
        }
        fetchEducationLevels();
    }, []);

    const handleAddClick = async () => {
        try {
            if (!data.Name) {
                toast.warning("Tên trống!");
                return;
            }
            if (!data.Subject) {
                toast.warning("Chủ đề trống!");
                return;
            }
            if (!data.EducationLevel) {
                toast.warning("Trình độ học vấn trống!");
                return;
            }
            const SubSubjectRecord: Omit<
                SubSubject,
                "CreatedAt" | "UpdatedAt"
            > = {
                SubSubjectId: data.SubSubjectId,
                SubjectId: data.Subject.SubjectId,
                EducationLevelId: data.EducationLevel.EducationLevelId,
                Name: data.Name,
                Description: data.Description,
            };
            const result = await createOne(SubSubjectRecord);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Thêm thất bại!");
                console.log(result);
            } else {
                toast.success("Thêm thành công!");
                await fetchData();
                setData(INITIAL_DATA);
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
                        <Label>Chủ đề</Label>
                        <Select
                            onValueChange={(value) =>
                                setData({ ...data, Subject: JSON.parse(value) })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chủ đề..." />
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
                        <Label>Trình độ học vấn</Label>
                        <Select
                            onValueChange={(value) =>
                                setData({
                                    ...data,
                                    EducationLevel: JSON.parse(value),
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Trình độ học vấn..." />
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
                    <Button onClick={handleAddClick}>Thêm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
