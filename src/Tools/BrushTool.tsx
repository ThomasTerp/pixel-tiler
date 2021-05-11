import Tool, {IProps} from "./Tool";

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
}
