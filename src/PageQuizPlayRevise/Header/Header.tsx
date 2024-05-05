import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <Label>Câu số: 3/10</Label>
            <Button>Hiện đáp án</Button>
        </div>
    );
}
