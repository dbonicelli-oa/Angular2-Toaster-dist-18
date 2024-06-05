import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import * as i0 from "@angular/core";
// http://stackoverflow.com/questions/26501688/a-typescript-guid-class
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
export class ToasterService {
    addToast;
    _addToast;
    clearToasts;
    _clearToasts;
    removeToast;
    /** @internal */
    _removeToastSubject;
    /**
     * Creates an instance of ToasterService.
     */
    constructor() {
        this.addToast = new Observable((observer) => this._addToast = observer).pipe(share());
        this.clearToasts = new Observable((observer) => this._clearToasts = observer).pipe(share());
        this._removeToastSubject = new Subject();
        this.removeToast = this._removeToastSubject.pipe(share());
    }
    /**
     * Synchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Toast}
     *          The newly created Toast instance with a randomly generated GUID Id.
     */
    pop(type, title, body) {
        const toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;
        if (!toast.toastId) {
            toast.toastId = Guid.newGuid();
        }
        if (!this._addToast) {
            throw new Error('No Toaster Containers have been initialized to receive toasts.');
        }
        this._addToast.next(toast);
        return toast;
    }
    /**
     * Asynchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Observable<Toast>}
     *          A hot Observable that can be subscribed to in order to receive the Toast instance
     *          with a randomly generated GUID Id.
     */
    popAsync(type, title, body) {
        setTimeout(() => {
            this.pop(type, title, body);
        }, 0);
        return this.addToast;
    }
    /**
     * Clears a toast by toastId and/or toastContainerId.
     *
     * @param {string} toastId The toastId to clear.
     * @param {number=} toastContainerId
     *        The toastContainerId of the container to remove toasts from.
     */
    clear(toastId, toastContainerId) {
        const clearWrapper = {
            toastId: toastId, toastContainerId: toastContainerId
        };
        this._clearToasts.next(clearWrapper);
    }
    static ɵfac = function ToasterService_Factory(t) { return new (t || ToasterService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToasterService, factory: ToasterService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7O0FBRXRDLHNFQUFzRTtBQUN0RSxNQUFNLElBQUk7SUFDTixNQUFNLENBQUMsT0FBTztRQUNWLE9BQU8sc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7WUFDckUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBRSxDQUFDO1lBQ3hFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUdELE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLFFBQVEsQ0FBb0I7SUFDcEIsU0FBUyxDQUFrQjtJQUVuQyxXQUFXLENBQTRCO0lBQy9CLFlBQVksQ0FBMEI7SUFFOUMsV0FBVyxDQUE0QjtJQUN2QyxnQkFBZ0I7SUFDaEIsbUJBQW1CLENBQXlCO0lBRTVDOztPQUVHO0lBQ0g7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFRLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQWdCLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2hILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQTtRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsSUFBdUIsRUFBRSxLQUFjLEVBQUUsSUFBYTtRQUN0RCxNQUFNLEtBQUssR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRXpGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsUUFBUSxDQUFDLElBQXVCLEVBQUUsS0FBYyxFQUFFLElBQWE7UUFDM0QsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxPQUFnQixFQUFFLGdCQUF5QjtRQUM3QyxNQUFNLFlBQVksR0FBa0I7WUFDaEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0I7U0FDdkQsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7d0VBNUVRLGNBQWM7Z0VBQWQsY0FBYyxXQUFkLGNBQWMsbUJBREQsTUFBTTs7aUZBQ25CLGNBQWM7Y0FEMUIsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvYXN0LCBUb2FzdFR5cGUgfSBmcm9tICcuL3RvYXN0JztcbmltcG9ydCB7IElDbGVhcldyYXBwZXIgfSBmcm9tICcuL2NsZWFyV3JhcHBlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNjUwMTY4OC9hLXR5cGVzY3JpcHQtZ3VpZC1jbGFzc1xuY2xhc3MgR3VpZCB7XG4gICAgc3RhdGljIG5ld0d1aWQoKSB7XG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PT0gJ3gnID8gciA6ICggciAmIDB4MyB8IDB4OCApO1xuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVG9hc3RlclNlcnZpY2Uge1xuICAgIGFkZFRvYXN0OiBPYnNlcnZhYmxlPFRvYXN0PjtcbiAgICBwcml2YXRlIF9hZGRUb2FzdDogT2JzZXJ2ZXI8VG9hc3Q+O1xuXG4gICAgY2xlYXJUb2FzdHM6IE9ic2VydmFibGU8SUNsZWFyV3JhcHBlcj47XG4gICAgcHJpdmF0ZSBfY2xlYXJUb2FzdHM6IE9ic2VydmVyPElDbGVhcldyYXBwZXI+O1xuXG4gICAgcmVtb3ZlVG9hc3Q6IE9ic2VydmFibGU8SUNsZWFyV3JhcHBlcj47XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9yZW1vdmVUb2FzdFN1YmplY3Q6IFN1YmplY3Q8SUNsZWFyV3JhcHBlcj47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRvYXN0ZXJTZXJ2aWNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFkZFRvYXN0ID0gbmV3IE9ic2VydmFibGU8VG9hc3Q+KChvYnNlcnZlcjogYW55KSA9PiB0aGlzLl9hZGRUb2FzdCA9IG9ic2VydmVyKS5waXBlKHNoYXJlKCkpO1xuICAgICAgICB0aGlzLmNsZWFyVG9hc3RzID0gbmV3IE9ic2VydmFibGU8SUNsZWFyV3JhcHBlcj4oKG9ic2VydmVyOiBhbnkpID0+IHRoaXMuX2NsZWFyVG9hc3RzID0gb2JzZXJ2ZXIpLnBpcGUoc2hhcmUoKSk7XG4gICAgICAgIHRoaXMuX3JlbW92ZVRvYXN0U3ViamVjdCA9IG5ldyBTdWJqZWN0PElDbGVhcldyYXBwZXI+KClcbiAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCA9IHRoaXMuX3JlbW92ZVRvYXN0U3ViamVjdC5waXBlKHNoYXJlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN5bmNocm9ub3VzbHkgY3JlYXRlIGFuZCBzaG93IGEgbmV3IHRvYXN0IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgVG9hc3QpfSB0eXBlIFRoZSB0eXBlIG9mIHRoZSB0b2FzdCwgb3IgYSBUb2FzdCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSB0aXRsZSBUaGUgdG9hc3QgdGl0bGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBib2R5IFRoZSB0b2FzdCBib2R5LlxuICAgICAqIEByZXR1cm5zIHtUb2FzdH1cbiAgICAgKiAgICAgICAgICBUaGUgbmV3bHkgY3JlYXRlZCBUb2FzdCBpbnN0YW5jZSB3aXRoIGEgcmFuZG9tbHkgZ2VuZXJhdGVkIEdVSUQgSWQuXG4gICAgICovXG4gICAgcG9wKHR5cGU6IFRvYXN0VHlwZSB8IFRvYXN0LCB0aXRsZT86IHN0cmluZywgYm9keT86IHN0cmluZyk6IFRvYXN0IHtcbiAgICAgICAgY29uc3QgdG9hc3QgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB7IHR5cGU6IHR5cGUsIHRpdGxlOiB0aXRsZSwgYm9keTogYm9keSB9IDogdHlwZTtcblxuICAgICAgICBpZiAoIXRvYXN0LnRvYXN0SWQpIHtcbiAgICAgICAgICAgIHRvYXN0LnRvYXN0SWQgPSBHdWlkLm5ld0d1aWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fYWRkVG9hc3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gVG9hc3RlciBDb250YWluZXJzIGhhdmUgYmVlbiBpbml0aWFsaXplZCB0byByZWNlaXZlIHRvYXN0cy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FkZFRvYXN0Lm5leHQodG9hc3QpO1xuICAgICAgICByZXR1cm4gdG9hc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXN5bmNocm9ub3VzbHkgY3JlYXRlIGFuZCBzaG93IGEgbmV3IHRvYXN0IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgVG9hc3QpfSB0eXBlIFRoZSB0eXBlIG9mIHRoZSB0b2FzdCwgb3IgYSBUb2FzdCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSB0aXRsZSBUaGUgdG9hc3QgdGl0bGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBib2R5IFRoZSB0b2FzdCBib2R5LlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFRvYXN0Pn1cbiAgICAgKiAgICAgICAgICBBIGhvdCBPYnNlcnZhYmxlIHRoYXQgY2FuIGJlIHN1YnNjcmliZWQgdG8gaW4gb3JkZXIgdG8gcmVjZWl2ZSB0aGUgVG9hc3QgaW5zdGFuY2VcbiAgICAgKiAgICAgICAgICB3aXRoIGEgcmFuZG9tbHkgZ2VuZXJhdGVkIEdVSUQgSWQuXG4gICAgICovXG4gICAgcG9wQXN5bmModHlwZTogVG9hc3RUeXBlIHwgVG9hc3QsIHRpdGxlPzogc3RyaW5nLCBib2R5Pzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUb2FzdD4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wKHR5cGUsIHRpdGxlLCBib2R5KTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVG9hc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGEgdG9hc3QgYnkgdG9hc3RJZCBhbmQvb3IgdG9hc3RDb250YWluZXJJZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b2FzdElkIFRoZSB0b2FzdElkIHRvIGNsZWFyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gdG9hc3RDb250YWluZXJJZFxuICAgICAqICAgICAgICBUaGUgdG9hc3RDb250YWluZXJJZCBvZiB0aGUgY29udGFpbmVyIHRvIHJlbW92ZSB0b2FzdHMgZnJvbS5cbiAgICAgKi9cbiAgICBjbGVhcih0b2FzdElkPzogc3RyaW5nLCB0b2FzdENvbnRhaW5lcklkPzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGNsZWFyV3JhcHBlcjogSUNsZWFyV3JhcHBlciA9IHtcbiAgICAgICAgICAgIHRvYXN0SWQ6IHRvYXN0SWQsIHRvYXN0Q29udGFpbmVySWQ6IHRvYXN0Q29udGFpbmVySWRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9jbGVhclRvYXN0cy5uZXh0KGNsZWFyV3JhcHBlcilcbiAgICB9XG59XG4iXX0=