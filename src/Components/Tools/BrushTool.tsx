import Tool, {IProps as IToolProps, IState as IToolState} from "./Tool";
import Palette from "../Palette";
import PaletteManager from "../../PaletteManager";
import TileManager from "../../TileManager";
import { TileRenderer } from "../../Tileset";

export interface IProps extends IToolProps
{
	paletteManager: PaletteManager;
	tileManager: TileManager;
}

export interface IState extends IToolState {
	selectedTilesetID: number;
}

export default class BrushTool extends Tool<IProps, IState>
{
	public static defaultProps = {
		name: "Brush Tool"
	};

	public constructor(props: IProps)
	{
		super(props);

		this.state = {
			selectedTilesetID: 0
		};
	}

	public renderProperties(): React.ReactNode
	{
		return (
			<div className="Properties">
				<Palette paletteManager={this.props.paletteManager} />
				<div>
					{this.props.tileManager.tilesets[this.state.selectedTilesetID].tiles.map((tile: TileRenderer, tileIndex: number) => <svg key={tileIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1">{tile.renderTile(this.props.paletteManager.selectedColor)}</svg>)}
				</div>
			</div>
		);
	}
}
