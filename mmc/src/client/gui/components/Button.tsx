import Roact from '@rbxts/roact'
import { MainColor } from './Colors'

const Button: Roact.FunctionComponent<{ Filled?: boolean; Text: string; Position?: UDim2; AnchorPoint?: Vector2 }> =
	function (props) {
		return (
			<textbutton
				AutomaticSize={Enum.AutomaticSize.X}
				BackgroundColor3={MainColor}
				BorderSizePixel={0}
				BackgroundTransparency={props.Filled ? 0 : 1}
				Size={new UDim2(0, 0, 0, 36)}
				TextSize={16}
				RichText
				Text={`<b>${props.Text}</b>`}
				Font={Enum.Font.Roboto}
				TextColor3={props.Filled ? new Color3(1, 1, 1) : MainColor}
				TextXAlignment={Enum.TextXAlignment.Left}
				Position={props.Position}
				AnchorPoint={props.AnchorPoint}
			>
				{props.Filled && <uicorner CornerRadius={new UDim(0, 4)} />}
				<uipadding
					PaddingBottom={new UDim(0, 0)}
					PaddingLeft={new UDim(0, 24)}
					PaddingRight={new UDim(0, 24)}
					PaddingTop={new UDim(0, 0)}
				/>
			</textbutton>
		)
	}

export default Button
