/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
/// <reference path="../../typings/browser/ambient/signalr/index.d.ts" />
/// <reference path="../../typings/browser/ambient/systemjs/index.d.ts" />

import "jquery";
import "signalr/hubs";

$.connection.hub.url = System.paths["signalr/hubs/url"];

export var hub = $.connection.hub;