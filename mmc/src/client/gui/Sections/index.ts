import SectionController from './SectionController'
import Section1 from './Section1'
import Section2 from './Section2'
import ScreenGui from '../ScreenGui'
import Make from '../RoStrapUI/Make'

SectionController.Sections.push(Section1, Section2)

const SectionCardsContainer = Make('Frame')({
	AutomaticSize: Enum.AutomaticSize.Y,
	BackgroundTransparency: 1,
	Size: new UDim2(1, 0, 0, 0),
})

export { SectionCardsContainer }
export default SectionController
