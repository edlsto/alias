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
        <h2 :class="$style.subtitle">Enter your gift's goal</h2>
        <div :class="$style.inputCtn">
          <button @click="handleMinus" :class="$style.incrementBtn">-</button>
          <input
            v-model="formattedCurrencyValue"
            @blur="focusOut"
            :class="$style.input"
          />
          <button @click="handlePlus" :class="$style.incrementBtn">+</button>
        </div>
        <div :class="$style.errorCtn">
          <div v-if="error" :class="$style.amountError">{{ error }}</div>
          <div v-else>( $25 to $10,000 )</div>
        </div>
        <div :class="$style.priceButtonCtn">
          <PriceButton
            v-for="(priceButton, i) in priceButtons"
            @amount="handleAmountButtonChange"
            :value="priceButtons[i]"
            :key="i"
            :active="gift.amount === priceButtons[i]"
          />
        </div>
        <div :class="$style.divider"></div>
        <FormInput label="Group Gift Name" v-model="gift.groupGiftName" />
        <FormInput label="Your Name" v-model="gift.name" />
        <FormInput label="Your Email" v-model="gift.email" />
        <div :class="$style.btnErrorCtn">
          <ActionButton
            @click.native="handleContinueClick"
            type="continue"
            :class="$style.actionBtn"
            >Continue</ActionButton
          >
          <div :class="$style.submitError">
            {{ submitError }}
          </div>
        </div>
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

  formattedCurrencyValue = "250.00";

  submitError = "";

  active(i: number): boolean {
    return this.gift.image === this.images[i];
  }

  formatCurrency(num: number): string {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handlePlus(): void {
    if (this.gift.amount + 25 > 10000) {
      this.gift.amount = 10000;
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.gift.amount += 25;
    }
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
  }

  handleMinus(): void {
    if (this.gift.amount - 25 < 25) {
      this.gift.amount = 25;
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.gift.amount -= 25;
    }
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
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

  @Watch("gift.amount")
  onPriceChanged(val: number): void {
    if (val < 25 || val > 10000) {
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.error = "";
    }
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
  font-weight: 300;
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
  grid-gap: 1em;
  width: 90%;
  margin: 1em auto 0;
}

.inputCtn {
  display: flex;
  justify-content: center;
  height: 48px;
  margin: 1.8em 0 1.2em;
}

.input {
  font-size: 28px;
  text-align: center;
  margin: 0 16px;
  border: 1px solid gray;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

.incrementBtn {
  background: white;
  border: 1px solid gray;
  width: 48px;
  font-size: 2em;
  color: gray;
  cursor: pointer;
}

.incrementBtn:hover {
  background: #c5d0db;
}

.subtitle {
  font-weight: 300;
  margin: 0 0 0.5em 0;
  text-align: center;
}

.errorCtn {
  text-align: center;
  font-size: 12px;
}

.divider {
  height: 1px;
  background: lightgray;
  margin-top: 2em;
}

.submitError {
  color: red;
  margin-top: 1em;
  position: absolute;
  bottom: 35px;
}

.btnErrorCtn {
  position: relative;
}

.amountError {
  color: red;
}

.actionBtn {
  margin-top: 2.5em;
}

@media screen and (max-width: 1000px) {
  .gridCtn {
    display: block;
  }

  .images {
    margin-bottom: 3em;
  }
}
</style>
