import React from "react";
import ToolButton from "./ToolButton";
import {IProps as IToolProps} from "./Tools/Tool";
import FileTool from "./Tools/FileTool";
import BrushTool from "./Tools/BrushTool";
import EraserTool from "./Tools/EraserTool";
import SettingsTool from "./Tools/SettingsTool";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import TileManager from "../TileManager";
import {Description, Brush, Delete, Settings} from "@material-ui/icons";
import "./SideMenu.scss";

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
			<FileTool key="fileTool" icon={<Description />} paletteManager={this.props.paletteManager} />,
			<BrushTool key="brushTool" icon={<Brush />} paletteManager={this.props.paletteManager} tileManager={this.props.tileManager} />,
			<EraserTool key="eraserTool" icon={<Delete />} />,
			<SettingsTool key="settingsTool" icon={<Settings />} />
		];
		const toolButtons: React.ReactNode[] = tools.map((tool: React.ReactNode) => this.renderToolButton(tool));
		const activeTool: React.ReactNode = tools.find((tool: React.ReactNode) => this.state.activeToolKey === (tool as JSX.Element).key);

		return (
			<div className="SideMenu" style={{backgroundColor: this.context.theme.palette.primary.main}}>
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
		const icon: React.ReactNode = ((tool as JSX.Element).props as IToolProps).icon;

		return (
			<ToolButton key={`${key}Button`} text={name} isActive={this.state.activeToolKey === key} onClick={() => this.setState({activeToolKey: key})}>
				{icon}
			</ToolButton>
		);
	}
}
