<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <span v-if="!collapsed">Middle Office</span>
        <img v-else src="@/assets/img/logo.jpg" alt="logo" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleClick">
        <a-menu-item key="Home">
          <home-outlined />
          <span>3d</span>
        </a-menu-item>
        <a-menu-item key="List">
          <unordered-list-outlined />
          <span>list</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0 0 0 20px; background: #fff">
        <div class="flex">
          <div class="flex-1">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>
          <div class="header-right">
            <SwitchLocale />
            <SwitchLogin />
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import router from '@/router'
const selectedKeys = ref<string[]>(['Home'])
const collapsed = ref<boolean>(false)

function handleClick(e) {
  router.push({ name: e.key })
}
</script>
<style lang="less" scoped>
.logo {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  font-size: 20px;
  color: #fff;

  img {
    width: 100%;
    height: 50px;
  }
}

.header-right {
  padding-right: 20px;
}
</style>
