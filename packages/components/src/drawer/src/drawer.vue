<template>
  <transition name="b-drawer-fade" appear>
    <div
      class="b-drawer-wrapper"
      tabindex="-1"
      v-if="visible"
      @click.self="close"
      :style="{'--drawer-width': drawerWidth}"
    >
      <div class="b-drawer-container" role="document" tabindex="-1">
        <div
          aria-modal="true"
          aria-labelledby="b-drawer-title"
          :aria-label="title"
          class="b-drawer"
          :class="visible && 'b-drawer-open'"
          ref="drawer"
          role="dialog"
          tabindex="-1"
        >
          <header class="b-drawer-header" id="b-drawer-title">
            <slot name="title">
              <span role="heading" :title="title">{{ title }}</span>
            </slot>
            <div @click="close" class="b-drawer-header_close" style="cursor: pointer;font-size:18px">
              <i class="b-icon b-icon-close"> </i>
            </div>
          </header>
          <section class="b-drawer-body">
            <slot></slot>
          </section>
          <footer class="b-drawer-footer">
            <slot name="footer"> </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import "../style/index.less";
import { 
  defineComponent,
  computed,
  watch 
  } from 'vue'
export default defineComponent({
  name: 'BDrawer',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    width: {
      type: String || Number,
      default:'700px'
    }
  },
  setup(props, { emit }) {
    function close () {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose(hide);
      } else {
        hide();
      }
    }

    function hide (cancel?:Boolean) {
      if ( cancel !== false) {
        emit('update:visible', false)
      } else {

      }
    }

    watch([props.visible], newVal => {
      if ( !newVal ) {
        close()
      }
    })

    const drawerWidth = computed(() =>{
      if (/[0-9]px$/.test(props.width)) {
        return props.width
      } else if (/[0-9]\%$/.test(props.width)) {
        return props.width
      } else if (/[0-9]$/.test(props.width)) {
        return props.width + 'px'
      } else {
        return '700px'
      }
    })

    return {
      close,
      hide,
      drawerWidth
    }
  }
})
</script>
