import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { ReportDetail } from "./Utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { ModalSizeClass } from "@/Utils";

export function ModalRead(record: ReportDetail) {
    return (
        <Dialog>
            <DialogTrigger>
                <Eye className="text-yellow-500 hover:text-yellow-600 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className={`${ModalSizeClass} overflow-y-auto`} >
                <DialogHeader>
                    <DialogTitle>Chi tiết báo cáo</DialogTitle>
                </DialogHeader>
                <div>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead>Mã:</TableHead>
                                <TableCell>{record.ReportId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Lý do:</TableHead>
                                <TableCell>
                                    {record.ReportReason.Name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Đối tượng:</TableHead>
                                <TableCell>
                                    {record.ReportTarget.Name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Người báo cáo:</TableHead>
                                <TableCell>{record.User.Fullname}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Nội dung báo cáo:</TableHead>
                                <TableCell>{record.Content}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ngày tạo:</TableHead>
                                <TableCell>{record.CreatedAt}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Người xử lý:</TableHead>
                                <TableCell>
                                    {record.UserResolve
                                        ? record.UserResolve.Username
                                        : "NULL"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHead>Ngày xử lý:</TableHead>
                                <TableCell>
                                    {record.ResolvedAt
                                        ? record.ResolvedAt
                                        : "NULL"}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}
