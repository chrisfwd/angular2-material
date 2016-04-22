/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../../typings/browser/ambient/signalr/index.d.ts" />

import "jquery";
import {hub} from "./hub";

//contactHub.server.create(CreateContactCommand command)
//contactHub.server.modify(ModifyContactCommand command)
//contactHub.server.remove(RemoveContactCommand command)

let contactHub = $.connection["contactHub"];

contactHub.on("created", (command) => { });
contactHub.on("modified", (command) => { });
contactHub.on("removed", (command) => { });

export class ContactHub {
    hub = contactHub;
};