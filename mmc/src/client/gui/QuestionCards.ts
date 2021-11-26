import Make from './RoStrapUI/Make'
import Label from './Components/Label'
import Card, { Card as CardType } from './Components/Card'
import { Colors, HookColor } from './Components/Colors'
import { TweenService } from '@rbxts/services'
import { Mouse } from 'client/player'
import PseudoInstance from './RoStrapUI/PseudoInstance'
import Radio from './RoStrapUI/Radio'

interface BaseAnswerElement {
	AnswerType: string
	Card: Frame
	Required?: boolean
	Validate(RemoveErrorOnly?: boolean): boolean
	SetError(err: string | undefined): void
	Clear(): void
	Error?: string
	Answer?: string | string[]
}

interface ShortTextAnswer extends BaseAnswerElement {
	AnswerType: 'short'
	Answer?: string
}
interface LongTextAnswer extends BaseAnswerElement {
	AnswerType: 'long'
	Answer?: string
}
interface ChoiceAnswer extends BaseAnswerElement {
	AnswerType: 'choice'
	Answer?: string
}
interface MultipleChoiceAnswer extends BaseAnswerElement {
	AnswerType: 'multi'
	Answer: string[]
}

export type AnswerElement = ShortTextAnswer | LongTextAnswer | ChoiceAnswer | MultipleChoiceAnswer

const lineFocusInfo = new TweenInfo(0.25, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, false, 0)

interface Children {
	[ChildName: string]: Instance
}

interface QuestionBase {
	Question: string
	Description?: string
	Required?: boolean
	AnswerType: string
}

interface ShortTextQuestion extends QuestionBase {
	AnswerType: 'short'
}

interface LongTextQuestion extends QuestionBase {
	AnswerType: 'long'
}

interface ChoiceQuestion extends QuestionBase {
	AnswerType: 'choice'
	Choices: string[]
}

interface MultipleChoiceQuestion extends QuestionBase {
	AnswerType: 'multi'
	Choices: string[]
}

export type Question = ShortTextQuestion | LongTextQuestion | ChoiceQuestion | MultipleChoiceQuestion

type QuestionCardContents<C extends Children = Children> = {
	QuestionLabel: TextLabel
	Contents: Frame & {
		Input: Frame & { List: UIListLayout } & C
		ErrorLabel: TextLabel
	}
}

const SetQuestionCardError = function (c: CardType<QuestionCardContents<{}>>, err: string | undefined) {
	const errlabel = c.Contents.Contents.ErrorLabel
	errlabel.Visible = err !== undefined
	errlabel.Text = err || ''
	c.Stroke.Color = err ? Colors.ErrorColor : Colors.StrokeColor
}

function QuestionCard<C extends Children = Children>(q: {
	Question: string
	Description?: string
	Required?: boolean
	Children: Instance[] | { [i: number]: Instance }
}) {
	return Card<QuestionCardContents<C>>({
		Children: {
			[1]: Make('Frame')({
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, 0, 0, 0),
				BackgroundTransparency: 1,

				[1]: Make('UIListLayout')({
					VerticalAlignment: Enum.VerticalAlignment.Top,
					SortOrder: Enum.SortOrder.LayoutOrder,
					FillDirection: Enum.FillDirection.Vertical,
					Padding: new UDim(0, 8),
				}),
				[2]: Make<'TextLabel'>(
					Label({
						Rich: true,
						Text: `${q.Question}${q.Required ? ' <font color="#d93025">*</font>' : ''}`,
						Size: 16,
						LineHeight: 1.5,
					}),
				)({
					Name: 'QuestionLabel',
					LayoutOrder: 1,
				}),
				[3]:
					q.Description !== undefined &&
					Make<'TextLabel'>(
						Label({
							Text: q.Description,
							Size: 14,
							LineHeight: 1.35,
						}),
					)({
						Name: 'Description',
						LayoutOrder: 2,
					}),
			}),
			[2]: Make('Frame')({
				Name: 'Contents',
				AutomaticSize: Enum.AutomaticSize.Y,
				BackgroundTransparency: 1,
				Size: new UDim2(1, 0, 0, 0),

				[1]: Make('UIListLayout')({
					Name: 'List',
					VerticalAlignment: Enum.VerticalAlignment.Top,
					SortOrder: Enum.SortOrder.LayoutOrder,
					FillDirection: Enum.FillDirection.Vertical,
				}),

				[2]: Make('Frame')({
					Name: 'Input',
					BackgroundTransparency: 1,
					AutomaticSize: Enum.AutomaticSize.Y,
					Size: new UDim2(1, 0, 0, 0),

					[1]: Make('UIListLayout')({
						Name: 'List',
						VerticalAlignment: Enum.VerticalAlignment.Top,
						SortOrder: Enum.SortOrder.LayoutOrder,
						FillDirection: Enum.FillDirection.Vertical,
					}),

					[2]: (f) => {
						if (q.Children)
							for (const [a, b] of pairs(q.Children)) {
								b.Parent = f
							}
					},
				}),

				[3]: Make<'TextLabel'>(
					Label({
						Text: '',
						Color: Colors.ErrorColor,
						Size: 14,
						Visible: false,
					}),
				)({
					Name: 'ErrorLabel',
					LayoutOrder: 3,
				}),
			}),
		},
	})
}

function TextAnswerCard(q: LongTextQuestion | ShortTextQuestion) {
	const short = q.AnswerType === 'short'
	const c = QuestionCard<{
		LineContainer: Frame & {
			Line: Frame
		}
		InputBox: TextBox
	}>({
		Question: q.Question,
		Description: q.Description,
		Required: q.Required,
		Children: {
			[1]: Make('TextBox')({
				Name: 'InputBox',
				MultiLine: !short,
				Text: '',
				PlaceholderText: 'Your answer',
				AutomaticSize: short ? Enum.AutomaticSize.None : Enum.AutomaticSize.Y,
				BackgroundTransparency: 1,
				ClearTextOnFocus: false,
				Size: new UDim2(short ? 0.5 : 1, 0, 0, short ? 14 : 0),
				Font: Enum.Font.Roboto,
				LineHeight: 1.35,
				TextColor3: Colors.TextColor,
				PlaceholderColor3: Color3.fromRGB(112, 117, 122),
				TextSize: 14,
				TextWrapped: !short,
				TextXAlignment: Enum.TextXAlignment.Left,
				ClipsDescendants: true,

				LayoutOrder: 1,
			}),

			[2]: Make('Frame')({
				Name: 'LineContainer',
				Size: new UDim2(short ? 0.5 : 1, 0, 0, 1),
				BorderSizePixel: 0,
				BackgroundColor3: Colors.StrokeColor,

				LayoutOrder: 2,

				[1]: Make('Frame')({
					Name: 'Line',
					Size: new UDim2(0, 0, 0, 2),
					AnchorPoint: new Vector2(0.5, 0),
					Position: new UDim2(0.5, 0, 0, 0),
					BackgroundColor3: Colors.MainColor,
					BorderSizePixel: 0,

					[0]: HookColor('BackgroundColor3'),
				}),
			}),
		},
	})

	const contents = c.Contents.Contents
	const linecontainer = contents.Input.LineContainer
	const line = linecontainer.Line
	const input = contents.Input.InputBox

	const el: LongTextAnswer | ShortTextAnswer = {
		AnswerType: q.AnswerType,
		Card: c,
		Required: q.Required,
		Validate(RemoveErrorOnly) {
			if (this.Required && (this.Answer === undefined || this.Answer === '')) {
				if (!RemoveErrorOnly) {
					this.SetError('This is a required question')
				}
				return false
			}
			this.SetError(undefined)
			return true
		},
		SetError(err) {
			SetQuestionCardError(c, err)
			linecontainer.BackgroundColor3 = err ? Colors.ErrorColor : Colors.StrokeColor
			line.BackgroundColor3 = err ? Colors.ErrorColor : Colors.MainColor
			this.Error = err
		},
		Clear() {
			input.Text = ''
			this.Answer = undefined
			this.SetError(undefined)
		},
		Answer: undefined,
		Error: undefined,
	}

	let currentTween: Tween | undefined = undefined
	input.Focused.Connect(() => {
		let pos = (Mouse.X - input.AbsolutePosition.X) / input.AbsoluteSize.X
		if (pos < 0 || pos > 1) {
			pos = 0.5
		}
		line.AnchorPoint = new Vector2(pos, 0)
		line.Position = new UDim2(pos, 0, 0, 0)
		line.Size = new UDim2(0, 0, 0, 2)
		if (currentTween) {
			currentTween.Cancel()
		}
		line.BackgroundTransparency = 0
		currentTween = TweenService.Create(line, lineFocusInfo, {
			Size: new UDim2(1, 0, 0, 2),
		})
		currentTween.Play()
	})
	input.FocusLost.Connect(() => {
		if (currentTween) {
			currentTween.Cancel()
		}
		currentTween = TweenService.Create(line, lineFocusInfo, {
			BackgroundTransparency: 1,
		})
		currentTween.Play()

		el.Validate()
	})
	input.GetPropertyChangedSignal('Text').Connect(() => {
		el.Answer = input.Text
		el.Validate(true)
	})

	return el
}

function ChoiceAnswerCard(q: ChoiceQuestion) {
	const group = new PseudoInstance('RadioGroup')
	const Radios: Radio[] = []
	const RadioFrames: GuiObject[] = []
	for (const choice of q.Choices) {
		const f = Make('Frame')({
			BackgroundTransparency: 1,
			Size: new UDim2(1, 0, 0, 40),

			[1]: Make('UIPadding')({
				PaddingBottom: new UDim(0, 8),
				PaddingTop: new UDim(0, 8),
			}),
		})
		const tb = Make('TextButton')({
			AutoButtonColor: false,
			BackgroundTransparency: 1,
			Size: new UDim2(1, 0, 1, 0),
			Font: Enum.Font.Roboto,
			Text: choice,
			TextSize: 14,
			TextColor3: Colors.TextColor,
			TextXAlignment: Enum.TextXAlignment.Left,

			Parent: f,

			[1]: Make('UIPadding')({
				PaddingLeft: new UDim(0, 40),
			}),
		})
		const r = Make('Radio')({
			Position: new UDim2(0, -40, 0, 0),
			PrimaryColor3: Colors.MainColor,

			Parent: tb,

			[0]: HookColor('PrimaryColor3'),
		})
		tb.MouseButton1Click.Connect(() => {
			if (r.Checked) {
				if (!q.Required) {
					r.SetChecked(false)
				}
			} else {
				r.SetChecked(true)
			}
		})
		group.Add(r, choice)
		RadioFrames.push(f)
		Radios.push(r)
	}
	const c = QuestionCard<{
		[n: string]: Radio
	}>({
		Question: q.Question,
		Required: q.Required,
		Children: RadioFrames,
	})

	const el: ChoiceAnswer = {
		AnswerType: q.AnswerType,
		Card: c,
		Required: q.Required,
		Validate(RemoveErrorOnly) {
			if (this.Required && (this.Answer === undefined || this.Answer === '')) {
				if (!RemoveErrorOnly) {
					this.SetError('This is a required question')
				}
				return false
			}
			this.SetError(undefined)
			return true
		},
		SetError(err) {
			SetQuestionCardError(c, err)
			this.Error = err
		},
		Clear() {
			for (const r of Radios) {
				r.SetChecked(false)
			}
			this.Answer = undefined
			this.SetError(undefined)
		},
		Answer: undefined,
		Error: undefined,
	}

	group.SelectionChanged.Connect((option) => {
		el.Answer = option
		el.Validate()
	})

	return el
}

function MultiChoiceAnswerCard(q: MultipleChoiceQuestion) {
	const Checkboxes: Radio[] = []
	const CheckboxFrames: GuiObject[] = []
	for (const choice of q.Choices) {
		const f = Make('Frame')({
			BackgroundTransparency: 1,
			Size: new UDim2(1, 0, 0, 40),

			[1]: Make('UIPadding')({
				PaddingBottom: new UDim(0, 8),
				PaddingTop: new UDim(0, 8),
			}),
		})
		const tb = Make('TextButton')({
			AutoButtonColor: false,
			BackgroundTransparency: 1,
			Size: new UDim2(1, 0, 1, 0),
			Font: Enum.Font.Roboto,
			Text: choice,
			TextSize: 14,
			TextColor3: Colors.TextColor,
			TextXAlignment: Enum.TextXAlignment.Left,

			Parent: f,

			[1]: Make('UIPadding')({
				PaddingLeft: new UDim(0, 40),
			}),
		})
		const r = Make('Checkbox')({
			Position: new UDim2(0, -40, 0, 0),
			PrimaryColor3: Colors.MainColor,

			Parent: tb,

			[0]: HookColor('PrimaryColor3'),
		})
		tb.MouseButton1Click.Connect(() => {
			r.SetChecked()
		})
		CheckboxFrames.push(f)
		Checkboxes.push(r)
	}
	const c = QuestionCard<{
		[n: string]: Radio
	}>({
		Question: q.Question,
		Required: q.Required,
		Children: CheckboxFrames,
	})

	const el: MultipleChoiceAnswer = {
		AnswerType: q.AnswerType,
		Card: c,
		Required: q.Required,
		Validate(RemoveErrorOnly) {
			if (this.Required && this.Answer.size() < 1) {
				if (!RemoveErrorOnly) {
					this.SetError('This is a required question')
				}
				return false
			}
			this.SetError(undefined)
			return true
		},
		SetError(err) {
			SetQuestionCardError(c, err)
			this.Error = err
		},
		Clear() {
			for (const r of Checkboxes) {
				r.SetChecked(false)
			}
			this.SetError(undefined)
		},
		Answer: [],
		Error: undefined,
	}

	for (const [i, checkbox] of ipairs(Checkboxes)) {
		const choice = q.Choices[i - 1]
		checkbox.OnChecked.Connect(() => {
			const checked = checkbox.Checked
			if (checked) {
				el.Answer.push(choice)
			} else {
				const i = el.Answer.findIndex((a) => a === choice)
				if (i >= 0) {
					el.Answer.remove(i)
				}
			}
			el.Validate()
		})
	}

	return el
}

function CreateQuestionCards(Questions: Question[]) {
	const AnswerElements: AnswerElement[] = []
	for (const q of Questions) {
		let el!: AnswerElement
		if (q.AnswerType === 'long' || q.AnswerType === 'short') {
			el = TextAnswerCard(q)
		} else if (q.AnswerType === 'choice') {
			el = ChoiceAnswerCard(q)
		} else if (q.AnswerType === 'multi') {
			el = MultiChoiceAnswerCard(q)
		}
		assert(el, `Question card wasn't created for type ${q.AnswerType}`)
		AnswerElements.push(el)
	}
	return AnswerElements
}

export default CreateQuestionCards
