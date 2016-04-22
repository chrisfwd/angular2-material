import {Injectable} from 'angular2/core';
import {MessageHistoryHub} from './message-history.hub';
import {IMessage} from "./IMessage";

@Injectable()
export class MessageHistoryService {

    hub: any;
    private _messages: IMessage[] = [];

    constructor(public messageHistoryHub: MessageHistoryHub) {

        this.hub = messageHistoryHub.hub;

        this.hub.on("messageReceived", (message: any, name: string) => {
            message.lastUpdatedDate = new Date(message.lastUpdatedDate.toString());
            this._messages.unshift({ message: message, name: name });
        });

        this.hub.on("purged", () => {
            this._messages = [];
        });

        this.hub.invoke("getHistory", { index: 0, itemsPerPage: 50 });
    }

    addFakeMessage() {
        this.hub.invoke("add");
    }

}