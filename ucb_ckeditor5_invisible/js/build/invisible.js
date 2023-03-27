!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.invisible=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,s)=>{e.exports=s("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function s(i){var o=t[i];if(void 0!==o)return o.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,s),n.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};return(()=>{"use strict";s.d(i,{default:()=>d});var e=s("ckeditor5/src/core.js"),t=s("ckeditor5/src/ui.js");class o extends e.Command{execute(){const e=this.editor.model,t=e.document.selection;e.change((s=>{const i=function(e,t){const s=e.createElement("ucb-invisible"),i=t.getFirstRange();for(const t of i.getItems()){const i=e.createText(t.data);e.append(i,s)}return s}(s,t);e.insertContent(i)}))}refresh(){const e=this.editor.model,t=e.document.selection,s=e.schema.findAllowedParent(t.getFirstPosition(),"ucb-invisible");this.isEnabled=null!==s}}var n=s("ckeditor5/src/widget.js");class r extends e.Plugin{static get requires(){return[n.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("addInvisible",new o(this.editor))}_defineSchema(){this.editor.model.schema.register("ucb-invisible",{allowWhere:"$block",allowChildren:"$text"})}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"ucb-invisible",view:{name:"span",classes:"sr-only"}}),e.for("dataDowncast").elementToElement({model:"ucb-invisible",view:{name:"span",classes:"sr-only"}}),e.for("editingDowncast").elementToElement({model:"ucb-invisible",view:{name:"span",class:"ucb-invisible-edit"}})}}class c extends e.Plugin{init(){const e=this.editor;e.ui.componentFactory.add("invisible",(()=>{const s=e.commands.get("addInvisible"),i=new t.ButtonView;return i.label="Screen-Read",i.icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --\x3e<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM213.5 173.3l72 144c5.9 11.9 1.1 26.3-10.7 32.2s-26.3 1.1-32.2-10.7l-9.4-18.9H150.9l-9.4 18.9c-5.9 11.9-20.3 16.7-32.2 10.7s-16.7-20.3-10.7-32.2l72-144c4.1-8.1 12.4-13.3 21.5-13.3s17.4 5.1 21.5 13.3zm-.4 106.6L192 237.7l-21.1 42.2h42.2zM304 184c0-13.3 10.7-24 24-24h56c53 0 96 43 96 96s-43 96-96 96H328c-13.3 0-24-10.7-24-24V184zm48 24v96h32c26.5 0 48-21.5 48-48s-21.5-48-48-48H352z"/></svg>',i.tooltip=!0,i.withText=!1,i.bind("isOn","isEnabled").to(s,"value","isEnabled"),this.listenTo(i,"execute",(()=>e.execute("addInvisible"))),i}))}}class l extends e.Plugin{static get requires(){return[r,c]}static get pluginName(){return"ucb-invisible"}}const d={Invisible:l}})(),i=i.default})()));