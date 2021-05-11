import React from "react";
import ToolButton from "./ToolButton";
import FileTool from "./Tools/FileTool";
import BrushTool from "./Tools/BrushTool";
import EraserTool from "./Tools/EraserTool";
import SettingsTool from "./Tools/SettingsTool";
import "./SideMenu.scss";

export interface IProps {

}

export interface IState {
	activeTool: React.ReactNode;
}

export default class SideMenu extends React.Component<IProps, IState>
{
	public static defaultProps = {}
	private _tools: {[toolID: string]: React.ReactNode} = {
		fileTool: <FileTool />,
		brushTool: <BrushTool />,
		eraserTool: <EraserTool />,
		settingsTool: <SettingsTool />
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {
			activeTool: this._tools.brushTool
		};
	}

	public render(): React.ReactNode
	{
		return (
			<div className="SideMenu">
				<div className="ToolButtons">
					{this.renderToolButton("File", this._tools.fileTool)}
					{this.renderToolButton("Brush Tool", this._tools.brushTool)}
					{this.renderToolButton("Eraser Tool", this._tools.eraserTool)}
					{this.renderToolButton("Settings", this._tools.settingsTool)}
				</div>
				{this.state.activeTool}
			</div>
		)
	}

	public renderToolButton(text: string, tool: React.ReactNode): React.ReactNode
	{
		return <ToolButton text={text} isActive={this.state.activeTool === tool} onClick={() => this.setActiveTool(tool)} />;
	}

	public setActiveTool = (activeTool: React.ReactNode) =>
	{
		this.setState({
			activeTool: activeTool
		});
	}
}
