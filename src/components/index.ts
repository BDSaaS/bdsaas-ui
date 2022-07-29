import Button from './button'
import Checkbox from './checkbox'
import List from './list'
import Input from './input'
import Select, { Option } from './select'
import Tree from './tree'
import TreeSelect from './treeSelect'
import Icon from './icon'
import DropDown, { DropDownMenu, DropDownMenuItem } from './dropDown'
import Tabs from './tabs'
import Drawer from './drawer'
import type { App } from 'vue'

const components = [
  Button,
  Checkbox,
  List,
  Input,
  Select,
  Option,
  Tree,
  TreeSelect,
  Icon,
  DropDown,
  DropDownMenu,
  DropDownMenuItem,
  Tabs,
  Drawer
]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  Button,
  Checkbox,
  List,
  Input,
  Select,
  Option,
  Tree,
  TreeSelect,
  Icon,
  DropDown,
  DropDownMenu,
  DropDownMenuItem,
  Tabs,
  Drawer
}

export default install
