import React from "react";
import ToolButton from "./ToolButton";
import FileTool from "./Tools/FileTool";
import BrushTool from "./Tools/BrushTool";
import EraserTool from "./Tools/EraserTool";
import SettingsTool from "./Tools/SettingsTool";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import TileManager from "../TileManager";
import GridInfo from "../GridInfo";
import {Box, WithStyles, createStyles, withStyles} from "@material-ui/core";
import {Description, Brush, Delete, Settings} from "@material-ui/icons";

const styles = () => createStyles({
	root: {
		display: "grid",
		gridTemplateRows: "fit-content(100%) auto",
		position: "fixed",
		left: "0px",
		top: "0px",
		height: "100%",
		width: "260px",
		zIndex: 200,
		textAlign: "center",

		"& .ToolButtons": {
			display: "grid",
			gridAutoFlow: "column",
			gridAutoColumns: "minmax(0, 1fr)",
			gap: "4px",
			margin: "4px"
		}
	}
});

export interface IProps extends WithStyles<typeof styles>
{
	paletteManager: PaletteManager;
	tileManager: TileManager;
	gridInfo: GridInfo;
}

export interface IState
{
	activeToolKey: string;
}

class SideMenu extends React.Component<IProps, IState>
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
		const toolDataset: ToolData[] = [
			new ToolData("fileTool", "File", <Description color="secondary" />, (key, name, icon) => <FileTool key={key} name={name} icon={icon} paletteManager={this.props.paletteManager} />),
			new ToolData("brushTool", "Brush Tool", <Brush color="secondary" />, (key, name, icon) => <BrushTool key={key} name={name} icon={icon} paletteManager={this.props.paletteManager} tileManager={this.props.tileManager} gridInfo={this.props.gridInfo} />),
			new ToolData("eraserTool", "Eraser Tool", <Delete color="secondary" />, (key, name, icon) => <EraserTool key={key} name={name} icon={icon} />),
			new ToolData("settingsTool", "Settings", <Settings color="secondary" />, (key, name, icon) => <SettingsTool key={key} name={name} icon={icon} />)
		];
		const toolButtons: React.ReactNode[] = toolDataset.map((toolData: ToolData) => this.renderToolButton(toolData));
		const activeTool: React.ReactNode = toolDataset.find((toolData: ToolData) => this.state.activeToolKey === toolData.key)?.tool;

		return (
			<Box className={`${this.props.classes.root} SideMenu`} bgcolor="primary.dark">
				<Box className="ToolButtons">
					{toolButtons}
				</Box>
				{activeTool}
			</Box>
		)
	}

	public renderToolButton(toolData: ToolData): React.ReactNode
	{
		return (
			<ToolButton key={`${toolData.key}Button`} text={toolData.name} isActive={this.state.activeToolKey === toolData.key} onClick={() => this.setState({activeToolKey: toolData.key})}>
				{toolData.icon}
			</ToolButton>
		);
	}
}

export class ToolData
{
	key: string;
	name: string;
	icon: React.ReactNode;
	tool: React.ReactNode;

	public constructor(key: string, name: string, icon: React.ReactNode, renderTool: (key: string, name: string, icon: React.ReactNode) => React.ReactNode)
	{
		this.key = key;
		this.name = name;
		this.icon = icon;
		this.tool = renderTool(key, name, icon);
	}
}

export default withStyles(styles)(SideMenu);
