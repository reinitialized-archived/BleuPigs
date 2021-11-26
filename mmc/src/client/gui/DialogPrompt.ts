import Make from './RoStrapUI/Make'
import RippleButton from './RoStrapUI/RippleButton'
import ScreenGui from './ScreenGui'

const Prompt = Make('Frame')({
	Name: 'DialogPrompt',
	Active: true,
	BackgroundTransparency: 0.5,
	BackgroundColor3: new Color3(0, 0, 0),
	BorderSizePixel: 0,
	Size: new UDim2(1, 0, 1, 0),
	ZIndex: 1000,

	[1]: Make('Frame')({
		Name: 'Container',
		Active: true,
		AnchorPoint: new Vector2(0.5, 0.5),
		AutomaticSize: Enum.AutomaticSize.XY,
		BackgroundColor3: new Color3(1, 1, 1),
		Position: new UDim2(0.5, 0, 0.5, 0),
		Size: new UDim2(0, 0, 0, 0),
		ZIndex: 1001,

		[1]: Make('UICorner')({
			CornerRadius: new UDim(0, 8),
		}),
		[2]: Make('UISizeConstraint')({
			MaxSize: new Vector2(360, 600),
			MinSize: new Vector2(50, 50),
		}),
		[3]: Make('UIListLayout')({
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
		}),

		[4]: Make('TextLabel')({
			Name: 'Header',
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			LayoutOrder: 1,
			Size: new UDim2(0, 0, 0, 0),
			Font: Enum.Font.Roboto,
			RichText: true,
			Text: '<b>Header</b>',
			TextSize: 24,
			TextColor3: new Color3(0, 0, 0),
			TextWrapped: true,
			TextXAlignment: Enum.TextXAlignment.Left,
			ZIndex: 1002,

			[1]: Make('UIPadding')({
				PaddingBottom: new UDim(0, 12),
				PaddingLeft: new UDim(0, 24),
				PaddingRight: new UDim(0, 24),
				PaddingTop: new UDim(0, 18),
			}),
		}),

		[5]: Make('TextLabel')({
			Name: 'Body',
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			LayoutOrder: 2,
			Size: new UDim2(0, 0, 0, 0),
			Font: Enum.Font.Roboto,
			RichText: false,
			Text: 'Body text',
			TextSize: 20,
			TextColor3: new Color3(0, 0, 0),
			TextWrapped: true,
			TextXAlignment: Enum.TextXAlignment.Left,
			ZIndex: 1002,

			[1]: Make('UIPadding')({
				PaddingBottom: new UDim(0, 0),
				PaddingLeft: new UDim(0, 24),
				PaddingRight: new UDim(0, 24),
				PaddingTop: new UDim(0, 4),
			}),
		}),

		[6]: Make('Frame')({
			Name: 'Buttons',
			BackgroundTransparency: 1,
			LayoutOrder: 3,
			Size: new UDim2(1, 0, 0, 60),
			ZIndex: 1002,

			[1]: Make('UIPadding')({
				PaddingBottom: new UDim(0, 8),
				PaddingLeft: new UDim(0, 24),
				PaddingRight: new UDim(0, 16),
				PaddingTop: new UDim(0, 16),
			}),

			[2]: Make('UIListLayout')({
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Right,
				SortOrder: Enum.SortOrder.LayoutOrder,
			}),
		}),
	}),

	Parent: ScreenGui,
}) as Frame & {
	Container: Frame & {
		Header: TextLabel
		Body: TextLabel
		Buttons: Frame
	}
}

let YieldedThread: thread | undefined = undefined
const Header = Prompt.Container.Header
const Body = Prompt.Container.Body
const ButtonContainer = Prompt.Container.Buttons
const Buttons: RippleButton[] = []

const ButtonColor = Color3.fromRGB(95, 99, 104)

Prompt.Visible = false

Prompt.InputBegan.Connect((io) => {
	if (!YieldedThread) return
	if (io.UserInputType === Enum.UserInputType.MouseButton1 || io.UserInputType === Enum.UserInputType.Touch) {
		coroutine.resume(YieldedThread, undefined)
	}
})

export default function DialogPrompt(header: string, body: string, Options: [optn: string, ...optns: string[]]) {
	if (YieldedThread) {
		const [s, r] = coroutine.resume(YieldedThread, undefined)
		YieldedThread = undefined
		assert(s, r as string)
	}
	YieldedThread = coroutine.running()
	for (const [i, optn] of ipairs(Options)) {
		const btn = Make('RippleButton')({
			Text: optn,
			TextSize: 14,
			LayoutOrder: i,
			Style: 'Flat',
			PrimaryColor3: ButtonColor,
			BorderRadius: 4,
			ZIndex: 1003,
		})
		btn.Size = new UDim2(0, btn.TextBounds.X + 16, 0, 36)
		btn.GetPropertyChangedSignal('TextBounds').Connect(() => {
			btn.Size = new UDim2(0, btn.TextBounds.X + 16, 0, 36)
		})
		btn.OnPressed.Connect(() => {
			if (YieldedThread) {
				coroutine.resume(YieldedThread, i)
			}
		})
		btn.Parent = ButtonContainer
		Buttons.push(btn)
	}
	Header.Text = `<b>${header}</b>`
	Body.Text = body
	Prompt.Visible = true
	const [i] = coroutine.yield()
	YieldedThread = undefined
	Prompt.Visible = false
	let btn: RippleButton | undefined
	while ((btn = Buttons.pop())) {
		btn.Parent = undefined
		btn.Destroy()
	}
	return i
}
