import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, HostListener } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./trust-html.pipe";
const _c0 = ["componentBody"];
const _c1 = ["toastComp", ""];
function ToastComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", null, 0);
} }
function ToastComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
    i0.ɵɵpipe(1, "trustHtml");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r0.toast.body), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.toast.body);
} }
function ToastComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵpipe(1, "trustHtml");
    i0.ɵɵlistener("click", function ToastComponent_button_7_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.click($event, ctx_r0.toast)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r0.toast.closeHtml), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", ctx_r0.progressBarWidth + "%");
} }
export class ToastComponent {
    componentFactoryResolver;
    changeDetectorRef;
    ngZone;
    element;
    renderer2;
    toasterconfig;
    toast;
    titleClass;
    messageClass;
    componentBody;
    progressBarWidth = -1;
    bodyOutputType = BodyOutputType;
    clickEvent = new EventEmitter();
    removeToastEvent = new EventEmitter();
    timeoutId = null;
    timeout = 0;
    progressBarIntervalId = null;
    removeToastTick;
    removeMouseOverListener;
    constructor(componentFactoryResolver, changeDetectorRef, ngZone, element, renderer2) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.element = element;
        this.renderer2 = renderer2;
    }
    ngOnInit() {
        if (this.toast.progressBar) {
            this.toast.progressBarDirection = this.toast.progressBarDirection || 'decreasing';
        }
        let timeout = (typeof this.toast.timeout === 'number')
            ? this.toast.timeout : this.toasterconfig.timeout;
        if (typeof timeout === 'object') {
            timeout = timeout[this.toast.type];
        }
        ;
        this.timeout = timeout;
    }
    ngAfterViewInit() {
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            const component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
            const componentInstance = this.componentBody.createComponent(component, undefined, this.componentBody.injector);
            componentInstance.instance.toast = this.toast;
            this.changeDetectorRef.detectChanges();
        }
        if (this.toasterconfig.mouseoverTimerStop) {
            // only apply a mouseenter event when necessary to avoid
            // unnecessary event and change detection cycles.
            this.removeMouseOverListener = this.renderer2.listen(this.element.nativeElement, 'mouseenter', () => this.stopTimer());
        }
        this.configureTimer();
    }
    click(event, toast) {
        event.stopPropagation();
        this.clickEvent.emit({ value: { toast: toast, isCloseButton: true } });
    }
    stopTimer() {
        this.progressBarWidth = 0;
        this.clearTimers();
    }
    restartTimer() {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (!this.timeoutId) {
                this.configureTimer();
            }
        }
        else if (this.timeout && !this.timeoutId) {
            this.removeToast();
        }
    }
    ngOnDestroy() {
        if (this.removeMouseOverListener) {
            this.removeMouseOverListener();
        }
        this.clearTimers();
    }
    configureTimer() {
        if (!this.timeout || this.timeout < 1) {
            return;
        }
        if (this.toast.progressBar) {
            this.removeToastTick = new Date().getTime() + this.timeout;
            this.progressBarWidth = -1;
        }
        this.ngZone.runOutsideAngular(() => {
            this.timeoutId = window.setTimeout(() => {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                    this.removeToast();
                });
            }, this.timeout);
            if (this.toast.progressBar) {
                this.progressBarIntervalId = window.setInterval(() => {
                    this.ngZone.run(() => {
                        this.updateProgressBar();
                    });
                }, 10);
            }
        });
    }
    updateProgressBar() {
        if (this.progressBarWidth === 0 || this.progressBarWidth === 100) {
            return;
        }
        this.progressBarWidth = ((this.removeToastTick - new Date().getTime()) / this.timeout) * 100;
        if (this.toast.progressBarDirection === 'increasing') {
            this.progressBarWidth = 100 - this.progressBarWidth;
        }
        if (this.progressBarWidth < 0) {
            this.progressBarWidth = 0;
        }
        if (this.progressBarWidth > 100) {
            this.progressBarWidth = 100;
        }
    }
    clearTimers() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
        if (this.progressBarIntervalId) {
            window.clearInterval(this.progressBarIntervalId);
        }
        this.timeoutId = null;
        this.progressBarIntervalId = null;
    }
    removeToast() {
        this.removeToastEvent.emit(this.toast);
    }
    static ɵfac = function ToastComponent_Factory(t) { return new (t || ToastComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["", "toastComp", ""]], viewQuery: function ToastComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5, ViewContainerRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.componentBody = _t.first);
        } }, hostBindings: function ToastComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("mouseleave", function ToastComponent_mouseleave_HostBindingHandler() { return ctx.restartTimer(); });
        } }, inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, attrs: _c1, decls: 9, vars: 9, consts: [["componentBody", ""], [1, "toast-content"], [3, "ngClass"], [3, "ngClass", "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], ["class", "toast-close-button", 3, "innerHTML", "click", 4, "ngIf"], [4, "ngIf"], [3, "innerHTML"], [1, "toast-close-button", 3, "click", "innerHTML"], [1, "toast-progress-bar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 3);
            i0.ɵɵtemplate(4, ToastComponent_div_4_Template, 2, 0, "div", 4)(5, ToastComponent_div_5_Template, 2, 3, "div", 5)(6, ToastComponent_div_6_Template, 2, 1, "div", 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, ToastComponent_button_7_Template, 2, 3, "button", 6)(8, ToastComponent_div_8_Template, 2, 2, "div", 7);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.titleClass);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.toast.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.messageClass)("ngSwitch", ctx.toast.bodyOutputType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Component);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.TrustedHtml);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Default);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.toast.showCloseButton);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.toast.progressBar);
        } }, dependencies: [i1.NgClass, i1.NgIf, i1.NgSwitch, i1.NgSwitchCase, i2.TrustHtmlPipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{
                selector: '[toastComp]',
                template: `
        <div class="toast-content">
            <div [ngClass]="titleClass">{{toast.title}}</div>
            <div [ngClass]="messageClass" [ngSwitch]="toast.bodyOutputType">
                <div *ngSwitchCase="bodyOutputType.Component" #componentBody></div>
                <div *ngSwitchCase="bodyOutputType.TrustedHtml" [innerHTML]="toast.body | trustHtml"></div>
                <div *ngSwitchCase="bodyOutputType.Default">{{toast.body}}</div>
            </div>
        </div>
        <button class="toast-close-button" *ngIf="toast.showCloseButton" (click)="click($event, toast)"
            [innerHTML]="toast.closeHtml | trustHtml">
        </button>
        <div *ngIf="toast.progressBar">
            <div class="toast-progress-bar" [style.width]="progressBarWidth + '%'"></div>
        </div>`
            }]
    }], () => [{ type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }], { toasterconfig: [{
            type: Input
        }], toast: [{
            type: Input
        }], titleClass: [{
            type: Input
        }], messageClass: [{
            type: Input
        }], componentBody: [{
            type: ViewChild,
            args: ['componentBody', { read: ViewContainerRef, static: false }]
        }], clickEvent: [{
            type: Output
        }], removeToastEvent: [{
            type: Output
        }], restartTimer: [{
            type: HostListener,
            args: ['mouseleave']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastComponent, { className: "ToastComponent" }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQU1aLFlBQVksRUFJZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7SUFTbEMsK0JBQW1FOzs7SUFDbkUseUJBQTJGOzs7O0lBQTNDLHNGQUFvQzs7O0lBQ3BGLDJCQUE0QztJQUFBLFlBQWM7SUFBQSxpQkFBTTs7O0lBQXBCLGNBQWM7SUFBZCx1Q0FBYzs7OztJQUdsRSxpQ0FDOEM7O0lBRG1CLG1MQUFTLGtDQUFvQixLQUFDO0lBRS9GLGlCQUFTOzs7SUFETCwyRkFBeUM7OztJQUU3QywyQkFBK0I7SUFDM0IsMEJBQTZFO0lBQ2pGLGlCQUFNOzs7SUFEOEIsY0FBc0M7SUFBdEMsc0RBQXNDOztBQUdsRixNQUFNLE9BQU8sY0FBYztJQXVCYjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBMUJELGFBQWEsQ0FBZ0I7SUFDN0IsS0FBSyxDQUFRO0lBQ2IsVUFBVSxDQUFTO0lBQ25CLFlBQVksQ0FBUztJQUN5QyxhQUFhLENBQW1CO0lBRWhHLGdCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzlCLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFHaEMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFaEMsZ0JBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUU1QyxTQUFTLEdBQVksSUFBSSxDQUFDO0lBQzFCLE9BQU8sR0FBVyxDQUFDLENBQUM7SUFDcEIscUJBQXFCLEdBQVksSUFBSSxDQUFDO0lBQ3RDLGVBQWUsQ0FB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TSxFQUFFLEtBQUssRUFBRTtZQU05RCxVQUFVO2tCQURoQixNQUFNO1lBR0EsZ0JBQWdCO2tCQUR0QixNQUFNO1lBaUVQLFlBQVk7a0JBRFgsWUFBWTttQkFBQyxZQUFZOztrRkE1RWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgXG4gICAgSW5wdXQsIFxuICAgIE91dHB1dCwgXG4gICAgVmlld0NoaWxkLCBcbiAgICBWaWV3Q29udGFpbmVyUmVmLCBcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBcbiAgICBDaGFuZ2VEZXRlY3RvclJlZiwgXG4gICAgT25Jbml0LCBcbiAgICBBZnRlclZpZXdJbml0LCBcbiAgICBPbkRlc3Ryb3ksXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIE5nWm9uZSwgXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vdG9hc3QnO1xuaW1wb3J0IHsgQm9keU91dHB1dFR5cGUgfSBmcm9tICcuL2JvZHlPdXRwdXRUeXBlJztcbmltcG9ydCB7IFRvYXN0ZXJDb25maWcgfSBmcm9tICcuL3RvYXN0ZXItY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdG9hc3RDb21wXScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwidGl0bGVDbGFzc1wiPnt7dG9hc3QudGl0bGV9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJtZXNzYWdlQ2xhc3NcIiBbbmdTd2l0Y2hdPVwidG9hc3QuYm9keU91dHB1dFR5cGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5Db21wb25lbnRcIiAjY29tcG9uZW50Qm9keT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5UcnVzdGVkSHRtbFwiIFtpbm5lckhUTUxdPVwidG9hc3QuYm9keSB8IHRydXN0SHRtbFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLkRlZmF1bHRcIj57e3RvYXN0LmJvZHl9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9hc3QtY2xvc2UtYnV0dG9uXCIgKm5nSWY9XCJ0b2FzdC5zaG93Q2xvc2VCdXR0b25cIiAoY2xpY2spPVwiY2xpY2soJGV2ZW50LCB0b2FzdClcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJ0b2FzdC5jbG9zZUh0bWwgfCB0cnVzdEh0bWxcIj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0b2FzdC5wcm9ncmVzc0JhclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzLWJhclwiIFtzdHlsZS53aWR0aF09XCJwcm9ncmVzc0JhcldpZHRoICsgJyUnXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdG9hc3RlcmNvbmZpZzogVG9hc3RlckNvbmZpZztcbiAgICBASW5wdXQoKSB0b2FzdDogVG9hc3Q7XG4gICAgQElucHV0KCkgdGl0bGVDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1lc3NhZ2VDbGFzczogc3RyaW5nO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbXBvbmVudEJvZHknLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2UgfSkgY29tcG9uZW50Qm9keTogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIHB1YmxpYyBwcm9ncmVzc0JhcldpZHRoOiBudW1iZXIgPSAtMTtcbiAgICBwdWJsaWMgYm9keU91dHB1dFR5cGUgPSBCb2R5T3V0cHV0VHlwZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBjbGlja0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZW1vdmVUb2FzdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxUb2FzdD4oKTtcblxuICAgIHByaXZhdGUgdGltZW91dElkPzogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBwcm9ncmVzc0JhckludGVydmFsSWQ/OiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgcmVtb3ZlVG9hc3RUaWNrOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgdGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiA9IHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gfHwgJ2RlY3JlYXNpbmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRpbWVvdXQgPSAodHlwZW9mIHRoaXMudG9hc3QudGltZW91dCA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICA/IHRoaXMudG9hc3QudGltZW91dCA6IHRoaXMudG9hc3RlcmNvbmZpZy50aW1lb3V0O1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ29iamVjdCcpIHsgXG4gICAgICAgICAgICB0aW1lb3V0ID0gdGltZW91dFt0aGlzLnRvYXN0LnR5cGVdOyBcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudG9hc3QuYm9keU91dHB1dFR5cGUgPT09IHRoaXMuYm9keU91dHB1dFR5cGUuQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRvYXN0LmJvZHkpO1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2U6IGFueSA9IHRoaXMuY29tcG9uZW50Qm9keS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50LCB1bmRlZmluZWQsIHRoaXMuY29tcG9uZW50Qm9keS5pbmplY3Rvcik7XG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZS50b2FzdCA9IHRoaXMudG9hc3Q7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubW91c2VvdmVyVGltZXJTdG9wKSB7XG4gICAgICAgICAgICAvLyBvbmx5IGFwcGx5IGEgbW91c2VlbnRlciBldmVudCB3aGVuIG5lY2Vzc2FyeSB0byBhdm9pZFxuICAgICAgICAgICAgLy8gdW5uZWNlc3NhcnkgZXZlbnQgYW5kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzLlxuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIyLmxpc3RlbihcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXG4gICAgICAgICAgICAgICAgJ21vdXNlZW50ZXInLCBcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnN0b3BUaW1lcigpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmVUaW1lcigpO1xuICAgIH1cblxuICAgIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB0b2FzdDogVG9hc3QpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuY2xpY2tFdmVudC5lbWl0KHsgdmFsdWUgOiB7IHRvYXN0OiB0b2FzdCwgaXNDbG9zZUJ1dHRvbjogdHJ1ZSB9IH0pO1xuICAgIH1cblxuICAgIHN0b3BUaW1lcigpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVycygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBcbiAgICByZXN0YXJ0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubW91c2VvdmVyVGltZXJTdG9wKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZW91dElkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmVUaW1lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZW91dCAmJiAhdGhpcy50aW1lb3V0SWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpZ3VyZVRpbWVyKCkge1xuICAgICAgICBpZiAoIXRoaXMudGltZW91dCB8fCB0aGlzLnRpbWVvdXQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdFRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMudGltZW91dDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IC0xO1xuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9ncmVzc0JhcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9PT0gMCB8fCB0aGlzLnByb2dyZXNzQmFyV2lkdGggPT09IDEwMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9ICgodGhpcy5yZW1vdmVUb2FzdFRpY2sgLSBuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyB0aGlzLnRpbWVvdXQpICogMTAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gPT09ICdpbmNyZWFzaW5nJykge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDEwMCAtIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhcldpZHRoIDwgMCkge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA+IDEwMCkge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDEwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJUaW1lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVUb2FzdCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVUb2FzdEV2ZW50LmVtaXQodGhpcy50b2FzdCk7XG4gICAgfVxufVxuIl19