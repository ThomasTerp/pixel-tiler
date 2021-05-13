import React from "react";
import PaletteColor from "./PaletteColor";
import AppContext from "../AppContext";
import PaletteManager, {SetColorEvent} from "../PaletteManager";
import "./Palette.scss";

export interface IProps {
	paletteManager: PaletteManager;
	isSelectable: boolean;
}

export interface IState {}

export default abstract class Palette extends React.Component<IProps, IState>
{
	static contextType = AppContext;
	static defaultProps = {
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
				{this.props.paletteManager.colors.map((color: string, colorID: number) => <PaletteColor key={colorID} paletteManager={this.props.paletteManager} colorID={colorID} color={color} />)}
			</div>
		)
	}

	public componentDidMount(): void
	{
		this.props.paletteManager.colorChangeEmitter.on(this._paletteManager_ColorChangeEmitter_ForceUpdate);
	}

	public componentWillUnmount(): void
	{
		this.props.paletteManager.colorChangeEmitter.off(this._paletteManager_ColorChangeEmitter_ForceUpdate);
	}

	_paletteManager_ColorChangeEmitter_ForceUpdate = (event: SetColorEvent) =>
	{
		this.forceUpdate();
	}
}
