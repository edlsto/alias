<template>
  <button :class="[$style.button, $style[type]]">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ActionButton extends Vue {
  @Prop() type!: "continue" | "back";

  created(): void {
    console.log("type", this.type);
  }
}
</script>

<style module>
.button {
  display: block;
  margin-top: 2.5em;
  width: 100%;
  cursor: pointer;
  height: 2.5em;
}

.continue {
  background: #2c3e50;
  color: white;
  font-size: 14px;
}
</style>
