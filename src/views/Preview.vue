<template>
  <div>
    <Card :class="$style.card" v-bind="{ gift }" />
    <div :class="$style.btnCtn">
      <ActionButton
        @click.native="handleBackClick"
        type="back"
        :class="$style.actionBtn"
        >Back</ActionButton
      >
      <ActionButton
        @click.native="handleLaunchClick"
        type="continue"
        :class="$style.actionBtn"
        >Launch Group Gift</ActionButton
      >
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Vue, Prop, Component } from "vue-property-decorator";
import { Gift } from "@/types";
import Card from "@/components/Card.vue";
import ActionButton from "@/components/ActionButton.vue";
import axios from "axios";

@Component({
  components: {
    Card,
    ActionButton,
  },
})
export default class Preview extends Vue {
  @Prop() gift!: Gift;

  handleBackClick(): void {
    this.$emit("back");
    console.log("back");
  }

  async handleLaunchClick(): Promise<void> {
    try {
      // await axios.post("/a/v1/gift", this.gift);
      this.$emit("continue");
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style module>
.card {
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
  -webkit-box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
}

.btnCtn {
  width: 500px;
  margin: 2.5em auto 0;
}

.actionBtn:last-child {
  margin-top: 1em;
}
</style>
