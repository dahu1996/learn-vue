/**
 * @File    : directive.mjs
 * @Desc    : 自定义指令
 * @Date    : 2021/03/16 08:26:11
 * @Author  : lishuhang
 * @Version : 1.0
 */

/**
 * 自定义指令作用：需要DOM元素进行底层操作
 */

import { createApp, defineComponent } from "./node_modules/vue/dist/vue.esm-browser.js";

const componentOne = defineComponent({
  data() {
    return {
      direction: "left",
      spacing: 300
    };
  },
  methods: {
    move(value) {
      this.spacing += value;
    }
  },
  template: `<div>
    <button @click="move(10)">+</button>
    <button @click="move(-10)">-</button>
    <p v-pin:[direction]="spacing">Hello</p>
    <p v-pin="spacing">Hello</p>
    <p v-pin:bottom>Hello</p>
  </div>`,
  directives: {
    "pin": (el, binding) => { // 函数简写 代表mounted update
      el.style.position = "fixed";
      const direction = binding.arg || "top";
      const spacing = binding.value || 10;
      el.style[direction] = `${spacing}px`;
    }
  }
});

const app = createApp({
  template: `
  <input v-focus/>
  <component-one />
  `
});
app.component('component-one', componentOne);
app.directive("focus", {
  // 钩子函数
  created() {
    // 在绑定元素的attribute或事件监听器被应用之前调用
  },
  beforeMount() {
    // 当指令第一次绑定到元素并在挂载父组件之前调用
  },
  mounted(el) {
    // 绑定元素的父组件被挂在后调用
    el.focus();
  },
  beforeUpdate() {
    // 更新包含组件的VNode之前调用
  },
  updated() {
    // 在包含组件的VNode及子组件的VNode更新后调用
  },
  beforeUnmount() {
    // 在卸载绑定元素的父组件之前调用
  }, 
  unmounted() {
    // 当指令与元素节点给且父组件已卸载时，只调用一次
  }
})

app.mount("#app");