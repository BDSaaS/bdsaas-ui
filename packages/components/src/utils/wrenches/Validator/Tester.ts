import Lib from '../Lib'

type TRuleName = 'required' | 'max' | 'min' | 'phone' | 'email' | 'type'

/**
 * Class Tester
 * 测试类：使用方式 Tester.validate(rules,value)
 * 测试类主要场景是测试
 * [{required,trigger:''}]
 */
export default class Tester {
	static _checkTypes = [
		'required',
		'max',
		'min',
		'phone',
		'email',
		'type',
	]

	/**
	 * Tester.validate
	 * 单个验证
	 * @param {Object|Array<Object>} rules
	 * @param value 校验值
	 * @return {(*|Object|Array<Object>)[]|*[]|*|Object|Array<Object>}
	 */
	static validate(rules: Record<any, any>[], value: unknown) {
		// 获取单元测试结果
		const validate = Tester.test(rules, value)
		// 所有结果均以数据格式返回
		if (Array.isArray(validate)) {
			return validate
		}
		return validate ? [validate] : []
	}

	/**
	 * Tester.test
	 * 测试单元
	 * @param {Object|Array<Object>} rules
	 * @param value
	 */
	static test(rules: Record<any, any>[] | Record<any, any>, value: unknown): any {
		// console.log('%%%%%%%%%%%%%%', rules, value)
		if (Array.isArray(rules)) {
			return rules.filter(rule => {
				return Tester.test(rule, value)
			})
		}
		if (!Lib.isObject(rules)) {
			throw new Error('Validation rules must be objects.')
		}
		// 真实规则
		const ruleNames = Object.keys(rules).filter((key) => {
			return Tester._checkTypes.indexOf(key) >= 0
		})
		// 同一规则多条件验证一次
		const validate = ruleNames.some(ruleName => {
			// @ts-ignore :todo 暂不解决
			return !Tester[ruleName](value, rules[ruleName])
		})
		if (validate) {
			return rules
		}
	}

	/**
	 * Tester.required
	 * 校验必填项不得为空 | 包含 {} [] null undefined ''
	 * @param value
	 * @param {boolean} ruleValue
	 * @return {boolean}
	 */
	static required(value: unknown, ruleValue = true): boolean {
		return !Lib.isEmpty(value)
	}

	/**
	 * Tester.max
	 * 校验数字||字符串长度最大值（包含）
	 * @param value
	 * @param ruleValue
	 * @return {boolean}
	 */
	static max(value: unknown, ruleValue: number | string): boolean {
		if (Lib.isNumber(value)) {
			return ruleValue >= value
		} else if (Lib.isString(value)) {
			return ruleValue >= value.length
		}
		return false
	}

	/**
	 * Tester.min
	 * 校验数字||字符串长度最小值（包含）
	 * @param value
	 * @param ruleValue
	 * @return {boolean}
	 */
	static min(value: unknown, ruleValue: number | string): boolean {
		if (Lib.isNumber(value)) {
			return ruleValue <= value
		} else if (Lib.isString(value)) {
			return ruleValue <= value.length
		}
		return false
	}

	/**
	 * Tester.phone
	 * 检查手机格式
	 * @param value
	 * @param {boolean} ruleValue
	 * @return {boolean}
	 */
	static phone(value: unknown, ruleValue = true): boolean {
		return Lib.isPhone(value, ruleValue)
	}

	/**
	 * Tester.email
	 * 检查邮箱格式
	 * @param value
	 * @param {boolean} ruleValue
	 * @return {boolean}
	 */
	static email(value: unknown, ruleValue = true): boolean {
		return Lib.isEmail(value, ruleValue)
	}
}
