import { useMemo } from "react";

const PerWeightImplement = ({
    targetWeightState,
    implement,
}: {
    targetWeightState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
    implement: ImplementEnum;
}) => {
    const [targetWeight] = targetWeightState;

    const implementReturnMemo = useMemo(() => {
        const keyVal = {
            key: ImplementEnum[implement],
            val: implement,
        };

        let markup = <></>;

        switch (keyVal.key) {
            case "TrapBar":
                markup = markupWrap(keyVal.key);
                break;
            case "BarBell":
                markup = markupWrap(keyVal.key);
                break;
            case "EzBar":
                markup = markupWrap(keyVal.key);
                break;
            case "DumbBell":
                markup = markupWrap(keyVal.key);
                break;
            // eg "Dumbbells"
            default:
                markup = markupWrap(keyVal.key, true);
                break;
        }

        return markup;

        function markupWrap(innerChild: string, multipleDb = false) {
            return (
                <div className="w-full flex-row justify-between">
                    <div className="m-2 inline">{`${innerChild} (${keyVal.val} Kg)`}</div>
                    {multipleDb ? (
                        <div className="m-2 inline">{returnTargetWeight(targetWeight, keyVal.val, multipleDb)}</div>
                    ) : (
                        <div className="m-2 inline">{returnTargetWeight(targetWeight, keyVal.val, multipleDb)}</div>
                    )}
                </div>
            );
        }
    }, [implement, targetWeight]);

    return implementReturnMemo;
};

export default PerWeightImplement;

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

export enum ImplementEnum {
    "TrapBar" = 16,
    "BarBell" = 10,
    "EzBar" = 7.5,
    "DumbBell" = 2,
    "DumbBells" = 2.5,
}
