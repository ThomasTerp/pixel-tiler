(this["webpackJsonppixel-tiler"]=this["webpackJsonppixel-tiler"]||[]).push([[0],{13:function(t,e,i){},15:function(t,e,i){},16:function(t,e,i){"use strict";i.r(e);var s=i(1),o=i.n(s),n=i(8),r=i.n(n),a=i(3),c=i(4),h=i(6),l=i(5),f=function(){function t(e,i){Object(a.a)(this,t),this.x=void 0,this.y=void 0,this.x=e,this.y=i}return Object(c.a)(t,[{key:"add",value:function(e){if("number"===typeof e)this.x+=e,this.y+=e;else{if(!(e instanceof t))throw new Error("Can only multiply by a number or another Vector2D");this.x+=e.x,this.y+=e.y}return this}},{key:"subtract",value:function(e){if("number"===typeof e)this.x-=e,this.y-=e;else{if(!(e instanceof t))throw new Error("Can only multiply by a number or another Vector2D");this.x-=e.x,this.y-=e.y}return this}},{key:"multiply",value:function(e){if("number"===typeof e)this.x*=e,this.y*=e;else{if(!(e instanceof t))throw new Error("Can only multiply by a number or another Vector2D");this.x*=e.x,this.y*=e.y}return this}},{key:"divide",value:function(e){if("number"===typeof e)this.x/=e,this.y/=e;else{if(!(e instanceof t))throw new Error("Can only divide by a number or another Vector2D");this.x/=e.x,this.y/=e.y}return this}},{key:"equal",value:function(t){return this.x===t.x&&this.y===t.y}},{key:"copy",value:function(){return new t(this.x,this.y)}}]),t}();var u={};i(13);var p=i(2),d=i.n(p),x=i(0),m=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(t){var s;Object(a.a)(this,i),(s=e.call(this,t))._svg=void 0,s._isDragging=!1,s._dragCursorOffset=new f(0,0),s._dragOffset=new f(0,0),s._svg_OnMouseWheel_Zoom=function(t){if(t.ctrlKey){if(t.originalEvent.wheelDelta>0&&s.state.zoom>s.props.zoomMinimum||t.originalEvent.wheelDelta<0&&s.state.zoom<s.props.zoomMaximum){var e=d()(window),i=new f((t.offsetX-e.width()/2)*s.state.zoom*s.props.zoomOffsetMultiplier,(t.offsetY-e.height()/2)*s.state.zoom*s.props.zoomOffsetMultiplier);s.setState({offset:t.originalEvent.wheelDelta>0?s.state.offset.copy().subtract(i):s.state.offset.copy().add(i)})}s.addZoom(t.originalEvent.wheelDelta),t.preventDefault()}},s._svg_OnMouseDown_StartDragging=function(t){switch(t.button){case 1:s._dragOffset.x=s.state.offset.x,s._dragOffset.y=s.state.offset.y,s._dragCursorOffset.x=t.nativeEvent.offsetX,s._dragCursorOffset.y=t.nativeEvent.offsetY,s._isDragging=!0,t.preventDefault()}},s._document_OnMouseUp_StopDragging=function(t){s._isDragging=!1},s._svg_OnMouseMove_Drag=function(t){s._isDragging&&s.setState({offset:new f(s._dragOffset.x+(t.nativeEvent.offsetX-s._dragCursorOffset.x)*s.state.zoom,s._dragOffset.y+(t.nativeEvent.offsetY-s._dragCursorOffset.y)*s.state.zoom)})},s._document_OnKeyDown_Hotkeys=function(t){switch(t.key){case"ArrowLeft":s.setState({offset:new f(s.state.offset.x+s.props.offsetIncrement,s.state.offset.y)});break;case"ArrowUp":s.setState({offset:new f(s.state.offset.x,s.state.offset.y+s.props.offsetIncrement)});break;case"ArrowRight":s.setState({offset:new f(s.state.offset.x-s.props.offsetIncrement,s.state.offset.y)});break;case"ArrowDown":s.setState({offset:new f(s.state.offset.x,s.state.offset.y-s.props.offsetIncrement)});break;case"w":s.setState({gridSize:Math.min(2*s.state.gridSize,s.props.gridSizeMaximum)});break;case"s":s.setState({gridSize:Math.max(s.state.gridSize/2,s.props.gridSizeMinimum)});break;case"+":t.ctrlKey&&(s.addZoom(-s.props.zoomIncrement),t.preventDefault());break;case"-":t.ctrlKey&&(s.addZoom(s.props.zoomIncrement),t.preventDefault())}},s._window_Resize_SetSize=function(t){var e=d()(window);s.setState({size:new f(e.width(),e.height())})};var n,r=d()(window),c=new f(r.width(),r.height());return s.state={uniqueID:(n="grid",n in u||(u[n]=0),"".concat(n).concat(u[n]++)),gridSize:32,zoom:1,offset:new f(0,0),size:c,color1:"#202124",color2:"#303136"},s._svg=o.a.createRef(),s}return Object(c.a)(i,[{key:"render",value:function(){var t=this.state.offset.copy().add(this.state.size.copy().divide(2).multiply(this.state.zoom)),e=this.state.size.copy().multiply(this.state.zoom);return Object(x.jsxs)("svg",{className:"Grid",ref:this._svg,xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMinYMin",width:"".concat(this.state.size.x,"px"),height:"".concat(this.state.size.y,"px"),viewBox:"".concat(-t.x,",").concat(-t.y," ").concat(e.x,",").concat(e.y),onMouseDown:this._svg_OnMouseDown_StartDragging,onMouseMove:this._svg_OnMouseMove_Drag,children:[Object(x.jsxs)("defs",{children:[Object(x.jsx)("pattern",{id:"".concat(this.state.uniqueID,"_pattern1"),width:this.state.gridSize,height:this.state.gridSize,patternUnits:"userSpaceOnUse",children:Object(x.jsx)("rect",{width:"".concat(this.state.gridSize),height:"".concat(this.state.gridSize),fill:"none",stroke:this.state.color1,strokeWidth:"1"})}),Object(x.jsxs)("pattern",{id:"".concat(this.state.uniqueID,"_pattern2"),width:"".concat(this.props.gridSizeMaximum),height:"".concat(this.props.gridSizeMaximum),patternUnits:"userSpaceOnUse",children:[Object(x.jsx)("rect",{width:"".concat(this.props.gridSizeMaximum),height:"".concat(this.props.gridSizeMaximum),fill:"url(#".concat(this.state.uniqueID,"_pattern1)")}),Object(x.jsx)("rect",{width:"".concat(this.props.gridSizeMaximum),height:"".concat(this.props.gridSizeMaximum),fill:"none",stroke:this.state.color1,strokeWidth:"3"})]})]}),Object(x.jsx)("rect",{id:"".concat(this.state.uniqueID,"_rect1"),x:"".concat(-t.x,"px"),y:"".concat(-t.y,"px"),width:"100%",height:"100%",fill:"url(#".concat(this.state.uniqueID,"_pattern2)")}),Object(x.jsx)("line",{id:"".concat(this.state.uniqueID,"_line1"),x1:"".concat(-t.x,"px"),y1:"0",x2:"".concat(-t.x+e.x,"px"),y2:"0",stroke:this.state.color2,strokeWidth:"3"}),Object(x.jsx)("line",{id:"".concat(this.state.uniqueID,"_line2"),x1:"0",y1:"".concat(-t.y,"px"),x2:"0",y2:"".concat(-t.y+e.y,"px"),stroke:this.state.color2,strokeWidth:"3"}),Object(x.jsxs)("g",{className:"Tile",width:"32px",height:"32px",viewBox:"0,0 32,32",style:{transformOrigin:"16px 16px",transform:"translate(0px, 0px) rotate(0deg)"},children:[Object(x.jsx)("rect",{width:"32px",height:"32px",fill:"white"}),Object(x.jsx)("rect",{className:"TilePointer",x:"0",y:"0",width:"32px",height:"32px",fill:"none"})]}),Object(x.jsxs)("g",{className:"Tile",width:"32px",height:"32px",viewBox:"0,0 32,32",style:{transformOrigin:"16px 16px",transform:"translate(32px, 0px) rotate(0deg)"},children:[Object(x.jsx)("rect",{width:"32px",height:"32px",fill:"white"}),Object(x.jsx)("rect",{className:"TilePointer",x:"0",y:"0",width:"32px",height:"32px",fill:"none"})]}),Object(x.jsxs)("g",{className:"Tile",width:"32px",height:"32px",viewBox:"0,0 32,32",style:{transformOrigin:"16px 16px",transform:"translate(0px, 32px) rotate(0deg)"},children:[Object(x.jsx)("rect",{width:"32px",height:"32px",fill:"white"}),Object(x.jsx)("rect",{className:"TilePointer",x:"0",y:"0",width:"32px",height:"32px",fill:"none"})]}),Object(x.jsxs)("g",{className:"Tile",width:"32px",height:"32px",viewBox:"0,0 32,32",style:{transformOrigin:"16px 16px",transform:"translate(32px, 32px) rotate(0deg)"},children:[Object(x.jsx)("rect",{width:"32px",height:"32px",fill:"white"}),Object(x.jsx)("rect",{className:"TilePointer",x:"0",y:"0",width:"32px",height:"32px",fill:"none"})]})]})}},{key:"componentDidMount",value:function(){var t=d()(document),e=d()(window),i=d()(this._svg.current);t.on("mouseup",this._document_OnMouseUp_StopDragging),t.on("keydown",this._document_OnKeyDown_Hotkeys),e.on("resize",this._window_Resize_SetSize),i.on("mousewheel",this._svg_OnMouseWheel_Zoom)}},{key:"componentWillUnmount",value:function(){var t=d()(document),e=d()(window),i=d()(this._svg.current);t.off("mouseup",this._document_OnMouseUp_StopDragging),t.off("keydown",this._document_OnKeyDown_Hotkeys),e.off("resize",this._window_Resize_SetSize),i.off("mousewheel",this._svg_OnMouseWheel_Zoom)}},{key:"addZoom",value:function(t){var e,i,s;this.setState({zoom:(e=this.state.zoom-t*this.state.zoom*this.props.zoomMultiplier,i=this.props.zoomMinimum,s=this.props.zoomMaximum,Math.min(Math.max(e,i),s))})}},{key:"positionToGrid",value:function(t){return new f(Math.floor(t.x/this.state.gridSize),Math.floor(t.y/this.state.gridSize))}},{key:"gridToPosition",value:function(t){return t.copy().multiply(this.state.gridSize)}}]),i}(o.a.Component);m.defaultProps={offsetIncrement:32,zoomIncrement:120,zoomMultiplier:.002,zoomOffsetMultiplier:.24,zoomMinimum:.064,zoomMaximum:4,gridSizeMinimum:2,gridSizeMaximum:128};var g=function(t){Object(h.a)(i,t);var e=Object(l.a)(i);function i(t){var s;return Object(a.a)(this,i),(s=e.call(this,t)).grid=void 0,s.state={selectedTileset:t.tilesets.default,selectedTile:t.tilesets.default.getTile("tile1")},s.grid=o.a.createRef(),s}return Object(c.a)(i,[{key:"render",value:function(){return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)("div",{className:"Content",children:Object(x.jsx)(m,{ref:this.grid})}),Object(x.jsxs)("div",{className:"SidePanel",children:[Object(x.jsx)("div",{className:"Tools"}),Object(x.jsx)("div",{className:"ToolProperties"})]})]})}}]),i}(o.a.Component),y=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,17)).then((function(e){var i=e.getCLS,s=e.getFID,o=e.getFCP,n=e.getLCP,r=e.getTTFB;i(t),s(t),o(t),n(t),r(t)}))},w=(i(15),function(){function t(e){Object(a.a)(this,t),this.name=void 0,this._tiles=void 0,this.name=e,this._tiles={}}return Object(c.a)(t,[{key:"tiles",get:function(){return this._tiles}},{key:"setTile",value:function(t,e){this._tiles[t]=e}},{key:"getTile",value:function(t){return this._tiles[t]}}]),t}());r.a.render(Object(x.jsx)(o.a.StrictMode,{children:Object(x.jsx)(g,{tilesets:{default:new w("default")}})}),document.getElementById("root")),y()}},[[16,1,2]]]);
//# sourceMappingURL=main.daf9ef44.chunk.js.map