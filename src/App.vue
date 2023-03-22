<template>
  <a-config-provider :locale="getLocale(i18nStore.locale.key)">
    <router-view />
  </a-config-provider>
</template>
<script lang="ts" setup>
import { getLocale } from '@/i18n'
import { useI18nStore } from '@/store'
const i18nStore = useI18nStore()
</script>
