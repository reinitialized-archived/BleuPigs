import { PseudoGuiObject } from './PseudoInstanceDefs'

interface RippleButton extends PseudoGuiObject {
	readonly TextBounds: Vector2

	TextTransparency: string

	Font: Enum.Font
	Text: string
	TextSize: number
	TextXAlignment: Enum.TextXAlignment
	TextYAlignment: Enum.TextYAlignment

	Elevation: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 9 | 12 | 16

	Disabled: boolean
	CanBeRaised: boolean
	Tooltip: string
	BorderRadius: 0 | 2 | 4 | 8
	Style: 'Flat' | 'Outlined' | 'Contained'
	PrimaryColor3: Color3
	SecondaryColor3: Color3

	OnPressed: RBXScriptSignal
	OnRightPressed: RBXScriptSignal
	OnMiddlePressed: RBXScriptSignal
}

declare const RippleButton: RippleButton

export = RippleButton
