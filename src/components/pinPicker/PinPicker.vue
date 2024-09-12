<template>
    <div class="pin-picker">
        <ElIcon class="icon-page">
          <ArrowLeftBold />
        </ElIcon>
        <canvas ref='canvas'
        class='pin-picker-canvas'
        :width='canvasWidth'
        :height='canvasHeight' />
        <ElIcon class="icon-page">
          <ArrowRightBold />
        </ElIcon>
    </div>
  </template>

<script lang="ts">
import { PinShape } from '@/utils/mosaicTypes';
import { defineComponent, PropType } from 'vue';
import { drawPin } from './methods';
import { palette } from '@/utils/mosaicTools';
import { ElIcon } from 'element-plus';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'pin-picker',
  components: {
    ElIcon,
    ArrowLeftBold,
    ArrowRightBold
  },
  props: {
    pinShape: {
      type: String as PropType<PinShape>,
      required: true
    }
  },
  data () {
    return {
      pinSize: 40,
      pinIndent: 5,
      palette,
      viewPinCount: 3,
      currPage: 0
    };
  },
  computed: {
    canvasWidth (): number {
      return this.viewPinCount * this.pinSize + (this.viewPinCount - 1) * this.pinIndent;
    },
    canvasHeight (): number {
      return this.pinSize;
    }
  },
  methods: {
    drawPin () {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx === null) return;

      drawPin({
        ctx,
        pinShape: this.pinShape,
        pinSize: this.pinSize
      });
    }
  },
  updated () {
    this.drawPin();
  },
  mounted () {
    this.drawPin();
  }
})
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    .pin-picker{
      & > * {
        display:inline-block;
        vertical-align: middle;
        cursor: pointer;
      }
      .pin-picker-canvas{
        margin: 0px 0.9rem;
      }
      .icon-page {
        color: grey;
      }
    }
  </style>
