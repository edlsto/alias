<template>
  <div :class="$style.ctn">
    <label
      :for="label"
      :class="[$style.label, { [$style.activeLabel]: active }]"
      >{{ label }}</label
    >
    <input
      :id="label"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="{ value }"
      @input="handleChange($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FormInput extends Vue {
  @Prop() value!: number;
  @Prop() label!: string;

  active = false;

  handleFocus(): void {
    console.log("focused");
    this.active = true;
  }
  handleBlur(): void {
    console.log("blur");
    this.active = false;
  }
  handleChange(value: string): void {
    console.log("here");
    this.$emit("input", value);
  }
}
</script>

<style module>
.ctn {
  display: block;
  margin-top: 1em;
}

.label {
  display: block;
}

.activeLabel {
  color: green;
}
</style>
