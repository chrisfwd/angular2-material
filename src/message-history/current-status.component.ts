import {Component, NgZone} from 'angular2/core';
import {MessageHistoryHub, BusStatus} from './message-history.hub';
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'current-status',
    directives: [MaterializeDirective],
    providers: [MessageHistoryHub],
    templateUrl: './app/message-history/current-status.component.html'
})
export class CurrentStatusComponent {

    hub: any;
    status: BusStatus;
    zone: NgZone;

    constructor(public messageHistoryHub: MessageHistoryHub, zone: NgZone) {

        this.hub = messageHistoryHub.hub;

        this.hub.on("statusChanged", (status: BusStatus) => {
            zone.run(() => {
                status.when = new Date(status.when.toString());
                this.status = status;
            });
        });

        //this.hub.on("purged", () => {
        //    zone.run(() => {
        //        alert("All data has been removed from the system");
        //    });
        //});

        this.hub.invoke("currentStatus");
    }

    purge() {

        this.hub.invoke("purge");

    }

    toggleMessageFlow() {

        if (this.status !== null && this.status.enabled) {

            this.hub.invoke("disableMessagePassthrough");

        } else {

            this.hub.invoke("enableMessagePassthrough");

        }
    }

}; 