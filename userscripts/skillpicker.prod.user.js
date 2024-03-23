// ==UserScript==
// @name osu-skillpicker
// @version 1.0.0
// @namespace https://osu.ppy.sh/users/9003579
// @description Tampermonkey script for osu! which provides the ability to mark, search and view skillsets for all beatmaps.
// @author dxqwww
// @homepage https://github.com/dxqwww/osu-skillpicker#readme
// @updateURL https://raw.githubusercontent.com/dxqwww/osu-skillpicker/master/userscripts/skillpicker.prod.user.js
// @license https://opensource.org/licenses/MIT
// @match http://osu.ppy.sh/*
// @match https://osu.ppy.sh/*
// @require https://cdn.jsdelivr.net/npm/@trim21/gm-fetch@0.1.13
// @grant GM.xmlHttpRequest
// @grant GM.setValue
// @grant GM.getValue
// ==/UserScript==
/******/(()=>{// webpackBootstrap
/******/"use strict";
/******/var e={
/***/888:
/***/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigManager=void 0;class n{config;constructor(e){this.config={...e}}get(e){return this.config[e]}update(e,t){this.config[e]&&this.config[e]!==t&&(this.config[e]=t)}get[Symbol.toStringTag](){return this.constructor.name}}t.ConfigManager=n}
/***/,
/***/735:
/***/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerManager=t.ModuleManager=void 0;class n{dependencies=new Map;register(e,...t){e?.constructor?.name&&!this.dependencies.has(e)&&this.dependencies.set(e,new e(...t))}get(e){return this.dependencies.has(e)?this.dependencies.get(e):null}get[Symbol.toStringTag](){return this.constructor.name}}class r extends n{[Symbol.iterator](){return this.dependencies.values()}}t.ModuleManager=r;class o extends n{[Symbol.iterator](){return this.dependencies.values()}}t.WorkerManager=o}
/***/,
/***/496:
/***/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PickerError=void 0;class n extends Error{constructor(e){super(e),this.name=this.constructor.name}}t.PickerError=n}
/***/,
/***/650:
/***/function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(496),t),o(n(768),t)},
/***/768:
/***/(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ModuleHeartbeatError=t.ModuleInitializingError=void 0;const r=n(496);class o extends r.PickerError{constructor(e){super(e)}}t.ModuleInitializingError=o;class a extends r.PickerError{constructor(e){super(e)}}t.ModuleHeartbeatError=a}
/***/,
/***/528:
/***/function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(888),t),o(n(735),t)},
/***/2:
/***/function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(588),t),o(n(960),t)},
/***/588:
/***/(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PickerModule=void 0;const r=n(528),o=n(888),a=n(650);class i{initialized=!1;config;workers=new r.WorkerManager;picker;heartbeatIntervalId;constructor(e){this.config=new o.ConfigManager({...e.config}),this.picker=e.picker,this.registerWorkers()}async start(){if(!this.initialized){if(this.initialized=await this.init(),!this.initialized)throw new a.ModuleInitializingError("Cannot initializing module");this.startHeartbeating()}}stop(){this.heartbeatIntervalId&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=null),this.initialized=!1}async init(){for(const e of this.workers)try{await e.execute()}catch{return!1}return!0}async heartbeat(){for(const e of this.workers)try{e.config.get("isBackground")&&await e.continue()}catch{return!1}return!0}startHeartbeating(){this.heartbeatIntervalId&&clearInterval(this.heartbeatIntervalId);const e=this.config.get("heartbeatFailureThreshold");let t=0;this.heartbeatIntervalId=setInterval((async()=>{try{if(!await this.heartbeat()&&++t===e)throw new a.ModuleHeartbeatError(`Module does not respond for ${e/1e3} seconds.`);t--}catch(e){e instanceof a.ModuleHeartbeatError&&(console.error(`<${e.name}>`,e.message,"Trying to restart..."),this.stop(),await this.start())}}),this.config.get("heartbeatRate"))}registerWorkers(){for(const e of this.get_workers())this.workers.register(e,{module:this})}get[Symbol.toStringTag](){return this.constructor.name}}t.PickerModule=i}
/***/,
/***/960:
/***/(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderModule=void 0;const r=n(153),o=n(661),a=n(245),i=n(588);class s extends i.PickerModule{constructor(e){super({config:{...e.config,heartbeatRate:1e3,heartbeatFailureThreshold:3},picker:e.picker})}*get_workers(){yield a.StylesRenderWorker,yield r.FontRenderWorker,yield o.BeatmapRenderWorker}}t.RenderModule=s}
/***/,
/***/748:
/***/(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Picker=void 0;const r=n(528),o=n(650),a=[n(2).RenderModule];class i{isStarted=!1;modules=new r.ModuleManager;config;constructor(e){this.config=new r.ConfigManager({...e.config||{},debug:!0}),this.registerModules(a)}async start(){if(!this.isStarted)for(const e of this.modules)try{await e.start()}catch(e){e instanceof o.ModuleInitializingError&&console.error(`<${e.name}>`,e.message)}}stop(){if(this.isStarted)for(const e of this.modules)e.stop()}registerModules(e){for(const t of e)this.modules.register(t,{picker:this})}get[Symbol.toStringTag](){return this.constructor.name}}t.Picker=i}
/***/,
/***/676:
/***/(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderWorker=void 0;const r=n(775);class o extends r.PickerModuleWorker{constructor(e){super({config:{...e.config},module:e.module})}async continue(){this.isRendered()||await this.execute()}isRendered(){const e=$(`.${this.config.get("targetSelectorName")}`);return Boolean(e.length)}canRender(){const e=$(`.${this.config.get("conditionSelectorName")}`);return Boolean(e.length)}destory(){this.isRendered()&&$(`.${this.config.get("targetSelectorName")}`).remove()}}t.RenderWorker=o}
/***/,
/***/661:
/***/function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.BeatmapRenderWorker=void 0;const o=r(n(669)),a=n(676),i=[{value:1,name:"Jump Aim"},{value:2,name:"Aim Control"},{value:4,name:"Flow Aim"},{value:8,name:"Anti Aim"},{value:16,name:"Snap Aim"},{value:32,name:"Linear Aim"},{value:64,name:"Precision"},{value:128,name:"Stream"},{value:256,name:"Finger Control"},{value:512,name:"Stamina"},{value:1024,name:"Accuracy"},{value:2048,name:"Memory"},{value:4096,name:"Low AR"},{value:8192,name:"High AR"},{value:16384,name:"Tech"},{value:32768,name:"Sliders"},{value:65536,name:"Alternate"},{value:1<<17,name:"Reading"},{value:1<<18,name:"Consistency"},{value:1<<19,name:"Farm"},{value:1<<20,name:"Speed"},{value:1<<21,name:"Rhythm Changing"},{value:1<<22,name:"Gimmick"}];class s extends a.RenderWorker{constructor(e){super({config:{...e.config,isBackground:!0,beatmapPageSelectorName:".js-react--beatmapset-page",conditionSelectorName:".beatmapset-info",targetSelectorName:"osu-skillpicker__beatmap-container"},module:e.module})}async execute(){const e=(0,o.default)(this.config.get("conditionSelectorName")),t=this.config.get("targetSelectorName");(0,o.default)(e).after((0,o.default)("<div>").addClass(t).append((0,o.default)("<div>").addClass("osu-skillpicker-header").append((0,o.default)("<span>").text("osu!")).append((0,o.default)("<span>").text("skillpicker"))).append((0,o.default)("<div>").addClass("osu-skillpicker-tags"))),i.forEach((e=>{(0,o.default)(`.${t} .osu-skillpicker-tags`).append((0,o.default)("<div>").addClass("osu-skillpicker-tag").attr("data-id",e.value).on("click",(e=>(0,o.default)(e.target).find('input[type="checkbox"]').prop("checked",((e,t)=>!t)))).append((0,o.default)("<input>").addClass("osu-skillpicker-tag-toggle").attr("id",`osu-skillpicker-tag-toggle_${e.value}`).attr("type","checkbox")).append((0,o.default)("<label>").addClass("osu-skillpicker-tag-label").attr("for",`osu-skillpicker-tag-toggle_${e.value}`).append((0,o.default)("<span>").text(e.name))))}))}}t.BeatmapRenderWorker=s},
/***/282:
/***/function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.FontRenderWorker=void 0;const o=r(n(669)),a=n(676);class i extends a.RenderWorker{constructor(e){super({config:{...e.config,isBackground:!0,conditionSelectorName:"head",targetSelectorName:"osu-skillpicker__font",googleApisPreconnectUrl:"https://fonts.googleapis.com",gStaticPreconnectUrl:"https://fonts.gstatic.com",fontUrls:["https://fonts.googleapis.com/css2?family=Allerta&display=swap","https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap"]},module:e.module})}async execute(){const e=this.config.get("conditionSelectorName");(0,o.default)(e).append((0,o.default)("<link>").addClass(this.config.get("targetSelectorName")).attr("rel","preconnect").attr("href",this.config.get("googleApisPreconnectUrl"))).append((0,o.default)("<link>").addClass(this.config.get("targetSelectorName")).attr("rel","preconnect").attr("href",this.config.get("gStaticPreconnectUrl")).attr("crossorigin",""));for(const t of this.config.get("fontUrls"))(0,o.default)(e).append((0,o.default)("<link>").addClass(this.config.get("targetSelectorName")).attr("rel","stylesheet").attr("href",t))}}t.FontRenderWorker=i},
/***/153:
/***/function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(282),t)},
/***/245:
/***/function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.StylesRenderWorker=void 0;const o=r(n(669)),a=n(676);class i extends a.RenderWorker{constructor(e){super({config:{...e.config,isBackground:!0,conditionSelectorName:"head",targetSelectorName:"osu-skillpicker__styles"},module:e.module})}async execute(){const e=this.config.get("conditionSelectorName"),t=this.config.get("targetSelectorName");(0,o.default)(e).append((0,o.default)("<style>\n.osu-skillpicker__beatmap-container {\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    gap: 2rem;\n    padding: 20px 8px;\n    background-color: #2E3538;\n    border-radius: 10px;\n    margin: 10px 10px 0 10px;\n}\n\n.osu-skillpicker__beatmap-container .osu-skillpicker-header {\n    font-family: 'Allerta Stencil';\n    font-style: normal;\n    font-weight: 400;\n    font-size: 4vw;\n}\n\n.osu-skillpicker-header span:nth-child(1) {\n    color: #DC98A4;\n}\n\n.osu-skillpicker-header span:nth-child(2) {\n    color: #FFFFFF;\n}\n\n.osu-skillpicker-tags {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-evenly;\n    align-items: center;\n    gap: 8px;\n    font-family: Allerta;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n}\n\n.osu-skillpicker-tag {\n    flex: 0 0 calc(16.66%);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.osu-skillpicker-tag-toggle {\n    display: none;\n}\n\n.osu-skillpicker-tag-label {\n    text-align: center;\n    width: 150px;\n    border-radius: 4px;\n    padding: 8px;\n    cursor: pointer;\n    \n}\n\n.osu-skillpicker-tag-label:hover {\n    background-color: rgba(57, 134, 172, 1);\n    transition: .12s;\n}\n\n@keyframes osu-skillpicker-tag-pop {\n  0% { \n    opacity: 0.2; \n  }\n  50% { \n    opacity: 0.5; \n  }\n  100% {\n    opacity: 1;\n    transform: scale(1.1); \n  }\n}\n\n@keyframes osu-skillpicker-tag-unpop {\n  0% { \n    opacity: 0.2;\n    transform: scale(0.9); \n  }\n  50% { \n    opacity: 0.5; \n  }\n  100% {\n    opacity: 1;\n    transform: scale(1); \n  }\n}\n\n.osu-skillpicker-tag-toggle:checked + .osu-skillpicker-tag-label {\n    animation: osu-skillpicker-tag-pop .12s ease;\n    background-color: #66ccff;\n}\n\n.osu-skillpicker-tag-toggle:not(:checked) + .osu-skillpicker-tag-label {\n    animation: osu-skillpicker-tag-unpop .12s ease;\n}\n\n</style>").addClass(t))}}t.StylesRenderWorker=i},
/***/775:
/***/(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PickerModuleWorker=void 0;const r=n(528);class o{config;module;constructor(e){this.config=new r.ConfigManager({...e.config}),this.module=e.module}get[Symbol.toStringTag](){return this.constructor.name}}t.PickerModuleWorker=o}
/***/,
/***/669:
/***/e=>{e.exports=jQuery;
/***/
/******/}},t={};
/************************************************************************/
/******/ // The module cache
/******/
/******/
/******/ // The require function
/******/function n(r){
/******/ // Check if module is in cache
/******/var o=t[r];
/******/if(void 0!==o)
/******/return o.exports;
/******/
/******/ // Create a new module (and put it into the cache)
/******/var a=t[r]={
/******/ // no module.id needed
/******/ // no module.loaded needed
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/
/******/
/******/ // Return the exports of the module
/******/return e[r].call(a.exports,a,a.exports,n),a.exports;
/******/}
/******/
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(()=>{const e=n(748);window.addEventListener("load",(async()=>{await(async()=>{const t=new e.Picker({config:{debug:!0}});await t.start()})()}),!1)})()})
/******/();