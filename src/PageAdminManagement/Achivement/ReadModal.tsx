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
import { Eye } from "lucide-react";
import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { ModalSizeClass } from "@/Utils";

interface ReadModalProps {
    record: Achievement;
    fetchData: () => Promise<void>;
}

export function ReadModal(props: ReadModalProps) {
    const { record } = props;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Eye className="text-yellow-500 hover:text-yellow-600" />
            </DialogTrigger>
            <DialogContent className={ModalSizeClass}>
                <DialogHeader>
                    <DialogTitle>Xem</DialogTitle>
                </DialogHeader>
                <div>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead>Mã:</TableHead>
                                <TableCell>{record.AchievementId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ảnh:</TableHead>
                                <TableCell>
                                    <img
                                        className="object-contain w-24"
                                        src={`public/image/${record.ImageUrl}`}
                                    ></img>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Tên:</TableHead>
                                <TableCell>{record.Name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Mô tả:</TableHead>
                                <TableCell>{record.Description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ngày tạo:</TableHead>
                                <TableCell>
                                    {record.CreatedAt.toString()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <DialogFooter>
                    <Button onClick={() => setIsOpen(false)}>Đóng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
