<template>
  <Header />
  <ToolPanel :size="size"
          :shape="shape"
          @sizeChange="onSizeChange"
          @shapeChange="onShapeChange"/>
  <Board :pinShape="shape" :size="size"/>
</template>

<script lang="ts">
import 'element-plus/dist/index.css';
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Board from './components/Board.vue';
import ToolPanel from './components/ToolPanel.vue';
import { MosaicSize, PinShape } from './utils/mosaicTypes';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Board,
    ToolPanel
  },
  data () {
    return {
      size: 'm' as MosaicSize,
      shape: 'round' as PinShape
    };
  },
  methods: {
    onSizeChange (newValue: MosaicSize) {
      this.size = newValue;
    },
    onShapeChange (newValue: PinShape) {
      this.shape = newValue;
    }
  }
})
</script>

<style lang="scss">
@use './styles/colors';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  text-align: center;
  color: #2c3e50;
  background-color: colors.$bgColor;
  padding: 2rem;
  box-sizing: border-box;
}
:root{
  --el-color-primary: grey;
}
</style>
