(window.webpackJsonp=window.webpackJsonp||[]).push([["shared-document"],{beAg:function(t,r,a){"use strict";a.r(r);a("ls82"),a("inlA"),a("rB9j"),a("Rm1S"),a("+2oP"),a("07d7"),a("sMBO"),a("pjDv"),a("PKPk"),a("pNMO"),a("4Brf"),a("0oug"),a("4mDm"),a("3bBZ"),a("5s+n");var o,i=a("TyAF"),c=a("q1tI"),u=a("vOnD"),l=a("6krI"),d=a("OrGx"),h=a("q6Jv"),p=a("J0+w"),m=(a("tkto"),a("yXV3"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("zKZe"),a("sEfC")),y=a.n(m),b=(a("hByQ"),a("SYor"),a("9Koi")),v=a("tC9W"),g=a("HKtz"),_=a("BZF0"),S=a("W//j"),w=a("PHil"),I=a("/Jwf"),O=a("x+Tx"),j=a("A4e3"),x=a("YGlK"),k=a("4Vck"),A=a("2Kol"),T=a("1RBS"),D=(a("3KgV"),a("UxlC"),a("ma9I"),a("55Ip")),E=a("kTC8"),P=a("ewKk"),L=a("KVdD"),C=a("u0/x"),R=["document","highlight","context","shareId"];function _extends(){return(_extends=Object.assign||function(t){for(var r=1;r<arguments.length;r++){var a=arguments[r];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o])}return t}).apply(this,arguments)}function _objectWithoutProperties(t,r){if(null==t)return{};var a,o,i=function _objectWithoutPropertiesLoose(t,r){if(null==t)return{};var a,o,i={},c=Object.keys(t);for(o=0;o<c.length;o++)a=c[o],r.indexOf(a)>=0||(i[a]=t[a]);return i}(t,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(o=0;o<c.length;o++)a=c[o],r.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}var N=/<b\b[^>]*>(.*?)<\/b>/gi;function replaceResultMarks(t){return t.replace(/<b\b[^>]*>(.*?)<\/b>/gi,"$1")}function DocumentListItem(t,r){var a=t.document,o=t.highlight,i=t.context,u=t.shareId,l=_objectWithoutProperties(t,R);return c.createElement(E.a,_extends({as:K,ref:r,dir:a.dir,to:{pathname:u?"/share/".concat(u).concat(a.url):a.url,state:{title:a.titleWithDefault}}},l),c.createElement(W,null,c.createElement(G,{dir:a.dir},c.createElement(M,{text:a.titleWithDefault,highlight:o,dir:a.dir})),c.createElement(z,{text:i,highlight:o?N:void 0,processResult:replaceResultMarks})))}var W=u.default.div.withConfig({displayName:"SearchListItem__Content",componentId:"sc-1b8j8to-0"})(["flex-grow:1;flex-shrink:1;min-width:0;"]),K=Object(u.default)(D.a).withConfig({displayName:"SearchListItem__DocumentLink",componentId:"sc-1b8j8to-1"})(["display:flex;align-items:center;padding:6px 12px;max-height:50vh;&:not(:last-child){margin-bottom:4px;}&:focus-visible{outline:none;}",";&:",",&:active,&:focus,&:focus-within{background:",";}",""],Object(P.a)("tablet")(o||(o=function _taggedTemplateLiteral(t,r){return r||(r=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(r)}}))}(["\n    width: auto;\n  "]))),C.a,(function(t){return t.theme.listItemHoverBackground}),(function(t){return t.$menuOpen&&Object(u.css)(["background:",";"],(function(t){return t.theme.listItemHoverBackground}))})),G=u.default.h4.withConfig({displayName:"SearchListItem__Heading",componentId:"sc-1b8j8to-2"})(["display:flex;justify-content:",";align-items:center;height:18px;margin-top:0;margin-bottom:0.25em;overflow:hidden;white-space:nowrap;color:",";"],(function(t){return t.rtl?"flex-end":"flex-start"}),(function(t){return t.theme.text})),M=Object(u.default)(L.b).withConfig({displayName:"SearchListItem__Title",componentId:"sc-1b8j8to-3"})(["max-width:90%;overflow:hidden;text-overflow:ellipsis;","{padding:0;}"],L.a),z=Object(u.default)(L.b).withConfig({displayName:"SearchListItem__ResultContext",componentId:"sc-1b8j8to-4"})(["display:block;color:",";font-size:14px;margin-top:-0.25em;margin-bottom:0.25em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;","{padding:0;}"],(function(t){return t.theme.textTertiary}),L.a),B=Object(i.c)(c.forwardRef(DocumentListItem)),H=["query"];function SearchPopover_extends(){return(SearchPopover_extends=Object.assign||function(t){for(var r=1;r<arguments.length;r++){var a=arguments[r];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o])}return t}).apply(this,arguments)}function ownKeys(t,r){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),a.push.apply(a,o)}return a}function _objectSpread(t){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(a),!0).forEach((function(r){_defineProperty(t,r,a[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(a,r))}))}return t}function _defineProperty(t,r,a){return r in t?Object.defineProperty(t,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[r]=a,t}function SearchPopover_objectWithoutProperties(t,r){if(null==t)return{};var a,o,i=function SearchPopover_objectWithoutPropertiesLoose(t,r){if(null==t)return{};var a,o,i={},c=Object.keys(t);for(o=0;o<c.length;o++)a=c[o],r.indexOf(a)>=0||(i[a]=t[a]);return i}(t,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(o=0;o<c.length;o++)a=c[o],r.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}function asyncGeneratorStep(t,r,a,o,i,c,u){try{var l=t[c](u),d=l.value}catch(t){return void a(t)}l.done?r(d):Promise.resolve(d).then(o,i)}function _asyncToGenerator(t){return function(){var r=this,a=arguments;return new Promise((function(o,i){var c=t.apply(r,a);function _next(t){asyncGeneratorStep(c,o,i,_next,_throw,"next",t)}function _throw(t){asyncGeneratorStep(c,o,i,_next,_throw,"throw",t)}_next(void 0)}))}}function _slicedToArray(t,r){return function _arrayWithHoles(t){if(Array.isArray(t))return t}(t)||function _iterableToArrayLimit(t,r){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var o,i,c=[],u=!0,l=!1;try{for(a=a.call(t);!(u=(o=a.next()).done)&&(c.push(o.value),!r||c.length!==r);u=!0);}catch(t){l=!0,i=t}finally{try{u||null==a.return||a.return()}finally{if(l)throw i}}return c}(t,r)||function _unsupportedIterableToArray(t,r){if(!t)return;if("string"==typeof t)return _arrayLikeToArray(t,r);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return _arrayLikeToArray(t,r)}(t,r)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var a=0,o=new Array(r);a<r;a++)o[a]=t[a];return o}var q=Object(u.default)(S.a).withConfig({displayName:"SearchPopover__NoResults",componentId:"sc-1rzmu2p-0"})(["padding:0 12px;margin:6px 0;"]),U=Object(u.default)(O.a).withConfig({displayName:"SearchPopover__PlaceholderList",componentId:"sc-1rzmu2p-1"})(["padding:6px 12px;"]),$=Object(u.default)(I.a).withConfig({displayName:"SearchPopover__StyledInputSearch",componentId:"sc-1rzmu2p-2"})(["","{border-radius:16px;}"],w.b),J=Object(i.c)((function SearchPopover(t){var r=t.shareId,a=Object(b.a)().t,o=Object(T.a)().documents,i=c.useRef(null),u=Object(v.a)({placement:"bottom-start",unstable_offset:[-24,0],modal:!0}),l=_slicedToArray(c.useState(""),2),d=l[0],h=l[1],p=o.searchResults(d),m=_slicedToArray(c.useState(d),2),S=m[0],w=m[1],I=_slicedToArray(c.useState(p),2),O=I[0],D=I[1];c.useEffect((function(){p&&(w(d),D(p),u.show())}),[p,d,u.show]);var E=c.useCallback(function(){var t=_asyncToGenerator(regeneratorRuntime.mark((function _callee(t){var a,i;return regeneratorRuntime.wrap((function _callee$(c){for(;;)switch(c.prev=c.next){case 0:if(a=t.query,i=SearchPopover_objectWithoutProperties(t,H),!((null==a?void 0:a.length)>0)){c.next=5;break}return c.next=4,o.search(a,_objectSpread({shareId:r},i));case 4:return c.abrupt("return",c.sent);case 5:return c.abrupt("return",void 0);case 6:case"end":return c.stop()}}),_callee)})));return function(r){return t.apply(this,arguments)}}(),[o,r]),P=c.useMemo((function(){return y()(function(){var t=_asyncToGenerator(regeneratorRuntime.mark((function _callee2(t){var r;return regeneratorRuntime.wrap((function _callee2$(a){for(;;)switch(a.prev=a.next){case 0:r=t.target.value,h(r.trim()),r===S&&u.show(),r.length||u.hide();case 4:case"end":return a.stop()}}),_callee2)})));return function(r){return t.apply(this,arguments)}}(),300)}),[u,S]),L=u.unstable_referenceRef,C=c.useRef(null),R=c.useCallback((function(){var t;return null==L||null===(t=L.current)||void 0===t?void 0:t.focus()}),[L]),N=c.useCallback((function(){i.current=L.current}),[]),W=c.useCallback((function(t){var r;("Enter"===t.key&&p&&u.show(),"ArrowDown"!==t.key||t.shiftKey)||t.currentTarget.value.length&&(t.currentTarget.value.length===t.currentTarget.selectionStart&&u.show(),null===(r=C.current)||void 0===r||r.focus());"ArrowUp"===t.key&&(u.visible&&(u.hide(),t.shiftKey||t.preventDefault()),t.currentTarget.value&&0===t.currentTarget.selectionEnd&&(t.currentTarget.selectionStart=0,t.currentTarget.selectionEnd=t.currentTarget.value.length,t.preventDefault())),"Escape"===t.key&&u.visible&&(u.hide(),t.preventDefault())}),[u,p]),K=c.useCallback((function(){u.hide(),L.current&&(L.current.value="",i.current=document.getElementById(k.b))}),[u.hide]);return Object(A.a)("/",(function(t){L.current&&L.current!==document.activeElement&&(L.current.focus(),t.preventDefault())})),c.createElement(c.Fragment,null,c.createElement(g.a,u,(function(t){return c.createElement($,{"aria-controls":t["aria-controls"],"aria-expanded":t["aria-expanded"],"aria-haspopup":t["aria-haspopup"],ref:t.ref,onChange:P,onFocus:N,onKeyDown:W})})),c.createElement(x.a,SearchPopover_extends({},u,{"aria-label":a("Results"),unstable_autoFocusOnShow:!1,unstable_finalFocusRef:i,style:{zIndex:_.b.sidebar+1},shrink:!0}),c.createElement(j.a,{options:{query:d,snippetMinWords:10,snippetMaxWords:11},items:O,fetch:E,onEscape:R,empty:c.createElement(q,null,a("No results for {{query}}",{query:d})),loading:c.createElement(U,{count:3,header:{height:20}}),renderItem:function renderItem(t,a,o){return c.createElement(B,SearchPopover_extends({key:t.document.id,shareId:r,ref:0===a?C:void 0,document:t.document,context:t.context,highlight:S,onClick:K},o))}})))})),V=a("t8KU"),Z=a("k++3"),Y=(a("2B1R"),a("YGZ2")),Q=a("XfqE");function _toConsumableArray(t){return function _arrayWithoutHoles(t){if(Array.isArray(t))return SharedDocumentLink_arrayLikeToArray(t)}(t)||function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||SharedDocumentLink_unsupportedIterableToArray(t)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function SharedDocumentLink_slicedToArray(t,r){return function SharedDocumentLink_arrayWithHoles(t){if(Array.isArray(t))return t}(t)||function SharedDocumentLink_iterableToArrayLimit(t,r){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var o,i,c=[],u=!0,l=!1;try{for(a=a.call(t);!(u=(o=a.next()).done)&&(c.push(o.value),!r||c.length!==r);u=!0);}catch(t){l=!0,i=t}finally{try{u||null==a.return||a.return()}finally{if(l)throw i}}return c}(t,r)||SharedDocumentLink_unsupportedIterableToArray(t,r)||function SharedDocumentLink_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function SharedDocumentLink_unsupportedIterableToArray(t,r){if(t){if("string"==typeof t)return SharedDocumentLink_arrayLikeToArray(t,r);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?SharedDocumentLink_arrayLikeToArray(t,r):void 0}}function SharedDocumentLink_arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var a=0,o=new Array(r);a<r;a++)o[a]=t[a];return o}function SharedDocumentLink_DocumentLink(t,r){var a=t.node,o=t.collection,i=t.activeDocument,u=t.activeDocumentId,l=t.isDraft,d=t.depth,h=t.shareId,p=Object(T.a)().documents,m=Object(b.a)().t,y=u===a.id,v=!!a.children.length||(null==i?void 0:i.parentDocumentId)===a.id,g=p.get(a.id),_=c.useMemo((function(){return!!v}),[v]),S=SharedDocumentLink_slicedToArray(c.useState(_),2),w=S[0],I=S[1];c.useEffect((function(){_&&I(_)}),[_]);var O=c.useCallback((function(t){t.preventDefault(),t.stopPropagation(),I(!w)}),[w]),j=c.useMemo((function(){return null!=i&&i.isDraft&&null!=i&&i.isActive&&(null==i?void 0:i.parentDocumentId)===a.id?[null==i?void 0:i.asNavigationNode].concat(_toConsumableArray(a.children)):a.children}),[null==i?void 0:i.isActive,null==i?void 0:i.isDraft,null==i?void 0:i.parentDocumentId,null==i?void 0:i.asNavigationNode,a]),x=((null==i?void 0:i.id)===a.id?i.title:a.title)||m("Untitled");return c.createElement(c.Fragment,null,c.createElement(Q.b,{to:{pathname:"/share/".concat(h).concat(a.url),state:{title:a.title}},label:c.createElement(c.Fragment,null,v&&c.createElement(Y.a,{expanded:w,onClick:O}),x),depth:d,exact:!1,scrollIntoViewIfNeeded:!(null!=g&&g.isStarred),isDraft:l,ref:r,isActive:function isActive(){return!!y}}),w&&j.map((function(t,r){return c.createElement(X,{shareId:h,key:t.id,collection:o,node:t,activeDocumentId:u,activeDocument:i,isDraft:t.isDraft,depth:d+1,index:r,parentId:a.id})})))}var X=Object(i.c)(c.forwardRef(SharedDocumentLink_DocumentLink)),ee=X;var te=Object(u.default)(p.a).withConfig({displayName:"Shared__ScrollContainer",componentId:"bd3hmz-0"})(["padding-bottom:16px;"]),re=Object(u.default)(Z.a).withConfig({displayName:"Shared__TopSection",componentId:"bd3hmz-1"})(["&&{margin-top:16px;margin-bottom:16px;}"]),ne=Object(i.c)((function SharedSidebar(t){var r=t.rootNode,a=t.shareId,o=Object(T.a)(),i=o.ui,u=o.documents;return c.createElement(V.a,null,c.createElement(te,{flex:!0},c.createElement(re,null,c.createElement(J,{shareId:a})),c.createElement(Z.a,null,c.createElement(ee,{index:0,shareId:a,depth:1,node:r,activeDocumentId:i.activeDocumentId,activeDocument:u.active}))))})),ae=a("yxUM"),oe=a("cmEr"),ie=a("E4Hn");function Shared_asyncGeneratorStep(t,r,a,o,i,c,u){try{var l=t[c](u),d=l.value}catch(t){return void a(t)}l.done?r(d):Promise.resolve(d).then(o,i)}function Shared_asyncToGenerator(t){return function(){var r=this,a=arguments;return new Promise((function(o,i){var c=t.apply(r,a);function _next(t){Shared_asyncGeneratorStep(c,o,i,_next,_throw,"next",t)}function _throw(t){Shared_asyncGeneratorStep(c,o,i,_next,_throw,"throw",t)}_next(void 0)}))}}function Shared_slicedToArray(t,r){return function Shared_arrayWithHoles(t){if(Array.isArray(t))return t}(t)||function Shared_iterableToArrayLimit(t,r){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var o,i,c=[],u=!0,l=!1;try{for(a=a.call(t);!(u=(o=a.next()).done)&&(c.push(o.value),!r||c.length!==r);u=!0);}catch(t){l=!0,i=t}finally{try{u||null==a.return||a.return()}finally{if(l)throw i}}return c}(t,r)||Shared_unsupportedIterableToArray(t,r)||function Shared_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Shared_unsupportedIterableToArray(t,r){if(t){if("string"==typeof t)return Shared_arrayLikeToArray(t,r);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Shared_arrayLikeToArray(t,r):void 0}}function Shared_arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var a=0,o=new Array(r);a<r;a++)o[a]=t[a];return o}var ce={};function useDocumentId(t,r){var a;return null!=r&&r.sharedTree&&function findInTree(r){if(r.url.endsWith(t))return a=r.id,!0;if(r.children){var o,i=function _createForOfIteratorHelper(t,r){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=Shared_unsupportedIterableToArray(t))||r&&t&&"number"==typeof t.length){a&&(t=a);var o=0,i=function F(){};return{s:i,n:function n(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function e(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,u=!0,l=!1;return{s:function s(){a=a.call(t)},n:function n(){var t=a.next();return u=t.done,t},e:function e(t){l=!0,c=t},f:function f(){try{u||null==a.return||a.return()}finally{if(l)throw c}}}}(r.children);try{for(i.s();!(o=i.n()).done;)if(findInTree(o.value))return!0}catch(t){i.e(t)}finally{i.f()}}return!1}(r.sharedTree),a}r.default=Object(i.c)((function SharedDocumentScene(t){var r=Object(T.a)().ui,a=Object(u.useTheme)(),o=Shared_slicedToArray(c.useState(),2),i=o[0],p=o[1],m=Shared_slicedToArray(c.useState(),2),y=m[0],b=m[1],v=Object(T.a)().documents,g=t.match.params,_=g.shareId,S=g.documentSlug,w=useDocumentId(S,i);if(c.useEffect((function(){window.document.body.style.background=a.background}),[a]),c.useEffect((function(){w&&r.setActiveDocument(w)}),[r,w]),c.useEffect((function(){function _fetchData(){return(_fetchData=Shared_asyncToGenerator(regeneratorRuntime.mark((function _callee(){var t;return regeneratorRuntime.wrap((function _callee$(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,v.fetchWithSharedTree(S,{shareId:_});case 3:t=r.sent,p(t),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),b(r.t0);case 10:case"end":return r.stop()}}),_callee,null,[[0,7]])})))).apply(this,arguments)}!function fetchData(){return _fetchData.apply(this,arguments)}()}),[v,S,_,r]),y)return y instanceof ae.e?c.createElement(d.a,null):c.createElement(l.a,null);if(!i)return c.createElement(ie.a,{location:t.location});var I=i.sharedTree?c.createElement(ne,{rootNode:i.sharedTree,shareId:_}):void 0;return c.createElement(h.a,{title:i.document.title,sidebar:I},c.createElement(oe.a,{abilities:ce,document:i.document,sharedTree:i.sharedTree,shareId:_,readOnly:!0}))}))}}]);
//# sourceMappingURL=shared-document.fe8f701524f2b1388bda.js.map