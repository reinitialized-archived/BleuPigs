import CreateQuestionCards, { AnswerElement, Question } from '../QuestionCards'
import ScreenGui from '../ScreenGui'
import CardContainer from '../Components/CardContainer'
import SectionController, { Answers } from './SectionController'
import { HttpService } from '@rbxts/services'

const Questions: Question[] = [
	{
		Question: 'In 700 words or more, explain why Rein Prime is the best way to spend all your life savings.',
		Description: 'Description',
		Required: true,
		AnswerType: 'long',
	},
	{
		Question: 'How much Robux do you earn per month',
		Description: '(excluding taxes)',
		Required: false,
		AnswerType: 'short',
	},
	{
		Question: 'How much money are you willing to spend on Rein Prime (per month)',
		Required: true,
		AnswerType: 'choice',
		Choices: ['$50', '$100', '$200', '$500', '>$1000'],
	},
	{
		Question: '*insert rein prime question here*',
		Required: true,
		AnswerType: 'multi',
		Choices: ['Option 1', 'Option 2', 'Option 3'],
	},
]

const QuestionCards = CreateQuestionCards(Questions)
const CC = CardContainer(true, false)
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
CC.BackButton.OnPressed.Connect(() => {
	SectionController.PreviousSection()
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
	SectionController.Answers[2] = answers
	for (const [i, answers] of pairs(SectionController.Answers)) {
		print(i)
		for (const [j, answer] of pairs(answers)) {
			print(`\t${j}`, type(answer)==='table' ? HttpService.JSONEncode(answer) : tostring(answer))
		}
	}
	//SectionController.NextSection()
})

export default Section
