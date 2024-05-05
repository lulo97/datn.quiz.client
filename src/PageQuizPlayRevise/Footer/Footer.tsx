import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Footer() {
    return (
        <div className="flex justify-between w-full">
            <Button variant="outline" size="icon"><ChevronLeft /></Button>
            <Button variant="outline" size="icon"><ChevronRight /></Button>
        </div>
    );
}
