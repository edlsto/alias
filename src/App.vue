<template>
  <div :class="$style.app">
    <div :class="$style.content">
      <alias :class="$style.svg" />
      <div :class="$style.giftCtn">
        <transition name="component-fade" mode="out-in">
          <component
            :is="flow[step]"
            v-bind="{ gift }"
            @continue="step++"
            @back="step--"
          ></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import alias from "@/assets/alias.svg?inline";

import Start from "@/views/Start.vue";
import Preview from "@/views/Preview.vue";
import Success from "@/views/Success.vue";

@Component({
  components: {
    alias,
    Start,
    Preview,
    Success,
  },
})
export default class App extends Vue {
  gift = {
    image: null,
    groupGiftName: "",
    amount: 250,
    name: "",
    email: "",
  };

  flow = ["Start", "Preview", "Success"];
  step = 0;
}
</script>

<style module>
.app {
  font-weight: 500;
  height: 100vh;
  width: 100vw;
  background: #f3f3f3;
  /* color: #2c3e50; */
  overflow: auto;
}

.svg {
  height: 4em;
  margin-bottom: 2em;
}

.content {
  max-width: 1200px;
  width: 90%;
  margin: 100px auto 0;
  /* padding-top: 100px; */
}

.giftCtn {
  background: white;
  padding: 2em;
  -webkit-box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.23);
}
</style>
