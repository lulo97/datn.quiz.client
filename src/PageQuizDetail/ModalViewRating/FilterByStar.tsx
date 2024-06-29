import { Star } from "lucide-react";
import { useState } from "react";
import { RatingDetail } from "../Header/Right/Rate";

enum Filter {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    All = -1,
}

interface Props {
    rates: RatingDetail[];
    setFilterRates: React.Dispatch<React.SetStateAction<RatingDetail[]>>;
}

export function FilterByStar(props: Props) {
    const { rates, setFilterRates } = props;
    const [currentStar, setCurrentStar] = useState(Filter.All);

    function handleFilterByStar(num: number) {
        if (num === Filter.All) {
            setFilterRates(rates);
        } else {
            setFilterRates(rates.filter((ele) => ele.Score === num));
        }
        setCurrentStar(num);
    }

    const filters = [
        { value: Filter.One, label: '1' },
        { value: Filter.Two, label: '2' },
        { value: Filter.Three, label: '3' },
        { value: Filter.Four, label: '4' },
        { value: Filter.Five, label: '5' },
        { value: Filter.All, label: 'Tất cả' },
    ];

    return (
        <div className="w-full flex gap-4 justify-start my-2">
            {filters.map((filter) => (
                <div
                    key={filter.value}
                    onClick={() => handleFilterByStar(filter.value)}
                    className={`${
                        currentStar === filter.value ? "bg-gray-400" : ""
                    } flex gap-2 items-center py-1 px-3 w-fit border border-gray-900 border-2 rounded-lg`}
                >
                    <div className={`text-sm mr-1 ${
                        currentStar === filter.value ? "text-white" : "text-gray-700 "
                    }`}>{filter.label}</div>
                    {filter.value !== Filter.All && <Star fill="yellow" />}
                </div>
            ))}
        </div>
    );
}
