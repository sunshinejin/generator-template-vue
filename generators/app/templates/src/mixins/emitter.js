
function broadcast (componentName, eventName, params) {
  // 循环获取当前实例的直接子组件
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) {
      // 当前子组件触发一个自定义事件，参数是数组
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // 迭代里边child的子组件是否有符合要求的
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {

  methods: {

    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root

      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },

    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
