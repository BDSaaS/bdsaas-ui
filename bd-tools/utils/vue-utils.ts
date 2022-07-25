import { provide, inject, reactive, toRefs, isRef, toRaw, unref } from 'vue'
import type { Ref } from 'vue'

/*ref 一键获取原始值*/
export function getRaw<T extends object>(target: Ref<T>) {
  return isRef(target) ? toRaw(unref(target)) : toRaw(target)
}

/**
 * 绑定事件
 * @param target
 * @param type
 * @param listener
 */
export function addEvent(
  target: Element | Document,
  type: keyof DocumentEventMap,
  listener: EventListenerOrEventListenerObject
): void {
  target.addEventListener(type, listener)
}

/**
 *
 * @param target 移除事件
 * @param type
 * @param listener
 */
export function removeEvent(
  target: Element | Document,
  type: keyof DocumentEventMap,
  listener: EventListenerOrEventListenerObject
): void {
  target.removeEventListener(type, listener)
}

/**
 * 提供多个依赖
 * @param info
 */
export function provideMore(info: Record<string, any>) {
  for (const key of Object.keys(info)) provide(key, info[key])
}

/**
 * 注入多个依赖
 * @param keys
 */
export function injectMore(keys: string[]) {
  const injections: Record<string, any> = {}
  for (const key of keys) injections[key as string] = inject(key)
  return toRefs(reactive(injections))
}
