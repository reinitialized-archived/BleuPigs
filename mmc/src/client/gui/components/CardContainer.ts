import Make from '../RoStrapUI/Make'
import RippleButton from '../RoStrapUI/RippleButton'
import { Colors, HookColor } from './Colors'

export default function CardContainer(Last?: boolean, First?: boolean) {
	let ClearButton!: RippleButton
	let SubmitButton!: RippleButton
	let BackButton!: RippleButton
	const c = Make('Frame')({
		Name: 'CardContainer',
		AutomaticSize: Enum.AutomaticSize.Y,
		BackgroundTransparency: 1,
		Position: new UDim2(0, 0, 0, 0),
		Size: new UDim2(1, 0, 0, 0),

		[1]: Make('UIListLayout')({
			Padding: new UDim(0, 12),
			FillDirection: Enum.FillDirection.Vertical,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			SortOrder: Enum.SortOrder.LayoutOrder,
			VerticalAlignment: Enum.VerticalAlignment.Top,
		}),

		[99]: Make('Frame')({
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			LayoutOrder: 999,

			[1]:
				!First &&
				Make('RippleButton')({
					Style: 'Contained',
					BorderRadius: 4,
					Text: 'Back',
					TextSize: 16,
					PrimaryColor3: new Color3(1, 1, 1),
					SecondaryColor3: Colors.MainColor,
					Size: new UDim2(0, 100, 0, 36),

					[0]: HookColor('SecondaryColor3'),

					[1]: (b) => {
						BackButton = b
					},
				}),

			[2]: Make('RippleButton')({
				Style: 'Contained',
				BorderRadius: 4,
				Text: Last ? 'Submit' : 'Next',
				TextSize: 16,
				PrimaryColor3: Last ? Colors.MainColor : new Color3(1, 1, 1),
				SecondaryColor3: !Last ? Colors.MainColor : undefined,
				Size: new UDim2(0, 100, 0, 36),
				Position: First ? new UDim2(0, 0, 0, 0) : new UDim2(0, 108, 0, 0),

				[0]: HookColor(Last ? 'PrimaryColor3' : 'SecondaryColor3'),

				[1]: (b) => {
					SubmitButton = b
				},
			}),

			[3]: Make('RippleButton')({
				Style: 'Flat',
				BorderRadius: 4,
				Text: 'Clear form',
				TextSize: 16,
				PrimaryColor3: Colors.MainColor,
				Size: new UDim2(0, 90, 0, 36),
				AnchorPoint: new Vector2(1, 0),
				Position: new UDim2(1, 0, 0, 0),

				[0]: HookColor('PrimaryColor3'),

				[1]: (b) => {
					ClearButton = b
				},
			}),
		}),
	})
	return {
		Container: c,
		SubmitButton,
		ClearButton,
		BackButton,
	}
}
