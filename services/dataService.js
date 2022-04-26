
import { Subject } from "rxjs";

const temperatureSubject = new Subject({});
const arcticSubject = new Subject({});
const co2Subject = new Subject({});

export const temperatureService = {
    setData: data => temperatureSubject.next({ value: data }),
    clearData: () => temperatureSubject.next(),
    getData: () => temperatureSubject.asObservable()
};

export const arcticService = {
    setData: ({value, isLoading}) => arcticSubject.next({ value: value, isLoading: isLoading }),
    clearData: () => arcticSubject.next(),
    getData: () => arcticSubject.asObservable()
};

export const co2Service = {
    setData: (data) => co2Subject.next({value: data}),
    clearData: () => co2Subject.next(),
    getData: () => co2Subject.asObservable()
};

co2Subject.subscribe((data) => console.log(data))
temperatureSubject.subscribe((data) => console.log(data))