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
import { ModelWidthClass, getAnswerStyle } from "@/Utils";
import { QuestionDetail } from "@/PageCreateQuestion/Utils";

interface ReadModalProps {
    record: QuestionDetail;
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
                                <TableCell>{record.QuestionId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Câu hỏi:</TableHead>
                                <TableCell>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: record.Content || "",
                                        }}
                                    ></div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Lựa chọn:</TableHead>
                                <TableCell>
                                    <ul>
                                        {record.Answers.map((ele) => {
                                            return (
                                                <li
                                                    className={getAnswerStyle(
                                                        ele.IsCorrect
                                                    )}
                                                >
                                                    {ele.Content}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ảnh:</TableHead>
                                <TableCell>
                                    {record.ImageUrl || "NULL"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Âm thanh:</TableHead>
                                <TableCell>
                                    {record.AudioUrl || "NULL"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Giải thích:</TableHead>
                                <TableCell>
                                    {record.ExplainContent || "NULL"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Trắc nghiệm:</TableHead>
                                <TableCell>{record.Type?.Name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Trình độ:</TableHead>
                                <TableCell>
                                    {record.EducationLevel?.Name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Độ khó:</TableHead>
                                <TableCell>
                                    {record.DifficultLevel?.Name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Chủ đề:</TableHead>
                                <TableCell>{record.Subject?.Name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Chủ đề phụ:</TableHead>
                                <TableCell>{record.SubSubject?.Name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ngôn ngữ:</TableHead>
                                <TableCell>{record.Language?.Name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Điểm:</TableHead>
                                <TableCell>{record.Point?.Value}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Điểm phạt:</TableHead>
                                <TableCell>
                                    {record.PenaltyPoint?.Value || "NULL"}
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
