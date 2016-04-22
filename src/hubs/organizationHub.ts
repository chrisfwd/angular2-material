/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../../typings/browser/ambient/signalr/index.d.ts" />

import "jquery";
import {hub} from "./hub";

//organiationHub.server.create(CreateOrganizationCommand command)
//organiationHub.server.modify(ModifyOrganizationCommand command)
//organiationHub.server.remove(RemoveOrganizationCommand command)

let organizationHub = $.connection["organizationHub"];

organizationHub.on("created", (command) => {});
organizationHub.on("modified", (command) => { });
organizationHub.on("removed", (command) => { });

export class OrganizationHub {
    hub = organizationHub;
};