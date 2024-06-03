import { useState, useEffect } from "react";
import { DataForm } from "../components/DataForm";

const App = () => {
    const targetWeightState = useState<number | null>(null);

    /* First run: */
    useEffect(() => {
        navigator.serviceWorker.register(new URL("../service-worker.js", import.meta.url), { type: "module", scope: "." });
    }, []);

    return (
        <div className="relative">
            <DataForm />
        </div>
    );
};

export default App;
