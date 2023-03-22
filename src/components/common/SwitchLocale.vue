<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item v-for="item in lacaleList" :key="item.key">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>
    <a-button>
      {{ i18nStore.locale.name }}
      <DownOutlined />
    </a-button>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { lacaleList } from '@/i18n'
import { useI18nStore } from '@/store'
const i18nStore = useI18nStore()

function handleMenuClick(e) {
  i18nStore.changeLocale(lacaleList.filter(item => item.key === e.key)[0])
}
</script>
