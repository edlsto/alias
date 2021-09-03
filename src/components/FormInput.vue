<template>
  <div :class="$style.ctn">
    <label
      :for="label"
      :class="[$style.label, { [$style.activeLabel]: active }]"
      >{{ label }}</label
    >
    <input
      :id="label"
      :class="$style.input"
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
    this.active = true;
  }
  handleBlur(): void {
    this.active = false;
  }
  handleChange(value: string): void {
    this.$emit("input", value);
  }
}
</script>

<style module>
.ctn {
  display: block;
  margin-top: 1.5em;
}

.label {
  display: block;
  color: lightgray;
  font-size: 12px;
  margin-bottom: 0.4em;
  font-weight: 500;
}

.activeLabel {
  color: #2c3e50;
}

.input {
  border: 1px solid lightgray;
  width: 100%;
  height: 2.5em;
  outline: none;
  padding-left: 0.5em;
}

.input:focus {
  border: 1px solid #2c3e50;
}
</style>
