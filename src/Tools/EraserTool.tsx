import Tool, {IProps} from "./Tool";

export default class EraserTool extends Tool
{
	public static defaultProps = {
		name: "Eraser Tool"
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {

		};
	}
}
