<template>
  <div class="header">
    <span class="m">M </span>
    <span class="o">O </span>
    <span class="s">S </span>
    <span class="a">A </span>
    <span class="i">I </span>
    <span class="c">C</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app-header'
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header{
    font-size: 2rem;
    padding: 1rem;
    font-weight: bold;
    .m{
      color: grey;
    }
    .o{
      color: #ffae92;
    }
    .s{
      color: darkgrey;
    }
    .a{
      color: lightgrey;
    }
    .i{
      color: rgb(67, 67, 67);
    }
    .c{
      color: rgb(168, 168, 168);
    }
  }
</style>
