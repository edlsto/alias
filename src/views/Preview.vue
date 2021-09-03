<template>
  <div>
    <img :src="gift.image.url" />
    {{ gift.groupGiftName }}
    From: {{ gift.name }}
    Group gift goal
    {{ gift.amount }}
    <button @click="handleBackClick">Back</button>
    <button @click="handleLaunchClick">Launch Group Gift</button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import { Gift } from "@/types";

@Component({
  components: {},
})
export default class Preview extends Vue {
  @Prop() gift!: Gift;

  handleBackClick(): void {
    this.$emit("back");
  }

  handleLaunchClick(): void {
    this.$emit("continue");
  }
}
</script>

<style module></style>
