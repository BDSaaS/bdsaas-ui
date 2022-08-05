# BDSaas UI

## 使用

```typescript
import App from './App.vue'
import {createApp} from 'vue'
import BdUI from 'packages/components/index'
import 'bdsaas-ui/es/style/index.css'

createApp(App).use(BdUI).mount('#app')
```

.vue 中
```vue
    <b-button type="primary">Hello</b-button>
    <b-checkbox v-model="checked" />
```

## 按需加载
```vue
import { Button } from 'bdsaas-ui'

<Button type="primary">World</Button>
```