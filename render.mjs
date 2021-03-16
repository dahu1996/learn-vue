/**
 * @File    : render.mjs
 * @Desc    : 渲染函数
 * @Date    : 2021/03/16 09:05:42
 * @Author  : lishuhang
 * @Version : 1.0
 */

import { createApp, h } from './node_modules/vue/dist/vue.esm-browser.js';

const app = createApp({
  template: `
  <div>Hello</div>
  <anchored-heading level=2>HelloWorld</anchored-heading>
  `
});

app.component('anchored-heading', {
  props: {
    level: Number
  },
  render() {
    return h(
      `h${this.$props.level}`,
      {},
      this.$slots.default()
    );
  },
})

app.mount('#app');