(window.webpackJsonp=window.webpackJsonp||[]).push([["command-bar"],{"916u":function(r,t,a){"use strict";a.d(t,"a",(function(){return useCommandBarActions}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("pjDv"),a("+2oP"),a("sMBO"),a("rB9j");var o=a("mRsi"),i=a.n(o),c=(a("2B1R"),a("ma9I"),a("oVuX"),a("XLUe")),u=a("Ty5D"),l=a("b2r9"),m=a("khlH");function _toConsumableArray(r){return function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}(r)||function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function _unsupportedIterableToArray(r,t){if(!r)return;if("string"==typeof r)return _arrayLikeToArray(r,t);var a=Object.prototype.toString.call(r).slice(8,-1);"Object"===a&&r.constructor&&(a=r.constructor.name);if("Map"===a||"Set"===a)return Array.from(r);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return _arrayLikeToArray(r,t)}(r)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=r[a];return o}function useCommandBarActions(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=Object(u.i)(),o=Object(m.a)({isCommandBar:!0}),d=i()(r.map((function(r){return Object(l.a)(r,o)})));Object(c.useRegisterActions)(d,[d.map((function(r){return r.id})).join(""),a.pathname].concat(_toConsumableArray(t)))}},k6yO:function(r,t,a){"use strict";a.r(t);a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("pjDv"),a("+2oP"),a("rB9j"),a("3KgV"),a("ma9I"),a("sMBO");var o=a("XLUe"),i=a("TyAF"),c=a("tsqv"),u=a("q1tI"),l=a("9Koi"),m=a("It+4"),d=a("vOnD"),p=a("ewKk"),y=a("BZF0"),h=(a("x0AG"),a("2B1R"),a("KFZt")),b=a("LfjZ");function CommandBarItem(r,t){var a,o,i=r.action,l=r.active,m=r.currentRootActionId,p=Object(d.useTheme)(),y=u.useMemo((function(){if(!m)return i.ancestors;var r=i.ancestors.findIndex((function(r){return r.id===m}));return i.ancestors.slice(r+1)}),[i.ancestors,m]);return u.createElement(A,{active:l,ref:t},u.createElement(_,{align:"center",gap:8},u.createElement(v,null,i.icon?u.cloneElement(i.icon,{size:22,color:"currentColor"}):u.createElement(c.ArrowIcon,{color:"currentColor"})),y.map((function(r){return u.createElement(u.Fragment,{key:r.id},u.createElement(g,null,r.name),u.createElement(w,{color:p.textSecondary,size:22}))})),i.name,null!==(a=i.children)&&void 0!==a&&a.length?"…":""),null!==(o=i.shortcut)&&void 0!==o&&o.length?u.createElement("div",{style:{display:"grid",gridAutoFlow:"column",gap:"4px"}},i.shortcut.map((function(r){return u.createElement(b.a,{key:r},r)}))):null)}var v=Object(d.default)(h.a).withConfig({displayName:"CommandBarItem__Icon",componentId:"sc-1ejl8h7-0"})(["align-items:center;justify-content:center;width:24px;height:24px;color:",";flex-shrink:0;"],(function(r){return r.theme.textSecondary})),g=d.default.span.withConfig({displayName:"CommandBarItem__Ancestor",componentId:"sc-1ejl8h7-1"})(["color:",";"],(function(r){return r.theme.textSecondary})),_=Object(d.default)(h.a).withConfig({displayName:"CommandBarItem__Content",componentId:"sc-1ejl8h7-2"})(["overflow:hidden;text-overflow:ellipsis;flex-shrink:1;"]),A=d.default.div.withConfig({displayName:"CommandBarItem__Item",componentId:"sc-1ejl8h7-3"})(["font-size:15px;padding:10px 16px;background:",";display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;min-width:0;",""],(function(r){return r.active?r.theme.menuItemSelected:"none"}),(function(r){return r.active&&Object(d.css)(["","{color:",";}"],v,r.theme.text)})),w=Object(d.default)(c.BackIcon).withConfig({displayName:"CommandBarItem__ForwardIcon",componentId:"sc-1ejl8h7-4"})(["transform:rotate(180deg);flex-shrink:0;"]),x=u.forwardRef(CommandBarItem);function CommandBarResults(){var r=Object(o.useMatches)(),t=r.results,a=r.rootActionId;return u.createElement(o.KBarResults,{items:t,maxHeight:400,onRender:function onRender(r){var t=r.item,o=r.active;return"string"==typeof t?u.createElement(I,null,t):u.createElement(x,{action:t,active:o,currentRootActionId:a})}})}var I=d.default.h3.withConfig({displayName:"CommandBarResults__Header",componentId:"sc-1ioua5n-0"})(["font-size:13px;letter-spacing:0.04em;margin:0;padding:16px 0 4px 20px;color:",";height:36px;"],(function(r){return r.theme.textTertiary})),j=a("fHvT"),C=a("n4pT"),B=a("916u"),O=a("1RBS");function SearchActions(){var r=Object(O.a)().searches;u.useEffect((function(){r.fetchPage({})}),[r]);var t=Object(o.useKBar)((function(r){return{searchQuery:r.searchQuery}})).searchQuery;return Object(B.a)(t?[Object(j.e)(t)]:[]),Object(B.a)(r.recent.map(C.c)),null}var k=a("2M11"),S=(a("5s+n"),a("ls82"),a("f5jo")),T=a("b2r9"),E=a("ho7B"),R=a("pXru");function _createForOfIteratorHelper(r,t){var a="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!a){if(Array.isArray(r)||(a=function _unsupportedIterableToArray(r,t){if(!r)return;if("string"==typeof r)return _arrayLikeToArray(r,t);var a=Object.prototype.toString.call(r).slice(8,-1);"Object"===a&&r.constructor&&(a=r.constructor.name);if("Map"===a||"Set"===a)return Array.from(r);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return _arrayLikeToArray(r,t)}(r))||t&&r&&"number"==typeof r.length){a&&(r=a);var o=0,i=function F(){};return{s:i,n:function n(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}},e:function e(r){throw r},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,u=!0,l=!1;return{s:function s(){a=a.call(r)},n:function n(){var r=a.next();return u=r.done,r},e:function e(r){l=!0,c=r},f:function f(){try{u||null==a.return||a.return()}finally{if(l)throw c}}}}function _arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=r[a];return o}function asyncGeneratorStep(r,t,a,o,i,c,u){try{var l=r[c](u),m=l.value}catch(r){return void a(r)}l.done?t(m):Promise.resolve(m).then(o,i)}function _asyncToGenerator(r){return function(){var t=this,a=arguments;return new Promise((function(o,i){var c=r.apply(t,a);function _next(r){asyncGeneratorStep(c,o,i,_next,_throw,"next",r)}function _throw(r){asyncGeneratorStep(c,o,i,_next,_throw,"throw",r)}_next(void 0)}))}}function deleteAllDatabases(){return _deleteAllDatabases.apply(this,arguments)}function _deleteAllDatabases(){return(_deleteAllDatabases=_asyncToGenerator(regeneratorRuntime.mark((function _callee(){var r,t,a,o;return regeneratorRuntime.wrap((function _callee$(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,window.indexedDB.databases();case 2:r=i.sent,t=_createForOfIteratorHelper(r),i.prev=4,t.s();case 6:if((a=t.n()).done){i.next=13;break}if(!(o=a.value).name){i.next=11;break}return i.next=11,window.indexedDB.deleteDatabase(o.name);case 11:i.next=6;break;case 13:i.next=18;break;case 15:i.prev=15,i.t0=i.catch(4),t.e(i.t0);case 18:return i.prev=18,t.f(),i.finish(18);case 21:case"end":return i.stop()}}),_callee,null,[[4,15,18,21]])})))).apply(this,arguments)}function debug_asyncGeneratorStep(r,t,a,o,i,c,u){try{var l=r[c](u),m=l.value}catch(r){return void a(r)}l.done?t(m):Promise.resolve(m).then(o,i)}var L,D=Object(T.c)({name:function name(r){return(0,r.t)("Delete IndexedDB cache")},icon:u.createElement(c.TrashIcon,null),keywords:"cache clear database",section:E.b,perform:(L=function debug_asyncToGenerator(r){return function(){var t=this,a=arguments;return new Promise((function(o,i){var c=r.apply(t,a);function _next(r){debug_asyncGeneratorStep(c,o,i,_next,_throw,"next",r)}function _throw(r){debug_asyncGeneratorStep(c,o,i,_next,_throw,"throw",r)}_next(void 0)}))}}(regeneratorRuntime.mark((function _callee(r){var t;return regeneratorRuntime.wrap((function _callee$(a){for(;;)switch(a.prev=a.next){case 0:return t=r.t,a.next=3,deleteAllDatabases();case 3:S.a.toasts.showToast(t("IndexedDB cache deleted"));case 4:case"end":return a.stop()}}),_callee)}))),function perform(r){return L.apply(this,arguments)})}),M=[Object(T.c)({name:function name(r){return(0,r.t)("Development")},keywords:"debug",icon:u.createElement(c.ToolsIcon,null),iconInContextMenu:!1,section:E.b,visible:function visible(r){var t=r.event;return"development"===R.a.ENVIRONMENT||t instanceof KeyboardEvent&&t.altKey},children:[D]})],P=a("pJlM"),K=a("GPU1");function _toConsumableArray(r){return function _arrayWithoutHoles(r){if(Array.isArray(r))return root_arrayLikeToArray(r)}(r)||function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function root_unsupportedIterableToArray(r,t){if(!r)return;if("string"==typeof r)return root_arrayLikeToArray(r,t);var a=Object.prototype.toString.call(r).slice(8,-1);"Object"===a&&r.constructor&&(a=r.constructor.name);if("Map"===a||"Set"===a)return Array.from(r);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return root_arrayLikeToArray(r,t)}(r)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function root_arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=r[a];return o}var N,z=[].concat(_toConsumableArray(k.c),_toConsumableArray(j.d),_toConsumableArray(K.b),_toConsumableArray(C.j),_toConsumableArray(P.b),_toConsumableArray(M)),G=a("wsPv"),H=a("zA/5"),U=function useSettingsActions(){var r=Object(H.a)(),t=u.useMemo((function(){return r.map((function(r){var t=r.icon;return{id:r.path,name:r.name,icon:u.createElement(t,{color:"currentColor"}),section:E.d,perform:function perform(){return G.a.push(r.path)}}}))}),[r]);return u.useMemo((function(){return Object(T.c)({name:function name(r){return(0,r.t)("Settings")},section:E.d,shortcut:["g","s"],icon:u.createElement(c.SettingsIcon,null),children:function children(){return t}})}),[t])},$=a("9Hsk"),Z=a("yppz");function CommandBar_toConsumableArray(r){return function CommandBar_arrayWithoutHoles(r){if(Array.isArray(r))return CommandBar_arrayLikeToArray(r)}(r)||function CommandBar_iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function CommandBar_unsupportedIterableToArray(r,t){if(!r)return;if("string"==typeof r)return CommandBar_arrayLikeToArray(r,t);var a=Object.prototype.toString.call(r).slice(8,-1);"Object"===a&&r.constructor&&(a=r.constructor.name);if("Map"===a||"Set"===a)return Array.from(r);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return CommandBar_arrayLikeToArray(r,t)}(r)||function CommandBar_nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function CommandBar_arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,o=new Array(t);a<t;a++)o[a]=r[a];return o}var Q=function KBarPortal(r){var t=r.children;return Object(o.useKBar)((function(r){return{showing:"hidden"!==r.visualState}})).showing?u.createElement(m.a,null,t):null},X=Object(d.default)(Z.a).withConfig({displayName:"CommandBar__Hint",componentId:"t6u3gr-0"})(["display:flex;align-items:center;gap:4px;border-top:1px solid ",";margin:1px 0 0;padding:6px 16px;width:100%;"],(function(r){return r.theme.background})),J=Object(d.default)(o.KBarPositioner).withConfig({displayName:"CommandBar__Positioner",componentId:"t6u3gr-1"})(["z-index:",";"],y.b.commandBar),V=Object(d.default)(o.KBarSearch).withConfig({displayName:"CommandBar__SearchInput",componentId:"t6u3gr-2"})(["padding:16px 20px;width:100%;outline:none;border:none;background:",";color:",";&:disabled,&::placeholder{color:",";}"],(function(r){return r.theme.menuBackground}),(function(r){return r.theme.text}),(function(r){return r.theme.placeholder})),W=Object(d.default)(o.KBarAnimator).withConfig({displayName:"CommandBar__Animator",componentId:"t6u3gr-3"})(["max-width:600px;max-height:75vh;width:90vw;background:",";color:",";border-radius:8px;overflow:hidden;box-shadow:rgb(0 0 0 / 40%) 0px 16px 60px;transition:max-width 0.2s ease-in-out;",";@media print{display:none;}"],(function(r){return r.theme.menuBackground}),(function(r){return r.theme.text}),Object(p.a)("desktopLarge")(N||(N=function _taggedTemplateLiteral(r,t){return t||(t=r.slice(0)),Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(t)}}))}(["\n    max-width: 740px;\n  "]))));t.default=Object(i.c)((function CommandBar(){var r=Object(l.a)().t,t=Object(O.a)().ui,a=U(),i=u.useMemo((function(){return[].concat(CommandBar_toConsumableArray(z),[a])}),[a]);Object(B.a)(i);var m=Object(o.useKBar)((function(r){return{rootAction:r.currentRootActionId?r.actions[r.currentRootActionId]:void 0}})).rootAction;return u.createElement(u.Fragment,null,u.createElement(SearchActions,null),u.createElement(Q,null,u.createElement(J,null,u.createElement(W,null,u.createElement(V,{placeholder:"".concat((null==m?void 0:m.placeholder)||(null==m?void 0:m.name)||r("Type a command or search"),"…")}),u.createElement(CommandBarResults,null),t.commandBarOpenedFromSidebar&&u.createElement(X,{size:"small",type:"tertiary"},u.createElement(c.QuestionMarkIcon,{size:18,color:"currentColor"}),r("Open search from anywhere with the {{ shortcut }} shortcut",{shortcut:"".concat($.c," + k")}))))))}))}}]);
//# sourceMappingURL=command-bar.e7cf7688c94c56b9db10.js.map