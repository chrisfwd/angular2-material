import {Component, Directive, Renderer, ElementRef, NgZone} from 'angular2/core';
import {CurrentStatusComponent} from './current-status.component';
import {MessageHistoryHub} from './message-history.hub';
import {MaterializeDirective} from "angular2-materialize";
import {IMessage} from "./IMessage";

@Directive({
    selector: '.collapsible-header'
})
class HighlightHeader {
    constructor(public renderer: Renderer, public elementRef: ElementRef) { }

    ngOnInit() {
        var renderer = this.renderer,
            el = this.elementRef.nativeElement;
        renderer.setElementClass(el, "highlight", true);
        setTimeout(() => { renderer.setElementClass(el, "highlight", false);}, 1100);
    }
}

@Component({
    selector: 'message-history',
    directives: [MaterializeDirective, CurrentStatusComponent, HighlightHeader],
    providers: [MessageHistoryHub],
    templateUrl: './app/message-history/message-history.component.html',
    styleUrls: ['./app/message-history/message-history.component.css']
})
export class MessageHistoryComponent {

    hub: any;
    messages: IMessage[] = [];
    zone: NgZone;

    constructor(public messageHistoryHub: MessageHistoryHub, zone:NgZone) {

        this.hub = messageHistoryHub.hub;

        this.hub.on("messageReceived", (message: any, name: string) => {
            zone.run(() => {
                message.lastUpdatedDate = new Date(message.lastUpdatedDate.toString());
                this.messages.unshift({ message: message, name: name });
            });
        });

        this.hub.on("purged", () => {
            zone.run(() => {
                this.messages = [];
            });
        });

        this.hub.invoke("getHistory", {index: 0, itemsPerPage: 50});
    }

    addFakeMessage() {
        this.hub.invoke("add");
    }

};