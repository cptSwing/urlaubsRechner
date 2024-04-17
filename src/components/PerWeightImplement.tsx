import { useMemo } from "react";
import plateCalculator from "plate-calculator/lib/plateCalculator";
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
        console.log("%c[PerWeightImplement]", "color: #81b0ba", `implement :`, implement);
        const implementData: ImplementType = {
            key: ImplementEnum[implement],
            val: implement,
        };

        let markup = <></>;
        const w = isNumber(targetWeight) ? (targetWeight as number) : 0;
        switch (implementData.key) {
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
                markup = markupWrap(implementData, w, true);

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
        "15": halveIfMultiple(2, multipleDb),
        "10": halveIfMultiple(6, multipleDb),
        "5": halveIfMultiple(6, multipleDb),
        "2.5": halveIfMultiple(6, multipleDb),
        "2": halveIfMultiple(8, multipleDb),
        "1.25": halveIfMultiple(8, multipleDb),
        "0.5": halveIfMultiple(8, multipleDb),
    };
    const safeSet = Object.entries(setLimits).map((property, idx, arr) => {
        const [string] = property;
        return parseFloat(string);
    });

    const calculated = plateCalculator.calculate(multipleDb ? target / 2 : target, {
        set: safeSet,
        availablePlates: setLimits,
        barbellWeight: data.val,
    }) as CalculatedPlatesType;

    console.log(
        "%c[PerWeightImplement]",
        "color: #41cf75",
        `calculated, setLimits, safeSet , 'str', 1:`,
        calculated,
        setLimits,
        safeSet,
        "str",
        1,
    );

    return (
        <div className="w-full flex-row justify-between">
            <div className="mx-2 inline">
                {`${multipleDb ? "2" : "1"} ${data.val}kg ${data.key}`}: {returnTargetWeight(target, data.val, multipleDb)}kg/side
            </div>

            <div className="mx-2 my-1 inline-flex flex-row items-center justify-start">
                {calculated.plates.map((plate, idx, arr) => {
                    return (
                        <div key={plate.plateWeight + "" + plate.qty + "" + idx} className="inline px-1">
                            {plate.qty / 2}x {plate.plateWeight}
                            {idx === arr.length - 1 ? "" : ";"}
                        </div>
                    );
                })}
            </div>

            <div className="m-2 inline">
                closestWeight: {multipleDb ? (calculated.closestWeight * 2).toString() : calculated.closestWeight.toString()}
            </div>
        </div>
    );
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

const halveIfMultiple = (num: number, isMultiple: boolean) => {
    return num;
    // return isMultiple ? Math.max(num / 2, 0) : num;
};

export enum ImplementEnum {
    "TrapBar" = 16,
    "BarBell" = 10,
    "EzBar" = 7.5,
    "DumbBell" = 2,
    "DumbBells" = 2.5,
}

type ImplementType = {
    key: string;
    val: ImplementEnum;
};

type CalculatedPlatesPlateType = { plateWeight: number; qty: number };

type CalculatedPlatesType = {
    closestWeight: number;
    plates: CalculatedPlatesPlateType[];
};
