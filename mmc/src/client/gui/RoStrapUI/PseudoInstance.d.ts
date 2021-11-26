import { CreatablePseudoInstances } from './PseudoInstanceDefs'
import RadioGroup from './RadioGroup'

interface PseudoInstance {
	new (PseudoInstanceName: 'RadioGroup'): RadioGroup
	new <T extends keyof CreatablePseudoInstances>(PseudoInstanceName: T): CreatablePseudoInstances[T]
}

declare const PseudoInstance: PseudoInstance

export = PseudoInstance
