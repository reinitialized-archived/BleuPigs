import PseudoInstance from './PseudoInstance'
import { TweenObject } from './TweenObject'

type EasingFunction =
	| 'Standard'
	| 'Deceleration'
	| 'Acceleration'
	| 'Sharp'
	| 'Linear'
	| 'InSine'
	| 'OutSine'
	| 'InOutSine'
	| 'OutInSine'
	| 'InBack'
	| 'OutBack'
	| 'InOutBack'
	| 'OutInBack'
	| 'InQuad'
	| 'OutQuad'
	| 'InOutQuad'
	| 'OutInQuad'
	| 'InQuart'
	| 'OutQuart'
	| 'InOutQuart'
	| 'OutInQuart'
	| 'InQuint'
	| 'OutQuint'
	| 'InOutQuint'
	| 'OutInQuint'
	| 'InBounce'
	| 'OutBounce'
	| 'InOutBounce'
	| 'OutInBounce'
	| 'InElastic'
	| 'OutElastic'
	| 'InOutElastic'
	| 'OutInElastic'
	| 'InCirc'
	| 'OutCirc'
	| 'InOutCirc'
	| 'OutInCirc'
	| 'InCubic'
	| 'OutCubic'
	| 'InOutCubic'
	| 'OutInCubic'
	| 'InExpo'
	| 'OutExpo'
	| 'InOutExpo'
	| 'OutInExpo'
	| 'Smooth'
	| 'Smoother'
	| 'RevBack'
	| 'RidiculousWiggle'
	| 'Spring'
	| 'SoftSpring'

interface Tween {
	<I extends PseudoInstance | Instance, P extends keyof I>(
		Object: I,
		PropertyName: P,
		EndValue: I[P],
		EasingFunction: EasingFunction,
		Time: number,
		Override?: boolean,
		Callback?: () => void,
	): TweenObject
	new (Duration: number, EasingFunctionName: EasingFunction, Callback: (x: number) => void): TweenObject
}

declare const Tween: Tween

export = Tween
