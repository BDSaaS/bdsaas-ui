import type { App } from 'vue'
import DropDown from './src/dropDown.vue'
import DropDownMenu from './src/dropDown-menu.vue'
import DropDownMenuItem from './src/dropDown-menu-item.vue'

DropDown.install = (app: App): void => {
  app.component(DropDown.name, DropDown)
}
DropDownMenu.install = (app: App): void => {
  app.component(DropDownMenu.name, DropDownMenu)
}
DropDownMenuItem.install = (app: App): void => {
  app.component(DropDownMenuItem.name, DropDownMenuItem)
}
export { DropDownMenu, DropDownMenuItem }

export default DropDown
