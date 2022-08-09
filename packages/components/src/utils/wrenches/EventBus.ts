import Lib from './Lib'
import {UtilityFunction, UtilityMap} from './Types/utility'

export type TCallback = (...args: any[]) => any

export default class EventBus {
	public _events: UtilityMap = new Map()
	public static _instance: InstanceType<typeof EventBus>

	/**
	 * 获取EventBus实例
	 * @return {EventBus}
	 */
	public static getInstance(): InstanceType<typeof EventBus> {
		// 转换成js后需要验证实例 instanceof
		if (!(EventBus._instance && EventBus._instance instanceof EventBus)) {
			EventBus._instance = new EventBus()
		}
		return EventBus._instance
	}

	/**
	 * EventBus.getEvents
	 * @return {Map<any, any>}
	 */
	public static getEvents() {
		return EventBus.getInstance()._events
	}

	public static getEventsSize() {
		return EventBus.getInstance()._events.size
	}

	public static getEvent(name: string) {
		return EventBus.getInstance()._events.get(name)
	}

	public static hasEvent(name: string): boolean {
		return EventBus.getInstance()._events.has(name)
	}

	/**
	 *
	 * @param name
	 * @return {boolean}
	 */
	public static deleteEvent(name: string): boolean {
		EventBus.getInstance()._events.delete(name)
		return EventBus.hasEvent(name)
	}

	/**
	 * Method EventBus.setEvent
	 * @param name
	 * @param callback
	 * @return {Map<any, any>}
	 */
	public static setEvent(name: string, callback: TCallback) {
		if (EventBus.hasEvent(name)) {
			// console.warn('Event duplicate registration')
		}
		return EventBus.getInstance()._events.set(name, callback)
	}

	/**
	 * Method EventBus.on as EventBus.setEvent
	 * 绑定事件
	 * @param name
	 * @param callback
	 * @return {Map<*, *>}
	 */
	public static on(name: string, callback: TCallback) {
		if (!Lib.isFunction(callback)) {
			console.warn('The second argument to the on method must be a function')
		}
		return EventBus.setEvent(name, callback)
	}

	/**
	 * Method EventBus.emit
	 * 执行事件
	 * @param name
	 * @param payload
	 * @return {*}
	 */
	public static emit(name: string, ...payload: any[]): UtilityFunction {
		console.log('###@@@', name, ...payload)
		return EventBus.getEvent(name) ? EventBus.getEvent(name)(...payload) : () => null
	}

	/**
	 * Method EventBus.once
	 * 执行事件并关闭事件
	 * @param name
	 * @param payload
	 */
	public static once(name: string, ...payload: any[]): void {
		EventBus.emit(name, ...payload)
		EventBus.off(name)
	}

	/**
	 * EventBus.off
	 * 关闭事件
	 * @param name
	 * @return {boolean}
	 */
	public static off(name: string | string[]): boolean {
		if (Array.isArray(name)) {
			const arr = name.map(event => {
				return EventBus.off(event)
			})
			return arr.indexOf(false) < 0
		}
		if (EventBus.hasEvent(name)) {
			return EventBus.getInstance()._events.delete(name)
		}
		return false
	}
}
