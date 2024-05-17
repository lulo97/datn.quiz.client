import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MyDatePicker } from "./MyDatePicker";

import dayjs from "dayjs";
import { TimePicker } from "antd";

export function ModalSettingContent() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
                <div className="w-1/2">
                    <Label>Tên phòng</Label>
                    <Input placeholder="Phòng ABC..." />
                </div>
                <div className="w-1/2">
                    <Label>Số người tối đa</Label>
                    <Input type="number" placeholder="50" />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <Label>Mật khẩu truy cập</Label>
                    <div className="flex items-center gap-3">
                        <Label>Bật cài đặt mật khẩu</Label>
                        <Checkbox />
                    </div>
                </div>

                <Input placeholder="Mật khẩu..." type="password" />
            </div>
            <div>
                <Label>Xác nhận mật khẩu</Label>
                <Input placeholder="Mật khẩu..." type="password" />
            </div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-between gap-1">
                        <Label>Ngày làm bài</Label>
                        <MyDatePicker />
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                        <Label>Giờ làm bài</Label>
                        <TimePicker
                            className="h-full"
                            onChange={() => console.log(123)}
                            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                            defaultValue={dayjs("15:00:00", "HH:mm:ss")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
