import { useState, useEffect } from "react";
import PerWeightImplement, { ImplementEnum } from "../components/PerWeightImplement";
import WeightInput from "../components/WeightInput";
import WeightSplit from "../components/WeightSplit";

const App = () => {
    const targetWeightState = useState<number | null>(null);
    const [targetWeight] = targetWeightState;

    /* First run: */
    useEffect(() => {
        navigator.serviceWorker.register(new URL("../service-worker.js", import.meta.url), { type: "module", scope: "." });
    }, []);

    /* First run: */
    useEffect(() => {
        console.log("%c[App]", "color: #9c9cd5", `targetWeight :`, targetWeight);
    }, [targetWeight]);

    return (
        <div className="w-1/2">
            <div className="w-1/2">
                <WeightSplit targetWeightState={targetWeightState} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["TrapBar"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["BarBell"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["EzBar"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["DumbBell"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["DumbBells"]} />
            </div>
            <WeightInput targetWeightState={targetWeightState} />
        </div>
    );
};

export default App;
