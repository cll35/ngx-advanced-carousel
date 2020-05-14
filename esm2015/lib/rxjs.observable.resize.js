/**
 * @fileoverview added by tsickle
 * Generated from: lib/rxjs.observable.resize.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import ResizeObserver from 'resize-observer-polyfill';
import { Observable } from 'rxjs';
import { debounceTime, finalize, tap } from 'rxjs/operators';
/**
 * An observable creator for element resize.
 * @param {?} elm the watch element.
 * @param {?} cb when resize complete, call back function.
 * @param {?=} time resize emit time, default is 200
 * @return {?}
 */
export function resizeObservable(elm, cb, time = 200) {
    /** @type {?} */
    let elmObserve$;
    return new Observable((/**
     * @param {?} observer
     * @return {?}
     */
    (observer) => {
        elmObserve$ = new ResizeObserver((/**
         * @param {?} entries
         * @param {?} obs
         * @return {?}
         */
        (entries, obs) => {
            observer.next(elmObserve$);
        }));
        elmObserve$.observe(elm);
    })).pipe(debounceTime(time), tap((/**
     * @return {?}
     */
    () => {
        cb();
    })), finalize((/**
     * @return {?}
     */
    () => {
        elmObserve$.unobserve(elm);
        elmObserve$.disconnect();
    })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhqcy5vYnNlcnZhYmxlLnJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9yeGpzLm9ic2VydmFibGUucmVzaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFRN0QsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixHQUFnQixFQUNoQixFQUFjLEVBQ2QsSUFBSSxHQUFHLEdBQUc7O1FBRU4sV0FBMkI7SUFDL0IsT0FBTyxJQUFJLFVBQVU7Ozs7SUFBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRTtRQUNsRCxXQUFXLEdBQUcsSUFBSSxjQUFjOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2hELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBQyxDQUFDLElBQUksQ0FDTCxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQ2xCLEdBQUc7OztJQUFDLEdBQUcsRUFBRTtRQUNQLEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxFQUFDLEVBQ0YsUUFBUTs7O0lBQUMsR0FBRyxFQUFFO1FBQ1osV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmluYWxpemUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBBbiBvYnNlcnZhYmxlIGNyZWF0b3IgZm9yIGVsZW1lbnQgcmVzaXplLlxuICogQHBhcmFtIGVsbSB0aGUgd2F0Y2ggZWxlbWVudC5cbiAqIEBwYXJhbSBjYiB3aGVuIHJlc2l6ZSBjb21wbGV0ZSwgY2FsbCBiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHRpbWUgcmVzaXplIGVtaXQgdGltZSwgZGVmYXVsdCBpcyAyMDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZU9ic2VydmFibGUoXG4gIGVsbTogSFRNTEVsZW1lbnQsXG4gIGNiOiAoKSA9PiB2b2lkLFxuICB0aW1lID0gMjAwLFxuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgbGV0IGVsbU9ic2VydmUkOiBSZXNpemVPYnNlcnZlcjtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XG4gICAgZWxtT2JzZXJ2ZSQgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMsIG9icykgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChlbG1PYnNlcnZlJCk7XG4gICAgfSk7XG4gICAgZWxtT2JzZXJ2ZSQub2JzZXJ2ZShlbG0pO1xuICB9KS5waXBlKFxuICAgIGRlYm91bmNlVGltZSh0aW1lKSxcbiAgICB0YXAoKCkgPT4ge1xuICAgICAgY2IoKTtcbiAgICB9KSxcbiAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICBlbG1PYnNlcnZlJC51bm9ic2VydmUoZWxtKTtcbiAgICAgIGVsbU9ic2VydmUkLmRpc2Nvbm5lY3QoKTtcbiAgICB9KSxcbiAgKTtcbn1cbiJdfQ==