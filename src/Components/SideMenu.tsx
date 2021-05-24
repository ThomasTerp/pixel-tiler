import React from "react";
import ToolButton from "./ToolButton";
import {IProps as IToolProps} from "./Tools/Tool";
import FileTool from "./Tools/FileTool";
import BrushTool from "./Tools/BrushTool";
import EraserTool from "./Tools/EraserTool";
import SettingsTool from "./Tools/SettingsTool";
import PaletteManager from "../PaletteManager";
import TileManager from "../TileManager";
import {Box, makeStyles} from "@material-ui/core";
import {Description, Brush, Delete, Settings} from "@material-ui/icons";

const useStyles = makeStyles({
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

export interface IProps {
	paletteManager: PaletteManager;
	tileManager: TileManager;
}

const SideMenu = (props: IProps) =>
{
	const classes = useStyles();
	const [activeToolKey, setActiveToolKey] = React.useState<string>("brushTool");

	const renderToolButton = (tool: React.ReactNode) =>
	{
		const toolElement: JSX.Element = (tool as JSX.Element);
		const toolProps = (toolElement.props as IToolProps);
		const key: string = toolElement.key as string;
		const name: string = toolProps.name;
		const icon: React.ReactNode = toolProps.icon;

		return (
			<ToolButton key={`${key}Button`} text={name} isActive={activeToolKey === key} onClick={() => setActiveToolKey(key)}>
				{icon}
			</ToolButton>
		);
	}

	const tools: React.ReactNode[] = [
		<FileTool key="fileTool" icon={<Description color="secondary" />} paletteManager={props.paletteManager} />,
		<BrushTool key="brushTool" icon={<Brush color="secondary" />} paletteManager={props.paletteManager} tileManager={props.tileManager} />,
		<EraserTool key="eraserTool" icon={<Delete color="secondary" />} />,
		<SettingsTool key="settingsTool" icon={<Settings color="secondary" />} />
	];
	const toolButtons: React.ReactNode[] = tools.map((tool: React.ReactNode) => renderToolButton(tool));
	const activeTool: React.ReactNode = tools.find((tool: React.ReactNode) => activeToolKey === (tool as JSX.Element).key);

	return (
		<Box className={`${classes.root} SideMenu`} bgcolor="primary.dark">
			<Box className="ToolButtons">
				{toolButtons}
			</Box>
			{activeTool}
		</Box>
	)
}

export default SideMenu;
