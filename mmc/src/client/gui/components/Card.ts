import Make from '../RoStrapUI/Make'
import { Colors, HookColor } from './Colors'

interface Children {
	[ChildName: string]: Instance
}

export interface Card<C extends Children = Children> extends Frame {
	Stroke: UIStroke
	Contents: Frame & C
}

export default function Card<C extends Children = Children>({
	Header,
	Error,
	Children,
}: {
	Header?: boolean
	Error?: boolean
	Children?: (Instance | false | undefined)[] | { [i: number]: Instance | false | undefined }
}): Card<C> {
	return Make('Frame')({
		AutomaticSize: Enum.AutomaticSize.Y,
		BorderSizePixel: 0,
		BackgroundColor3: new Color3(1, 1, 1),
		Size: new UDim2(1, 0, 0, 0),

		[1]: Make('UICorner')({
			CornerRadius: new UDim(0, 8),
		}),
		[2]: Make('UIStroke')({
			Name: 'Stroke',
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			Thickness: 1,
			Color: Error ? Colors.ErrorColor : Colors.StrokeColor,
		}),
		[3]:
			Header &&
			Make('Frame')({
				Size: new UDim2(1, 0, 0, 16),
				BackgroundColor3: Colors.MainColor,

				[0]: HookColor('BackgroundColor3'),

				[1]: Make('UICorner')({
					CornerRadius: new UDim(0, 8),
				}),
				[2]: Make('Frame')({
					BackgroundColor3: new Color3(1, 1, 1),
					BorderSizePixel: 0,
					Position: new UDim2(0, 0, 0.5, 0),
					Size: new UDim2(1, 0, 0.5, 0),
				}),
			}),
		[4]: Make('Frame')({
			Name: 'Contents',
			BackgroundTransparency: 1,
			Size: new UDim2(1, 0, 1, 0),
			AutomaticSize: Enum.AutomaticSize.Y,

			[1]: Make('UIPadding')({
				PaddingBottom: new UDim(0, Header ? 16 : 24),
				PaddingLeft: new UDim(0, 24),
				PaddingRight: new UDim(0, 24),
				PaddingTop: new UDim(0, Header ? 22 : 24),
			}),
			[2]: Make('UIListLayout')({
				Padding: new UDim(0, 16),
				FillDirection: Enum.FillDirection.Vertical,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				SortOrder: Enum.SortOrder.LayoutOrder,
			}),
			[3]: (f) => {
				if (Children)
					for (const [i, obj] of pairs(Children)) {
						if (obj) {
							obj.Parent = f
						}
					}
			},
		}),
	}) as Card<C>
}
