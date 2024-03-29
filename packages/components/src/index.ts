import {App} from 'vue'

import Button from './button'
import Checkbox from './checkbox'
import BasicSelect from './basicSelect'
import Input from './input'
import Image from './image'
import Badge from './badge'
import Confirm from './confirm'
import Drawer from './drawer'
import Space from './space'
import Icon from './icon'
import DropDown, {DropDownMenu, DropDownMenuItem} from './dropDown'
import CollapseTransition from './collapse-transition'
import Form from './form'
import FormItem from './form-item'
import List from './list'
import Pagination from './pagination'
import Popover from './popover'
import Radio from './radio'
import Select, {Option} from './select'
import Switch from './switch'
import Tabs, {TabPane} from './tabs'
import Tag from './tag'
import Tooltip from './tooltip'
import Tree from './tree'
import TreeSelect from './treeSelect'
import Modal from './modal'
// 函数式组件
import Message from './message'
import Notice from './notice'

type PluginInstallFunction = (app: App) => any;

const components = [
	Button,
	Checkbox,
	BasicSelect,
	Input,
	Image,
	Badge,
	Confirm,
	Drawer,
	Space,
	Icon,
	DropDown,
	DropDownMenu,
	DropDownMenuItem,
	CollapseTransition,
	List,
	Form,
	FormItem,
	Pagination,
	Radio,
	Popover,
	Select,
	Option,
	Switch,
	Tabs,
	TabPane,
	Tag,
	Tooltip,
	Tree,
	TreeSelect,
    Modal,
]

const install = (app: App) => {
    components.forEach(comp => (comp.install as PluginInstallFunction)(app))
}

export {
	Checkbox,
	Button,
	BasicSelect,
	Input,
	Image,
	Badge,
	Confirm,
	Drawer,
	Icon,
	DropDown,
	DropDownMenu,
	DropDownMenuItem,
	CollapseTransition,
	List,
	Form,
	FormItem,
	Pagination,
	Radio,
	Popover,
	Select,
	Option,
	Switch,
	Tabs,
	TabPane,
	Tag,
	Tooltip,
	Tree,
	TreeSelect,
    Modal,
	Message,
	Notice,
}
export default {
    install,
}
