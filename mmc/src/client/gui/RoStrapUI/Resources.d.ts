import PseudoInstance from './PseudoInstance'

interface Resources {
	LoadLibrary(name: 'PseudoInstance'): PseudoInstance
	LoadLibrary(name: string): any
}

declare const Resources: Resources

export = Resources
