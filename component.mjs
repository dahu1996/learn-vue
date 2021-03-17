import {
  createApp,
  defineComponent,
} from "./node_modules/vue/dist/vue.esm-browser.js";

// const CustomModel = defineComponent({
//   name: "CustomModel",
//   props: {
//     modelValue: 0,
//   },
//   emits: ["update:modelValue"],
//   template: `
//   <button @click="() => $emit('update:modelValue', modelValue + 1)">click me</button>
//   `,
// });

const CustomModel = defineComponent({
  name: "CustomModel",
  props: {
    modelValue: 0,
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  template: `
    <input v-model="value" />
    {{modelValue}} 
  `,
});

const TheSon = {
  name: "TheSon",
  props: {
    count: 0,
  },
  components: {
    CustomModel,
  },
  data() {
    return {
      modelValue: 2,
    };
  },
  template: `<div>
    <div>The Son</div>
    <div>{{count}}</div>
    <button @click="$emit('addCount')">clickMe</button>
    <div>
      {{modelValue}}
      <custom-model v-model="modelValue"></custom-model>
    </div>
  </div>`,
};

const TheParent = {
  name: "TheParent",
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
