import { Subject } from "rxjs";

const temperatureSubject = new Subject({});
const arcticSubject = new Subject({});
const co2Subject = new Subject({});
const methaneSubject = new Subject({});
const nitrousSubject = new Subject({});

export const temperatureService = {
  setData: (data) => temperatureSubject.next({ value: data }),
  clearData: () => temperatureSubject.next(),
  getData: () => temperatureSubject.asObservable(),
};

export const arcticService = {
  setData: (data) => arcticSubject.next({ value: data }),
  clearData: () => arcticSubject.next(),
  getData: () => arcticSubject.asObservable(),
};

export const co2Service = {
  setData: (data) => co2Subject.next({ value: data }),
  clearData: () => co2Subject.next(),
  getData: () => co2Subject.asObservable(),
};

export const methaneService = {
  setData: (data) => methaneSubject.next({ value: data }),
  clearData: () => methaneSubject.next(),
  getData: () => methaneSubject.asObservable(),
};

export const nitrousService = {
  setData: (data) => nitrousSubject.next({ value: data }),
  clearData: () => nitrousSubject.next(),
  getData: () => nitrousSubject.asObservable(),
};

export const oceanService = {
  setData: (data) => oceanSubject.next({ value: data }),
  clearData: () => oceanSubject.next(),
  getData: () => oceanSubject.asObservable(),
};