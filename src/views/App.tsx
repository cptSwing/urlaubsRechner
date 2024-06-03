import { useState, useEffect } from "react";
import PerWeightImplement, { ImplementEnum } from "../components/PerWeightImplement";
import WeightInput from "../components/WeightInput";
import WeightSplit from "../components/WeightSplit";
import WhichPlates from "../components/WhichPlates";
import { DataForm } from "../components/DataForm";

const App = () => {
    const targetWeightState = useState<number | null>(null);

    /* First run: */
    useEffect(() => {
        navigator.serviceWorker.register(new URL("../service-worker.js", import.meta.url), { type: "module", scope: "." });
    }, []);

    return (
        <div className="w-3/4">
            <DataForm />
        </div>
    );
};

export default App;
