<template>
  <div>
    <Card :class="$style.card" v-bind="{ gift }" />
    <div :class="$style.textCtn">
      <div :class="$style.success">Success!</div>
      <div :class="$style.successSubtitle">
        Your Group Gift has successfully launched
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Vue, Prop, Component } from "vue-property-decorator";
import { Gift } from "@/types";
import Card from "@/components/Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class Success extends Vue {
  @Prop() gift!: Gift;
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

.success {
  font-size: 42px;
  color: green;
}

.textCtn {
  margin: 3em 0 2em;
  font-weight: 200;
  text-align: center;
}

.successSubtitle {
  font-size: 24px;
  margin-top: 0.8em;
}
</style>
