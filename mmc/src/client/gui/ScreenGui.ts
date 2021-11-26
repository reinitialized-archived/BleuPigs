import { LocalPlayer } from 'client/player'
import Card from './Components/Card'
import Color from './Components/Color'
import { ChangeColor, Colors, HookColor } from './Components/Colors'
import Label from './Components/Label'
import Make from './RoStrapUI/Make'

const ScreenGui = Make('ScreenGui')({
	Enabled: true,
	ResetOnSpawn: false,
	IgnoreGuiInset: true,
	ZIndexBehavior: Enum.ZIndexBehavior.Global,

	[1]: Make('Frame')({
		Name: 'Background',
		BackgroundColor3: new Color3(1, 1, 1),
		Size: new UDim2(1, 0, 1, 0),

		[1]: Make('ScrollingFrame')({
			Name: 'Scroll',
			BackgroundColor3: Colors.MainColor,
			BackgroundTransparency: 0.8,
			BorderSizePixel: 0,
			Size: new UDim2(1, 0, 1, 0),
			AutomaticCanvasSize: Enum.AutomaticSize.Y,
			CanvasSize: new UDim2(0, 0, 0, 0),

			[0]: HookColor('BackgroundColor3'),

			[1]: Make('Frame')({
				Name: 'Container',
				AnchorPoint: new Vector2(0.5, 0),
				AutomaticSize: Enum.AutomaticSize.Y,
				BackgroundTransparency: 1,
				Position: new UDim2(0.5, 0, 0, 0),
				Size: new UDim2(0.9, 0, 0, 0),

				[1]: Make('UIPadding')({
					PaddingBottom: new UDim(0, 12),
					PaddingLeft: new UDim(0, 0),
					PaddingRight: new UDim(0, 0),
					PaddingTop: new UDim(0, 12),
				}),

				[2]: Make('UISizeConstraint')({
					MaxSize: new Vector2(640, math.huge),
					MinSize: new Vector2(0, 0),
				}),

				[3]: Make('Frame')({
					Name: 'SectionCards',
					AutomaticSize: Enum.AutomaticSize.Y,
					BackgroundTransparency: 1,
					Size: new UDim2(1, 0, 0, 0),

					[1]: Make('UIListLayout')({
						Padding: new UDim(0, 12),
						FillDirection: Enum.FillDirection.Vertical,
						HorizontalAlignment: Enum.HorizontalAlignment.Left,
						SortOrder: Enum.SortOrder.LayoutOrder,
						VerticalAlignment: Enum.VerticalAlignment.Top,
					}),

					[2]: Make<'Frame'>(
						Card({
							Header: true,
							Children: {
								[1]: Label({
									Text: 'Bleu Pigs Application Form',
									Size: 32,
									LineHeight: 1.35,
								}),
								[2]: Make('Frame')({
									BackgroundTransparency: 1,
									Size: new UDim2(1, 0, 0, 1),

									[1]: Make('Frame')({
										BorderSizePixel: 0,
										AnchorPoint: new Vector2(0.5, 0),
										BackgroundColor3: Colors.StrokeColor,
										Position: new UDim2(0.5, 0, 0, 0),
										Size: new UDim2(1, 48, 1, 0),
									}),
								}),
								[3]: Label({
									Rich: true,
									Text: `Current account: <font color="#5f6368"><b>${LocalPlayer.Name}</b></font>`,
									Size: 16,
								}),
								[4]: Label({
									Color: Color3.fromRGB(217, 48, 37),
									Text: '* Required',
									Size: 14,
								}),
								[5]: Make('Frame')({
									AutomaticSize: Enum.AutomaticSize.Y,
									BackgroundTransparency: 1,
									Size: new UDim2(1, 0, 0, 0),

									[1]: Make('UIGridLayout')({
										CellPadding: new UDim2(0, 5, 0, 5),
										CellSize: new UDim2(0, 70, 0, 24),
									}),

									[2]: (f) => {
										for (const [name, clr] of pairs(Color)) {
											if (typeIs(clr, 'table')) {
												const color = (clr as { [500]: Color3 })[500]
												const btn = Make('RippleButton')({
													Name: name,
													Style: 'Contained',
													BorderRadius: 4,
													Text: name,
													TextSize: 12,
													PrimaryColor3: color,
													Size: new UDim2(0, 80, 0, 36),
													Parent: f,
												})
												btn.OnPressed.Connect(() => {
													ChangeColor(color)
												})
											}
										}
									},
								}),
							},
						}),
					)({
						LayoutOrder: 0,
					}),
				}),
			}),
		}),
	}),
}) as ScreenGui & {
	Background: Frame & {
		Scroll: Frame & {
			Container: Frame & {
				SectionCards: Frame
			}
		}
	}
}
export default ScreenGui
