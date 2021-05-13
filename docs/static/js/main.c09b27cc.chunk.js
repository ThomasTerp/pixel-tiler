(this["webpackJsonppixel-tiler"]=this["webpackJsonppixel-tiler"]||[]).push([[0],{14:function(t,e,o){},16:function(t,e,o){},17:function(t,e,o){},18:function(t,e,o){},19:function(t,e,o){"use strict";o.r(e);var n=o(5),i=o.n(n),s=o(9),r=o.n(s),a=o(1),c=o(2),l=o(4),u=o(3),h={dark:{color1:"#1a212d",color2:"#79c0ff",color3:"#1f2f46"},white:{color1:"#eae1e1",color2:"#000000",color3:"#d4d4d4"}},f=i.a.createContext({theme:h.dark}),p=(o(14),o(0)),d=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return Object(c.a)(o,[{key:"render",value:function(){var t={backgroundColor:this.context.theme.color3};return this.props.isActive&&(t.borderColor=this.context.theme.color2),Object(p.jsx)("button",{className:"ToolButton ".concat(this.props.isActive?"Active":""),style:t,onClick:this.props.onClick,children:Object(p.jsx)("div",{style:{color:this.context.theme.color2},children:this.props.children})})}}]),o}(i.a.Component);d.contextType=f,d.defaultProps={};var v=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(){return Object(a.a)(this,o),e.apply(this,arguments)}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"Tool",children:[Object(p.jsx)("h1",{className:"Name",style:{color:this.context.theme.color2},children:this.props.name}),this.renderProperties()]})}},{key:"renderProperties",value:function(){return Object(p.jsx)("div",{className:"Properties"})}}]),o}(i.a.Component);v.contextType=f;var m=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return o}(v);m.defaultProps={name:"File"};var g=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t))._paletteColor_OnChange_SetPaletteColor=function(t){n.props.paletteManager.setColor(n.props.colorID,t.target.value)},n.state={},n}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsx)("input",{className:"PaletteColor",style:{backgroundColor:this.props.color},type:"color",defaultValue:this.props.color,onChange:this._paletteColor_OnChange_SetPaletteColor})}}]),o}(i.a.Component);g.contextType=f;var j=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t))._paletteManager_ColorChangeEmitter_ForceUpdate=function(t){n.forceUpdate()},n.state={},n}return Object(c.a)(o,[{key:"render",value:function(){var t=this;return Object(p.jsx)("div",{className:"Palette",children:this.props.paletteManager.colors.map((function(e,o){return Object(p.jsx)(g,{paletteManager:t.props.paletteManager,colorID:o,color:e},o)}))})}},{key:"componentDidMount",value:function(){this.props.paletteManager.colorChangeEmitter.on(this._paletteManager_ColorChangeEmitter_ForceUpdate)}},{key:"componentWillUnmount",value:function(){this.props.paletteManager.colorChangeEmitter.off(this._paletteManager_ColorChangeEmitter_ForceUpdate)}}]),o}(i.a.Component);j.contextType=f,j.defaultProps={isSelectable:!0};var x=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return Object(c.a)(o,[{key:"renderProperties",value:function(){return Object(p.jsx)("div",{className:"Properties",children:Object(p.jsx)(j,{paletteManager:this.props.paletteManager})})}}]),o}(v);x.defaultProps={name:"Brush Tool"};var b=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return o}(v);b.defaultProps={name:"Eraser Tool"};var y=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return o}(v);y.defaultProps={name:"Settings"};o(16);var O=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={activeToolKey:"brushTool"},n}return Object(c.a)(o,[{key:"render",value:function(){var t=this,e=[Object(p.jsx)(m,{},"fileTool"),Object(p.jsx)(x,{paletteManager:this.props.paletteManager},"brushTool"),Object(p.jsx)(b,{},"eraserTool"),Object(p.jsx)(y,{},"settingsTool")],o=e.map((function(e){return t.renderToolButton(e)})),n=e.find((function(e){return t.state.activeToolKey===e.key}));return Object(p.jsxs)("div",{className:"SideMenu",style:{backgroundColor:this.context.theme.color1},children:[Object(p.jsx)("div",{className:"ToolButtons",children:o}),n]})}},{key:"renderToolButton",value:function(t){var e=this,o=t.key,n=t.props.name;return Object(p.jsx)(d,{isActive:this.state.activeToolKey===o,onClick:function(){return e.setState({activeToolKey:o})},children:n},"".concat(o,"Button"))}}]),o}(i.a.Component);O.contextType=f,O.defaultProps={};var _=o(7),w=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return Object(c.a)(o,[{key:"render",value:function(){var t={transformOrigin:"".concat(this.props.size/2,"px ").concat(this.props.size/2,"px"),transform:"translate(".concat(this.props.position.x,"px, ").concat(this.props.position.y,"px) rotate(").concat(90*this.props.rotation,"deg)")};return Object(p.jsxs)("g",{className:"Tile",width:"".concat(this.props.size,"px"),height:"".concat(this.props.size,"px"),viewBox:"0,0 ".concat(this.props.size,",").concat(this.props.size),style:t,children:[this.props.svg,Object(p.jsx)("rect",{className:"TilePointer",x:"0",y:"0",width:"".concat(this.props.size,"px"),height:"".concat(this.props.size,"px"),fill:"none"})]})}}]),o}(i.a.Component);w.contextType=f;var k=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t)).state={},n}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsx)("g",{className:"GridTiles",children:this.props.tiles})}}]),o}(i.a.Component);k.contextType=f,k.defaultProps={};var z=function(){function t(e,o){Object(a.a)(this,t),this.x=void 0,this.y=void 0,this.x=e,this.y=o}return Object(c.a)(t,[{key:"add",value:function(e){return"number"===typeof e?(this.x+=e,this.y+=e):e instanceof t&&(this.x+=e.x,this.y+=e.y),this}},{key:"subtract",value:function(e){return"number"===typeof e?(this.x-=e,this.y-=e):e instanceof t&&(this.x-=e.x,this.y-=e.y),this}},{key:"multiply",value:function(e){return"number"===typeof e?(this.x*=e,this.y*=e):e instanceof t&&(this.x*=e.x,this.y*=e.y),this}},{key:"divide",value:function(e){return"number"===typeof e?(this.x/=e,this.y/=e):e instanceof t&&(this.x/=e.x,this.y/=e.y),this}},{key:"equal",value:function(t){return this.x===t.x&&this.y===t.y}},{key:"copy",value:function(){return new t(this.x,this.y)}}]),t}();var M={};o(17);var C=o(6),S=o.n(C),D=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;Object(a.a)(this,o),(n=e.call(this,t))._svg=void 0,n._isDragging=!1,n._dragCursorOffset=new z(0,0),n._dragOffset=new z(0,0),n._tileKey=0,n._svg_OnMouseWheel_Zoom=function(t){if(t.ctrlKey){if(t.originalEvent.wheelDelta>0&&n.state.zoom>n.props.zoomMinimum||t.originalEvent.wheelDelta<0&&n.state.zoom<n.props.zoomMaximum){var e=S()(window),o=new z((t.offsetX-e.width()/2)*n.state.zoom*n.props.zoomOffsetMultiplier,(t.offsetY-e.height()/2)*n.state.zoom*n.props.zoomOffsetMultiplier);n.setState({offset:t.originalEvent.wheelDelta>0?n.state.offset.copy().subtract(o):n.state.offset.copy().add(o)})}n.addZoom(t.originalEvent.wheelDelta),t.preventDefault()}},n._svg_OnMouseDown_StartDragging=function(t){switch(t.button){case 1:n._dragOffset.x=n.state.offset.x,n._dragOffset.y=n.state.offset.y,n._dragCursorOffset.x=t.nativeEvent.offsetX,n._dragCursorOffset.y=t.nativeEvent.offsetY,n._isDragging=!0,t.preventDefault()}},n._document_OnMouseUp_StopDragging=function(t){n._isDragging=!1},n._svg_OnMouseMove_Drag=function(t){n._isDragging&&n.setState({offset:new z(n._dragOffset.x+(t.nativeEvent.offsetX-n._dragCursorOffset.x)*n.state.zoom,n._dragOffset.y+(t.nativeEvent.offsetY-n._dragCursorOffset.y)*n.state.zoom)})},n._document_OnKeyDown_Hotkeys=function(t){switch(t.key){case"ArrowLeft":n.setState({offset:new z(n.state.offset.x+n.props.offsetIncrement,n.state.offset.y)});break;case"ArrowUp":n.setState({offset:new z(n.state.offset.x,n.state.offset.y+n.props.offsetIncrement)});break;case"ArrowRight":n.setState({offset:new z(n.state.offset.x-n.props.offsetIncrement,n.state.offset.y)});break;case"ArrowDown":n.setState({offset:new z(n.state.offset.x,n.state.offset.y-n.props.offsetIncrement)});break;case"w":n.setState({gridSize:Math.min(2*n.state.gridSize,n.props.gridSizeMaximum)});break;case"s":n.setState({gridSize:Math.max(n.state.gridSize/2,n.props.gridSizeMinimum)});break;case"+":t.ctrlKey&&(n.addZoom(n.props.zoomIncrement),t.preventDefault());break;case"-":t.ctrlKey&&(n.addZoom(-n.props.zoomIncrement),t.preventDefault())}},n._window_Resize_SetSize=function(t){var e=S()(window);n.setState({size:new z(e.width(),e.height())})};var s,r=S()(window),c=new z(r.width(),r.height());return n.state={uniqueID:(s="grid",s in M||(M[s]=0),"".concat(s).concat(M[s]++)),gridSize:32,zoom:1,offset:new z(0,0),size:c,tiles:[],color1:"#202124",color2:"#303136"},n._svg=i.a.createRef(),window.$1=Object(_.a)(n),n}return Object(c.a)(o,[{key:"render",value:function(){var t=this.state.offset.copy().add(this.state.size.copy().divide(2).multiply(this.state.zoom)),e=this.state.size.copy().multiply(this.state.zoom);return Object(p.jsxs)("svg",{className:"Grid",ref:this._svg,xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMinYMin",width:"".concat(this.state.size.x,"px"),height:"".concat(this.state.size.y,"px"),viewBox:"".concat(-t.x,",").concat(-t.y," ").concat(e.x,",").concat(e.y),onMouseDown:this._svg_OnMouseDown_StartDragging,onMouseMove:this._svg_OnMouseMove_Drag,children:[this.renderDefs(),this.renderGrid(t,e),Object(p.jsx)(k,{tiles:this.state.tiles})]})}},{key:"renderDefs",value:function(){return Object(p.jsxs)("defs",{children:[Object(p.jsx)("pattern",{id:"".concat(this.state.uniqueID,"_pattern1"),width:this.state.gridSize,height:this.state.gridSize,patternUnits:"userSpaceOnUse",children:Object(p.jsx)("rect",{width:"".concat(this.state.gridSize,"px"),height:"".concat(this.state.gridSize,"px"),fill:"none",stroke:this.state.color1,strokeWidth:"1"})}),Object(p.jsxs)("pattern",{id:"".concat(this.state.uniqueID,"_pattern2"),width:"".concat(this.props.gridSizeMaximum,"px"),height:"".concat(this.props.gridSizeMaximum,"px"),patternUnits:"userSpaceOnUse",children:[Object(p.jsx)("rect",{width:"".concat(this.props.gridSizeMaximum,"px"),height:"".concat(this.props.gridSizeMaximum,"px"),fill:"url(#".concat(this.state.uniqueID,"_pattern1)")}),Object(p.jsx)("rect",{width:"".concat(this.props.gridSizeMaximum,"px"),height:"".concat(this.props.gridSizeMaximum,"px"),fill:"none",stroke:this.state.color1,strokeWidth:"3"})]})]})}},{key:"renderGrid",value:function(t,e){return Object(p.jsxs)("g",{children:[Object(p.jsx)("rect",{id:"".concat(this.state.uniqueID,"_rect1"),x:"".concat(-t.x,"px"),y:"".concat(-t.y,"px"),width:"100%",height:"100%",fill:"url(#".concat(this.state.uniqueID,"_pattern2)")}),Object(p.jsx)("line",{id:"".concat(this.state.uniqueID,"_line1"),x1:"".concat(-t.x,"px"),y1:"0",x2:"".concat(-t.x+e.x,"px"),y2:"0",stroke:this.state.color2,strokeWidth:"3"}),Object(p.jsx)("line",{id:"".concat(this.state.uniqueID,"_line2"),x1:"0",y1:"".concat(-t.y,"px"),x2:"0",y2:"".concat(-t.y+e.y,"px"),stroke:this.state.color2,strokeWidth:"3"})]})}},{key:"componentDidMount",value:function(){var t=S()(document),e=S()(window),o=S()(this._svg.current);t.on("mouseup",this._document_OnMouseUp_StopDragging),t.on("keydown",this._document_OnKeyDown_Hotkeys),e.on("resize",this._window_Resize_SetSize),o.on("mousewheel",this._svg_OnMouseWheel_Zoom)}},{key:"componentWillUnmount",value:function(){var t=S()(document),e=S()(window),o=S()(this._svg.current);t.off("mouseup",this._document_OnMouseUp_StopDragging),t.off("keydown",this._document_OnKeyDown_Hotkeys),e.off("resize",this._window_Resize_SetSize),o.off("mousewheel",this._svg_OnMouseWheel_Zoom)}},{key:"addZoom",value:function(t){var e,o,n;this.setState({zoom:(e=this.state.zoom-t*this.state.zoom*this.props.zoomMultiplier,o=this.props.zoomMinimum,n=this.props.zoomMaximum,Math.min(Math.max(e,o),n))})}},{key:"positionToGrid",value:function(t){return new z(Math.floor(t.x/this.state.gridSize),Math.floor(t.y/this.state.gridSize))}},{key:"gridToPosition",value:function(t){return t.copy().multiply(this.state.gridSize)}},{key:"placeTile",value:function(t,e,o,n,i,s){var r=Object(p.jsx)(w,{svg:t,position:e,size:o,rotation:n,color:i,colorIndex:s},this._tileKey++);return this.setState({tiles:this.state.tiles.concat(r)}),r}}]),o}(i.a.Component);D.contextType=f,D.defaultProps={offsetIncrement:32,zoomIncrement:120,zoomMultiplier:.002,zoomOffsetMultiplier:.24,zoomMinimum:.064,zoomMaximum:4,gridSizeMinimum:2,gridSizeMaximum:128};var T=function t(){Object(a.a)(this,t)},P=function(){function t(){Object(a.a)(this,t),this._callbacks=new Map}return Object(c.a)(t,[{key:"on",value:function(t){this._callbacks.set(t,!0)}},{key:"off",value:function(t){this._callbacks.delete(t)}},{key:"once",value:function(t){var e=this;this.on((function(o){t(o),e.off(t)}))}},{key:"emit",value:function(t){"undefined"===typeof t&&(t=new T);for(var e=t,o=0,n=Array.from(this._callbacks.keys());o<n.length;o++){(0,n[o])(e)}return e}}]),t}(),I=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t,n){var i;return Object(a.a)(this,o),(i=e.call(this)).colorID=void 0,i.color=void 0,i.colorID=t,i.color=n,i}return o}(T),E=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object(a.a)(this,t),this.colors=void 0,this.colorChangeEmitter=new P,this._defaultColor="#ffffff",this.colors=e,0===this.colors.length&&this.addColor()}return Object(c.a)(t,[{key:"addColor",value:function(){this.setColor(this.colors.length,this._defaultColor)}},{key:"setColor",value:function(t,e){var o=this.colorChangeEmitter.emit(new I(t,e));this.colors[o.colorID]=o.color}}]),t}(),N=function(t){Object(l.a)(o,t);var e=Object(u.a)(o);function o(t){var n;return Object(a.a)(this,o),(n=e.call(this,t))._appContext=void 0,n.state={paletteManager:new E(n.props.defaultPaletteColors),selectedTileset:t.tilesets.default,selectedTile:t.tilesets.default.getTile("tile1")},n._appContext={theme:n.props.themes.dark},n}return Object(c.a)(o,[{key:"render",value:function(){return Object(p.jsx)(f.Provider,{value:this._appContext,children:Object(p.jsxs)("div",{className:"App",children:[this.renderContent(),Object(p.jsx)(O,{paletteManager:this.state.paletteManager})]})})}},{key:"renderContent",value:function(){return Object(p.jsx)("div",{className:"Content",children:Object(p.jsx)(D,{})})}}]),o}(i.a.Component),U=function(t){t&&t instanceof Function&&o.e(3).then(o.bind(null,20)).then((function(e){var o=e.getCLS,n=e.getFID,i=e.getFCP,s=e.getLCP,r=e.getTTFB;o(t),n(t),i(t),s(t),r(t)}))},K=(o(18),{default:new(function(){function t(e){Object(a.a)(this,t),this.name=void 0,this._tiles=void 0,this.name=e,this._tiles={}}return Object(c.a)(t,[{key:"tiles",get:function(){return this._tiles}},{key:"setTile",value:function(t,e){this._tiles[t]=e}},{key:"getTile",value:function(t){return this._tiles[t]}}]),t}())("default")}),A=["#ffffff","#cccccc","#000000","#333333","#925c3a","#784f35","#dc6d1c","#f4dd42","#b23434","#631d1d","#81b93b","#4d893a","#5e81ca","#343d65","#cc00ff","#8f00b3","#ffb3ff"];r.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(N,{themes:h,tilesets:K,defaultPaletteColors:A})}),document.getElementById("root")),U()}},[[19,1,2]]]);
//# sourceMappingURL=main.c09b27cc.chunk.js.map