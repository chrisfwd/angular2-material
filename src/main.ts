/// <reference path="../node_modules/angular2/core.d.ts" />
/// <reference path="../node_modules/angular2/platform/browser.d.ts" />

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app/app.component';
import {hub} from "./hubs/hub";
import "./message-history/message-history.hub"
import "./hubs/connectionHub"
import "./hubs/contactHub"
import "./hubs/organizationHub"
import "angular2-materialize";

hub
    .start({ waitForPageLoad: false })
    .done(() => { bootstrap(AppComponent); })
    .fail(reason => { console.error("SignalR connection failed", reason); });