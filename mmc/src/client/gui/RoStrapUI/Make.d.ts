import { CreatablePseudoInstances } from './PseudoInstanceDefs'

type AllCreatableInstances = CreatableInstances & CreatablePseudoInstances

declare function Make<T extends keyof AllCreatableInstances>(
	target: T | AllCreatableInstances[T],
): (
	...Props: (Partial<AllCreatableInstances[T]> & {
		[i: number]: false | undefined | Instance | ((obj: AllCreatableInstances[T]) => void)
	})[]
) => AllCreatableInstances[T]

export = Make
