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
}
</script>

<style module>
.button {
  display: block;
  width: 100%;
  cursor: pointer;
  height: 2.5em;
}

.button:hover {
  background: #080d12;
}

.button.back:hover {
  background: #8b9db0;
}

.continue {
  background: #2c3e50;
  color: white;
  font-size: 14px;
}

.back {
  background: white;
  color: #2c3e50;
  font-size: 14px;
}
</style>
