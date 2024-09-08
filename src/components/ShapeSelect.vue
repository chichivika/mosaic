<template>
    <ElSelect :model-value="value"
        class="app-select"
        size="large"
        style="width: 100px"
        >
            <el-option
                v-for="item in shapesCatalog"
                :key="item.key"
                :label="item.key"
                :value="item.key"
        />
    </ElSelect>
  </template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PinShape } from '@/utils/mosaicTypes';
import { ElSelect, ElOption } from 'element-plus';
import { shapesCatalog } from '@/utils/mosaicTools';

export default defineComponent({
  name: 'select-size',
  props: {
    value: {
      type: String as PropType<PinShape>
    }
  },
  components: {
    ElSelect,
    ElOption
  },
  data () {
    return {
      shapesCatalog
    };
  }
})
</script>

<style scoped lang="scss">
</style>
