import React from "react";
import AppContext from "../AppContext";
import {Theme, Box, Tooltip, ButtonBase, makeStyles} from "@material-ui/core";

interface IStyleProps
{
	props: IProps,
	theme: Theme
}

const useStyles = makeStyles({
	root: {
		textAlign: "center",
		padding: "0px",
		paddingTop: "100%  !important",
		border: "2px solid",
		borderColor: (styleProps: IStyleProps) => styleProps.props.isActive ? styleProps.theme.palette.secondary.main : styleProps.theme.palette.primary.main,
		backgroundColor: (styleProps: IStyleProps) => styleProps.theme.palette.primary.main,
		cursor: "pointer",
		transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

		"&:hover": {
			borderColor: (styleProps: IStyleProps) => styleProps.props.isActive ? styleProps.theme.palette.secondary.main : styleProps.theme.palette.secondary.dark,
			backgroundColor: (styleProps: IStyleProps) => styleProps.theme.palette.primary.dark
		},

		"& div": {
			display: "flex",
			position: "absolute",
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
			justifyContent: "center",
			alignItems: "center"
		}
	}
});

export interface IProps {
	children: React.ReactNode;
	text: string;
	isActive: boolean;
	onClick: (event: React.MouseEvent) => void
}

const ToolButton = (props: IProps) =>
{
	const appContext = React.useContext(AppContext);

	const classes = useStyles({
		props: props,
		theme: appContext.theme
	});

	return (
		<Tooltip title={props.text} enterDelay={700}>
			<ButtonBase className={`${classes.root} ToolButton`} onClick={props.onClick}>
				<Box>
					{props.children}
				</Box>
			</ButtonBase>
		</Tooltip>
	)
}

export default ToolButton;
