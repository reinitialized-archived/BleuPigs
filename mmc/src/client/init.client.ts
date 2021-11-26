import { Players, StarterGui } from '@rbxts/services'
import Gui from './gui'

const Player = Players.LocalPlayer
const PlayerGui = Player.WaitForChild('PlayerGui') as PlayerGui

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false)

//Roact.mount(<GuiTree />, PlayerGui)

Gui.Parent = PlayerGui
