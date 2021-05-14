import React from "react";
import ToolButton from "./ToolButton";
import {IProps as IToolProps} from "./Tools/Tool";
import FileTool from "./Tools/FileTool";
import BrushTool from "./Tools/BrushTool";
import EraserTool from "./Tools/EraserTool";
import SettingsTool from "./Tools/SettingsTool";
import "./SideMenu.scss";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import TileManager from "../TileManager";

export interface IProps {
	paletteManager: PaletteManager;
	tileManager: TileManager;
}

export interface IState {
	activeToolKey: string;
}

export default class SideMenu extends React.Component<IProps, IState>
{
	public static contextType = AppContext;
	public static defaultProps = {};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {
			activeToolKey: "brushTool"
		};
	}

	public render(): React.ReactNode
	{
		const tools: React.ReactNode[] = [
			<FileTool key="fileTool" paletteManager={this.props.paletteManager} />,
			<BrushTool key="brushTool" paletteManager={this.props.paletteManager} tileManager={this.props.tileManager} />,
			<EraserTool key="eraserTool" />,
			<SettingsTool key="settingsTool" />
		];
		const toolButtons: React.ReactNode[] = tools.map((tool: React.ReactNode) => this.renderToolButton(tool));
		const activeTool: React.ReactNode = tools.find((tool: React.ReactNode) => this.state.activeToolKey === (tool as JSX.Element).key);

		return (
			<div className="SideMenu" style={{backgroundColor: this.context.theme.color1}}>
				<div className="ToolButtons">
					{toolButtons}
				</div>
				{activeTool}
			</div>
		)
	}

	public renderToolButton(tool: React.ReactNode): React.ReactNode
	{
		const key: string = (tool as JSX.Element).key as string;
		const name: string = ((tool as JSX.Element).props as IToolProps).name;

		return (
			<ToolButton key={`${key}Button`} isActive={this.state.activeToolKey === key} onClick={() => this.setState({activeToolKey: key})}>
				{name}
			</ToolButton>
		);
	}
}
