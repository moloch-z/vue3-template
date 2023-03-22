<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item :key="userStore.userInfo.id">
          <user-outlined />
          {{ userStore.userInfo.userName }}
        </a-menu-item>
        <a-menu-item key="logout">
          <logout-outlined />
          {{ $t('logout') }}
        </a-menu-item>
      </a-menu>
    </template>
    <a-button>
      {{ userStore.userInfo.userName }}
      <DownOutlined />
    </a-button>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
console.log(userStore.userInfo)

function handleMenuClick(e) {
  if (e.key === 'logout') {
    userStore.logout(true)
  }
}
</script>
