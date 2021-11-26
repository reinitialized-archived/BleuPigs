local Caches = {}

return {
	LoadLibrary = function(self, Name)
		return require(script.Parent:WaitForChild(Name))
	end,
	GetLocalTable = function(self, TableName) -- Returns a cached table by TableName, generating if non-existant
		local Table = Caches[TableName]

		if not Table then
			Table = {}
			Caches[TableName] = Table
		end

		return Table
	end,
}
