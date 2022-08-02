import '../src/assets/css/base.less'
import '../src/assets/css/common.less'

import type { App } from 'vue'
import BBadge from './badge'
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

const components = [
  BBadge,
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

const install = (app: App): void => {
  components.forEach(component => app.component(component.name, component))
}

export {
  BBadge,
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

export default {
  install
}
