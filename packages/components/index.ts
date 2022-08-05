import {App} from "vue"

import Button from './src/button'
import Checkbox from './src/checkbox'
import BasicSelect from './src/basicSelect'
import Input from './src/input'
import Badge from './src/badge'
import Confirm from './src/confirm'
import Drawer from './src/drawer'
import Icon from './src/icon'
import DropDown, {DropDownMenu, DropDownMenuItem} from './src/dropDown'
import CollapseTransition from './src/collapse-transition'
import List from './src/list'
import Pagination from "./src/pagination"
import Popover from "./src/popover"
import Radio from "./src/radio";
import Select, {Option} from "./src/select";
import Switch from "./src/switch";
import Tabs, {TabPane} from "./src/tabs";
import Tag from "./src/tag";
import Tooltip from "./src/tooltip";
import Tree from "./src/tree";
import TreeSelect from "./src/treeSelect";
// 函数式组件
import Message from "./src/message"
import Notice from "./src/notice"

type PluginInstallFunction = (app: App) => any;

const components = [
    Button,
    Checkbox,
    BasicSelect,
    Input,
    Badge,
    Confirm,
    Drawer,
    Icon,
    DropDown,
    DropDownMenu,
    DropDownMenuItem,
    CollapseTransition,
    List,
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
]

const install = (app: App) => {
    components.forEach(comp => (comp.install as PluginInstallFunction)(app))
}

export {
    Checkbox,
    Button,
    BasicSelect,
    Input,
    Badge,
    Confirm,
    Drawer,
    Icon,
    DropDown,
    DropDownMenu,
    DropDownMenuItem,
    CollapseTransition,
    List,
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
    Message,
    Notice,
}
export default {
    install
}