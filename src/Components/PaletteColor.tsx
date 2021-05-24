import React from "react";
import AppContext from "../AppContext";
import PaletteManager from "../PaletteManager";
import {Theme, makeStyles} from "@material-ui/core";
import "./PaletteColor.scss";

interface IStyleProps
{
	props: IProps,
	theme: Theme
}

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "calc(100% - 4px)",
		padding: "2px 0px 0px 0px",
		margin: "0px",
		//backgroundColor: (styleProps: IStyleProps) => styleProps.props.isSelectable && styleProps.props.paletteManager.selectedColorID === styleProps.props.colorID ? styleProps.theme.palette.secondary.main : "red",

		"& input": {
			border: "2px solid",
			width: "calc(100% - 8px)",
			height: "0px",
			margin: "0px",
			padding: "calc(100% - 8px) 0px 0px 0px"
		}
	}
});

export interface IProps {
	paletteManager: PaletteManager;
	colorID: number;
	color: string;
	isEditable: boolean;
	isSelectable: boolean;
}

const PaletteColor = (props: IProps) =>
{
	const appContext = React.useContext(AppContext);
	const classes = useStyles({
		props: props,
		theme: appContext.theme
	});
	const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	const paletteColorStyle: React.CSSProperties = {};
	let allowClick: boolean = false;

	if(props.isSelectable && props.paletteManager.selectedColorID === props.colorID)
	{
		paletteColorStyle.backgroundColor = `${appContext.theme.palette.primary.main}`;
	}

	const inputStyle: React.CSSProperties = {
		backgroundColor: props.color,
		borderColor: appContext.theme.palette.primary.main
	};

	if(props.isSelectable || props.isEditable)
	{
		inputStyle.cursor = "pointer";
	}

	const input_OnChange_SetPaletteColor = (event: React.ChangeEvent) =>
	{
		props.paletteManager.setColor(props.colorID, (event.target as any).value);
	}

	const input_OnClick_SelectColorID = (event: React.MouseEvent) =>
	{
		if(props.isSelectable)
		{
			props.paletteManager.selectedColorID = props.colorID;

			if(allowClick)
			{
				allowClick = false;
			}
			else
			{
				event.preventDefault();
			}
		}

		if(!props.isEditable)
		{
			event.preventDefault();
			event.preventDefault();
		}
	}

	const input_OnDoubleClick_OpenMenu = (event: React.MouseEvent) =>
	{
		if(props.isEditable && props.isSelectable)
		{
			allowClick = true;
			inputRef.current?.click();
		}
	}

	const input_OnContextMenu_OpenMenu = (event: React.MouseEvent) =>
	{
		if(props.isSelectable)
		{
			allowClick = true;
		}

		inputRef.current?.click();

		event.preventDefault();
	}

	return (
		<div className={`${classes.root} PaletteColor`} style={paletteColorStyle}>
			<input ref={inputRef} style={inputStyle} type="color" defaultValue={props.color} onChange={input_OnChange_SetPaletteColor} onClick={input_OnClick_SelectColorID} onDoubleClick={input_OnDoubleClick_OpenMenu} onContextMenu={input_OnContextMenu_OpenMenu} />
		</div>
	)
}

PaletteColor.defaultProps = {
	isEditable: true,
	isSelectable: true
};

export default PaletteColor;
