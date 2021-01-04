import { Observable } from 'rxjs';
/**
 * An observable creator for element resize.
 * @param elm the watch element.
 * @param cb when resize complete, call back function.
 * @param time resize emit time, default is 200
 */
export declare function resizeObservable(elm: HTMLElement, cb: () => void, time?: number): Observable<any>;
