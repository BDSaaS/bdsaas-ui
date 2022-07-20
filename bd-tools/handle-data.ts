import { isArray } from './is'

type Data = Record<string, any>

/*递归处理数组数据*/
export function handleArrData<T>(
  target: T[],
  childKey: string,
  cb: (...arg: any) => any
): void {
  if (isArray(target) && target.length) {
    for (const item of target) {
      cb(item)
      ;(item as Data)[childKey] &&
        handleArrData((item as Data)[childKey], childKey, cb)
    }
  }
}
