<template>
  <div>
    <img :src="gift.image.url" />
    {{ gift.groupGiftName }}
    From: {{ gift.name }}
    Group gift goal
    {{ gift.amount }}
    <div>Success!</div>
    <div>Your Group Gift has successfully launched</div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Vue, Prop, Component } from "vue-property-decorator";
import { Gift } from "@/types";

@Component({
  components: {},
})
export default class Success extends Vue {
  @Prop() gift!: Gift;
}
</script>

<style module></style>
