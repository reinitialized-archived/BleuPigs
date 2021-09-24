import Roact, { Children } from '@rbxts/roact'
import { Players } from '@rbxts/services'
import { LocalPlayer } from 'client/player'

import { Card, Input, Label } from './components'
import Button from './components/Button'
import { StrokeColor } from './components/Colors'

const InputCard: Roact.FunctionComponent<{ Error?: boolean; Title: string }> = function (props) {
	return (
		<Card Error={props.Error}>
			<Label Rich Text={`${props.Title} <font color="#d93025">*</font>`} Size={16} LineHeight={1.5} />
			{props[Children]}
		</Card>
	)
}

interface TextInputCardProps {}
interface TextInputCardState {
	error: string
}

class TextInputCard extends Roact.PureComponent<TextInputCardProps, TextInputCardState> {
	value: string

	constructor(props: {}) {
		super(props)
		this.value = ''
		this.state = {
			error: '',
		}
	}
	/*
	shouldUpdate(newProps: TextInputCardProps, newState: TextInputCardState) {
		return newState.error !== this.state.error
	}
	*/
	render() {
		return (
			<InputCard
				Title="In 700 words or more, explain why Rein Prime is the best way to spend all your life savings."
				Error={this.state.error !== ''}
			>
				<Input
					Error={this.state.error}
					Placeholder="Your answer"
					changed={(value) => {
						this.value = value
						if (this.state.error !== '' && value.size() > 0) {
							this.setState({ error: '' })
						}
					}}
					unfocus={() => {
						if (this.value.size() === 0) {
							this.setState({ error: 'This is a required question' })
						}
					}}
				/>
			</InputCard>
		)
	}
}

const GuiTree = (
	<screengui Enabled IgnoreGuiInset ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
		<scrollingframe
			BackgroundColor3={Color3.fromRGB(240, 235, 248)}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 1, 0)}
			AutomaticCanvasSize={Enum.AutomaticSize.Y}
			CanvasSize={new UDim2(0, 0, 0, 0)}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0)}
				AutomaticSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(0.9, 0, 0, 0)}
			>
				<uilistlayout
					Padding={new UDim(0, 12)}
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					SortOrder={Enum.SortOrder.Name}
					VerticalAlignment={Enum.VerticalAlignment.Top}
				/>
				<uipadding
					PaddingBottom={new UDim(0, 12)}
					PaddingLeft={new UDim(0, 0)}
					PaddingRight={new UDim(0, 0)}
					PaddingTop={new UDim(0, 12)}
				/>
				<uisizeconstraint MaxSize={new Vector2(640, math.huge)} MinSize={new Vector2(0, 0)} />
				<Card Header>
					<Label Text="Bleu Pigs Application Form" Size={32} LineHeight={1.35} />
					<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 1)}>
						<frame
							BorderSizePixel={0}
							AnchorPoint={new Vector2(0.5, 0)}
							BackgroundColor3={StrokeColor}
							Position={new UDim2(0.5, 0, 0, 0)}
							Size={new UDim2(1, 48, 1, 0)}
						/>
					</frame>
					<Label
						Rich
						Text={`Current account: <font color="#5f6368"><b>${LocalPlayer.Name}</b></font>`}
						Size={16}
					/>
				</Card>
				<TextInputCard />
				<frame Size={new UDim2(1, 0, 0, 0)} BackgroundTransparency={1}>
					<Button Filled Text="Submit" />
					<Button Text="Clear form" Position={new UDim2(1, 0, 0, 0)} AnchorPoint={new Vector2(1, 0)} />
				</frame>
			</frame>
		</scrollingframe>
	</screengui>
)

export default GuiTree
