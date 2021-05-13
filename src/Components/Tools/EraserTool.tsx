import Tool, {IProps as IToolProps, IState as IToolState} from "./Tool";

export default class EraserTool extends Tool<IToolProps, IToolState>
{
	public static defaultProps = {
		name: "Eraser Tool"
	};

	public constructor(props: IToolProps)
	{
		super(props);

		this.state = {};
	}
}
