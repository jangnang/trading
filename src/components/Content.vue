<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <div class="hd">
      <slot name="hd"></slot>
    </div>
    <div class="ct">
      <slot></slot>
    </div>
    <div class="ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['title'],
});
</script>
<style scoped>
.page {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.hd {
  margin-bottom: 10px;
}
.ct {
  height: 0;
  flex-grow: 1;
}
</style>
