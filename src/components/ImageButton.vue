<template>
  <div :class="$style.imgCtn">
    <img :src="src" :class="[$style.img, { [$style.selected]: active }]" />
    <div :class="[$style.checkCtn, { [$style.visible]: active }]">
      <div :class="$style.circle"></div>
      <check :class="$style.check" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import check from "@/assets/check.svg?inline";

@Component({
  components: {
    check,
  },
})
export default class ImageButton extends Vue {
  @Prop() active!: boolean;
  @Prop() src!: string;
  //   active = true;
}
</script>

<style module>
.imgCtn {
  position: relative;
}

.circle {
  width: 100%;
  background: white;
}

.check {
  fill: #072c4a;
}

.checkCtn {
  position: absolute;
  top: 0.4em;
  right: 0.4em;
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
  background: white;
  visibility: hidden;
}

.visible {
  visibility: visible;
}

.img {
  width: 100%;
  /* height: 100%; */
  cursor: pointer;
  border: 1px solid #f3f3f3;
  padding: 10px;
  box-sizing: border-box;
}

.selected {
  border: 4px solid #072c4a;
  padding: 7px;
}
</style>
