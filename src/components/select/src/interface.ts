export type OptionsItem = {
  label: string
  value: any
  disabled?: boolean
  [propName: string]: any
}

export type Options = Array<OptionsItem>

export function getLabel(options: Options, value: string): string {
  const result =
    typeof value === 'string'
      ? options.find(item => item.value === value)
        ? (options.find(item => item.value === value) as any).label
        : ''
      : ''
  return result
}

export function getList(options: Options, value: string[]): OptionsItem[] {
  const result = Array.isArray(value)
    ? options.filter(item => value.includes(item.value))
    : []
  return result
}
