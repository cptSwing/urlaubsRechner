import { useEffect, useRef, useState } from "react";

export const DataForm = () => {
    const dataState = useState<UrlaubsData>({
        brutto: 3000,
        urlaubstageJahrInsgesamt: 20,
        urlaubstageJahrGenommen: 0,
        arbeitsTageWoche: 3,
        monateGearbeitet: 1,
        erstesHalbjahr: true,
    });
    const [data] = dataState;

    return (
        <div>
            <div className="mb-8 mt-2 grid grid-flow-col grid-rows-1 items-center justify-start [&>*]:m-1 [&>*]:first:ml-2">
                <BruttoGehalt dataState={dataState} />
                <ArbeitsTage dataState={dataState} />
                <UrlaubsTageJahr dataState={dataState} />
                <MonateGearbeitet dataState={dataState} />
                <UrlaubsTageGenommen dataState={dataState} />
            </div>

            <DisplayValues data={data} />
        </div>
    );
};

const BruttoGehalt = ({ dataState }: { dataState: [UrlaubsData, React.Dispatch<React.SetStateAction<UrlaubsData>>] }) => {
    const [data, setData] = dataState;
    const { brutto } = data;
    const bruttoRef = useRef<null | HTMLInputElement>(null);

    return (
        <div className="flex h-full flex-col items-start justify-start border p-1">
            <div className="mb-2 text-sm">Brutto Gehalt / Monat:</div>
            <input
                ref={bruttoRef}
                className=""
                type="number"
                defaultValue={brutto}
                onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                        setData((oldData) => {
                            return {
                                ...oldData,
                                brutto: parseFloat((ev.target as HTMLInputElement).value),
                            };
                        });
                    }
                }}
                onBlur={(ev) => {
                    setData((oldData) => {
                        return {
                            ...oldData,
                            brutto: parseFloat((ev.target as HTMLInputElement).value),
                        };
                    });
                }}
            />

            <div className="mt-2 w-full">
                <div className="text-sm">Gehaltserhöhung um:</div>
                <div className="-mt-2 mb-2 flex size-full items-center justify-between [&>*]:m-0.5 [&>*]:h-fit [&>*]:min-w-[18%] [&>*]:rounded-md [&>*]:bg-gray-200 [&>*]:p-1 [&>*]:text-center [&>*]:text-sm hover:[&>*]:bg-gray-300">
                    <div
                        onClick={(_e) =>
                            setData((oldVal) => {
                                const newVal = brutto + (brutto / 100) * 5;
                                if (bruttoRef.current) bruttoRef.current.value = newVal.toString();
                                return { ...oldVal, brutto: newVal };
                            })
                        }
                    >
                        5
                    </div>
                    <div
                        onClick={(_e) =>
                            setData((oldVal) => {
                                const newVal = brutto + (brutto / 100) * 7.5;
                                if (bruttoRef.current) bruttoRef.current.value = newVal.toString();
                                return { ...oldVal, brutto: newVal };
                            })
                        }
                    >
                        7.5
                    </div>
                    <div
                        onClick={(_e) =>
                            setData((oldVal) => {
                                const newVal = brutto + (brutto / 100) * 10;
                                if (bruttoRef.current) bruttoRef.current.value = newVal.toString();
                                return { ...oldVal, brutto: newVal };
                            })
                        }
                    >
                        10
                    </div>
                    <div
                        onClick={(_e) =>
                            setData((oldVal) => {
                                const newVal = brutto + (brutto / 100) * 15;
                                if (bruttoRef.current) bruttoRef.current.value = newVal.toString();
                                return { ...oldVal, brutto: newVal };
                            })
                        }
                    >
                        15
                    </div>
                    <div
                        onClick={(_e) =>
                            setData((oldVal) => {
                                const newVal = brutto + (brutto / 100) * 20;
                                if (bruttoRef.current) bruttoRef.current.value = newVal.toString();
                                return { ...oldVal, brutto: newVal };
                            })
                        }
                    >
                        20
                    </div>
                </div>
            </div>
            <div className="mt-auto text-xs">(Bestätigen: Enter oder Tab)</div>
        </div>
    );
};

const ArbeitsTage = ({ dataState }: { dataState: [UrlaubsData, React.Dispatch<React.SetStateAction<UrlaubsData>>] }) => {
    const [data, setData] = dataState;
    const { brutto, urlaubstageJahrInsgesamt, urlaubstageJahrGenommen, arbeitsTageWoche } = data;

    return (
        <div className="flex h-full flex-col items-start justify-start border p-1">
            <div className="mb-2 text-sm">Arbeitstage / Woche:</div>
            <input
                className=""
                type="number"
                defaultValue={arbeitsTageWoche}
                onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                        setData((oldData) => {
                            return {
                                ...oldData,
                                arbeitsTageWoche: parseFloat((ev.target as HTMLInputElement).value),
                            };
                        });
                    }
                }}
                onBlur={(ev) => {
                    setData((oldData) => {
                        return {
                            ...oldData,
                            arbeitsTageWoche: parseFloat((ev.target as HTMLInputElement).value),
                        };
                    });
                }}
            />
            <div className="mt-auto text-xs">(Bestätigen: Enter oder Tab)</div>
        </div>
    );
};

const MonateGearbeitet = ({ dataState }: { dataState: [UrlaubsData, React.Dispatch<React.SetStateAction<UrlaubsData>>] }) => {
    const [data, setData] = dataState;
    const { brutto, urlaubstageJahrInsgesamt, urlaubstageJahrGenommen, arbeitsTageWoche, monateGearbeitet } = data;

    return (
        <div className="relative flex h-full flex-col flex-wrap items-start justify-between divide-y border p-1">
            <div className="flex w-full flex-col items-start justify-start pb-2">
                <div className="mb-2 text-sm">Monate gearbeitet:</div>
                <input
                    className=""
                    type="number"
                    defaultValue={monateGearbeitet}
                    onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                            setData((oldData) => {
                                return {
                                    ...oldData,
                                    monateGearbeitet: parseFloat((ev.target as HTMLInputElement).value),
                                };
                            });
                        }
                    }}
                    onBlur={(ev) => {
                        setData((oldData) => {
                            return {
                                ...oldData,
                                monateGearbeitet: parseFloat((ev.target as HTMLInputElement).value),
                            };
                        });
                    }}
                />
            </div>

            <div className="flex w-full items-center justify-between pb-1 pt-2">
                <label className="mr-auto text-sm" htmlFor="vorJuli">
                    Vor Juli ausgeschieden?
                </label>
                <input
                    className=""
                    type="checkbox"
                    defaultChecked
                    name="vorJuli"
                    onChange={(ev) => {
                        setData((oldData) => {
                            return {
                                ...oldData,
                                erstesHalbjahr: (ev.target as HTMLInputElement).checked,
                            };
                        });
                    }}
                />
            </div>

            <div className="w-full pt-1 text-xs">(Bestätigen: Enter oder Tab)</div>
        </div>
    );
};

const UrlaubsTageJahr = ({ dataState }: { dataState: [UrlaubsData, React.Dispatch<React.SetStateAction<UrlaubsData>>] }) => {
    const [data, setData] = dataState;
    const { brutto, urlaubstageJahrInsgesamt, urlaubstageJahrGenommen, arbeitsTageWoche } = data;

    return (
        <div className="flex h-full flex-col items-start justify-start border p-1">
            <div className="mb-2 text-sm">Urlaubs Tage / Jahr:</div>
            <input
                className=""
                type="number"
                defaultValue={urlaubstageJahrInsgesamt}
                onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                        setData((oldData) => {
                            return {
                                ...oldData,
                                urlaubstageJahrInsgesamt: parseFloat((ev.target as HTMLInputElement).value),
                            };
                        });
                    }
                }}
                onBlur={(ev) => {
                    setData((oldData) => {
                        return {
                            ...oldData,
                            urlaubstageJahrInsgesamt: parseFloat((ev.target as HTMLInputElement).value),
                        };
                    });
                }}
            />

            <div className="mt-auto text-xs">(Bestätigen: Enter oder Tab)</div>
        </div>
    );
};

const UrlaubsTageGenommen = ({ dataState }: { dataState: [UrlaubsData, React.Dispatch<React.SetStateAction<UrlaubsData>>] }) => {
    const [data, setData] = dataState;
    const { brutto, urlaubstageJahrInsgesamt, urlaubstageJahrGenommen, arbeitsTageWoche } = data;

    return (
        <div className="flex h-full flex-col items-start justify-start border p-1">
            <div className="mb-2 text-sm">Genommene Urlaubstage:</div>
            <input
                className=""
                type="number"
                step={1}
                defaultValue={urlaubstageJahrGenommen}
                onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                        setData((oldData) => {
                            return {
                                ...oldData,
                                urlaubstageJahrGenommen: parseFloat((ev.target as HTMLInputElement).value),
                            };
                        });
                    }
                }}
                onBlur={(ev) => {
                    setData((oldData) => {
                        return {
                            ...oldData,
                            urlaubstageJahrGenommen: parseFloat((ev.target as HTMLInputElement).value),
                        };
                    });
                }}
            />

            <div className="mt-auto text-xs">(Bestätigen: Enter oder Tab)</div>
        </div>
    );
};

// 52 Wochen pro Jahr, durch 4 == 13
const rechenGrundlageWochenProQuartal = 52 / 4;

const DisplayValues = ({ data }: { data: UrlaubsData }) => {
    const { brutto, urlaubstageJahrInsgesamt, urlaubstageJahrGenommen, arbeitsTageWoche, monateGearbeitet, erstesHalbjahr } = data;

    const quartalsGehalt = brutto * 3;
    const wochenGehalt = Math.round((quartalsGehalt / rechenGrundlageWochenProQuartal) * 100) / 100;

    let tagesGehalt = wochenGehalt / arbeitsTageWoche;
    tagesGehalt = isFinite(tagesGehalt) ? Math.round(tagesGehalt * 100) / 100 : 0;
    const stundenlohn = Math.round((tagesGehalt / 8) * 100) / 100;

    const urlaubsTageMonat = Math.round((urlaubstageJahrInsgesamt / 12) * 100) / 100;

    let restUrlaubsTage = 0,
        ungerundedeRestUrlaubsTage = 0;
    if (erstesHalbjahr) {
        ungerundedeRestUrlaubsTage = (monateGearbeitet / 12) * urlaubstageJahrInsgesamt - urlaubstageJahrGenommen;
        restUrlaubsTage =
            ungerundedeRestUrlaubsTage % 1 >= 0.5
                ? Math.round(ungerundedeRestUrlaubsTage)
                : Math.round(ungerundedeRestUrlaubsTage * 100) / 100;
    } else {
        restUrlaubsTage = urlaubstageJahrInsgesamt - urlaubstageJahrGenommen;
    }
    restUrlaubsTage = restUrlaubsTage < 0 ? 0 : Math.round(restUrlaubsTage * 100) / 100;

    const durchschnArbeitsTageQuartal = rechenGrundlageWochenProQuartal * arbeitsTageWoche;

    const auszuzahlen = Math.round(((quartalsGehalt * restUrlaubsTage) / durchschnArbeitsTageQuartal) * 100) / 100;

    return (
        <div
            className={
                "grid-row-style m-1 grid grid-cols-[30%_15%_40%_15%] gap-y-2" +
                " [&>*:nth-child(-n+4)]:bg-gray-500 [&>*:nth-child(-n+4)]:text-white [&>*]:flex [&>*]:items-center [&>*]:justify-start [&>*]:border-s [&>*]:border-white [&>*]:p-1"
            }
        >
            <div className="">Kategorie</div>
            <div className="">Wert</div>
            <div className="">Erklärungen</div>
            <div className="">Quellen</div>

            {/* WARN wie wird hier gerundet? */}
            <div>Jahresgehalt:</div>
            <div>
                <span>{brutto * 12}</span>
            </div>
            <div className="text-xs">Bruttogehalt * 12 (?)</div>
            <div className="text-xs" />

            <div>Wochengehalt:</div>
            <div>{wochenGehalt ? <span>{wochenGehalt}</span> : <span className="text-red-600">Warte auf Eingabe</span>}</div>
            <div className="text-xs">
                (Bruttogehalt * 3) / 13<span className="self-start align-super">1</span>
            </div>
            <div className="text-xs">
                <a href="https://studyflix.de/jobs/karriere-tipps/stundenlohn-berechnen-formel-4733" target="_blank">
                    link<span className="self-start align-super">1</span>
                </a>
            </div>

            <div>Tagesgehalt:</div>
            <div>{tagesGehalt ? <span>{tagesGehalt}</span> : <span className="text-red-600">Warte auf Eingabe</span>}</div>
            <div className="text-xs">Wochengehalt / Arbeitstage pro Woche</div>
            <div className="text-xs">
                <a target="_blank"></a>
            </div>

            <div className="mb-12 ">Stundenlohn:</div>
            <div className="mb-12 ">
                {stundenlohn ? <span>{stundenlohn}</span> : <span className="text-red-600">Warte auf Eingabe</span>}
            </div>
            <div className="mb-12 text-xs">Tagesgehalt / 8</div>
            <div className="mb-12 text-xs" />

            <div>Urlaubstage / Monat:</div>
            <div>{urlaubsTageMonat ? <span>{urlaubsTageMonat}</span> : <span className="text-red-600">Warte auf Eingabe</span>}</div>
            <div className="text-xs">Jahres-Urlaubstage / 12</div>
            <div className="text-xs">
                <a target="_blank"></a>
            </div>

            <div>Rest-Urlaubstage:</div>
            <div>
                {typeof restUrlaubsTage === "number" ? (
                    <span>
                        {Math.round(ungerundedeRestUrlaubsTage * 100) / 100} &#8608; {restUrlaubsTage}
                    </span>
                ) : (
                    <span className="text-red-600">Warte auf Eingabe</span>
                )}
            </div>
            <div className="text-xs">
                Ab .5 wird aufgerundet, sonst exakt. <span className="self-start align-super">1</span>
            </div>
            <div className="text-xs [&>*]:px-1 first:[&>*]:pl-0">
                <a
                    className="inline-block"
                    href="https://www.gesetze-im-internet.de/burlg/__5.html#:~:text=Bruchteile%20von%20Urlaubstagen%2C%20die%20mindestens%20einen%20halben%20Tag%20ergeben%2C%20sind%20auf%20volle%20Urlaubstage%20aufzurunden."
                    target="_blank"
                >
                    link<span className="self-start align-super">1</span>
                </a>

                <a
                    className="inline-block"
                    href="https://www.haufe.de/personal/arbeitsrecht/urlaubstage-abrunden_76_463734.html"
                    target="_blank"
                >
                    link<span className="self-start align-super">1</span>
                </a>
            </div>

            <div>Arbeitstage / Quartal:</div>
            <div>
                {durchschnArbeitsTageQuartal ? (
                    <span>{durchschnArbeitsTageQuartal}</span>
                ) : (
                    <span className="text-red-600">Warte auf Eingabe</span>
                )}
            </div>
            <div className="text-xs">13 * Arbeitstage pro Woche</div>
            <div className="text-xs">
                <a target="_blank"></a>
            </div>

            <div className="bg-gradient-to-l from-green-400 to-transparent to-35%">Auszuzahlender Resturlaub:</div>
            <div className="bg-gradient-to-r from-green-400 to-transparent text-white">
                {typeof auszuzahlen === "number" ? <span>{auszuzahlen}</span> : <span className="text-red-600">Warte auf Eingabe</span>}
            </div>
            <div className="text-xs">
                (Bruttogehalt * 3) * Rest-Urlaubstage / Arbeitstage pro Quartal<span className="self-start align-super">1</span>
            </div>
            <div className="text-xs">
                <a
                    href="https://www.advo-law.de/das-passiert-mit-ihrem-resturlaub-bei-einem-aufhebungsvertrag/#5"
                    className=""
                    target="_blank"
                >
                    link<span className="self-start align-super">1</span>
                </a>
            </div>

            <div className="mt-5 !border-r-0 bg-purple-400">Monats-Brutto inkl. auszuzahlendem Resturlaub:</div>
            <div className="mt-5 !border-l-0 bg-purple-400 text-white">
                {typeof auszuzahlen === "number" ? (
                    <span>{brutto + auszuzahlen}</span>
                ) : (
                    <span className="text-red-600">Warte auf Eingabe</span>
                )}
            </div>
            <div className="mt-5 !border-r-0 bg-purple-400"></div>
            <div className="mt-5 !border-l-0 bg-purple-400 text-white"></div>
        </div>
    );
};

const FlexBreak = () => {
    return <div className="h-0 w-full basis-full" />;
};

type UrlaubsData = {
    brutto: number;
    urlaubstageJahrInsgesamt: number;
    urlaubstageJahrGenommen: number;
    arbeitsTageWoche: number;
    monateGearbeitet: number;
    erstesHalbjahr: boolean;
};
