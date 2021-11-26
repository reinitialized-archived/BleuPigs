import Tween from '../RoStrapUI/Tween'
import { TweenObject } from '../RoStrapUI/TweenObject'
import Color from './Color'

export const Colors = {
	MainColor: Color.Red[500],
	StrokeColor: Color3.fromRGB(218, 220, 224),
	ErrorColor: Color3.fromRGB(217, 48, 37),
	TextColor: Color3.fromRGB(32, 33, 36),
}

type HookedInstance = [{ [prop: string]: Color3 }, string]

const HookedInstances: HookedInstance[] = []

let currentTween: TweenObject

export const ChangeColor = function (clr: Color3) {
	const oldclr = Colors.MainColor
	Colors.MainColor = clr
	if (currentTween && currentTween.Running) {
		currentTween.Stop()
	}
	currentTween = new Tween(1, 'Linear', (x) => {
		const newclr = oldclr.Lerp(clr, x)
		Colors.MainColor = newclr
		for (const a of HookedInstances) {
			a[0][a[1]] = newclr
		}
	})
}

export const HookColor = function (Property: string) {
	return (i: any) => {
		HookedInstances.push([i, Property])
	}
}
