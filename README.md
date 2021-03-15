# learn vue

## vue入门

### 声明周期

在**初始化阶段**即页面初始化时，vue只会触发`beforeCreate`, `created`, `beforeMount`, `mounted` 钩子。

在`create`阶段只用vue只完成了数据初始化（观测），属性和方法的运算，初始化事件，`DOM`渲染在`mounted`执行之前完成。

* 初始化：beforeCreate、created、beforeMount、mounted
* 更新：beforeUpdate、updated
* 销毁：beforeDestroy、destroyed
* 其他：activate、deactivad、errorCaptured

