<template>
    <ElSelect :model-value="value"
        class="app-select"
        size="large"
        style="width: 100px"
        >
            <el-option
                v-for="item in sizesCatalog"
                :key="item.key"
                :label="item.label"
                :value="item.key"
        />
    </ElSelect>
  </template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MosaicSize } from '@/utils/mosaicTypes';
import { ElSelect, ElOption } from 'element-plus';
import { sizesCatalog } from '@/utils/mosaicTools';

export default defineComponent({
  name: 'select-size',
  props: {
    value: {
      type: String as PropType<MosaicSize>
    }
  },
  components: {
    ElSelect,
    ElOption
  },
  data () {
    return {
      sizesCatalog
    };
  }
})
</script>

<style scoped lang="scss">
</style>
