import {isArray} from './is'

type Data = Record<string, any>
type Callback<T> = (...arg: [T, number]) => void

/*递归处理树数组*/
export function handleArrData<T>(
    target: T[],
    childKey: string,
    cb: Callback<T>
): void {
    if (isArray(target) && target.length) {
        target.forEach((item, index) => {
            cb(item, index)
            ;(item as Data)[childKey] &&
            handleArrData((item as Data)[childKey], childKey, cb)
        })
    }
}
