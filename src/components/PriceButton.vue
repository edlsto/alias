<template>
  <div :class="$style.ctn" @click="handleClick">
    ${{ formatCurrency(value) }}
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class PriceButton extends Vue {
  @Prop() value!: number;

  //   active = true;
  handleClick(): void {
    this.$emit("amount", this.value);
  }

  formatCurrency(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>

<style module>
.ctn {
  padding: 1em;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  margin-top: 1em;
}
</style>
