export interface badgeProps {
  value: {
    type: [string, number]
    default: ''
  }
  max: {
    type: number
    default: 99
  }
  isDot: boolean
  hidden: boolean
  type: {
    type: string
    values: ['primary', 'success', 'warning', 'info', 'danger']
    default: 'danger'
  }
}
