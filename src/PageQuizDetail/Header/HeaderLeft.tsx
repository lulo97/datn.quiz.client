import { Label } from "@/components/ui/label";

export default function HeaderLeft() {
    return (
        <div className="w-2/3 flex flex-col gap-3">
            <Label>Đề toán lớp 12 chương Hàm Số</Label>
            <p>Khảo sát sự biến thiên và vẽ đồ thị hàm số lớp 12</p>

            <img
                className="object-contain rounded-2xl"
                src="https://mcdn.wallpapersafari.com/medium/46/30/S7zpL2.png"
            ></img>
        </div>
    );
}