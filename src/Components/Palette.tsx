import React from "react";
import PaletteColor from "./PaletteColor";
import PaletteAddColor from "./PaletteAddColor";
import AppContext from "../AppContext";
import PaletteManager, {ColorChangeEvent, SelectedColorIDChangeEvent} from "../PaletteManager";
import "./Palette.scss";

export interface IProps {
	paletteManager: PaletteManager;
	isEditable: boolean;
	isSelectable: boolean;
}

export interface IState {}

export default abstract class Palette extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
		isEditable: true,
		isSelectable: true
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode
	{
		return (
			<div className="Palette">
				{this.props.paletteManager.colors.map((color: string, colorID: number) => <PaletteColor key={colorID} paletteManager={this.props.paletteManager} colorID={colorID} color={color} isEditable={this.props.isEditable} isSelectable={this.props.isSelectable} />)}
				{this.props.isEditable ? <PaletteAddColor paletteManager={this.props.paletteManager} /> : null}
			</div>
		)
	}

	public componentDidMount(): void
	{
		this.props.paletteManager.colorChangeEmitter.on(this._paletteManager_ColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.on(this._paletteManager_SelectedColorIDChangeEmitter_ForceUpdate);
	}

	public componentWillUnmount(): void
	{
		this.props.paletteManager.colorChangeEmitter.off(this._paletteManager_ColorChangeEmitter_ForceUpdate);
		this.props.paletteManager.selectedColorIDChangeEmitter.off(this._paletteManager_SelectedColorIDChangeEmitter_ForceUpdate);
	}

	_paletteManager_ColorChangeEmitter_ForceUpdate = (event: ColorChangeEvent) =>
	{
		this.forceUpdate();
	}

	_paletteManager_SelectedColorIDChangeEmitter_ForceUpdate = (event: SelectedColorIDChangeEvent) =>
	{
		this.forceUpdate();
	}
}
