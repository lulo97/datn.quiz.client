import { Role } from "@/InterfacesDatabase";
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
import { updateOne } from "./API";
import { toast } from "react-toastify";
import { PermissionDetail } from "./Utils";
import { getAll } from "../Role/UtilApi";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

interface UpdateModalProps {
    record: PermissionDetail;
    fetchData: () => Promise<void>;
}

export function UpdateModal(props: UpdateModalProps) {
    const { record, fetchData } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<PermissionDetail>(record);

    const handleAddClick = async () => {
        if (data.Name == "") {
            toast.warning("Tên quyền rỗng!");
            return;
        }
        if (!data.Role) {
            toast.warning("Vai trò rỗng!");
            return;
        }
        try {
            const result = await updateOne(data);
            if (!result) {
                toast.error("Có lỗi!");
                console.log(result);
                return;
            }
            if ("error" in result) {
                toast.error("Có lỗi!");
                console.error(result);
            } else {
                toast.success("Sửa thành công!");
                await fetchData();
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("Có lỗi!");
            console.error(error);
        }
    };

    const [options, setOptions] = useState<Role[]>();

    async function fetchRoleData() {
        const records: Role[] = await getAll();
        setOptions(records);
    }

    function handleChange(value: string) {
        setData({ ...data, Role: JSON.parse(value) });
    }

    useEffect(() => {
        fetchRoleData();
    }, []);

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
                        {record.PermissionId}
                    </div>
                    <div>
                        <Label>Vai trò</Label>
                        <Select onValueChange={handleChange}>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        data.Role
                                            ? data.Role.Name
                                            : "Vai trò..."
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent className="h-fit w-fit max-h-52 max-w-[600px]">
                                {options &&
                                    options.map((option) => (
                                        <SelectItem
                                            className="break-words"
                                            key={option.Name}
                                            value={JSON.stringify(option)}
                                        >
                                            {option.Name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Tên</Label>
                        <Input
                            value={data.Name}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    Name: e.target.value,
                                })
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
