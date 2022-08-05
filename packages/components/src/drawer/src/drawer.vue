<template>
  <transition name="b-drawer-fade" appear>
    <div
      class="b-drawer-wrapper"
      tabindex="-1"
      v-if="visible"
      @click.self="hide"
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
            <div @click="hide" style="cursor: pointer;">关闭按钮</div>
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
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BDrawer',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    function hide() {
      emit('update:visible', false)
    }

    return {
      hide
    }
  }
})
</script>
