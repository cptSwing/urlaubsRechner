import { FormEvent, FormEventHandler, useRef, useState } from "react";
import { isNumber } from "./WeightSplit";

const WeightInput = ({
    targetWeightState,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
}) => {
    const [targetWeight, setTargetWeight] = targetWeightState;
    const [weightTempVal, setWeightTempVal] = useState(isNumber(targetWeight) ? (targetWeight as number) : 0);

    return (
        <div className="h-full w-full bg-yellow-300 p-4">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="block" htmlFor="weightValue">
                    Target Weight:
                </label>
                <input
                    className="block"
                    type="text"
                    id="weightValue"
                    name="weightValue"
                    defaultValue={weightTempVal}
                    onInput={(e) => {
                        // @ts-expect-error yes it is
                        setWeightTempVal(parseFloat(e.target.value));
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            setTargetWeight(weightTempVal);
                        }
                    }}
                    // value={weightTempVal}
                    // inputMode="decimal"
                    // pattern="[0-9]+([\.,][0-9]+)?"
                    // step={"0.5"}
                    // min="0"
                />
                <button
                    className="bg-green-600"
                    type="button"
                    onClick={() => {
                        setTargetWeight(weightTempVal);
                    }}
                >
                    Calculate
                </button>
            </form>
        </div>
    );
};

export default WeightInput;
