import { useState, useEffect } from "react";

const App = () => {
    /* First run: */
    useEffect(() => {
        navigator.serviceWorker.register(new URL("../service-worker.js", import.meta.url), { type: "module", scope: "." });
    }, []);

    return <div>HIII</div>;
};

export default App;
