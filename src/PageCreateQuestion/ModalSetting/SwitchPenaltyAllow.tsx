import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchPenaltyAllow() {
    return (
        <div className="flex gap-2 items-center">
            <Label>Cho phép phạt</Label>
            <Switch className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200" />
        </div>
    );
}
