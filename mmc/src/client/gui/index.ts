import ScreenGui from './ScreenGui'
import SectionController, { SectionCardsContainer } from './Sections'

for (const [i, section] of ipairs(SectionController.Sections)) {
	section.Container.Parent = SectionCardsContainer
	section.Container.Visible = i === SectionController.CurrentSection + 1
}

SectionCardsContainer.Parent = ScreenGui.Background.Scroll.Container.SectionCards

export default ScreenGui
