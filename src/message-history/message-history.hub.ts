/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../../typings/browser/ambient/signalr/index.d.ts" />
 
import "jquery";
import {hub} from "../hubs/hub";
  
let messagesHub = $.connection["messageHistoryHub"];

/*
We need to define at least 1 handler prior to starting the hub.
Therefore we are defining 1 noop function to act as a placeholder. Later on other handlers can be defined.
 */
messagesHub.on("messageReceived", (message: any, name: string) => { });

messagesHub.on("statusChanged", (status: BusStatus) => { });

messagesHub.on("purged", () => { });

export class BusStatus {

    who: string;

    when: Date;

    enabled: boolean;

}

export class MessageHistoryHub {

    hub = messagesHub;

}