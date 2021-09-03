<template>
  <div>
    <img :src="gift.image.url" :class="$style.img" />
    <div :class="$style.textCtn">
      <div :class="$style.groupGiftName">{{ gift.groupGiftName }}</div>
      <div :class="$style.from">
        <span :class="$style.fromSpan">From:</span> {{ gift.name }}
      </div>
      <div :class="$style.groupGiftGoalCtn">
        <div :class="$style.groupGiftGoal">Group Gift Goal</div>
        <div :class="$style.amount">${{ gift.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Gift } from "@/types";

@Component
export default class Card extends Vue {
  @Prop() gift!: Gift;
}
</script>

<style module>
.img {
  width: 100%;
}

.textCtn {
  padding: 0 2em 2em;
  font-weight: 300;
}

.groupGiftGoalCtn {
  -webkit-box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 1em;
  margin-top: 2em;
}

.fromSpan {
  color: gray;
}

.groupGiftName {
  font-size: 2em;
  margin: 0.5em 0;
}

.from {
  font-size: 1.5em;
  margin: 0.5em 0;
}

.groupGiftGoal {
  color: gray;
  font-size: 1.5em;
  margin: 0.5em 0;
}

.amount {
  font-size: 2.5em;
  margin-top: 0.5em;
}
</style>
