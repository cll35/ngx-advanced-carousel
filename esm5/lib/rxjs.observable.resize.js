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
export function resizeObservable(elm, cb, time) {
    if (time === void 0) { time = 200; }
    /** @type {?} */
    var elmObserve$;
    return new Observable((/**
     * @param {?} observer
     * @return {?}
     */
    function (observer) {
        elmObserve$ = new ResizeObserver((/**
         * @param {?} entries
         * @param {?} obs
         * @return {?}
         */
        function (entries, obs) {
            observer.next(elmObserve$);
        }));
        elmObserve$.observe(elm);
    })).pipe(debounceTime(time), tap((/**
     * @return {?}
     */
    function () {
        cb();
    })), finalize((/**
     * @return {?}
     */
    function () {
        elmObserve$.unobserve(elm);
        elmObserve$.disconnect();
    })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhqcy5vYnNlcnZhYmxlLnJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9yeGpzLm9ic2VydmFibGUucmVzaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFRN0QsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixHQUFnQixFQUNoQixFQUFjLEVBQ2QsSUFBVTtJQUFWLHFCQUFBLEVBQUEsVUFBVTs7UUFFTixXQUEyQjtJQUMvQixPQUFPLElBQUksVUFBVTs7OztJQUFDLFVBQUMsUUFBeUI7UUFDOUMsV0FBVyxHQUFHLElBQUksY0FBYzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxHQUFHO1lBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBQyxDQUFDLElBQUksQ0FDTCxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQ2xCLEdBQUc7OztJQUFDO1FBQ0YsRUFBRSxFQUFFLENBQUM7SUFDUCxDQUFDLEVBQUMsRUFDRixRQUFROzs7SUFBQztRQUNQLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUMsRUFBQyxDQUNILENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbmFsaXplLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogQW4gb2JzZXJ2YWJsZSBjcmVhdG9yIGZvciBlbGVtZW50IHJlc2l6ZS5cbiAqIEBwYXJhbSBlbG0gdGhlIHdhdGNoIGVsZW1lbnQuXG4gKiBAcGFyYW0gY2Igd2hlbiByZXNpemUgY29tcGxldGUsIGNhbGwgYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB0aW1lIHJlc2l6ZSBlbWl0IHRpbWUsIGRlZmF1bHQgaXMgMjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNpemVPYnNlcnZhYmxlKFxuICBlbG06IEhUTUxFbGVtZW50LFxuICBjYjogKCkgPT4gdm9pZCxcbiAgdGltZSA9IDIwMCxcbik6IE9ic2VydmFibGU8YW55PiB7XG4gIGxldCBlbG1PYnNlcnZlJDogUmVzaXplT2JzZXJ2ZXI7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xuICAgIGVsbU9ic2VydmUkID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzLCBvYnMpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQoZWxtT2JzZXJ2ZSQpO1xuICAgIH0pO1xuICAgIGVsbU9ic2VydmUkLm9ic2VydmUoZWxtKTtcbiAgfSkucGlwZShcbiAgICBkZWJvdW5jZVRpbWUodGltZSksXG4gICAgdGFwKCgpID0+IHtcbiAgICAgIGNiKCk7XG4gICAgfSksXG4gICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgZWxtT2JzZXJ2ZSQudW5vYnNlcnZlKGVsbSk7XG4gICAgICBlbG1PYnNlcnZlJC5kaXNjb25uZWN0KCk7XG4gICAgfSksXG4gICk7XG59XG4iXX0=