import Tool, {IProps as IToolProps, IState as IToolState} from "./Tool";
import Slider from "@material-ui/core/Slider";

export default class SettingsTool extends Tool<IToolProps, IToolState>
{
	public static defaultProps = {
		name: "Settings"
	};

	public constructor(props: IToolProps)
	{
		super(props);

		this.state = {};
	}

	public renderProperties(): React.ReactNode
	{
		return (
			<Slider />
		);
	}
}
