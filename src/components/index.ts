import Badge from './badge'
import BasicSelect from './basicSelect'
import Button from './button'
import Checkbox from './checkbox'
import CollapseTransition from './collapse-transition'
import Confirm from './confirm'
import Drawer from './drawer'
import DropDown, { DropDownMenu, DropDownMenuItem } from './dropDown'
import Icon from './icon'
import Input from './input'
import List from './list'
import Modal from './modal'
import Pagination from './pagination'
import Popover from './popover'
import Radio from './radio'
import Select, { Option } from './select'
import Switch from './switch'
import Tabs, { TabPane } from './tabs'
import Tag from './tag'
import Tooltip from './tooltip'
import Tree from './tree'
import TreeSelect from './treeSelect'

import Message from './message'
import Notice from './notice'

import type { App } from 'vue'

const components = [
  Badge,
  BasicSelect,
  Button,
  Checkbox,
  CollapseTransition,
  Confirm,
  Drawer,
  DropDown,
  DropDownMenu,
  DropDownMenuItem,
  Icon,
  Input,
  List,
  Modal,
  Pagination,
  Popover,
  Radio,
  Select,
  Option,
  Switch,
  Tabs,
  TabPane,
  Tag,
  Tooltip,
  Tree,
  TreeSelect
]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  Badge,
  BasicSelect,
  Button,
  Checkbox,
  CollapseTransition,
  Confirm,
  Drawer,
  DropDown,
  DropDownMenu,
  DropDownMenuItem,
  Icon,
  Input,
  List,
  Modal,
  Pagination,
  Popover,
  Radio,
  Select,
  Option,
  Switch,
  Tabs,
  TabPane,
  Tag,
  Tooltip,
  Tree,
  TreeSelect,
  Message,
  Notice
}

export default install
