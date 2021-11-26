import DialogPrompt from '../DialogPrompt'
import { AnswerElement } from '../QuestionCards'

type Section = {
	Container: Frame
	AnswerElements: AnswerElement[]
}

export type Answers = { [i: number]: AnswerElement['Answer'] }

const SectionController = {
	CurrentSection: 0,
	NextSection() {
		if (this.CurrentSection + 1 >= this.Sections.size()) {
			warn('Tried to go to next section on last section')
			return
		}
		const CurrentSection = this.Sections[this.CurrentSection]
		this.CurrentSection += 1
		const NewSection = this.Sections[this.CurrentSection]
		CurrentSection.Container.Visible = false
		NewSection.Container.Visible = true
		NewSection.Container.Size = new UDim2(1, 0, 0, 10)
	},
	PreviousSection() {
		if (this.CurrentSection <= 0) {
			warn('Tried to go to previous section on first section')
			return
		}
		const CurrentSection = this.Sections[this.CurrentSection]
		this.CurrentSection -= 1
		const NewSection = this.Sections[this.CurrentSection]
		CurrentSection.Container.Visible = false
		NewSection.Container.Visible = true
	},
	Sections: [] as Section[],
	Answers: {} as { [i: number]: Answers },
	ClearSection: (Section: Section) => {
		const i = DialogPrompt(
			'Clear form?',
			'This will remove your answers from all questions, and cannot be undone.',
			['Cancel', 'Clear form'],
		)
		if (i === 2) {
			for (const el of Section.AnswerElements) {
				el.Clear()
			}
		}
	},
}

export default SectionController
