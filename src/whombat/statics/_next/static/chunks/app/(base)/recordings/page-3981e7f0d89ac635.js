(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5625],{61679:function(e,t,n){Promise.resolve().then(n.bind(n,32322))},89887:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let r=n(51801);n(6439);let a=r._(n(30194));function l(e){return{default:(null==e?void 0:e.default)||e}}function s(e,t){let n=a.default,r={loading:e=>{let{error:t,isLoading:n,pastDelay:r}=e;return null}};"function"==typeof e&&(r.loader=e),Object.assign(r,t);let s=r.loader;return n({...r,loader:()=>null!=s?s().then(l):Promise.resolve(l(()=>null))})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},87046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{suspense:function(){return a},NoSSR:function(){return l}}),n(51801),n(6439);let r=n(25204);function a(){let e=Error(r.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=r.NEXT_DYNAMIC_NO_SSR_CODE,e}function l(e){let{children:t}=e;return t}},30194:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let r=n(51801),a=r._(n(6439)),l=n(87046),s=function(e){let t=Object.assign({loader:null,loading:null,ssr:!0},e);function n(e){let n=t.loading,r=a.default.createElement(n,{isLoading:!0,pastDelay:!0,error:null}),s=t.ssr?a.default.Fragment:l.NoSSR,i=t.lazy;return a.default.createElement(a.default.Suspense,{fallback:r},a.default.createElement(s,null,a.default.createElement(i,e)))}return t.lazy=a.default.lazy(t.loader),n.displayName="LoadableComponent",n}},32322:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return z}});var r=n(14357),a=n(6439),l=n(8098),s=n(90466),i=n(91293),o=n(29837),c=n(33330),u=n(12021),d=n(87283),m=n(55766),f=n(23076),x=n(52315),h=n(40072),g=n(17526),p=n(2915),j=n(78877),b=n(99093);function v(e){let{recording:t}=e,n=(0,a.useRef)(null),l=(0,f.Z)({ref:n}),s=(0,x.Z)(e=>e.spectrogramSettings),i=(0,a.useMemo)(()=>({time:{min:0,max:t.duration},freq:{min:0,max:t.samplerate/2}}),[t.duration,t.samplerate]),v=(0,a.useMemo)(()=>({time:{min:0,max:Math.min(5,t.duration)},freq:{min:0,max:t.samplerate/2}}),[t.samplerate,t.duration]),[N,w]=(0,o.e)(u.nk,{context:{recording:t,bounds:i,initial:v,window:v,parameters:s}}),{draw:y}=(0,m.Z)({recording:t,bounds:i,initial:v,state:N,send:w,dragState:l,ref:n});if(null==N.context.audio)throw Error("Audio is not initialized");let[k,Z]=(0,c.L)(N.context.audio),_=(0,a.useCallback)(e=>{w({type:"PAN_TO",window:e})},[w]),D=(0,a.useCallback)((e,t)=>{w({type:"SHIFT_WINDOW",shiftBy:e,relative:t})},[w]);return(0,d.Z)({ref:n,draw:y}),(0,r.jsxs)(h.Z,{children:[(0,r.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,r.jsx)(b.Z,{isDragging:N.matches("panning"),isZooming:N.matches("zooming"),onDrag:()=>w("PAN"),onZoom:()=>w("ZOOM"),onReset:()=>w("RESET")}),(0,r.jsx)(j.Z,{settings:N.context.parameters,onChange:(e,t)=>w({type:"SET_PARAMETER",key:e,value:t}),onClear:e=>w({type:"CLEAR_PARAMETER",key:e})}),(0,r.jsx)(g.Z,{samplerate:t.samplerate,currentTime:k.context.currentTime,startTime:k.context.startTime,endTime:k.context.endTime,speed:k.context.speed,loop:k.context.loop,playing:N.matches("playing"),play:()=>w("PLAY"),pause:()=>w("PAUSE"),seek:e=>Z({type:"SEEK",time:e}),setSpeed:e=>Z({type:"SET_SPEED",speed:e}),toggleLoop:()=>Z({type:"TOGGLE_LOOP"})})]}),(0,r.jsx)("div",{className:"h-96",children:(0,r.jsx)("canvas",{ref:n,className:"w-full h-full"})}),(0,r.jsx)(p.Z,{window:N.context.window,bounds:N.context.bounds,setWindow:_,shiftWindow:D})]})}var N=n(24070),w=n(56793),y=n(35573),k=n(60169),Z=n(11334);function _(e){let{notes:t,currentUser:n,onUpdate:a,onDelete:l}=e;return(0,r.jsx)("ul",{"aria-label":"feed",role:"feed",className:"relative flex flex-col gap-12 py-12 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-stone-200 before:dark:border-stone-700 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-stone-200 after:dark:border-stone-700",children:t.map(e=>(0,r.jsx)(Z.Z,{note:e,currentUser:n,onUpdate:a,onDelete:l},e.id))})}function D(){return(0,r.jsx)("div",{className:"p-4 w-full",children:(0,r.jsxs)("div",{className:"border border-dashed rounded-lg border-stone-500 flex flex-col justify-center items-center w-full p-8 bg-stone-300 dark:bg-stone-800",children:[(0,r.jsxs)("span",{className:"text-stone-700 dark:text-stone-300",children:[(0,r.jsx)(w.uH,{className:"h-5 w-5 inline-block mr-1"})," No notes"]}),(0,r.jsx)("span",{className:"text-sm text-stone-500",children:"Create a note above to start a conversation about this recording."})]})})}function S(e){let{onCreate:t}=e,[n,l]=(0,a.useState)("");return(0,r.jsxs)("div",{className:"p-4 flex flex-col w-full",children:[(0,r.jsx)(y.BZ,{label:"Add a note",name:"message",help:"Write the note message and click on the type of note you want to create.",children:(0,r.jsx)(y.Kx,{name:"message",value:n,placeholder:"Type your note here...",onChange:e=>l(e.target.value)})}),(0,r.jsxs)("div",{className:"flex flex-row gap-4 justify-end",children:[(0,r.jsxs)(k.Z,{variant:"danger",mode:"text",onClick:()=>{l(""),null==t||t({message:n,is_issue:!0})},children:[(0,r.jsx)(w.uN,{className:"h-5 w-5 inline-block mr-1"}),"Add Issue"]}),(0,r.jsxs)(k.Z,{variant:"primary",mode:"text",onClick:()=>{l(""),null==t||t({message:n,is_issue:!1})},children:[(0,r.jsx)(w.uH,{className:"h-5 w-5 inline-block mr-1"}),"Add Note"]})]})]})}function T(e){let{notes:t,currentUser:n,onCreate:a,onUpdate:l,onDelete:s}=e;return(0,r.jsxs)(h.Z,{children:[(0,r.jsxs)(N.H3,{children:[(0,r.jsx)(w.uH,{className:"h-5 w-5 inline-block mr-1"}),"Notes"]}),(0,r.jsx)(S,{onCreate:a}),0===t.length?(0,r.jsx)(D,{}):(0,r.jsx)(_,{notes:t,onDelete:s,onUpdate:l,currentUser:n})]})}var E=n(91226);function C(e){let{onDelete:t}=e;return(0,r.jsx)(E.Z,{title:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w.aN,{className:"inline-block w-8 h-8 mr-2 text-red-500"}),"Are you sure you want to delete this recording?"]}),button:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w.pJ,{className:"inline-block w-5 h-5 mr-2"}),"Delete Recording"]}),mode:"text",variant:"danger",children:e=>{let{close:n}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)("p",{children:"This action cannot be undone. This will permanently delete the recording from the database and remove the metadata and all associated files. This includes any annotations, notes, and tags associated with the recording."}),(0,r.jsx)("p",{className:"font-semibold dark:text-red-400 text-red-600",children:"It is not recommended to delete a recording that has been annotated."}),(0,r.jsx)("p",{children:"Do you want to proceed?"})]}),(0,r.jsxs)("div",{className:"flex flex-row justify-end gap-2 mt-4",children:[(0,r.jsxs)(k.Z,{tabIndex:0,mode:"text",variant:"danger",onClick:t,children:[(0,r.jsx)(w.pJ,{className:"h-5 w-5 inline-block mr-2"}),"Delete"]}),(0,r.jsxs)(k.Z,{tabIndex:1,mode:"outline",variant:"primary",onClick:n,children:[(0,r.jsx)(w.Tw,{className:"h-5 w-5 inline-block mr-2"}),"Cancel"]})]})]})}})}function O(e){let{onDelete:t,onDownload:n}=e;return(0,r.jsxs)("div",{className:"flex flex-row gap-2 justify-center",children:[(0,r.jsxs)(k.Z,{mode:"text",variant:"primary",onClick:n,children:[(0,r.jsx)(w._8,{className:"h-5 w-5 inline-block mr-2"})," Download"]}),(0,r.jsx)(C,{onDelete:t})]})}function M(e){let{label:t}=e;return(0,r.jsx)("div",{className:"font-thin text-sm text-stone-500 mr-2",children:t})}function F(e){let{units:t}=e;return(0,r.jsx)("span",{className:"ml-1 text-stone-500",children:t})}function P(e){let{recording:t}=e;return(0,r.jsxs)(h.Z,{children:[(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsx)(w.wZ,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),(0,r.jsx)(M,{label:"Duration"}),t.duration.toFixed(3),(0,r.jsx)(F,{units:"s"})]}),(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsx)(w.QE,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),(0,r.jsx)(M,{label:"Channels"}),t.channels]}),(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsx)(w.Dd,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),(0,r.jsx)(M,{label:"Sample rate"}),t.samplerate.toLocaleString(),(0,r.jsx)(F,{units:"Hz"})]}),(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsx)(w.i5,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),(0,r.jsx)(M,{label:"Time expansion"}),t.time_expansion]})]})}var A=n(89887),q=n.n(A);let R=q()(()=>Promise.all([n.e(205),n.e(9508)]).then(n.bind(n,29508)),{loadableGenerated:{webpack:()=>[29508]},ssr:!1}),I=q()(()=>Promise.all([n.e(205),n.e(4809)]).then(n.bind(n,54809)),{loadableGenerated:{webpack:()=>[54809]},ssr:!1});function L(e){let{recording:t}=e,n=null!=t.latitude&&null!=t.longitude;return(0,r.jsxs)(h.Z,{children:[(0,r.jsxs)("div",{className:"flex flex-row items-center justify-center",children:[(0,r.jsx)(w.Zl,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),"Recorded at"]}),n?(0,r.jsx)("div",{className:"relative",children:(0,r.jsx)(R,{className:"h-64",center:{lat:t.latitude,lng:t.longitude},scrollWheelZoom:!0,zoom:14,children:(0,r.jsx)(I,{draggable:!1,center:{lat:t.latitude,lng:t.longitude}})})}):(0,r.jsx)("div",{className:"dark:text-stone-600 text-stone-400 text-sm",children:"No location provided."})]})}var Q=n(90185),U=n(24957);function H(e){let{recording:t,currentUser:n,onNoteCreate:a,onNoteUpdate:l,onNoteDelete:s}=e;return(0,r.jsxs)("div",{className:"flex flex-col gap-4 px-8 pb-4",children:[(0,r.jsx)(U.Z,{recording:t}),(0,r.jsxs)("div",{className:"w-100 flex flex-row flex-wrap lg:flex-nowrap gap-8 justify-between",children:[(0,r.jsx)("div",{className:"grow",children:(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-8",children:[(0,r.jsx)("div",{className:"col-span-2",children:(0,r.jsx)(Q.Z,{tags:t.tags})}),(0,r.jsx)("div",{className:"col-span-2",children:(0,r.jsx)(v,{recording:t})}),(0,r.jsx)("div",{className:"col-span-2",children:(0,r.jsx)(T,{notes:t.notes,onCreate:a,onUpdate:l,onDelete:s,currentUser:n})})]})}),(0,r.jsxs)("div",{className:"flex flex-col flex-none max-w-sm gap-4",children:[(0,r.jsx)(O,{}),(0,r.jsx)(P,{recording:t}),(0,r.jsx)(L,{recording:t})]})]})]})}var W=n(95754);function z(){let{recording_id:e}=(0,a.useContext)(W.GT),{data:t}=(0,s.Z)(),n=(0,l.Z)({recording_id:e});return n.query.isLoading||null==n.query.data?(0,r.jsx)(i.Z,{}):(0,r.jsx)(H,{recording:n.query.data,onNoteCreate:n.addNote.mutate,onNoteDelete:n.removeNote.mutate,onNoteUpdate:(e,t)=>n.updateNote.mutate({note_id:e,data:t}),currentUser:t})}},2915:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(14357),a=n(6439),l=n(85520),s=n(23076);function i(e){let{window:t,bounds:n,setWindow:i,shiftWindow:o,...c}=e,u=(0,a.useRef)(null),d=(0,a.useMemo)(()=>{var e,r;return function(e){let{width:t,height:n,window:r,bounds:a}=e;if(null==t||null==n)return{left:0,width:0,top:0,height:0};let l=(a.freq.max-r.freq.min)/(a.freq.max-a.freq.min),s=(a.freq.max-r.freq.max)/(a.freq.max-a.freq.min),i=(r.time.min-a.time.min)/(a.time.max-a.time.min),o=(r.time.max-a.time.min)/(a.time.max-a.time.min);return{top:Math.max(Math.min(Math.round(s*n),n),0),left:Math.max(Math.min(Math.round(i*t),t),0),height:Math.max(Math.min(Math.round((l-s)*n),n),0),width:Math.max(Math.min(Math.round((o-i)*t),t),0)}}({width:null===(e=u.current)||void 0===e?void 0:e.offsetWidth,height:null===(r=u.current)||void 0===r?void 0:r.offsetHeight,window:t,bounds:n})},[t,n]),m=(0,s.Z)({ref:u}),f=(0,a.useCallback)(e=>{let{window:t,offset:r}=e;if(null==u.current)return null;let{offsetWidth:a,offsetHeight:l}=u.current,{dx:s,dy:i,x:o,y:c}=r;if(null==s||null==i||null==a||null==l||null==o||null==c)return null;let{min:d,max:m}=n.time,{min:f,max:x}=n.freq,h=(m-d)*s/a,g=(x-f)*i/l,p=d+(m-d)*o/a,j=f+(x-f)*(l-c)/l,b=t.time.max-t.time.min,v=t.freq.max-t.freq.min;return{time:{min:p-b/2+h,max:p+b/2+h},freq:{min:j-v/2-g,max:j+v/2-g}}},[n]);return(0,l.Z)({window:t,setWindow:i,dragState:m,dragFunction:f}),(0,r.jsx)("div",{draggable:!1,className:"group select-none relative w-full flex flex-row items-center h-8 outline outline-1 rounded-md outline-stone-300 bg-stone-200 dark:bg-stone-800 dark:outline-stone-700 cursor-pointer",ref:u,...c,children:(0,r.jsx)("div",{draggable:!1,tabIndex:0,className:"absolute bg-emerald-300 dark:bg-emerald-700 rounded-md border border-emerald-500 group-hover:bg-emerald-500/80 hover:bg-emerald-500/80 cursor-pointer focus:ring-4 focus:ring-emerald-500/50 focus:outline-none",style:{...d}})})}},24957:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var r=n(14357),a=n(89462),l=n(56793),s=n(24070),i=n(57119);function o(e){let{children:t}=e;return(0,r.jsx)("div",{className:"flex flex-row iterms-center tracking-tighter",children:t})}function c(e){let{latitude:t,longitude:n}=e,a=null!=t&&null!=n;return(0,r.jsxs)(o,{children:[(0,r.jsx)(l._t,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),a?"".concat(t,", ").concat(n):(0,r.jsx)("span",{className:"dark:text-stone-600 text-stone-400 text-sm",children:"No location"})]})}function u(e){let{time:t}=e;return(0,r.jsxs)(o,{children:[(0,r.jsx)(l.wZ,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),null!=t?t:(0,r.jsx)("span",{className:"dark:text-stone-600 text-stone-400 text-sm",children:"No time"})]})}function d(e){let{date:t}=e;return(0,r.jsxs)(o,{children:[(0,r.jsx)(l.IH,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),null!=t?t.toLocaleDateString():(0,r.jsx)("span",{className:"dark:text-stone-600 text-stone-400 text-sm",children:"No date"})]})}function m(e){var t,n;let{recording:o}=e,{path:m}=o,f=(null!==(t=null===(n=m.split("\\").pop())||void 0===n?void 0:n.split("/").pop())&&void 0!==t?t:"").split(".").slice(0,-1).join(".");return(0,r.jsxs)("div",{className:"flex w-full flex-row items-center gap-x-6 overflow-x-scroll",children:[(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsx)(l.He,{className:"h-5 w-5 inline-block text-stone-500 mr-1"}),(0,r.jsx)(s.H3,{className:"max-w-xl whitespace-nowrap",children:(0,r.jsx)(i.Z,{tooltip:(0,r.jsxs)("div",{className:"text-sm dark:bg-stone-700 dark:border-stone-800 w-96 whitespace-normal tracking-tighter break-all font-thin",children:[(0,r.jsx)("span",{className:"text-blue-500 font-normal",children:"Full path:"})," ",m]}),placement:"bottom",children:(0,r.jsxs)("button",{type:"button",className:"text-ellipsis overflow-hidden w-full",onClick:()=>{navigator.clipboard.writeText(m),a.ZP.success("Copied full path to clipboard")},children:[f,(0,r.jsx)("span",{className:"text-stone-500 text-sm",children:".WAV"})]})})})]}),(0,r.jsx)(c,{latitude:o.latitude,longitude:o.longitude}),(0,r.jsx)(u,{time:o.time}),(0,r.jsx)(d,{date:o.date})]})}},90185:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(14357),a=n(52315),l=n(56793),s=n(70565);function i(e){let{tags:t,label:n="Tags",onClick:i}=e,o=(0,a.Z)(e=>e.getTagColor);return(0,r.jsxs)("div",{className:"flex flex-row items-center gap-2",children:[(0,r.jsxs)("div",{className:"inline-flex",children:[(0,r.jsx)(l.lO,{className:"w-5 h-5 text-stone-500 inline-block mr-1"}),(0,r.jsxs)("span",{className:"text-stone-400 dark:text-stone-600 text-sm",children:[n,":"]})]}),(0,r.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:t.map(e=>(0,r.jsx)(s.ZP,{tag:e,...o(e),onClick:()=>null==i?void 0:i(e)},e.id))})]})}},90466:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(29488),a=n(30646),l=n(72007),s=n(62976),i=n(81361);function o(){let{onUpdate:e,onLogout:t,onUnauthorized:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(0,a.NL)(),c=(0,l.a)(["me"],async()=>await i.Z.user.me(),{retry:2,refetchOnWindowFocus:!1,refetchOnReconnect:!0,refetchOnMount:!0,refetchIntervalInBackground:!1,onError:e=>{var t;(0,r.IZ)(e)&&(null==e?void 0:null===(t=e.response)||void 0===t?void 0:t.status)===401&&(null==n||n(e))}}),u=(0,s.D)({mutationFn:i.Z.user.update,onSuccess:t=>{c.refetch(),null==e||e(t)}}),d=(0,s.D)({mutationFn:i.Z.auth.logout,onSuccess:()=>{o.invalidateQueries(["me"]),null==t||t()}});return{...c,update:u,logout:d}}},8098:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(30646),a=n(72007),l=n(62976),s=n(81361);function i(e){let{recording_id:t,onUpdate:n,onDelete:i,onAddTag:o,onAddNote:c,onRemoveTag:u,onAddFeature:d,onRemoveFeature:m,onUpdateFeature:f,enabled:x=!0}=e,h=(0,r.NL)(),g=(0,a.a)(["recording",t],()=>s.Z.recordings.get(t),{enabled:x}),p=(0,l.D)({mutationFn:async e=>await s.Z.recordings.update(t,e),onSuccess:e=>{h.setQueryData(["recording",t],e),null==n||n(e)}}),j=(0,l.D)({mutationFn:async e=>await s.Z.recordings.addTag({recording_id:t,tag_id:e.id}),onSuccess:(e,n)=>{h.setQueryData(["recording",t],e),null==o||o(n)}}),b=(0,l.D)({mutationFn:async e=>await s.Z.recordings.removeTag({recording_id:t,tag_id:e.id}),onSuccess:(e,n)=>{h.setQueryData(["recording",t],e),null==u||u(n)}}),v=(0,l.D)({mutationFn:async e=>await s.Z.recordings.addNote({recording_id:t,...e}),onSuccess:(e,n)=>{h.setQueryData(["recording",t],e);let r=e.notes.find(e=>e.message===n.message);null!=r&&(null==c||c(r))}}),N=(0,l.D)({mutationFn:async e=>{let{note_id:n,data:r}=e;return await s.Z.recordings.updateNote({recording_id:t,note_id:n,data:r})},onSuccess:e=>{h.setQueryData(["recording",t],e)}}),w=(0,l.D)({mutationFn:async e=>await s.Z.recordings.removeNote({recording_id:t,note_id:e}),onSuccess:e=>h.setQueryData(["recording",t],e)}),y=(0,l.D)({mutationFn:async e=>await s.Z.recordings.addFeature({recording_id:t,feature_name_id:e.feature_name.id,value:e.value}),onSuccess:(e,n)=>{h.setQueryData(["recording",t],e),null==d||d(n)}}),k=(0,l.D)({mutationFn:async e=>await s.Z.recordings.removeFeature({recording_id:t,feature_name_id:e.feature_name.id}),onSuccess:(e,n)=>{h.setQueryData(["recording",t],e),null==m||m(n)}}),Z=(0,l.D)({mutationFn:async e=>await s.Z.recordings.updateFeature({recording_id:t,feature_name_id:e.feature_name.id,value:e.value}),onSuccess:(e,n)=>{h.setQueryData(["recording",t],e),null==f||f(n)}}),_=(0,l.D)({mutationFn:async()=>await s.Z.recordings.delete(t),onSuccess:()=>{h.invalidateQueries(["recording",t]),null==i||i()}});return{query:g,update:p,addTag:j,removeTag:b,addNote:v,removeNote:w,addFeature:y,updateNote:N,removeFeature:k,updateFeature:Z,delete:_}}},82106:function(e,t,n){"use strict";n.d(t,{v:function(){return s}});var r=n(6439),a=n(64092),l=n(59410);function s(e,t){let[n,s]=(0,r.useState)(e),i=(0,l.E)(e);return(0,a.e)(()=>s(i.current),[i,s,...t]),n}},94110:function(e,t,n){"use strict";n.d(t,{q:function(){return l}});var r=n(6439),a=n(68344);function l(e,t,n){let[l,s]=(0,r.useState)(n),i=void 0!==e,o=(0,r.useRef)(i),c=(0,r.useRef)(!1),u=(0,r.useRef)(!1);return!i||o.current||c.current?i||!o.current||u.current||(u.current=!0,o.current=i,console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")):(c.current=!0,o.current=i,console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")),[i?e:l,(0,a.z)(e=>(i||s(e),null==t?void 0:t(e)))]}},28587:function(e,t,n){"use strict";function r(e,t){return e?e+"["+t+"]":t}function a(e){var t,n;let r=null!=(t=null==e?void 0:e.form)?t:e.closest("form");if(r){for(let t of r.elements)if(t!==e&&("INPUT"===t.tagName&&"submit"===t.type||"BUTTON"===t.tagName&&"submit"===t.type||"INPUT"===t.nodeName&&"image"===t.type)){t.click();return}null==(n=r.requestSubmit)||n.call(r)}}n.d(t,{g:function(){return a},t:function(){return function e(t={},n=null,a=[]){for(let[l,s]of Object.entries(t))!function t(n,a,l){if(Array.isArray(l))for(let[e,s]of l.entries())t(n,r(a,e.toString()),s);else l instanceof Date?n.push([a,l.toISOString()]):"boolean"==typeof l?n.push([a,l?"1":"0"]):"string"==typeof l?n.push([a,l]):"number"==typeof l?n.push([a,`${l}`]):null==l?n.push([a,""]):e(l,a,n)}(a,r(n,l),s);return a}}})},29488:function(e,t,n){"use strict";n.d(t,{IZ:function(){return m}});var r=n(21841);let{Axios:a,AxiosError:l,CanceledError:s,isCancel:i,CancelToken:o,VERSION:c,all:u,Cancel:d,isAxiosError:m,spread:f,toFormData:x,AxiosHeaders:h,HttpStatusCode:g,formToJSON:p,getAdapter:j,mergeConfig:b}=r.default}},function(e){e.O(0,[6949,3372,4564,243,2007,1651,3683,9530,422,8821,9077,1361,9803,5980,9999,8702,7431,1744],function(){return e(e.s=61679)}),_N_E=e.O()}]);