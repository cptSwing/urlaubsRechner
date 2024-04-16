import { useMemo } from "react";

const WeightSplit = ({
    targetWeightState,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
}) => {
    const [targetWeight] = targetWeightState;

    const roundedNumbersMemo = useMemo(() => {
        if (isNumber(targetWeight)) {
            return {
                half: (targetWeight as number) * 0.5,
                threeQuarters: (targetWeight as number) * 0.75,
                full: targetWeight as number,
            };
        } else {
            return {
                half: 0,
                threeQuarters: 0,
                full: 0,
            };
        }
    }, [targetWeight]);

    return (
        <div className="h-full w-full flex-col bg-red-300 p-4">
            <div className="flex justify-between">
                <div>50%:</div>
                <div>{roundedNumbersMemo.half}</div>
            </div>
            <div className="flex justify-between">
                <div>75%:</div>
                <div>{roundedNumbersMemo.threeQuarters}</div>
            </div>
            <div className="flex justify-between">
                <div>100%:</div>
                <div>{roundedNumbersMemo.full}</div>
            </div>
        </div>
    );
};

export default WeightSplit;

export function isNumber(num: number | null) {
    console.log(
        "%c[WeightSplit]",
        "color: #759e99",
        `typeof num === "number" && isFinite(num) :`,
        typeof num === "number" && isFinite(num),
    );
    return typeof num === "number" && isFinite(num);
}
