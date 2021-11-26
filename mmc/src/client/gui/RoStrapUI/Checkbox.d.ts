import { PseudoGuiObject } from './PseudoInstanceDefs'

interface Checkbox extends PseudoGuiObject {
	Indeterminate: boolean
	Checked: boolean
	Disabled: boolean
	PrimaryColor3: Color3
	Theme: 'Dark' | 'Light'

	SetChecked(Checked?: boolean): void

	OnChecked: RBXScriptSignal
}

declare const Radio: Checkbox

export = Checkbox
