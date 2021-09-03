<template>
  <div>
    <h1 :class="$style.title">Start a Group Gift</h1>
    <div :class="$style.gridCtn">
      <div :class="$style.images">
        <ImageButton
          v-for="(image, i) in images"
          :key="i"
          :active="active(i)"
          @click.native="handleImage(images[i])"
          :src="images[i].url"
        />
      </div>
      <div>
        <button @click="handleMinus">-</button>
        <input v-model="formattedCurrencyValue" @blur="focusOut" />
        <button @click="handlePlus">+</button>
        <div v-if="error">{{ error }}</div>
        <div v-else>( $25 to $10000 )</div>
        <div :class="$style.priceButtonCtn">
          <PriceButton
            v-for="(priceButton, i) in priceButtons"
            @amount="handleAmountButtonChange"
            :value="priceButtons[i]"
            :key="i"
            :active="gift.amount === priceButtons[i]"
          />
        </div>
        <FormInput label="Group Gift Name" v-model="gift.groupGiftName" />
        <FormInput label="Your Name" v-model="gift.name" />
        <FormInput label="Your Email" v-model="gift.email" />
        <ActionButton @click.native="handleContinueClick" type="continue"
          >Continue</ActionButton
        >
        <div v-if="submitError">{{ submitError }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import ImageButton from "@/components/ImageButton.vue";
import PriceButton from "@/components/PriceButton.vue";
import ActionButton from "@/components/ActionButton.vue";
import FormInput from "@/components/FormInput.vue";
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import { Gift } from "@/types";

@Component({
  components: {
    ImageButton,
    PriceButton,
    FormInput,
    ActionButton,
  },
})
export default class Start extends Vue {
  @Prop() gift!: Gift;

  error = "";

  activePriceButton: number | null = null;

  priceButtons = [100, 250, 500, 1000, 2500, 5000];

  images = [
    {
      id: 1,
      url: "/group-gift-image-1.jpeg",
    },
    {
      id: 2,
      url: "/group-gift-image-2.jpeg",
    },
    {
      id: 3,
      url: "/group-gift-image-3.jpeg",
    },
    {
      id: 4,
      url: "/group-gift-image-4.jpeg",
    },
  ];

  active(i: number): boolean {
    return this.gift.image === this.images[i];
  }

  @Watch("gift.amount")
  onPriceChanged(val: number): void {
    if (val < 25 || val > 10000) {
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.error = "";
    }
  }

  formattedCurrencyValue = "250.00";

  submitError = "";

  formatCurrency(num: number): string {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // handleActivePriceButtonChange(i: number): void {
  //   if (this.activePriceButton !== i) {
  //     this.activePriceButton = i;
  //   }
  // }

  handlePlus(): void {
    if (this.gift.amount + 25 > 10000) {
      this.gift.amount = 10000;
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.gift.amount += 25;
    }
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
    // this.activePriceButton = null;
  }

  handleMinus(): void {
    if (this.gift.amount - 25 < 25) {
      this.gift.amount = 25;
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.gift.amount -= 25;
    }
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
    // this.activePriceButton = null;
  }

  focusOut(): void {
    // remove dollar sign and commas
    this.gift.amount = parseFloat(
      this.formattedCurrencyValue.replace(/[^\d.]/g, "")
    );
    // up to next penny
    this.gift.amount = Math.ceil(this.gift.amount * 100) / 100;

    // if text only, return 0
    if (isNaN(this.gift.amount)) {
      this.gift.amount = 25;
    }

    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
  }

  handleAmountButtonChange(value: number): void {
    this.gift.amount = value;
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
  }

  handleImage(image: { url: string; id: number }): void {
    if (this.gift.image !== image) {
      this.gift.image = image;
    } else {
      this.gift.image = null;
    }
  }

  handleContinueClick(): void {
    if (this.validated) {
      this.$emit("continue");
    }
  }

  get validated(): boolean {
    let validated = false;
    if (!this.gift.image) {
      this.submitError = "Please select an image";
    } else if (
      !this.gift.groupGiftName ||
      !this.gift.name ||
      !this.gift.email
    ) {
      this.submitError = "Please fill out all fields";
    } else if (this.gift.amount < 25 || this.gift.amount > 10000) {
      this.submitError = "Value must be between $25 and $10,000";
    }
    if (
      this.gift.image &&
      this.gift.groupGiftName &&
      this.gift.name &&
      this.gift.email &&
      this.gift.amount >= 25 &&
      this.gift.amount <= 10000
    ) {
      validated = true;
    }
    return validated;
  }
}
</script>

<style module>
.title {
  font-size: 32px;
  font-weight: 300;
  margin: 0 0 30px 0;
}

.gridCtn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
}

.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;

  row-gap: 1em;
  column-gap: 1em;
}

.priceButtonCtn {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  column-gap: 1em;
  width: 90%;
  margin: 0 auto;
}
</style>
