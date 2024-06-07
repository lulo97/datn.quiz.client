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
import { ModelWidthClass } from "@/Utils";
import { QuizDetail } from "@/PageCreateQuiz/Utils";

interface ReadModalProps {
    record: QuizDetail;
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
            <DialogContent
                className={`${ModelWidthClass} max-h-[90%] overflow-y-scroll`}
            >
                <DialogHeader>
                    <DialogTitle>Xem</DialogTitle>
                </DialogHeader>
                <div>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead>Mã:</TableHead>
                                <TableCell>{record.QuizId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Tên đề:</TableHead>
                                <TableCell>
                                    {record.Name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Mô tả:</TableHead>
                                <TableCell>
                                    {record.Description || "NULL"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ảnh:</TableHead>
                                <TableCell>
                                    {record.ImageUrl || "NULL"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Trình độ:</TableHead>
                                <TableCell>
                                    {record.EducationLevel?.Name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Chủ đề:</TableHead>
                                <TableCell>{record.Subject?.Name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Thời gian:</TableHead>
                                <TableCell>{record.Time?.Value}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Số câu:</TableHead>
                                <TableCell>{record.Questions.length}</TableCell>
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
