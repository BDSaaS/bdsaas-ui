import Lib from '../Lib'
import Tester from './Tester'
import EventBus from '../EventBus'
import {UtilityFunction, UtilityWeakMap} from '../Types/utility'
import {string} from 'fast-glob/out/utils'

export interface IValidator {
	_rules: UtilityWeakMap
}

export type TValidatorRules = {}
export type TRules = Record<string, any>
export type TCallback = (...args: any[]) => any
export type TCallbackBoolean = (...args: any[]) => boolean

export default class Validator implements IValidator {
	public _rules: UtilityWeakMap = new WeakMap()
	static _instance: InstanceType<typeof Validator>

	/**
	 * Method getRules
	 * @param {Object} name
	 * @return {Object|Array}
	 */
	static getRules(name: any) {
		return Validator.getInstance()._rules.get(name) || {}
	}

	/**
	 * Method setRules
	 * @param {Object|Array} rules
	 */
	static setRules(rules: TRules) {
		if (!Lib.isObject(rules)) {
			throw new Error('The rules must be a Object')
		}
		Validator.getInstance()._rules.set(rules, rules)
	}

	/**
	 * Method deleteRules
	 * @param rules
	 */
	static deleteRules(rules: TRules) {
		Validator.getInstance()._rules.delete(rules)
	}

	/**
	 * Method register
	 * 验证器在使用时需先注册
	 * @param {Object|Array} rules 验证规则
	 */
	static register(rules: TRules) {
		Validator.setRules(rules)
	}

	/**
	 * Validator.validate
	 * 验证方法
	 * @param {Object} rules
	 * @param {Object} detectionData
	 * @param {Function|*} callback
	 * @return {boolean} true 通过验证 | false 验证失败
	 */
	static validate(rules: TRules, detectionData: Record<string, any>, callback?: TCallbackBoolean) {
		if (!Lib.isObject(rules) || !Lib.isObject(detectionData)) {
			throw new Error('Rules and detection data must be objects')
		}
		// console.log('rules, detectionData, callback', rules, detectionData, callback)
		// 规则Keys
		const rulesKeys = Object.keys(rules)
		// 校验Keys
		const detectionDataKeys = Object.keys(detectionData)
		// 匹配到的规则
		const realRulesKeys: string[] = []
		rulesKeys.map((key) => {
			if (detectionDataKeys.includes(key)) {
				realRulesKeys.push(key)
			}
		})
		// 处理匹配规则的校验
		const checkRules = realRulesKeys.map(key => {
			const name = Validator.createEventBusName(key, rules)
			const tester = Tester.validate(rules[key], detectionData[key])
			const error = tester[0] ? tester[0].message : ''
			EventBus.emit(name, {error})
			return tester.length === 0
		})
		// 校验结果
		const validate = checkRules.every(Boolean)
		// 通过回调
		if (Lib.isFunction(callback)) {
			callback(validate)
		}
		return validate
	}

	/**
	 * Validator.createEventBusName
	 * 创建唯一的 EventBus全局名称
	 * @param field
	 * @param rules
	 * @return {string}
	 */
	static createEventBusName(field: string, rules: TRules) {
		const base64 = encodeURIComponent(JSON.stringify(rules))
		return `${field}-${base64}`
	}

	/**
	 * Validator.eventOn
	 * @param {Object|Array} rules
	 * @param {String} field
	 * @param {Function} callback
	 */
	static eventOn(rules: TRules, field: string, callback: TCallback) {
		const name = Validator.createEventBusName(field, rules)
		EventBus.on(name, callback)
	}

	/**
	 * EventBus.emit
	 * @param {Object|Array} rules
	 * @param {String} field
	 * @param {String|Number|Object} value
	 * @param {String} trigger 事件名称
	 * @return {*}
	 */
	static eventEmit(rules: TRules, field: string, value: unknown, trigger: string): any {
		// 未设置规则和字段
		if (Lib.isEmpty(rules) || Lib.isEmpty(field)) {
			return
		}
		const name = Validator.createEventBusName(field, rules)
		const tester = Tester.validate(rules[field], value)
		const error = tester[0] ? tester[0].message : ''
		const eventTrigger = tester[0] ? tester[0].trigger : ''
		if (trigger && trigger === eventTrigger) {
			return EventBus.emit(name, {error, trigger})
		}
		return EventBus.emit(name, {error: ''})
	}

	/**
	 * EventBus.eventEmitError
	 * 推送一个错误
	 * 使用场景非统一验证，
	 * @param rules
	 * @param field
	 * @param error
	 * @return {*}
	 */
	static eventEmitError(rules: TRules, field: string, {error}: { error: String }) {
		const name = Validator.createEventBusName(field, rules)
		return EventBus.emit(name, {error})
	}

	/**
	 * 获取Validator实例
	 * @return {Validator}
	 */
	static getInstance() {
		// 转换成js后需要验证实例 instanceof
		if (!(Validator._instance && Validator._instance instanceof Validator)) {
			Validator._instance = new Validator()
		}
		return Validator._instance
	}
}
