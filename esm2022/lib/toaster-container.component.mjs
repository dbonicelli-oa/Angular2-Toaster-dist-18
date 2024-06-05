import { Component, Input } from '@angular/core';
import { Transitions } from './transitions';
import { ToasterConfig } from './toaster-config';
import * as i0 from "@angular/core";
import * as i1 from "./toaster.service";
import * as i2 from "@angular/common";
import * as i3 from "./toast.component";
const _c0 = a0 => [a0];
const _c1 = (a0, a1) => [a0, a1];
function ToasterContainerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function ToasterContainerComponent_div_1_Template_div_click_0_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.click(toast_r2)); })("clickEvent", function ToasterContainerComponent_div_1_Template_div_clickEvent_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.childClick($event)); })("removeToastEvent", function ToasterContainerComponent_div_1_Template_div_removeToastEvent_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeToast($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("toast", toast_r2)("toasterconfig", ctx_r2.toasterconfig)("@toastState", ctx_r2.toasterconfig.animation)("titleClass", ctx_r2.toasterconfig.titleClass)("messageClass", ctx_r2.toasterconfig.messageClass)("ngClass", i0.ɵɵpureFunction2(6, _c1, ctx_r2.toasterconfig.iconClasses[toast_r2.type], ctx_r2.toasterconfig.typeClasses[toast_r2.type]));
} }
export class ToasterContainerComponent {
    addToastSubscriber;
    clearToastsSubscriber;
    toasterService;
    toasterconfig;
    toasts = [];
    constructor(toasterService) {
        this.toasterService = toasterService;
    }
    ngOnInit() {
        this.registerSubscribers();
        if (this.isNullOrUndefined(this.toasterconfig)) {
            this.toasterconfig = new ToasterConfig();
        }
    }
    // event handlers
    click(toast, isCloseButton) {
        if (toast.onClickCallback) {
            toast.onClickCallback(toast);
        }
        const tapToDismiss = !this.isNullOrUndefined(toast.tapToDismiss)
            ? toast.tapToDismiss
            : this.toasterconfig.tapToDismiss;
        if (tapToDismiss || (toast.showCloseButton && isCloseButton)) {
            this.removeToast(toast);
        }
    }
    childClick($event) {
        this.click($event.value.toast, $event.value.isCloseButton);
    }
    removeToast(toast) {
        const index = this.toasts.indexOf(toast);
        if (index < 0) {
            return;
        }
        ;
        const toastId = this.toastIdOrDefault(toast);
        this.toasts.splice(index, 1);
        if (toast.onHideCallback) {
            toast.onHideCallback(toast);
        }
        this.toasterService._removeToastSubject.next({ toastId: toastId, toastContainerId: toast.toastContainerId });
    }
    // private functions
    registerSubscribers() {
        this.addToastSubscriber = this.toasterService.addToast.subscribe((toast) => {
            this.addToast(toast);
        });
        this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe((clearWrapper) => {
            this.clearToasts(clearWrapper);
        });
    }
    addToast(toast) {
        if (toast.toastContainerId && this.toasterconfig.toastContainerId
            && toast.toastContainerId !== this.toasterconfig.toastContainerId) {
            return;
        }
        ;
        if (!toast.type
            || !this.toasterconfig.typeClasses[toast.type]
            || !this.toasterconfig.iconClasses[toast.type]) {
            toast.type = this.toasterconfig.defaultToastType;
        }
        if (this.toasterconfig.preventDuplicates && this.toasts.length > 0) {
            if (toast.toastId && this.toasts.some(t => t.toastId === toast.toastId)) {
                return;
            }
            else if (this.toasts.some(t => t.body === toast.body)) {
                return;
            }
        }
        if (this.isNullOrUndefined(toast.showCloseButton)) {
            if (typeof this.toasterconfig.showCloseButton === 'object') {
                toast.showCloseButton = this.toasterconfig.showCloseButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === 'boolean') {
                toast.showCloseButton = this.toasterconfig.showCloseButton;
            }
        }
        if (toast.showCloseButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        toast.bodyOutputType = toast.bodyOutputType || this.toasterconfig.bodyOutputType;
        if (this.toasterconfig.newestOnTop) {
            this.toasts.unshift(toast);
            if (this.isLimitExceeded()) {
                this.toasts.pop();
            }
        }
        else {
            this.toasts.push(toast);
            if (this.isLimitExceeded()) {
                this.toasts.shift();
            }
        }
        if (toast.onShowCallback) {
            toast.onShowCallback(toast);
        }
    }
    isLimitExceeded() {
        return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
    }
    removeAllToasts() {
        for (let i = this.toasts.length - 1; i >= 0; i--) {
            this.removeToast(this.toasts[i]);
        }
    }
    clearToasts(clearWrapper) {
        const toastId = clearWrapper.toastId;
        const toastContainerId = clearWrapper.toastContainerId;
        if (this.isNullOrUndefined(toastContainerId) || (toastContainerId === this.toasterconfig.toastContainerId)) {
            this.clearToastsAction(toastId);
        }
    }
    clearToastsAction(toastId) {
        if (toastId) {
            this.removeToast(this.toasts.filter(t => t.toastId === toastId)[0]);
        }
        else {
            this.removeAllToasts();
        }
    }
    toastIdOrDefault(toast) {
        return toast.toastId || '';
    }
    isNullOrUndefined(value) {
        return value === null || typeof value === 'undefined';
    }
    ngOnDestroy() {
        if (this.addToastSubscriber) {
            this.addToastSubscriber.unsubscribe();
        }
        if (this.clearToastsSubscriber) {
            this.clearToastsSubscriber.unsubscribe();
        }
    }
    static ɵfac = function ToasterContainerComponent_Factory(t) { return new (t || ToasterContainerComponent)(i0.ɵɵdirectiveInject(i1.ToasterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToasterContainerComponent, selectors: [["toaster-container"]], inputs: { toasterconfig: "toasterconfig" }, decls: 2, vars: 4, consts: [[1, "toast-container", 3, "ngClass"], ["toastComp", "", "class", "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent", 4, "ngFor", "ngForOf"], ["toastComp", "", 1, "toast", 3, "click", "clickEvent", "removeToastEvent", "toast", "toasterconfig", "titleClass", "messageClass", "ngClass"]], template: function ToasterContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, ToasterContainerComponent_div_1_Template, 1, 9, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, ctx.toasterconfig.positionClass));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.toasts);
        } }, dependencies: [i2.NgClass, i2.NgForOf, i3.ToastComponent], encapsulation: 2, data: { animation: Transitions } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterContainerComponent, [{
        type: Component,
        args: [{
                selector: 'toaster-container',
                template: `
        <div class="toast-container" [ngClass]="[toasterconfig.positionClass]">
            <div toastComp *ngFor="let toast of toasts" class="toast" [toast]="toast"
                [toasterconfig]="toasterconfig"
                [@toastState]="toasterconfig.animation"
                [titleClass]="toasterconfig.titleClass"
                [messageClass]="toasterconfig.messageClass"
                [ngClass]="[
                    toasterconfig.iconClasses[toast.type],
                    toasterconfig.typeClasses[toast.type]
                ]"
                (click)="click(toast)" (clickEvent)="childClick($event)"
                (removeToastEvent)="removeToast($event)"
            >
            </div>
        </div>
        `,
                animations: Transitions
            }]
    }], () => [{ type: i1.ToasterService }], { toasterconfig: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToasterContainerComponent, { className: "ToasterContainerComponent" }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7OztJQVNyQyw4QkFXQztJQURHLEFBRHVCLEFBQXZCLDZNQUFTLHNCQUFZLEtBQUMscUxBQWUseUJBQWtCLEtBQUMsaU1BQ3BDLDBCQUFtQixLQUFDO0lBRTVDLGlCQUFNOzs7O0lBUEYsQUFEQSxBQURBLEFBREEsQUFEQSxBQURzRCxnQ0FBZSx1Q0FDdEMsK0NBQ1EsK0NBQ0EsbURBQ0kseUlBSXpDOztBQVNsQixNQUFNLE9BQU8seUJBQXlCO0lBQzFCLGtCQUFrQixDQUFNO0lBQ3hCLHFCQUFxQixDQUFNO0lBQzNCLGNBQWMsQ0FBaUI7SUFFOUIsYUFBYSxDQUFnQjtJQUUvQixNQUFNLEdBQVksRUFBRSxDQUFDO0lBRTVCLFlBQVksY0FBOEI7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDN0MsQ0FBQztJQUNMLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsS0FBSyxDQUFDLEtBQVksRUFBRSxhQUF1QjtRQUN2QyxJQUFJLEtB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Ozs7Ozs7Ozs7U0FnQkw7Z0JBQ0wsVUFBVSxFQUFFLFdBQVc7YUFDMUI7K0NBTVksYUFBYTtrQkFBckIsS0FBSzs7a0ZBTEcseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LCBcbiAgICBPbkluaXQsXG4gICAgT25EZXN0cm95IFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zaXRpb25zIH0gZnJvbSAnLi90cmFuc2l0aW9ucyc7XG5pbXBvcnQgeyBUb2FzdGVyQ29uZmlnIH0gZnJvbSAnLi90b2FzdGVyLWNvbmZpZyc7XG5pbXBvcnQgeyBUb2FzdGVyU2VydmljZX0gZnJvbSAnLi90b2FzdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUNsZWFyV3JhcHBlciB9IGZyb20gJy4vY2xlYXJXcmFwcGVyJztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndG9hc3Rlci1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1jb250YWluZXJcIiBbbmdDbGFzc109XCJbdG9hc3RlcmNvbmZpZy5wb3NpdGlvbkNsYXNzXVwiPlxuICAgICAgICAgICAgPGRpdiB0b2FzdENvbXAgKm5nRm9yPVwibGV0IHRvYXN0IG9mIHRvYXN0c1wiIGNsYXNzPVwidG9hc3RcIiBbdG9hc3RdPVwidG9hc3RcIlxuICAgICAgICAgICAgICAgIFt0b2FzdGVyY29uZmlnXT1cInRvYXN0ZXJjb25maWdcIlxuICAgICAgICAgICAgICAgIFtAdG9hc3RTdGF0ZV09XCJ0b2FzdGVyY29uZmlnLmFuaW1hdGlvblwiXG4gICAgICAgICAgICAgICAgW3RpdGxlQ2xhc3NdPVwidG9hc3RlcmNvbmZpZy50aXRsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbWVzc2FnZUNsYXNzXT1cInRvYXN0ZXJjb25maWcubWVzc2FnZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJbXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ZXJjb25maWcuaWNvbkNsYXNzZXNbdG9hc3QudHlwZV0sXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ZXJjb25maWcudHlwZUNsYXNzZXNbdG9hc3QudHlwZV1cbiAgICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xpY2sodG9hc3QpXCIgKGNsaWNrRXZlbnQpPVwiY2hpbGRDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAocmVtb3ZlVG9hc3RFdmVudCk9XCJyZW1vdmVUb2FzdCgkZXZlbnQpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCxcbiAgICBhbmltYXRpb25zOiBUcmFuc2l0aW9uc1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdGVyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgYWRkVG9hc3RTdWJzY3JpYmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0c1N1YnNjcmliZXI6IGFueTtcbiAgICBwcml2YXRlIHRvYXN0ZXJTZXJ2aWNlOiBUb2FzdGVyU2VydmljZTtcblxuICAgIEBJbnB1dCgpIHRvYXN0ZXJjb25maWc6IFRvYXN0ZXJDb25maWc7XG5cbiAgICBwdWJsaWMgdG9hc3RzOiBUb2FzdFtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcih0b2FzdGVyU2VydmljZTogVG9hc3RlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50b2FzdGVyU2VydmljZSA9IHRvYXN0ZXJTZXJ2aWNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU3Vic2NyaWJlcnMoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsT3JVbmRlZmluZWQodGhpcy50b2FzdGVyY29uZmlnKSkge1xuICAgICAgICAgICAgdGhpcy50b2FzdGVyY29uZmlnID0gbmV3IFRvYXN0ZXJDb25maWcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgY2xpY2sodG9hc3Q6IFRvYXN0LCBpc0Nsb3NlQnV0dG9uPzogYm9vbGVhbikge1xuICAgICAgICBpZiAodG9hc3Qub25DbGlja0NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0b2FzdC5vbkNsaWNrQ2FsbGJhY2sodG9hc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFwVG9EaXNtaXNzID0gIXRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3QudGFwVG9EaXNtaXNzKSBcbiAgICAgICAgICAgID8gdG9hc3QudGFwVG9EaXNtaXNzXG4gICAgICAgICAgICA6IHRoaXMudG9hc3RlcmNvbmZpZy50YXBUb0Rpc21pc3M7XG5cbiAgICAgICAgaWYgKHRhcFRvRGlzbWlzcyB8fCAodG9hc3Quc2hvd0Nsb3NlQnV0dG9uICYmIGlzQ2xvc2VCdXR0b24pKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRvYXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5jbGljaygkZXZlbnQudmFsdWUudG9hc3QsICRldmVudC52YWx1ZS5pc0Nsb3NlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZW1vdmVUb2FzdCh0b2FzdDogVG9hc3QpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRvYXN0cy5pbmRleE9mKHRvYXN0KTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkgeyByZXR1cm4gfTtcblxuICAgICAgICBjb25zdCB0b2FzdElkID0gdGhpcy50b2FzdElkT3JEZWZhdWx0KHRvYXN0KTtcblxuICAgICAgICB0aGlzLnRvYXN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIGlmICh0b2FzdC5vbkhpZGVDYWxsYmFjaykgeyB0b2FzdC5vbkhpZGVDYWxsYmFjayh0b2FzdCk7IH1cbiAgICAgICAgdGhpcy50b2FzdGVyU2VydmljZS5fcmVtb3ZlVG9hc3RTdWJqZWN0Lm5leHQoeyB0b2FzdElkOiB0b2FzdElkLCB0b2FzdENvbnRhaW5lcklkOiB0b2FzdC50b2FzdENvbnRhaW5lcklkIH0pO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gICAgcHJpdmF0ZSByZWdpc3RlclN1YnNjcmliZXJzKCkge1xuICAgICAgICB0aGlzLmFkZFRvYXN0U3Vic2NyaWJlciA9IHRoaXMudG9hc3RlclNlcnZpY2UuYWRkVG9hc3Quc3Vic2NyaWJlKCh0b2FzdDogVG9hc3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9hc3QodG9hc3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlciA9IHRoaXMudG9hc3RlclNlcnZpY2UuY2xlYXJUb2FzdHMuc3Vic2NyaWJlKChjbGVhcldyYXBwZXI6IElDbGVhcldyYXBwZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUb2FzdHMoY2xlYXJXcmFwcGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb2FzdCh0b2FzdDogVG9hc3QpIHtcbiAgICAgICAgaWYgKHRvYXN0LnRvYXN0Q29udGFpbmVySWQgJiYgdGhpcy50b2FzdGVyY29uZmlnLnRvYXN0Q29udGFpbmVySWRcbiAgICAgICAgICAgICYmIHRvYXN0LnRvYXN0Q29udGFpbmVySWQgIT09IHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkKSB7IHJldHVybiB9O1xuXG4gICAgICAgIGlmICghdG9hc3QudHlwZSBcbiAgICAgICAgICAgIHx8ICF0aGlzLnRvYXN0ZXJjb25maWcudHlwZUNsYXNzZXNbdG9hc3QudHlwZV1cbiAgICAgICAgICAgIHx8ICF0aGlzLnRvYXN0ZXJjb25maWcuaWNvbkNsYXNzZXNbdG9hc3QudHlwZV0pIHtcbiAgICAgICAgICAgIHRvYXN0LnR5cGUgPSB0aGlzLnRvYXN0ZXJjb25maWcuZGVmYXVsdFRvYXN0VHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcucHJldmVudER1cGxpY2F0ZXMgJiYgdGhpcy50b2FzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRvYXN0LnRvYXN0SWQgJiYgdGhpcy50b2FzdHMuc29tZSh0ID0+IHQudG9hc3RJZCA9PT0gdG9hc3QudG9hc3RJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG9hc3RzLnNvbWUodCA9PiB0LmJvZHkgPT09IHRvYXN0LmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3Quc2hvd0Nsb3NlQnV0dG9uKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnRvYXN0ZXJjb25maWcuc2hvd0Nsb3NlQnV0dG9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRvYXN0LnNob3dDbG9zZUJ1dHRvbiA9IHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b25bdG9hc3QudHlwZV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRvYXN0ZXJjb25maWcuc2hvd0Nsb3NlQnV0dG9uID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB0b2FzdC5zaG93Q2xvc2VCdXR0b24gPSA8Ym9vbGVhbj50aGlzLnRvYXN0ZXJjb25maWcuc2hvd0Nsb3NlQnV0dG9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvYXN0LnNob3dDbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgdG9hc3QuY2xvc2VIdG1sID0gdG9hc3QuY2xvc2VIdG1sIHx8IHRoaXMudG9hc3RlcmNvbmZpZy5jbG9zZUh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICB0b2FzdC5ib2R5T3V0cHV0VHlwZSA9IHRvYXN0LmJvZHlPdXRwdXRUeXBlIHx8IHRoaXMudG9hc3RlcmNvbmZpZy5ib2R5T3V0cHV0VHlwZTtcblxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm5ld2VzdE9uVG9wKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0cy51bnNoaWZ0KHRvYXN0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTGltaXRFeGNlZWRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdHMucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0cy5wdXNoKHRvYXN0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTGltaXRFeGNlZWRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdHMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2FzdC5vblNob3dDYWxsYmFjaykge1xuICAgICAgICAgICAgdG9hc3Qub25TaG93Q2FsbGJhY2sodG9hc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0xpbWl0RXhjZWVkZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvYXN0ZXJjb25maWcubGltaXQgJiYgdGhpcy50b2FzdHMubGVuZ3RoID4gdGhpcy50b2FzdGVyY29uZmlnLmxpbWl0O1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlQWxsVG9hc3RzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy50b2FzdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QodGhpcy50b2FzdHNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0cyhjbGVhcldyYXBwZXI6IElDbGVhcldyYXBwZXIpIHtcbiAgICAgICAgY29uc3QgdG9hc3RJZCA9IGNsZWFyV3JhcHBlci50b2FzdElkIDtcbiAgICAgICAgY29uc3QgdG9hc3RDb250YWluZXJJZCA9IGNsZWFyV3JhcHBlci50b2FzdENvbnRhaW5lcklkO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRvYXN0Q29udGFpbmVySWQpIHx8ICh0b2FzdENvbnRhaW5lcklkID09PSB0aGlzLnRvYXN0ZXJjb25maWcudG9hc3RDb250YWluZXJJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUb2FzdHNBY3Rpb24odG9hc3RJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzQWN0aW9uKHRvYXN0SWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRvYXN0SWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QodGhpcy50b2FzdHMuZmlsdGVyKHQgPT4gdC50b2FzdElkID09PSB0b2FzdElkKVswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFRvYXN0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2FzdElkT3JEZWZhdWx0KHRvYXN0OiBUb2FzdCkge1xuICAgICAgICByZXR1cm4gdG9hc3QudG9hc3RJZCB8fCAnJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmFkZFRvYXN0U3Vic2NyaWJlcikgeyB0aGlzLmFkZFRvYXN0U3Vic2NyaWJlci51bnN1YnNjcmliZSgpOyB9XG4gICAgICAgIGlmICh0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlcikgeyB0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlci51bnN1YnNjcmliZSgpOyB9XG4gICAgfVxufVxuIl19