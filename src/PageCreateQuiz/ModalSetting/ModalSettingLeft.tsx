import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SelectSubject from "@/PageCreateQuestion/ModalSetting/SelectSubject";
import SelectEducationLevel from "@/PageCreateQuestion/ModalSetting/SelectEducation";

export default function ModalSettingContentLeft() {
    return (
        <div className="w-1/2">
            <Label>Tên đề</Label>
            <Input placeholder="Tên đề..." />
            <Label>Mô tả</Label>
            <Textarea placeholder="Giới thiệu về đề..." />
            <SelectSubject />
            <SelectEducationLevel />
            <div className="flex gap-2 items-center">
                <Label>Công khai</Label>
                <Switch className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200" />
            </div>
        </div>
    );
}
