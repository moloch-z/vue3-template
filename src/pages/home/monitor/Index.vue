<template>
  <div class="monitor-wrap flex-c">
    <div class="flex-1">
      <Hdr img-url="/hdr/1.hdr" />
    </div>
    <div class="flex-1">
      <Sphere :img-url="SphereUrl2" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import SphereUrl2 from '@/assets/img/2.webp'
</script>
<style lang="less" scoped>
.monitor-wrap {
  height: 100%;
}
</style>
