<template>
  <canvas ref='canvas'
  class='app-board'
  width=500
  height=500
  @mousemove="onHover"
  @mouseleave="onMouseLeave"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PinShape, MosaicSize, Matrix, Points, Point } from '../utils/mosaicTypes'
import { emptyColor, hoverColor } from '@/utils/mosaicColors';

const pinPadding = 2;

export default defineComponent({
  name: 'app-board',
  props: {
    pinShape: {
      required: false,
      type: String as PropType<PinShape>,
      value: 'round'
    },
    size: {
      required: false,
      type: String as PropType<MosaicSize>,
      value: 's'
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
      return 500
    },
    pinsCount (): number {
      return 10
    },
    pinsSize (): number {
      return this.canvasWidth / this.pinsCount;
    },
    pins (): Matrix {
      const matrix: Matrix = [];
      const size = this.pinsSize;

      for (let i = 0; i < this.pinsCount; ++i) {
        const row: Points = []
        for (let j = 0; j < this.pinsCount; ++j) {
          row.push([i * size, j * size])
        }
        matrix.push(row)
      }
      return matrix
    }
  },
  methods: {
    onHover (event: MouseEvent) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.selectedCol = Math.trunc(mouseX / this.pinsSize);
      this.selectedRow = Math.trunc(mouseY / this.pinsSize);
    },
    onMouseLeave () {
      this.selectedCol = -1;
      this.selectedRow = -1;
    },
    redrawBoard () {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx === null) return;

      ctx.fillStyle = emptyColor;
      ctx.strokeStyle = hoverColor;

      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.pins.forEach((row: Points, i: number) => {
        row.forEach((cell: Point, j: number) => {
          const cx = cell[1] + this.pinsSize / 2;
          const cy = cell[0] + this.pinsSize / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, this.pinsSize / 2 - pinPadding, 0, 2 * Math.PI);
          ctx.fill();

          if (i === this.selectedRow && j === this.selectedCol) {
            ctx.stroke();
          }
        })
      })
    }
  },
  watch: {
    selectedCol () {
      this.redrawBoard();
    },
    selectedRow () {
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
}
</style>
