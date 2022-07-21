import button from './button'
import checkbox from './checkbox'
import list from './list'
import input from './input'
import select, { Option } from './select'
import Icon from './icon'
import DropDown, { DropDownMenu, DropDownMenuItem } from './dropDown'
import Drawer from './drawer'
import type { App } from 'vue'

const components = [
  button,
  checkbox,
  list,
  input,
  select,
  Option,
  Icon,
  DropDown,
  DropDownMenu,
  DropDownMenuItem,
  Drawer
]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export default install
