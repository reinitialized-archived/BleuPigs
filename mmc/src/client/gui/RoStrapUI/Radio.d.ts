import { PseudoGuiObject } from './PseudoInstanceDefs'

interface Radio extends PseudoGuiObject {
	Checked: boolean
	Disabled: boolean
	PrimaryColor3: Color3
	Theme: 'Dark' | 'Light'

	SetChecked(Checked?: boolean): void

	OnChecked: RBXScriptSignal
}

declare const Radio: Radio

export = Radio
