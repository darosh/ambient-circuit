export enum ParameterType {
	Number = 0,
	Bang = 1,
	List = 2,
	Signal = 3,
	Count = 4,
	Enum = 5
}

export enum ParameterNotificationSetting {
	All = 0,
	Internal = 1
}

// Deprecated aliases (minified names from original bundle)
export { ParameterType as r, ParameterNotificationSetting as E }
