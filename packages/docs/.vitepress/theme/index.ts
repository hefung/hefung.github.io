// .vitepress/theme/index.js
import Theme from '@aivst/vptheme'
import '@aivst/vptheme/dist/index.css'

// 导入自定义组件
import GitHubMirrorTable from './components/GitHubMirrorTable.vue'

export default {
  ...Theme,
  enhanceApp({ app }) {
    // 全局注册，md里面直接使用标签
    app.component('GitHubMirrorTable', GitHubMirrorTable)
  }
}
