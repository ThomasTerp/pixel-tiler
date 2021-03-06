import React from "react";
import $ from "jquery";
import GridTiles from "./GridTiles";
import AppContext from "../AppContext";
import Vector2D from "../Vector2D";
import {WithStyles, createStyles, withStyles} from "@material-ui/core";
import {generateUniqueID, clamp} from "../util";
import TileManager, {TilePlacedEvent, TileErasedEvent} from "../TileManager";
import GridInfo from "../GridInfo";

const styles = () => createStyles({
	root: {
		position: "static",
		backgroundColor: "#0e0e10"
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	offsetIncrement: number;
	zoomIncrement: number;
	zoomMultiplier: number;
	zoomOffsetMultiplier: number;
	zoomMinimum: number,
	zoomMaximum: number,
	gridSizeMinimum: number;
	gridSizeMaximum: number;
	tileManager: TileManager;
	gridInfo: GridInfo;
}

export interface IState
{
	uniqueID: string;
	gridSize: number;
	zoom: number;
	offset: Vector2D;
	size: Vector2D;
	//TODO: Use theme
	color1: string;
	color2: string;
}

class Grid extends React.Component<IProps, IState>
{
	public static contextType = AppContext;
	public static defaultProps = {
		offsetIncrement: 32,
		zoomIncrement: 120,
		zoomMultiplier: 0.002,
		zoomOffsetMultiplier: 0.24,
		zoomMinimum: 0.064,
		zoomMaximum: 4,
		gridSizeMinimum: 2,
		gridSizeMaximum: 128
	}

	private _svg: React.RefObject<SVGSVGElement>;
	private _isDragging: boolean = false;
	private _dragCursorOffset: Vector2D = new Vector2D(0, 0);
	private _dragOffset: Vector2D = new Vector2D(0, 0);

	public constructor(props: IProps)
	{
		super(props);

		this.state = {
			uniqueID: generateUniqueID("grid"),
			gridSize: this.props.gridInfo.gridSize,
			zoom: this.props.gridInfo.zoom,
			offset: this.props.gridInfo.offset.copy(),
			size: this.props.gridInfo.size.copy(),
			color1: "#202124",
			color2: "#303136"
		};

		this._svg = React.createRef();
	}

	public render(): React.ReactNode
	{
		const offset: Vector2D = this.state.offset.copy().add(this.state.size.copy().divide(2).multiply(this.state.zoom));
		const size: Vector2D = this.state.size.copy().multiply(this.state.zoom);

		return (
			<svg className={`${this.props.classes.root} Grid`} ref={this._svg} xmlns="http://www.w3.org/2000/svg" width={`${this.state.size.x}px`} height={`${this.state.size.y}px`} viewBox={`${-offset.x},${-offset.y} ${size.x},${size.y}`} onMouseDown={this._svg_OnMouseDown_StartDragging} onMouseMove={this._svg_OnMouseMove_Drag}>
				{this.renderDefs()}
				{this.renderGrid(offset, size)}
				<GridTiles tileManager={this.props.tileManager} />
			</svg>
		);
	}

	public renderDefs(): React.ReactNode
	{
		return (
			<defs>
				<pattern id={`${this.state.uniqueID}_pattern1`} width={this.state.gridSize} height={this.state.gridSize} patternUnits="userSpaceOnUse">
					<rect width={`${this.state.gridSize}px`} height={`${this.state.gridSize}px`} fill="none" stroke={this.state.color1} strokeWidth="1" />
				</pattern>
				<pattern id={`${this.state.uniqueID}_pattern2`} width={`${this.props.gridSizeMaximum}px`} height={`${this.props.gridSizeMaximum}px`} patternUnits="userSpaceOnUse">
					<rect width={`${this.props.gridSizeMaximum}px`} height={`${this.props.gridSizeMaximum}px`} fill={`url(#${this.state.uniqueID}_pattern1)`} />
					<rect width={`${this.props.gridSizeMaximum}px`} height={`${this.props.gridSizeMaximum}px`} fill="none" stroke={this.state.color1} strokeWidth="3" />
				</pattern>
			</defs>
		);
	}

	public renderGrid(offset: Vector2D, size: Vector2D): React.ReactNode
	{
		return (
			<g>
				<rect id={`${this.state.uniqueID}_rect1`} x={`${-offset.x}px`} y={`${-offset.y}px`} width="100%" height="100%" fill={`url(#${this.state.uniqueID}_pattern2)`} />
				<line id={`${this.state.uniqueID}_line1`} x1={`${-offset.x}px`} y1="0" x2={`${-offset.x + size.x}px`} y2="0" stroke={this.state.color2} strokeWidth="3" />
				<line id={`${this.state.uniqueID}_line2`} x1="0" y1={`${-offset.y}px`} x2="0" y2={`${-offset.y + size.y}px`} stroke={this.state.color2} strokeWidth="3" />
			</g>
		);
	}

	public componentDidMount(): void
	{
		const $document: JQuery<Document> = $(document);
		const $window: JQuery<Window> = $(window);
		const $svg: JQuery<SVGSVGElement> = $(this._svg.current!);

		this.props.tileManager.tilePlacedEmitter.onPost(this._tileManager_PostTilePlacedEmitter_ForceUpdate);
		this.props.tileManager.tileErasedEmitter.onPost(this._tileManager_PostTileErasedEmitter_ForceUpdate);
		$document.on("mouseup", this._document_MouseUp_StopDragging);
		$document.on("keydown", this._document_KeyDown_Hotkeys);
		$window.on("resize", this._window_Resize_SetSize);
		$svg.on("mousewheel", this._svg_MouseWheel_Zoom);
	}

	public componentWillUnmount(): void
	{
		const $document: JQuery<Document> = $(document);
		const $window: JQuery<Window> = $(window);
		const $svg: JQuery<SVGSVGElement> = $(this._svg.current!);

		this.props.tileManager.tilePlacedEmitter.offPost(this._tileManager_PostTilePlacedEmitter_ForceUpdate);
		this.props.tileManager.tileErasedEmitter.offPost(this._tileManager_PostTileErasedEmitter_ForceUpdate);
		$document.off("mouseup", this._document_MouseUp_StopDragging);
		$document.off("keydown", this._document_KeyDown_Hotkeys);
		$window.off("resize", this._window_Resize_SetSize);
		$svg.off("mousewheel", this._svg_MouseWheel_Zoom);
	}

	public componentDidUpdate(props: IProps, state: IState): void
	{
		this.props.gridInfo.gridSize = state.gridSize;
		this.props.gridInfo.offset = state.offset.copy();
		this.props.gridInfo.zoom = state.zoom;
		this.props.gridInfo.size = state.size;
	}

	public addZoom(zoomAdd: number): void
	{
		this.setState({
			zoom: clamp(this.state.zoom - zoomAdd * this.state.zoom * this.props.zoomMultiplier, this.props.zoomMinimum, this.props.zoomMaximum)
		});
	}

	public positionToGrid(position: Vector2D): Vector2D
	{
		return new Vector2D(
			Math.floor(position.x / this.state.gridSize),
			Math.floor(position.y / this.state.gridSize)
		)
	}

	public gridToPosition(gridPosition: Vector2D): Vector2D
	{
		return gridPosition.copy().multiply(this.state.gridSize);
	}

	private _tileManager_PostTilePlacedEmitter_ForceUpdate = (event: TilePlacedEvent) =>
	{
		this.forceUpdate();
	}

	private _tileManager_PostTileErasedEmitter_ForceUpdate = (event: TileErasedEvent) =>
	{
		this.forceUpdate();
	}

	private _svg_MouseWheel_Zoom = (event: any) =>
	{
		if(event.ctrlKey)
		{
			if((event.originalEvent.wheelDelta > 0 && this.state.zoom > this.props.zoomMinimum) || (event.originalEvent.wheelDelta < 0 && this.state.zoom < this.props.zoomMaximum))
			{
				const $window = $(window);
				const add = new Vector2D(
					(event.offsetX - ($window.width()! / 2)) * this.state.zoom * this.props.zoomOffsetMultiplier,
					(event.offsetY - ($window.height()! / 2)) * this.state.zoom * this.props.zoomOffsetMultiplier
				);

				this.setState({
					offset: event.originalEvent.wheelDelta > 0 ? this.state.offset.copy().subtract(add) : this.state.offset.copy().add(add)
				})
			}

			this.addZoom(event.originalEvent.wheelDelta);

			event.preventDefault();
		}
	}

	private _svg_OnMouseDown_StartDragging = (event: React.MouseEvent) =>
	{
		if(event.button === 1)
		{
			this._dragOffset.x = this.state.offset.x;
			this._dragOffset.y = this.state.offset.y;
			this._dragCursorOffset.x = event.nativeEvent.offsetX;
			this._dragCursorOffset.y = event.nativeEvent.offsetY;
			this._isDragging = true;

			event.preventDefault();
		}
	}

	private _document_MouseUp_StopDragging = (event: JQuery.MouseUpEvent) =>
	{
		this._isDragging = false;
	}

	private _svg_OnMouseMove_Drag = (event: React.MouseEvent) =>
	{
		if(this._isDragging)
		{
			this.setState({
				offset: new Vector2D(
					this._dragOffset.x + (event.nativeEvent.offsetX - this._dragCursorOffset.x) * this.state.zoom,
					this._dragOffset.y + (event.nativeEvent.offsetY - this._dragCursorOffset.y) * this.state.zoom
				)
			});
		}
	}

	private _document_KeyDown_Hotkeys = (event: JQuery.KeyDownEvent) =>
	{
		switch(event.key)
		{
			case "ArrowLeft":
				this.setState({
					offset: new Vector2D(this.state.offset.x + this.props.offsetIncrement, this.state.offset.y)
				});
				break;

			case "ArrowUp":
				this.setState({
					offset: new Vector2D(this.state.offset.x, this.state.offset.y + this.props.offsetIncrement)
				});
				break;

			case "ArrowRight":
				this.setState({
					offset: new Vector2D(this.state.offset.x - this.props.offsetIncrement, this.state.offset.y)
				});
				break;

			case "ArrowDown":
				this.setState({
					offset: new Vector2D(this.state.offset.x, this.state.offset.y - this.props.offsetIncrement)
				});
				break;

			case "w":
				this.setState({
					gridSize: Math.min(this.state.gridSize * 2, this.props.gridSizeMaximum)
				});
				break;

			case "s":
				this.setState({
					gridSize: Math.max(this.state.gridSize / 2, this.props.gridSizeMinimum)
				});
				break;

			case "+":
				if(event.ctrlKey)
				{
					this.addZoom(this.props.zoomIncrement);
					event.preventDefault();
				}

				break;

			case "-":
				if(event.ctrlKey)
				{
					this.addZoom(-this.props.zoomIncrement);
					event.preventDefault();
				}

				break;
		}
	}

	private _window_Resize_SetSize = (event: JQuery.ResizeEvent) =>
	{
		const $window: JQuery<Window> = $(window);

		this.setState({
			size: new Vector2D($window.width()!, $window.height()!)
		});
	}

	/*
	updateColor(colorIndex, color)
	{
		this.html.find(`> g[color-index="${colorIndex}"] > :not(.tile-pointer)`).attr("fill", color);
	}

	cursorToView(cursorPosition)
	{
		return new Vector2D(
			(cursorPosition.x - this.offset.x) * (this.zoom / this.html.width()),
			(cursorPosition.y - this.offset.y) * (this.zoom / this.html.height())
		);
	}
	*/
}

export default withStyles(styles)(Grid);
