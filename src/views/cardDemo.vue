<template>
  <div>
    <b-card
      shadow="never"
      :isHeaderBorder="true"
      title="我是标题头"
      width="400"
    >
      <!--    <template v-slot:header>-->
      <!--      <div>THIS IS MY HEAD</div>-->
      <!--    </template>-->
      <template v-slot:main>
        <div>THIS IS MY BODY</div>
      </template>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import BCard from '@/components/bcard/src/card.vue'
</script>
