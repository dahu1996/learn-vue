import {
  createApp,
  onMounted,
  reactive,
  watchEffect,
  isProxy,
  isReactive,
  shallowReactive,
  ref,
  isRef,
  toRef,
} from "./node_modules/vue/dist/vue.esm-browser.js";

const app = createApp({
  setup() {
    const obj = reactive({
      foo: {
        bar: "baz",
      },
    });
    const obj1 = shallowReactive({
      // 创建响应式对象，只跟踪其自身property响应性，不执行嵌套对象的深层响应转换
      foo: 1,
      nested: {
        bar: 2,
      },
    });
    // ref 接受一个内部值并返回一个响应式且可变的ref对象
    const value1 = ref("hello");
    // toRef 根据某个响应式对象的property建立ref对象
    const fooRef = toRef(obj1, "foo");

    // 对object类型 vue内部 也会转化为 reactive对象
    const obj2 = ref({ name: "Hello" });

    watchEffect(
      () => {
        // console.log(obj.foo.bar);
        // console.log(obj1.nested.bar);
        // console.log(obj1.foo);
        // console.log(isRef(obj1.foo), isRef(fooRef));
        console.log(obj2.value.name);
      },
      {
        onTrack(e) {
          console.log(e);
        },
        onTrigger(e) {
          console.log(e);
        },
      }
    );
    onMounted(() => {
      // const { foo } = obj;
      // console.log(isProxy(foo), isReactive(foo), isReactive(obj1.nested));
      // setTimeout(() => (foo.bar = "bnn"), 2000);
      // setTimeout(() => (obj1.nested.bar = 3), 3000);
      // setTimeout(() => obj1.foo++, 3000);
      // obj.foo = "bar";
      setTimeout(() => (obj2.value.name = "hello world"), 2000);
    });

    return {
      obj,
      value1,
    };
  },
  template: `<div>{{obj}}</div>`,
});

app.mount("#app");
