<template>
  <div class="b-image">
    <!--    <img class="b-image-img" :src="imageUri" alt="">-->
    {{ imageUri }}
  </div>
</template>

<script lang="ts">
import '../style/index.less'
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: 'BImage',
  props: {
    imageUri: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
