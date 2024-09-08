<template>
    <div class="tool-panel">
        <ShapeSelect :value="shape" @change="onShapeChange"/>
        <SizeSelect :value="size" @change="onSizeChange"/>
    </div>
  </template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SizeSelect from './SizeSelect.vue';
import ShapeSelect from './ShapeSelect.vue';
import { MosaicSize, PinShape } from '@/utils/mosaicTypes';

export default defineComponent({
  name: 'tool-panel',
  emits: ['sizeChange', 'shapeChange'],
  props: {
    size: String as PropType<MosaicSize>,
    shape: String as PropType<PinShape>
  },
  components: {
    SizeSelect,
    ShapeSelect
  },
  methods: {
    onSizeChange (newValue: MosaicSize) {
      this.$emit('sizeChange', newValue);
    },
    onShapeChange (newValue: PinShape) {
      this.$emit('shapeChange', newValue);
    }
  }
})
</script>
<style scoped lang="scss">
    .tool-panel{
        padding: 1rem;
        display: flex;
        justify-content: center;
        & > *{
            margin: 0 2rem;
        }
    }
</style>
