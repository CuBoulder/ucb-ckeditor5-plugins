!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.tooltip=e())}(self,(()=>(()=>{var __webpack_modules__={"./js/ckeditor5_plugins/tooltip/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltip */ "./js/ckeditor5_plugins/tooltip/src/tooltip.js");\n/**\n * @file The build process always expects an index.js file. Anything exported\n * here will be recognized by CKEditor 5 as an available plugin. Multiple\n * plugins can be exported in this one file.\n *\n * I.e. this file\'s purpose is to make plugin(s) discoverable.\n */\n// cSpell:ignore tooltip\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  Tooltip: _tooltip__WEBPACK_IMPORTED_MODULE_0__["default"]\n});\n\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/index.js?')},"./js/ckeditor5_plugins/tooltip/src/inserttooltipcommand.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ TooltipCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var _ckeditor_ckeditor5_typing_src_utils_findattributerange__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ckeditor/ckeditor5-typing/src/utils/findattributerange */ "./node_modules/@ckeditor/ckeditor5-typing/src/utils/findattributerange.js");\n/* harmony import */ var _tooltiputils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltiputils.js */ "./js/ckeditor5_plugins/tooltip/src/tooltiputils.js");\n/* harmony import */ var ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ckeditor5/src/utils */ "ckeditor5/src/utils.js");\n\n \t\n\n\n\nclass TooltipCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n  refresh() {\n  const model = this.editor.model;\n  const selection = model.document.selection;\n  const firstRange = selection.getFirstRange();\n\n  // When the selection is collapsed, the command has a value if the caret is in a tooltip.\n  if ( firstRange.isCollapsed ) {\n    if ( selection.hasAttribute( \'tooltip\' ) ) {\n      const attributeValue = selection.getAttribute( \'tooltip\' );\n\n      // Find the entire range containing the tooltip under the caret position.\n      const tooltipRange = (0,_ckeditor_ckeditor5_typing_src_utils_findattributerange__WEBPACK_IMPORTED_MODULE_1__["default"])( selection.getFirstPosition(), \'tooltip\', attributeValue, model );\n\n      this.value = {\n        abbr: (0,_tooltiputils_js__WEBPACK_IMPORTED_MODULE_2__["default"])( tooltipRange ),\n        title: attributeValue,\n        range: tooltipRange\n      };\n    } else {\n      this.value = null;\n    }\n  }\n  // When the selection is not collapsed, the command has a value if the selection contains a subset of a single tooltip\n  // or an entire tooltip.\n  else {\n    if ( selection.hasAttribute( \'tooltip\' ) ) {\n      const attributeValue = selection.getAttribute( \'tooltip\' );\n\n      // Find the entire range containing the tooltip under the caret position.\n      const tooltipRange = (0,_ckeditor_ckeditor5_typing_src_utils_findattributerange__WEBPACK_IMPORTED_MODULE_1__["default"])( selection.getFirstPosition(), \'tooltip\', attributeValue, model );\n\n      if ( tooltipRange.containsRange( firstRange, true ) ) {\n        this.value = {\n          abbr: (0,_tooltiputils_js__WEBPACK_IMPORTED_MODULE_2__["default"])( firstRange ),\n          title: attributeValue,\n          range: firstRange\n        };\n      } else {\n        this.value = null;\n      }\n    } else {\n      this.value = null;\n    }\n  }\n\n  // The command is enabled when the "tooltip" attribute can be set on the current model selection.\n  this.isEnabled = model.schema.checkAttributeInSelection( selection, \'tooltip\' );\n}\n\nexecute( { abbr, title } ) {\n  const model = this.editor.model;\n  const selection = model.document.selection;\n\n  model.change( writer => {\n    // If selection is collapsed then update the selected tooltip or insert a new one at the place of caret.\n    if ( selection.isCollapsed ) {\n      // When a collapsed selection is inside text with the "tooltip" attribute, update its text and title.\n      if ( this.value ) {\n        const { end: positionAfter } = model.insertContent(\n          writer.createText( abbr, { tooltip: title } ),\n          this.value.range\n        );\n        // Put the selection at the end of the inserted tooltip.\n        writer.setSelection( positionAfter );\n      }\n      // If the collapsed selection is not in an existing tooltip, insert a text node with the "tooltip" attribute\n      // in place of the caret. Because the selection is collapsed, the attribute value will be used as a data for text.\n      // If the tooltip is empty, do not do anything.\n      else if ( abbr !== \'\' ) {\n        const firstPosition = selection.getFirstPosition();\n\n        // Collect all attributes of the user selection (could be "bold", "italic", etc.)\n        const attributes = (0,ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_3__.toMap)( selection.getAttributes() );\n\n        // Put the new attribute to the map of attributes.\n        attributes.set( \'tooltip\', title );\n\n        // Inject the new text node with the tooltip text with all selection attributes.\n        const { end: positionAfter } = model.insertContent( writer.createText( abbr, attributes ), firstPosition );\n\n        // Put the selection at the end of the inserted tooltip. Using an end of a range returned from\n        // insertContent() just in case nodes with the same attributes were merged.\n        writer.setSelection( positionAfter );\n      }\n\n      // Remove the "tooltip" attribute attribute from the selection. It stops adding a new content into the tooltip\n      // if the user starts to type.\n      writer.removeSelectionAttribute( \'tooltip\' );\n    } else {\n      // If the selection has non-collapsed ranges, change the attribute on nodes inside those ranges\n      // omitting nodes where the "tooltip" attribute is disallowed.\n      const ranges = model.schema.getValidRanges( selection.getRanges(), \'tooltip\' );\n\n      for ( const range of ranges ) {\n        writer.setAttribute( \'tooltip\', title, range );\n      }\n    }\n  } );\n}\n}\n\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/inserttooltipcommand.js?')},"./js/ckeditor5_plugins/tooltip/src/tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Tooltip)\n/* harmony export */ });\n/* harmony import */ var _tooltipediting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltipediting */ "./js/ckeditor5_plugins/tooltip/src/tooltipediting.js");\n/* harmony import */ var _tooltipui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltipui */ "./js/ckeditor5_plugins/tooltip/src/tooltipui.js");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file\'s purpose is to integrate all the separate parts of the plugin\n * before it\'s made discoverable via index.js.\n */\n// cSpell:ignore tooltipEditing tooltipUI\n\n// The contents of TooltipUI and TooltipEditing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n\n\n\n\n// Note that TooltipEditing and TooltipUI also extend `Plugin`, but these\n  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only\n  // discover the plugins explicitly exported in index.js.\n  class Tooltip extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.Plugin {\n    static get requires() {\n      return [ _tooltipediting__WEBPACK_IMPORTED_MODULE_0__["default"], _tooltipui__WEBPACK_IMPORTED_MODULE_1__["default"] ];\n    }\n  }\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/tooltip.js?')},"./js/ckeditor5_plugins/tooltip/src/tooltipediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TooltipEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _inserttooltipcommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inserttooltipcommand */ \"./js/ckeditor5_plugins/tooltip/src/inserttooltipcommand.js\");\n\n\n\nclass TooltipEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tinit() {\n\t\tthis._defineSchema();\n\t\tthis._defineConverters();\n\n\t\tthis.editor.commands.add(\n\t\t\t'addTooltip', new _inserttooltipcommand__WEBPACK_IMPORTED_MODULE_1__[\"default\"]( this.editor )\n\t\t);\n\t}\n\t_defineSchema() {\n\t\tconst schema = this.editor.model.schema;\n\n    \t// Extend the text node's schema to accept the tooltip attribute.\n\t\tschema.extend( '$text', {\n\t\t\tallowAttributes: [ 'ucb-tooltip' ]\n\t\t} );\n\t}\n\t_defineConverters() {\n\t\tconst conversion = this.editor.conversion;\n\t\t\n        // Conversion from a model attribute to a view element\n\t\tconversion.for( 'downcast' ).attributeToElement( {\n\t\t\tmodel: 'ucb-tooltip',\n\n            // Callback function provides access to the model attribute value\n\t\t\t// and the DowncastWriter\n\t\t\tview: ( modelAttributeValue, conversionApi ) => {\n\t\t\t\tconst { writer } = conversionApi;\n\t\t\t\treturn writer.createAttributeElement( 'abbr', {\n\t\t\t\t\ttitle: modelAttributeValue\n\t\t\t\t} );\n\t\t\t}\n\t\t} );\n\n\t\t// Conversion from a view element to a model attribute\n\t\tconversion.for( 'upcast' ).elementToAttribute( {\n\t\t\tview: {\n\t\t\t\tname: 'abbr',\n\t\t\t\tattributes: [ 'title' ]\n\t\t\t},\n\t\t\tmodel: {\n\t\t\t\tkey: 'ucb-tooltip',\n\n                // Callback function provides access to the view element\n\t\t\t\tvalue: viewElement => {\n\t\t\t\t\tconst title = viewElement.getAttribute( 'title' );\n\t\t\t\t\treturn title;\n\t\t\t\t}\n\t\t\t}\n\t\t} );\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/tooltipediting.js?")},"./js/ckeditor5_plugins/tooltip/src/tooltipui.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ TooltipUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/ui */ "ckeditor5/src/ui.js");\n/* harmony import */ var _tooltipview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltipview */ "./js/ckeditor5_plugins/tooltip/src/tooltipview.js");\n/* harmony import */ var _tooltiputils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tooltiputils.js */ "./js/ckeditor5_plugins/tooltip/src/tooltiputils.js");\n/* harmony import */ var _icons_tooltip_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../icons/tooltip.svg */ "./icons/tooltip.svg");\n\n\n\n\n\n\nclass TooltipUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n\tstatic get requires() {\n\t\treturn [ ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ContextualBalloon ];\n\t}\n\n\tinit() {\n\t\tconst editor = this.editor;\n\n        // Create the balloon and the form view.\n\t\tthis._balloon = this.editor.plugins.get( ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ContextualBalloon );\n\t\tthis.formView = this._createFormView();\n\n\t\teditor.ui.componentFactory.add( \'tooltip\', () => {\n\t\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonView();\n\n      \t\tbutton.icon = _icons_tooltip_svg__WEBPACK_IMPORTED_MODULE_4__["default"];\n\t\t\tbutton.tooltip = true;\n\t\t\tbutton.withText = false;\n\t\t\t\n\t\t\t// Show the UI on button click.\n\t\t\tthis.listenTo( button, \'execute\', () => {\n\t\t\t\tthis._showUI();\n\t\t\t} );\n\n\t\t\treturn button;\n\t\t} );\n\t}\n\n  \n\n\t_createFormView() {\n\t\tconst editor = this.editor;\n\t\tconst formView = new _tooltipview__WEBPACK_IMPORTED_MODULE_2__["default"]( editor.locale );\n\n\t\t// Execute the command after clicking the "Save" button.\n\t\tthis.listenTo( formView, \'submit\', () => {\n\t\t\t// Grab values from the tool tip and title input fields.\n\t\t\tconst value = {\n\t\t\t\tabbr: formView.abbrInputView.fieldView.element.value,\n\t\t\t\ttitle: formView.titleInputView.fieldView.element.value\n\t\t\t};\n\t\t\teditor.execute( \'addTooltip\', value );\n\n            // Hide the form view after submit.\n\t\t\tthis._hideUI();\n\t\t} );\n\n\t\t// Hide the form view after clicking the "Cancel" button.\n\t\tthis.listenTo( formView, \'cancel\', () => {\n\t\t\tthis._hideUI();\n\t\t} );\n\n\t\t// Hide the form view when clicking outside the balloon.\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.clickOutsideHandler)( {\n\t\t\temitter: formView,\n\t\t\tactivator: () => this._balloon.visibleView === formView,\n\t\t\tcontextElements: [ this._balloon.view.element ],\n\t\t\tcallback: () => this._hideUI()\n\t\t} );\n\n\t\treturn formView;\n\t}\n\n\t_showUI() {\n\t\tconst selection = this.editor.model.document.selection;\n\n\t\t// Check the value of the command.\n\t\tconst commandValue = this.editor.commands.get( \'addTooltip\' ).value;\n\n\t\tthis._balloon.add( {\n\t\t\tview: this.formView,\n\t\t\tposition: this._getBalloonPositionData()\n\t\t} );\n\n\t\t// Disable the input when the selection is not collapsed.\n\t\tthis.formView.abbrInputView.isEnabled = selection.getFirstRange().isCollapsed;\n\n\t\t// Fill the form using the state (value) of the command.\n\t\tif ( commandValue ) {\n\t\t\tthis.formView.abbrInputView.fieldView.value = commandValue.abbr;\n\t\t\tthis.formView.titleInputView.fieldView.value = commandValue.title;\n\t\t}\n\t\t// If the command has no value, put the currently selected text (not collapsed)\n\t\t// in the first field and empty the second in that case.\n\t\telse {\n\t\t\tconst selectedText = (0,_tooltiputils_js__WEBPACK_IMPORTED_MODULE_3__["default"])( selection.getFirstRange() );\n\n\t\t\tthis.formView.abbrInputView.fieldView.value = selectedText;\n\t\t\tthis.formView.titleInputView.fieldView.value = \'\';\n\t\t}\n\n\t\tthis.formView.focus();\n\t}\n\n\t_hideUI() {\n\t\t// Clear the input field values and reset the form.\n\t\tthis.formView.abbrInputView.fieldView.value = \'\';\n\t\tthis.formView.titleInputView.fieldView.value = \'\';\n\t\tthis.formView.element.reset();\n\n\t\tthis._balloon.remove( this.formView );\n\n\t\t// Focus the editing view after inserting the tooltip so the user can start typing the content\n\t\t// right away and keep the editor focused.\n\t\tthis.editor.editing.view.focus();\n\t}\n\n\t_getBalloonPositionData() {\n\t\tconst view = this.editor.editing.view;\n\t\tconst viewDocument = view.document;\n\t\tlet target = null;\n\n\t\t// Set a target position by converting view selection range to DOM\n\t\ttarget = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );\n\n\t\treturn {\n\t\t\ttarget\n\t\t};\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/tooltipui.js?')},"./js/ckeditor5_plugins/tooltip/src/tooltiputils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getRangeText)\n/* harmony export */ });\n// A helper function that retrieves and concatenates all text within the model range.\nfunction getRangeText( range ) {\n\treturn Array.from( range.getItems() ).reduce( ( rangeText, node ) => {\n\t\tif ( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {\n\t\t\treturn rangeText;\n\t\t}\n\n\t\treturn rangeText + node.data;\n\t}, '' );\n}\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/tooltiputils.js?")},"./js/ckeditor5_plugins/tooltip/src/tooltipview.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormView)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/utils */ \"ckeditor5/src/utils.js\");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n\n\n\n\nclass FormView extends ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.View {\n\tconstructor( locale ) {\n\t\tsuper( locale );\n\n\t\tthis.focusTracker = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__.FocusTracker();\n\t\tthis.keystrokes = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_1__.KeystrokeHandler();\n\n\t\tthis.abbrInputView = this._createInput( 'Add Tooltip' );\n\t\tthis.titleInputView = this._createInput( 'Add Text' );\n\n\t\tthis.saveButtonView = this._createButton( 'Save', ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.icons.check, 'ck-button-save' );\n\n\t\t// Submit type of the button will trigger the submit event on entire form when clicked \n\t\t//(see submitHandler() in render() below).\n\t\tthis.saveButtonView.type = 'submit';\n\n\t\tthis.cancelButtonView = this._createButton( 'Cancel', ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.icons.cancel, 'ck-button-cancel' );\n\n\t\t// Delegate ButtonView#execute to FormView#cancel.\n\t\tthis.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );\n\n\t\tthis.childViews = this.createCollection( [\n\t\t\tthis.abbrInputView,\n\t\t\tthis.titleInputView,\n\t\t\tthis.saveButtonView,\n\t\t\tthis.cancelButtonView\n\t\t] );\n\n\t\tthis._focusCycler = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.FocusCycler( {\n\t\t\tfocusables: this.childViews,\n\t\t\tfocusTracker: this.focusTracker,\n\t\t\tkeystrokeHandler: this.keystrokes,\n\t\t\tactions: {\n\t\t\t\t// Navigate form fields backwards using the Shift + Tab keystroke.\n\t\t\t\tfocusPrevious: 'shift + tab',\n\n\t\t\t\t// Navigate form fields forwards using the Tab key.\n\t\t\t\tfocusNext: 'tab'\n\t\t\t}\n\t\t} );\n\n\t\tthis.setTemplate( {\n\t\t\ttag: 'form',\n\t\t\tattributes: {\n\t\t\t\tclass: [ 'ck', 'ck-tooltip-form' ],\n\t\t\t\ttabindex: '-1'\n\t\t\t},\n\t\t\tchildren: this.childViews\n\t\t} );\n\t}\n\n\trender() {\n\t\tsuper.render();\n\n\t\t(0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.submitHandler)( {\n\t\t\tview: this\n\t\t} );\n\n\t\tthis.childViews._items.forEach( view => {\n\t\t\t// Register the view in the focus tracker.\n\t\t\tthis.focusTracker.add( view.element );\n\t\t} );\n\n\t\t// Start listening for the keystrokes coming from #element.\n\t\tthis.keystrokes.listenTo( this.element );\n\t}\n\n\tdestroy() {\n\t\tsuper.destroy();\n\n\t\tthis.focusTracker.destroy();\n\t\tthis.keystrokes.destroy();\n\t}\n\n\tfocus() {\n\t\t// If the abbreviation text field is enabled, focus it straight away to allow the user to type.\n\t\tif ( this.abbrInputView.isEnabled ) {\n\t\t\tthis.abbrInputView.focus();\n\t\t}\n\t\t// Focus the tooltip title field if the former is disabled.\n\t\telse {\n\t\t\tthis.titleInputView.focus();\n\t\t}\n\t}\n\n\t_createInput( label ) {\n\t\tconst labeledInput = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.LabeledFieldView( this.locale, ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.createLabeledInputText );\n\n\t\tlabeledInput.label = label;\n\n\t\treturn labeledInput;\n\t}\n\n\t_createButton( label, icon, className ) {\n\t\tconst button = new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonView();\n\n\t\tbutton.set( {\n\t\t\tlabel,\n\t\t\ticon,\n\t\t\ttooltip: true,\n\t\t\tclass: className\n\t\t} );\n\n\t\treturn button;\n\t}\n}\n\n//# sourceURL=webpack://CKEditor5.tooltip/./js/ckeditor5_plugins/tooltip/src/tooltipview.js?")},"./node_modules/@ckeditor/ckeditor5-typing/src/utils/findattributerange.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ findAttributeRange)\n/* harmony export */ });\n/**\n * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.\n * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license\n */\n\n/**\n * @module typing/utils/findattributerange\n */\n\n/**\n * Returns a model range that covers all consecutive nodes with the same `attributeName` and its `value`\n * that intersect the given `position`.\n *\n * It can be used e.g. to get the entire range on which the `linkHref` attribute needs to be changed when having a\n * selection inside a link.\n *\n * @param {module:engine/model/position~Position} position The start position.\n * @param {String} attributeName The attribute name.\n * @param {String} value The attribute value.\n * @param {module:engine/model/model~Model} model The model instance.\n * @returns {module:engine/model/range~Range} The link range.\n */\nfunction findAttributeRange( position, attributeName, value, model ) {\n\treturn model.createRange(\n\t\t_findBound( position, attributeName, value, true, model ),\n\t\t_findBound( position, attributeName, value, false, model )\n\t);\n}\n\n// Walks forward or backward (depends on the `lookBack` flag), node by node, as long as they have the same attribute value\n// and returns a position just before or after (depends on the `lookBack` flag) the last matched node.\n//\n// @param {module:engine/model/position~Position} position The start position.\n// @param {String} attributeName The attribute name.\n// @param {String} value The attribute value.\n// @param {Boolean} lookBack Whether the walk direction is forward (`false`) or backward (`true`).\n// @returns {module:engine/model/position~Position} The position just before the last matched node.\nfunction _findBound( position, attributeName, value, lookBack, model ) {\n\t// Get node before or after position (depends on `lookBack` flag).\n\t// When position is inside text node then start searching from text node.\n\tlet node = position.textNode || ( lookBack ? position.nodeBefore : position.nodeAfter );\n\n\tlet lastNode = null;\n\n\twhile ( node && node.getAttribute( attributeName ) == value ) {\n\t\tlastNode = node;\n\t\tnode = lookBack ? node.previousSibling : node.nextSibling;\n\t}\n\n\treturn lastNode ? model.createPositionAt( lastNode, lookBack ? 'before' : 'after' ) : position;\n}\n\n\n//# sourceURL=webpack://CKEditor5.tooltip/./node_modules/@ckeditor/ckeditor5-typing/src/utils/findattributerange.js?")},"./icons/tooltip.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 512 512\\">\x3c!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --\x3e<path d=\\"M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm32 352c0 17.6-14.4 32-32 32H293.3l-8.5 6.4L192 460v-76H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h384c17.6 0 32 14.4 32 32v288zM128 184c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24z\\"/></svg>");\n\n//# sourceURL=webpack://CKEditor5.tooltip/./icons/tooltip.svg?')},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.tooltip/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.tooltip/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/utils.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/utils.js");\n\n//# sourceURL=webpack://CKEditor5.tooltip/delegated_./utils.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),__webpack_require__.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/ckeditor5_plugins/tooltip/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));