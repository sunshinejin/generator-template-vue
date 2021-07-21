<template>

    <button :class="'BaseButton-size'+size"  v-text="change"  :disabled="disabled" @click="handleClick">
        <slot>测试</slot>
        <slot name="icon"></slot>
        kg
    </button>

</template>

<script>

  function oneOf(value, validList) {

    for (let i = 0; i < validList.length; i++) {

      if (value === validList[i]) {

        return true

      }

    }

    return false

  }


  export default {
    name: "BaseButton",
    props: {

      size: {

        validator: function (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },

      disabled: {
        type: Boolean,
        default: false
      }

    },

    inject: ['name'],

    data() {
      return {
        title: "aaaa",
        change: "aaaa1111111111",
      }
    },

    methods: {

      handleClick (event) {

        this.$bus.$emit("on-click",1)

      }

    },

    mounted  () {

      console.log(this.name);

    }

  }
</script>

<style scoped lang="less">

</style>