import Make from '../RoStrapUI/Make'
import { Colors } from './Colors'

export default function Label(props: {
	Text?: string
	Rich?: boolean
	Size?: number
	LineHeight?: number
	Color?: Color3
	Visible?: boolean
}) {
	return Make('TextLabel')({
		Text: props.Text,
		RichText: props.Rich,
		Font: Enum.Font.Roboto,
		AutomaticSize: Enum.AutomaticSize.Y,
		BackgroundTransparency: 1,
		Size: new UDim2(1, 0, 0, 0),
		LineHeight: props.LineHeight !== undefined ? props.LineHeight : 1,
		TextSize: props.Size !== undefined ? props.Size : 14,
		TextScaled: false,
		TextWrapped: true,
		TextXAlignment: Enum.TextXAlignment.Left,
		TextColor3: props.Color !== undefined ? props.Color : Colors.TextColor,
		Visible: props.Visible !== undefined ? props.Visible : true,
	})
}
