import {
  createApp,
  defineComponent,
  ref,
  toRef,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  getCurrentInstance,
  provide,
  inject,
  h,
} from "./node_modules/vue/dist/vue.esm-browser.js";

const commonKey = Symbol();

const TheSon = defineComponent({
  name: "TheSon",
  setup() {
    const commonValue = inject(commonKey);
    console.log(commonValue);
    onMounted(() => console.log("the son component mounted"));
    return () => h("div", null, commonValue);
  },
});

const TheParent = defineComponent({
  name: "TheParent",
  components: {
    TheSon,
  },
  setup() {
    return () => h(TheSon);
  },
});

const app = createApp({
  name: "App",
  /**
   * 在创建组件之前执行
   * props
   * context
   */
  setup(props, { attrs, slots, emit }) {
    // getCurrentInstance只能在setup或life hooks中
    const instance = getCurrentInstance();
    // 声明周期
    // beforeCreated created声明周期合并为了setup
    // 1. 通过global variable拿到当前的instance，获取instance挂载的hooks array
    // 2. 拿到对应声明周期的对hook函数进行包装（当前回调函数，instance，hooks type），主要作用就是异步函数错误处理
    // 3、将wrapperHook推入hooks array中
    onMounted(() => {
      // 组件的mounted hooks要早于父组件？
      console.log("the app mounted");
    });
    provide(commonKey, "HelloWorld");
    return {};
  },
  template: `
  <div>
    <the-parent />
  </div>
  `,
});

app.component("the-parent", TheParent);

app.mount("#app");
