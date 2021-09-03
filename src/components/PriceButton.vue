<template>
  <div :class="[$style.ctn, { [$style.active]: active }]" @click="handleClick">
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
  @Prop() active!: boolean;

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
  border: 1px solid lightgray;
  display: flex;
  cursor: pointer;
  padding: 1em;
  /* margin-top: 1em; */
  justify-content: center;
}

.active {
  background: #2c3e50;
  color: white;
}
</style>
