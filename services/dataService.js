import { ReplaySubject } from "rxjs";

/** Is this worth pushing to subscribers? */
const isUsable = (data) => {
  if (data === null || data === undefined) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === "object") return Object.keys(data).length > 0;
  return true;
};

const createService = (name) => {
  // Buffer of 1: late subscribers get the most recent value.
  const subject = new ReplaySubject(1);

  return {
    setData: (data) => {
      if (!isUsable(data)) {
        // The component keeps its
        // placeholder instead of throwing on a null.
        console.warn(
          `[dataService] ${name}: ignored an empty update (${JSON.stringify(
            data,
          )}). The upstream API probably failed — check /api/${name}-api.`,
        );
        return;
      }
      subject.next({ value: data });
    },
    clearData: () => subject.next({ value: null }),
    getData: () => subject.asObservable(),
  };
};

export const temperatureService = createService("temperature");
export const arcticService = createService("arctic");
export const co2Service = createService("co2");
export const methaneService = createService("methane");
export const nitrousService = createService("nitrous");
export const oceanService = createService("ocean");
