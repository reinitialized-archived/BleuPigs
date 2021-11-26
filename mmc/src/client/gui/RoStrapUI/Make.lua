-- Callable Instance.new wrapper
-- @author Validark

local Resources = require(script.Parent:WaitForChild("Resources"))
local PseudoInstance = Resources:LoadLibrary("PseudoInstance")

local function Make(InstanceType)
	local function ClosureFunction(Table, ...)
		local Object = type(InstanceType) == "string"
				and (PseudoInstance.Exists(InstanceType) and PseudoInstance.new(InstanceType) or Instance.new(
					InstanceType
				))
			or InstanceType
		local Parent = Table.Parent
		local Functions = {}

		if Parent then
			Table.Parent = nil
		end

		for Property, Value in next, Table do
			if type(Property) == "number" then
				if type(Value) == "function" then
					table.insert(Functions, Value)
				elseif Value then
					Value.Parent = Object
				end
			else
				if type(Value) == "function" then
					Object[Property]:Connect(Value)
				else
					Object[Property] = Value
				end
			end
		end

		if Parent then
			Object.Parent = Parent
		end

		for _, f in pairs(Functions) do
			f(Object)
		end

		if ... then
			local Objects = { ... }
			for a = 1, #Objects do
				local Object = Make(Object:Clone())(Objects[a])
				Object.Parent = not Object.Parent and Parent
				Objects[a] = Object
			end
			return Object, unpack(Objects)
		else
			return Object
		end
	end

	return ClosureFunction
end

return Make
