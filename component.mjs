import { createApp, defineComponent } from "vue/dist/vue.esm-browser";

const TheSon = {
  name: "Son",
  props: {
    count: 0,
  },
  template: `<div>
    <div>The Son</div>
    <div>{{count}}</div>
    <button @click="$emit('addCount')">clickMe</button>
  </div>`,
};

const TheParent = {
  name: "Parent",
  components: {
    TheSon,
  },
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    incrementCount() {
      this.count += 1;
    },
  },
  template: `<div>
    <div>The Parent</div>
    <the-son :count="count" @add-count="incrementCount"></the-son>
  </div>`,
};

const dynamicComponentOne = defineComponent({
  template: `<p>this is dynamic component one</p>`,
});
const dynamicComponentTwo = defineComponent({
  template: `<p>this is dynamic component two</p>`,
});
const dynamicComponentThree = defineComponent({
  template: `<p>this is dynamic component three</p>`,
});
const app = createApp({
  data() {
    return {
      currentComponent: "dynamic-component-one",
    };
  },
  methods: {
    changeTabComponent(componentName) {
      this.currentComponent = componentName;
    },
  },
  template: `
  <the-parent></the-parent>
  <div>
    <button @click="changeTabComponent('dynamic-component-one')">dynamic one</button>
    <button @click="changeTabComponent('dynamic-component-two')">dynamic one</button>
    <button @click="changeTabComponent('dynamic-component-three')">dynamic one</button>
    <component :is="currentComponent"></component>
  </div>
  `,
});
app.component("the-parent", TheParent);
app.component("dynamic-component-one", dynamicComponentOne);
app.component("dynamic-component-two", dynamicComponentTwo);
app.component("dynamic-component-three", dynamicComponentThree);
// app.component("the-son", TheSon);
app.mount("#app");
