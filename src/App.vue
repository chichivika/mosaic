<template>
  <Header />
  <ToolPanel/>
  <Board pinShape="round" size="s"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Board from './components/Board.vue';
import ToolPanel from './components/ToolPanel.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Board,
    ToolPanel
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
</style>
