import Roact, { Children } from '@rbxts/roact'
import { MainColor, StrokeColor, ErrorColor } from './Colors'

const Card: Roact.FunctionComponent<{ Header?: boolean; Error?: boolean }> = function (props) {
	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.Y}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(1, 1, 1)}
			Size={new UDim2(1, 0, 0, 0)}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uistroke
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				Thickness={1}
				Color={props.Error ? ErrorColor : StrokeColor}
			/>
			{props.Header && (
				<frame Size={new UDim2(1, 0, 0, 16)} BackgroundColor3={MainColor}>
					<uicorner CornerRadius={new UDim(0, 8)} />
					<frame
						BackgroundColor3={new Color3(1, 1, 1)}
						BorderSizePixel={0}
						Position={new UDim2(0, 0, 0.5, 0)}
						Size={new UDim2(1, 0, 0.5, 0)}
					/>
				</frame>
			)}
			<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)} AutomaticSize={Enum.AutomaticSize.Y}>
				<uipadding
					PaddingBottom={new UDim(0, props.Header ? 16 : 24)}
					PaddingLeft={new UDim(0, 24)}
					PaddingRight={new UDim(0, 24)}
					PaddingTop={new UDim(0, props.Header ? 22 : 24)}
				/>
				<uilistlayout
					Padding={new UDim(0, 16)}
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					SortOrder={Enum.SortOrder.Name}
					VerticalAlignment={Enum.VerticalAlignment.Top}
				/>
				{props[Children]}
			</frame>
		</frame>
	)
}

export default Card
