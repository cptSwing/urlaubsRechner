import { useEffect, useRef, useState } from "react";
// import plateCalculator from "plate-calculator";
import { isNumber } from "./WeightSplit";

const WhichPlates = ({
    targetWeightState,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
}) => {
    const [targetWeight] = targetWeightState;
    const intermediaryPlateState = useState([{ plateWeight: 0, qty: 0 }]);
    const [intermediaryPlate, setIntermediaryPlate] = intermediaryPlateState;
    const intermediaryRef = useRef(targetWeight ? targetWeight : 0);

    useEffect(() => {
        if (isNumber(targetWeight)) {
        }
    }, [targetWeight]);

    return (
        <div>
            {intermediaryPlate.map((plateData) => {
                return (
                    <div key={plateData.plateWeight + plateData.qty} className="flex h-full w-full flex-row justify-between">
                        <div className="inline">{`${plateData.plateWeight} Kg`}</div>
                        <div className="inline">
                            {plateData.qty}
                            {/* <input
                                        className="bg-red-700 "
                                        type="number"
                                        min={0}
                                        step={2}
                                        onInput={(e) =>
                                            console.log("%c[WhichPlates]", "color: #879c23", `e.target.value :`, e.target.value)
                                        }
                                    /> */}
                        </div>
                        {/* <div className="inline">{intermediaryRef.current}</div> */}
                    </div>
                );
            })}
        </div>
    );
};

export default WhichPlates;

const getPlateCount = (currentWeight: number, count: number, plateWeight: number) => {
    const platesOfTypeSum = plateWeight * count;
    const remaining = currentWeight - platesOfTypeSum;

    return remaining;
};

const plateDatas = [
    {
        weight: 15,
        string: "Plate",
        count: 2,
    },
    {
        weight: 10,
        string: "Plate",
        count: 4,
    },
    {
        weight: 5,
        string: "Plate",
        count: 8,
    },
    {
        weight: 2.5,
        string: "Plate",
        count: 8,
    },
    {
        weight: 2,
        string: "Plate",
        count: 4,
    },
    {
        weight: 1.25,
        string: "Plate",
        count: 6,
    },
    {
        weight: 0.5,
        string: "Plate",
        count: 8,
    },
];
