import { useState, useEffect } from "react";
import PerWeightImplement, { ImplementEnum } from "../components/PerWeightImplement";
import WeightInput from "../components/WeightInput";
import WeightSplit from "../components/WeightSplit";
import WhichPlates from "../components/WhichPlates";

const App = () => {
    const targetWeightState = useState<number | null>(null);

    /* First run: */
    useEffect(() => {
        navigator.serviceWorker.register(new URL("../service-worker.js", import.meta.url), { type: "module", scope: "." });
    }, []);

    return (
        <div className="w-3/4">
            <div className="">
                <WeightSplit targetWeightState={targetWeightState} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["TrapBar"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["BarBell"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["EzBar"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["DumbBell"]} />
                <PerWeightImplement targetWeightState={targetWeightState} implement={ImplementEnum["DumbBells"]} />
            </div>
            <WeightInput targetWeightState={targetWeightState} />
            <WhichPlates targetWeightState={targetWeightState} />
        </div>
    );
};

export default App;
