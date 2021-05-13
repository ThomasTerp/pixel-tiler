import Tool, {IProps as IToolProps, IState as IToolState} from "./Tool";

export default class FileTool extends Tool<IToolProps, IToolState>
{
	public static defaultProps = {
		name: "File"
	};

	public constructor(props: IToolProps)
	{
		super(props);

		this.state = {};
	}
}
