import Roact, { Children } from '@rbxts/roact'

const Label: Roact.FunctionComponent<{
	Text?: string
	Rich?: boolean
	Size?: number
	LineHeight?: number
	Color?: Color3
	Visible?: boolean
}> = function (props) {
	return (
		<textlabel
			Text={props.Text}
			RichText={props.Rich}
			Font={Enum.Font.Roboto}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 0, 0)}
			LineHeight={props.LineHeight !== undefined ? props.LineHeight : 1}
			TextSize={props.Size !== undefined ? props.Size : 14}
			TextScaled={false}
			TextWrapped={true}
			TextXAlignment={Enum.TextXAlignment.Left}
			TextColor3={props.Color !== undefined ? props.Color : new Color3(0, 0, 0)}
			Visible={props.Visible !== undefined ? props.Visible : true}
		/>
	)
}

export default Label
