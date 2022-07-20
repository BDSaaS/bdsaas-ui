export type ChildrenOptionsItem = {
  label: string
  value: any
}

export type OptionsItem = {
  label: string
  value: any
  disabled?: boolean
  divided?: boolean
  children?: ChildrenOptionsItem[]
  [propName: string]: any
}

export type Options = Array<OptionsItem>

export function getLabel(options: Options, value: string): string {
  const result = options.find(item => item.value === value)
    ? (options.find(item => item.value === value) as any).label
    : ''
  return result
}
