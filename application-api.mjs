import { createApp, h } from "./node_modules/vue/dist/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      msg: "Hello",
    };
  },
  render() {
    return h(MyComponent);
  },
  // errorCaptured: (err, vm, info) => {
  //   console.log(err);
  // },
});

// console.log(app.config);
app.config.errorHandler = (err, vm, info) => console.log(err, vm, info);

console.log(
  app.component("my-component", {
    // 返回应用实例，即app
    name: "my-component",
    mounted() {
      // setTimeout(() => {
      //   throw new Error("this is custom err");
      // }, 2000);
      console.log(this.$http);
      // throw new Error("this is custom error");
    },
    template: `<div>my-component</div>`,
  })
);
// 定义过的组件返回，组件本身
let MyComponent = app.component("my-component");

app.config.performance = true;
app.config.globalProperties.$http = () => {};

app.mount("#app");
