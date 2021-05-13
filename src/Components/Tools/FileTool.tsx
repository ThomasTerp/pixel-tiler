import Tool, {IProps as IToolProps, IState as IToolState} from "./Tool";
import Palette from "../Palette";
import PaletteManager from "../../PaletteManager";

export interface IProps extends IToolProps
{
	paletteManager: PaletteManager;
}

export interface IState extends IToolState {}

export default class FileTool extends Tool<IProps, IState>
{
	public static defaultProps = {
		name: "File"
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {};
	}

	public renderProperties(): React.ReactNode
	{
		return (
			<div className="Properties">
				<Palette paletteManager={this.props.paletteManager} isEditable={true} isSelectable={false} />
			</div>
		);
	}
}
