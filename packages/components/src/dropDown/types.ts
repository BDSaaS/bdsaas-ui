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
