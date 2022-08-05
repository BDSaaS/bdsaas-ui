import dropDown from './src/dropDown.vue'
import dropDownMenu from './src/dropDown-menu.vue'
import dropDownMenuItem from './src/dropDown-menu-item.vue'
import type {App, Plugin} from "vue"

type SFCWithInstall<T> = T & Plugin
const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    //注册组件
    app.component((comp as any).name, comp)
  }
  return comp as SFCWithInstall<T>
}
const DropDown = withInstall(dropDown)
const DropDownMenu = withInstall(dropDownMenu)
const DropDownMenuItem = withInstall(dropDownMenuItem)
export { DropDownMenu, DropDownMenuItem }
export default DropDown
