import Tool, {IProps} from "./Tool";

export default class FileTool extends Tool
{
	public static defaultProps = {
		name: "File"
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {

		};
	}
}
