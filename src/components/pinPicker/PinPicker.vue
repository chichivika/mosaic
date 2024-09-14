<template>
    <div class="pin-picker">
        <ElIcon class="icon-page" @click="onPrevPage">
          <ArrowLeftBold />
        </ElIcon>
        <canvas ref='canvas'
        class='pin-picker-canvas'
        :width='canvasWidth'
        :height='canvasHeight' />
        <ElIcon class="icon-page" @click="onNextPage">
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
    },
    pageCount (): number {
      return Math.ceil(this.palette.length / this.viewPinCount);
    },
    lastPage ():number {
      return this.pageCount - 1;
    },
    enablePrevBtn ():boolean {
      return this.currPage > 0;
    },
    enableNextBtn ():boolean {
      return this.currPage < this.lastPage;
    }
  },
  methods: {
    getIndexByPage (page: number) {
      if (page === this.lastPage) {
        return this.palette.length - this.viewPinCount;
      }
      return page * this.viewPinCount;
    },
    drawViewPins () {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx === null) return;

      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      const firstInd = this.getIndexByPage(this.currPage);
      for (let i = 0; i < this.viewPinCount; ++i) {
        const paletteInd = firstInd + i;
        const indentX = i === 0 ? 0 : this.pinIndent;
        drawPin({
          ctx,
          pinShape: this.pinShape,
          pinSize: this.pinSize,
          color: this.palette[paletteInd].color,
          x: i * (this.pinSize + indentX)
        });
      }
    },
    onPrevPage () {
      if (this.currPage === 0) return;
      this.currPage--;
    },
    onNextPage () {
      if (this.currPage === this.lastPage) return;
      this.currPage++;
    }
  },
  watch: {
    currPage () {
      this.drawViewPins();
    }
  },
  updated () {
    this.drawViewPins();
  },
  mounted () {
    this.drawViewPins();
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
