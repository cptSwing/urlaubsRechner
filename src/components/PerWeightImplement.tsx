import { useMemo } from "react";
import { isNumber } from "./WeightSplit";

const PerWeightImplement = ({
    targetWeightState,
    implement,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    implement: ImplementEnum;
}) => {
    const [targetWeight] = targetWeightState;

    const implementReturnMemo = useMemo(() => {
        const implementData: ImplementType = {
            implementType: ImplementEnum[implement],
            implementWeight: implement,
            implementSides: 2,
        };

        let markup = <></>;
        const w = isNumber(targetWeight) ? (targetWeight as number) : 0;
        switch (implementData.implementType) {
            case "TrapBar":
                markup = markupWrap(implementData, w);
                break;
            case "BarBell":
                markup = markupWrap(implementData, w);
                break;
            case "EzBar":
                markup = markupWrap(implementData, w);
                break;
            case "DumbBell":
                markup = markupWrap(implementData, w);
                break;
            // eg "Dumbbells"
            default:
                markup = markupWrap({ ...implementData, implementSides: 4 }, w, true);

                // markup = markupWrap({ ...implementData, val: implementData.val * 2 }, true);
                break;
        }

        return markup;
    }, [implement, targetWeight]);

    return implementReturnMemo;
};

export default PerWeightImplement;

function markupWrap(data: ImplementType, target: number, multipleDb = false) {
    const setLimits = {
        "15": quarterIfMultiple(2, multipleDb),
        "10": quarterIfMultiple(6, multipleDb),
        "5": quarterIfMultiple(8, multipleDb),
        "2.5": quarterIfMultiple(8, multipleDb),
        "2": quarterIfMultiple(4, multipleDb),
        "1.25": quarterIfMultiple(6, multipleDb),
        "0.5": quarterIfMultiple(8, multipleDb),
    };
    const safeSet = Object.entries(setLimits).map((property) => {
        const [string] = property;
        return parseFloat(string);
    });

    const targetWeightWithSides = multipleDb ? data.implementWeight * 2 : data.implementWeight;
    const targetWeightCorrected = (target - targetWeightWithSides) / data.implementSides;
    const closest = countWeightPlates(targetWeightCorrected, safeSet, setLimits);

    return (
        <div className="w-full flex-row justify-between">
            <div className="mx-2 inline">
                {`${multipleDb ? "2" : "1"} ${data.implementWeight}kg ${data.implementType}`}:{" "}
                {returnTargetWeight(target, data.implementWeight, multipleDb)}kg/side
            </div>

            <div className="mx-2 my-1 inline-flex flex-row items-center justify-start">
                {Object.entries(closest.plates).map(([plate, count], idx, arr) => {
                    return (
                        <div key={plate + "" + count + "" + idx} className="inline px-1">
                            {count}x {plate}
                            {idx === arr.length - 1 ? "" : ";"}
                        </div>
                    );
                })}
            </div>

            <div className="m-2 inline">
                closestWeight:{" "}
                {(multipleDb ? closest.achievedWeight * 2 : closest.achievedWeight) * 2 +
                    (multipleDb ? data.implementWeight * 2 : data.implementWeight)}
            </div>
        </div>
    );
}

type WeightPlatesType = number[];
type PlateCountType = { [key: number]: number };
type UsedPlatesType = PlateCountType;

function countWeightPlates(targetWeight: number, weightPlates: WeightPlatesType, plateCounts: PlateCountType) {
    // Sort the weight plates array in descending order
    weightPlates.sort((a, b) => b - a);

    function findCombination(remainingWeight: number, index: number, usedPlates: UsedPlatesType, achievedWeight: number) {
        if (remainingWeight === 0 || index >= weightPlates.length) {
            return { achievedWeight, plates: usedPlates };
        }

        const plateWeight = weightPlates[index];
        const plateCount = Math.min(plateCounts[plateWeight] || 0, Math.floor(remainingWeight / plateWeight));

        let bestResult = { achievedWeight, plates: usedPlates };
        for (let count = plateCount; count >= 0; count--) {
            const result = findCombination(
                remainingWeight - count * plateWeight,
                index + 1,
                { ...usedPlates, [plateWeight]: count },
                achievedWeight + count * plateWeight,
            );
            if (
                result.plates !== null &&
                (bestResult.plates === null ||
                    Math.abs(targetWeight - result.achievedWeight) < Math.abs(targetWeight - bestResult.achievedWeight))
            ) {
                bestResult = result;
            }
        }

        return bestResult;
    }

    const bestCombination = findCombination(targetWeight, 0, {}, 0);
    bestCombination.plates = Object.fromEntries(Object.entries(bestCombination.plates).filter(([plate, count]) => count > 0));
    return bestCombination;
}

function returnTargetWeight(weight: number | null, implementWeight: number, multipleDb = false) {
    const defaultNum = 0;
    return multipleDb
        ? weight
            ? (weight - implementWeight * 2) / 2 / 2
            : defaultNum
        : weight
          ? (weight - implementWeight) / 2
          : defaultNum;
}

const quarterIfMultiple = (num: number, isMultiple: boolean) => {
    // return num;
    return isMultiple ? num / 4 : num / 2;
};

export enum ImplementEnum {
    "TrapBar" = 16,
    "BarBell" = 10,
    "EzBar" = 7.5,
    "DumbBell" = 2,
    "DumbBells" = 2.5,
}

type ImplementType = {
    implementType: string;
    implementWeight: ImplementEnum;
    implementSides: number;
};
