import Roact from '@rbxts/roact'
import { Players, StarterGui } from '@rbxts/services'
import GuiTree from './gui'

const Player = Players.LocalPlayer
const PlayerGui = Player.WaitForChild('PlayerGui') as PlayerGui

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false)

Roact.mount(GuiTree, PlayerGui)
