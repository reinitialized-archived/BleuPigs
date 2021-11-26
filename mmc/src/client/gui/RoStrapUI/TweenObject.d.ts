export interface TweenObject {
	Running: boolean

	Resume(): void
	Stop(): void
	Wait(): void
	Restart(): void
}
