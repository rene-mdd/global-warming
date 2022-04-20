
import { Subject } from "rxjs";

const subject = new Subject();
const arcticSubject = new Subject({});

export const dataService = {
    setData: data => subject.next({ value: data }),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};

export const arcticService = {
    setData: ({value, isLoading}) => arcticSubject.next({ value: value, isLoading: isLoading }),
    clearData: () => arcticSubject.next(),
    getData: () => arcticSubject.asObservable()
};

arcticSubject.subscribe((data) => console.log(data))