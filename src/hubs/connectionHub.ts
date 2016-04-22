/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../../typings/browser/ambient/signalr/index.d.ts" />

import "jquery";
import {hub} from "./hub";

//contactHub.server.create(CreateContactToOrgConnectionCommand command)
//contactHub.server.remove(RemoveContactToOrgConnectionCommand command)

let connectionHub = $.connection["connectionHub"];

connectionHub.on("created", (command) => { });
connectionHub.on("removed", (command) => { });

export class ConnectionHub {
    hub = connectionHub;
};