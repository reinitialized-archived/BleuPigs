import Roact, { Change, Ref } from '@rbxts/roact'
import { TweenService } from '@rbxts/services'
import Label from './Label'
import { ErrorColor, MainColor, StrokeColor } from './Colors'

const lineFocusInfo = new TweenInfo(0.25, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, false, 0)

interface InputProps {
	Value?: string
	Placeholder?: string
	Error?: string
	changed?: (text: string) => unknown
	unfocus?: () => unknown
}
interface InputState {
	Focused: boolean
	LineRef: Ref<Frame>
	TextBoxRef: Ref<TextBox>
}

class Input extends Roact.PureComponent<InputProps, InputState> {
	constructor(props: InputProps) {
		super(props)
		this.state = {
			TextBoxRef: Roact.createRef<TextBox>(),
			LineRef: Roact.createRef<Frame>(),
			Focused: false,
		}
	}

	focused() {
		const line = this.state.LineRef.getValue()
		if (!line) return
		line.Size = new UDim2(0, 0, 0, 2)
		line.BackgroundTransparency = 0
		const tween = TweenService.Create(line, lineFocusInfo, {
			Size: new UDim2(1, 0, 0, 2),
		})
		tween.Play()
	}
	unfocused() {
		const line = this.state.LineRef.getValue()
		if (!line) return
		const tween = TweenService.Create(line, lineFocusInfo, {
			BackgroundTransparency: 1,
		})
		tween.Play()
		const f = this.props.unfocus
		if (f) f()
	}

	render() {
		const isError = !(this.props.Error === undefined || this.props.Error === '')
		return (
			<frame AutomaticSize={Enum.AutomaticSize.Y} BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 0)}>
				<uilistlayout
					VerticalAlignment={Enum.VerticalAlignment.Top}
					SortOrder={Enum.SortOrder.Name}
					FillDirection={Enum.FillDirection.Vertical}
				/>
				<textbox
					MultiLine
					Text={this.props.Value !== undefined ? this.props.Value : ''}
					PlaceholderText={this.props.Placeholder !== undefined ? this.props.Placeholder : ''}
					AutomaticSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					ClearTextOnFocus={false}
					Size={new UDim2(1, 0, 0, 0)}
					Font={Enum.Font.Roboto}
					LineHeight={1.35}
					PlaceholderColor3={Color3.fromRGB(112, 117, 122)}
					TextSize={14}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					Change={{
						Text: (rbx: TextBox) => {
							const f = this.props.changed
							if (f) f(rbx.Text)
						},
					}}
					Event={{
						Focused: (rbx) => {
							this.focused()
						},
						FocusLost: (rbx) => {
							this.unfocused()
						},
					}}
					Ref={this.state.TextBoxRef}
				/>
				<frame
					Size={new UDim2(1, 0, 0, 1)}
					BorderSizePixel={0}
					BackgroundColor3={isError ? ErrorColor : StrokeColor}
				>
					<frame
						Size={new UDim2(0, 0, 0, 2)}
						AnchorPoint={new Vector2(0.5, 0)}
						Position={new UDim2(0.5, 0, 0, 0)}
						BackgroundColor3={isError ? ErrorColor : MainColor}
						BorderSizePixel={0}
						Ref={this.state.LineRef}
					/>
				</frame>
				<Label Size={14} Visible={isError} Text={this.props.Error} Color={ErrorColor} />
			</frame>
		)
	}
}

export default Input
