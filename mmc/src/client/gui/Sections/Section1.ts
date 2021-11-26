import CreateQuestionCards, { AnswerElement, Question } from '../QuestionCards'
import ScreenGui from '../ScreenGui'
import CardContainer from '../Components/CardContainer'
import SectionController, { Answers } from './SectionController'

const Questions: Question[] = [
	{
		Question: 'Enter your discord user ID',
		Required: true,
		AnswerType: 'short',
	},
]

const QuestionCards = CreateQuestionCards(Questions)
const CC = CardContainer(false, true)
const Container = CC.Container
for (const el of QuestionCards) {
	el.Card.Parent = Container
}
const Section = {
	Container,
	AnswerElements: QuestionCards,
}
CC.ClearButton.OnPressed.Connect(() => {
	SectionController.ClearSection(Section)
})
CC.SubmitButton.OnPressed.Connect(() => {
	const answers: Answers = {}
	for (const [i, el] of ipairs(QuestionCards)) {
		if (el.Validate()) {
			answers[i] = el.Answer
		} else {
			return
		}
	}
	SectionController.Answers[1] = answers
	SectionController.NextSection()
})

export default Section
