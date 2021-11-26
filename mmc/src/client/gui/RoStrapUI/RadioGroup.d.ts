import { PseudoGuiObject } from './PseudoInstanceDefs'
import Radio from './Radio'

interface RadioGroup {
	Add(Item: Radio, Option: string): void
	GetSelection(): string

	SelectionChanged: RBXScriptSignal<(Option: string) => void>
}

declare const RadioGroup: RadioGroup

export = RadioGroup
