import Vue from 'vue'
import {
  Pagination,
  DatePicker,
  Tree,
  Input,
  Loading,
  MessageBox,
  Notification,
  Message,
  Form,
  FormItem,
  Row,
  Col,
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Container,
  Header,
  Aside,
  Main,
  Table,
  TableColumn,
  Select,
  Option,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Radio,
  Upload,
  Dialog,
  Steps,
  Step,
  RadioGroup,
  Switch,
  Card,
  Checkbox,
  CheckboxGroup,
  Tooltip,
  Progress,
  Popover,
  Collapse,
  CollapseItem,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Tree)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Loading)
Vue.use(RadioGroup)
Vue.use(Switch)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Tooltip)
Vue.use(Progress)
Vue.use(Popover)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
