Ionic.loadComponents("77178b1f",["ion-button","Button",[],[],1,1,":host{visibility:inherit!important}.button{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;position:relative;z-index:0;display:inline-block;text-align:center;text-overflow:ellipsis;text-transform:none;white-space:nowrap;cursor:pointer;vertical-align:top;vertical-align:-webkit-baseline-middle;transition:background-color,opacity .1s linear;font-kerning:none;user-select:none;contain:content}.button-inner{display:flex;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%}[ion-button]{text-decoration:none}[ion-button][disabled],a[disabled],button[disabled]{cursor:default;opacity:.4;pointer-events:none}.button-block{display:block;clear:both;width:100%;contain:strict}.button-block::after{clear:both}.button-full{display:block;width:100%;contain:strict}.button-full.button-outline{border-right-width:0;border-left-width:0;border-radius:0}.button-ios{margin:.4rem .2rem;padding:0 1em;height:2.8em;border-radius:4px;font-size:1.6rem;color:#fff;background-color:#327eff}.button-ios.activated{background-color:#2e74eb;opacity:1}.button-ios:hover:not(.disable-hover){opacity:.8}.button-large-ios{padding:0 1em;height:2.8em;font-size:2rem}.button-small-ios{padding:0 .9em;height:2.1em;font-size:1.3rem}.button-small-ios[icon-only] ion-icon{font-size:1.3em}.button-block-ios{margin-right:0;margin-left:0}.button-full-ios{margin-right:0;margin-left:0;border-right-width:0;border-left-width:0;border-radius:0}.button-outline-ios{border-width:1px;border-style:solid;border-radius:4px;border-color:#327eff;color:#327eff;background-color:transparent}.button-outline-ios.activated{color:#fff;background-color:#327eff;opacity:1}.button-clear-ios{border-color:transparent;color:#327eff;background-color:transparent}.button-clear-ios.activated{background-color:transparent;opacity:.4}.button-clear-ios:hover:not(.disable-hover){color:#327eff;opacity:.6}.button-round-ios{padding:0 2.6rem;border-radius:64px}.button-ios-primary{color:#fff;background-color:#327eff}.button-ios-primary.activated{background-color:#2e74eb}.button-outline-ios-primary{border-color:#327eff;color:#327eff;background-color:transparent}.button-outline-ios-primary.activated{color:#fff;background-color:#327eff}.button-clear-ios-primary{border-color:transparent;color:#327eff;background-color:transparent}.button-clear-ios-primary.activated{opacity:.4}.button-clear-ios-primary:hover:not(.disable-hover){color:#327eff}.button-ios-secondary{color:#fff;background-color:#32db64}.button-ios-secondary.activated{background-color:#2ec95c}.button-outline-ios-secondary{border-color:#32db64;color:#32db64;background-color:transparent}.button-outline-ios-secondary.activated{color:#fff;background-color:#32db64}.button-clear-ios-secondary{border-color:transparent;color:#32db64;background-color:transparent}.button-clear-ios-secondary.activated{opacity:.4}.button-clear-ios-secondary:hover:not(.disable-hover){color:#32db64}.button-ios-danger{color:#fff;background-color:#f53d3d}.button-ios-danger.activated{background-color:#e13838}.button-outline-ios-danger{border-color:#f53d3d;color:#f53d3d;background-color:transparent}.button-outline-ios-danger.activated{color:#fff;background-color:#f53d3d}.button-clear-ios-danger{border-color:transparent;color:#f53d3d;background-color:transparent}.button-clear-ios-danger.activated{opacity:.4}.button-clear-ios-danger:hover:not(.disable-hover){color:#f53d3d}.button-ios-light{color:#000;background-color:#f4f4f4}.button-ios-light.activated{background-color:#e0e0e0}.button-outline-ios-light{border-color:#f4f4f4;color:#f4f4f4;background-color:transparent}.button-outline-ios-light.activated{color:#000;background-color:#f4f4f4}.button-clear-ios-light{border-color:transparent;color:#f4f4f4;background-color:transparent}.button-clear-ios-light.activated{opacity:.4}.button-clear-ios-light:hover:not(.disable-hover){color:#f4f4f4}.button-ios-dark{color:#fff;background-color:#222}.button-ios-dark.activated{background-color:#343434}.button-outline-ios-dark{border-color:#222;color:#222;background-color:transparent}.button-outline-ios-dark.activated{color:#fff;background-color:#222}.button-clear-ios-dark{border-color:transparent;color:#222;background-color:transparent}.button-clear-ios-dark.activated{opacity:.4}.button-clear-ios-dark:hover:not(.disable-hover){color:#222}.button-strong-ios{font-weight:600}",function(o,t,r){"use strict";var n=function(){function o(){this.large=!1,this.small=!1,this.default=!1,this.outline=!1,this.clear=!1,this.solid=!1,this.round=!1,this.block=!1,this.full=!1,this.strong=!1}return o.prototype.getElementClassList=function(o,t){return o?[o,o+"-"+t]:[]},o.prototype.getClassList=function(o,t,r){return t?(t=t.toLocaleLowerCase(),[o+"-"+t,o+"-"+t+"-"+r]):[]},o.prototype.getColorClassList=function(o,t,r,n){if(!o)return null;r="bar-button"!==t&&"solid"===r?"default":r;var e=t+(r&&"default"!==r?"-"+r.toLowerCase():"");return console.log(t,r,e,n,o),e+"-"+n+"-"+o},o.prototype.render=function(){var o="button",r=(this.large?"large":null)||(this.small?"small":null)||(this.default?"default":null),n=(this.outline?"outline":null)||(this.clear?"clear":null)||(this.solid?"solid":null)||"default",e=this.round?"round":null,i=(this.block?"block":null)||(this.full?"full":null),a=this.strong?"strong":null,l=[].concat(this.getElementClassList(o,this.mode),this.getClassList(o,e,this.mode),this.getClassList(o,i,this.mode),this.getClassList(o,r,this.mode),this.getClassList(o,a,this.mode),this.getColorClassList(this.color,o,n,this.mode)).reduce(function(o,t){return o[t]=!0,o},{});return t(this,t("div",{class:l},[t("span",{class:{"button-inner":!0}},t("slot")),t("div",{class:{"button-effect":!0}})]))},o}();o.Button=n}]);