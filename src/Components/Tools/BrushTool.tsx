import Tool, {IProps} from "./Tool";
import Palette from "../Palette";

export default class BrushTool extends Tool
{
	public static defaultProps = {
		name: "Brush Tool"
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {

		};
	}

	public renderProperties(): React.ReactNode
	{
		return (
			<div className="Properties">
				<Palette />
			</div>
		);
	}
}
