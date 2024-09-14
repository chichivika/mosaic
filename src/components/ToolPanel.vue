<template>
    <div class="tool-panel">
        <PinPicker :pinShape='shape' :palette="[]"/>
        <ShapeSelect :value="shape" @change="onShapeChange"/>
        <SizeSelect :value="size" @change="onSizeChange"/>
    </div>
  </template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SizeSelect from './SizeSelect.vue';
import ShapeSelect from './ShapeSelect.vue';
import PinPicker from './pinPicker/PinPicker.vue';
import { MosaicSize, PinShape } from '@/utils/mosaicTypes';

export default defineComponent({
  name: 'tool-panel',
  emits: ['sizeChange', 'shapeChange'],
  props: {
    size: String as PropType<MosaicSize>,
    shape: {
      type: String as PropType<PinShape>,
      required: true
    }
  },
  components: {
    SizeSelect,
    ShapeSelect,
    PinPicker
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
        align-items: center;
        & > *{
            margin: 1rem 2rem 0px 2rem;
        }
    }
</style>
