// 统一类型||接口 :todo 粗糙待改
export type UtilityFunction = typeof Function
export type UtilityMap = Map<any, any>
export type UtilityWeakMap = WeakMap<object, any>
export type UtilityObject = Record<any, any>

export interface UtilityClass {
	new(...payload: any[]): any
}
