<template>
  <canvas ref='canvas' class='app-board' width=500 :height=500 @mousemove="onHover" @mouseleave="onMouseLeave" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PinShape, MosaicSize } from '../utils/mosaicTypes'
import Mosaic from '@/utils/mosaicClass';

const sizeSettings = {
  xs: 100,
  s: 60,
  m: 50,
  l: 40
}

export default defineComponent({
  name: 'app-board',
  props: {
    pinShape: {
      required: false,
      type: String as PropType<PinShape>,
      default: 'round'
    },
    size: {
      required: false,
      type: String as PropType<MosaicSize>,
      default: 'm'
    }
  },
  data: () => ({
    selectedCol: -1,
    selectedRow: -1
  }),
  computed: {
    canvasWidth (): number {
      return 500;
    },
    canvasHeight (): number {
      return 500;
    },
    pinsSize (): number {
      return sizeSettings[this.size];
    },
    mosaicObject (): Mosaic {
      return new Mosaic({
        width: this.canvasWidth,
        height: this.canvasHeight,
        pinShape: this.pinShape,
        pinSize: this.pinsSize
      });
    }
  },
  methods: {
    onHover (event: MouseEvent) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const [row, col] = this.mosaicObject.getCellIndsByMouse(mouseX, mouseY);
      this.selectedCol = col;
      this.selectedRow = row;
    },
    onMouseLeave () {
      this.selectedCol = -1;
      this.selectedRow = -1;
    },
    redrawBoard () {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx === null) return;

      this.mosaicObject.drawBoard({
        ctx,
        selectedCol: this.selectedCol,
        selectedRow: this.selectedRow
      });
    }
  },
  watch: {
    selectedCol () {
      this.redrawBoard();
    },
    selectedRow () {
      this.redrawBoard();
    },
    pinShape () {
      this.redrawBoard();
    },
    size () {
      this.redrawBoard();
    }
  },
  mounted (): void {
    this.redrawBoard();
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-board {
  cursor: pointer;
  margin: 1rem;
}
</style>
