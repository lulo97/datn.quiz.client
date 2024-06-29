import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RatingDetail } from "../Header/Right/Rate";
import { UserRating } from "./UserRating";
import { useState } from "react";
import { FilterByStar } from "./FilterByStar";

export function ModalViewRating(props: { rates: RatingDetail[] }) {
    const { rates } = props;
    const [filterRates, setFilterRates] = useState(rates);

    return (
        <Dialog>
            <DialogTrigger>
                <Label className="hover:text-blue-500 hover:underline">
                    Xem thêm
                </Label>
            </DialogTrigger>
            <DialogContent className="h-[90vh] min-w-[80vw]">
                <div className="flex flex-col">
                    <div className="font-semibold text-lg w-1/3">
                        Bảng đánh giá
                    </div>
                    <FilterByStar
                        rates={rates}
                        setFilterRates={setFilterRates}
                    />

                    <div className="flex flex-col gap-2 h-[65vh] overflow-y-auto">
                        {filterRates.length == 0 && <div>Chưa có đánh giá nào!</div>}
                        {filterRates.map((ele) => (
                            <UserRating key={ele.RatingId} {...ele} />
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
