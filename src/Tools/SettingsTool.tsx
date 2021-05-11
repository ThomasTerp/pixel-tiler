import Tool, {IProps} from "./Tool";

export default class SettingsTool extends Tool
{
	public static defaultProps = {
		name: "Settings"
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {

		};
	}
}
