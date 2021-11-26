-- Spawns a new thread without waiting one step
-- See https://github.com/roblox-ts/roblox-ts/issues/668 for reason why we create a new BindableEvent each time

local function FastSpawn(callback, ...)
	return task.spawn(callback, ...)
end

return FastSpawn
