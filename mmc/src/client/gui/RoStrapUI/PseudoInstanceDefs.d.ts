import Checkbox from './Checkbox'
import Radio from './Radio'
import RippleButton from './RippleButton'

export interface CreatablePseudoInstances {
	RippleButton: RippleButton
	Radio: Radio
	Checkbox: Checkbox
}

export interface PseudoInstances extends CreatablePseudoInstances {}

export interface PseudoInstance extends Instance {
	Object: Instance
}

export interface PseudoGuiObject extends GuiObject {
	Object: GuiObject
}
