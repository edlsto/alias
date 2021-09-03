<template>
  <div :class="$style.app">
    <div :class="$style.content">
      <alias :class="$style.svg" />
      <div :class="$style.giftCtn">
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
            <input
              v-model="formattedCurrencyValue"
              @blur="focusOut"
              @focus="focusIn"
            />
            <button @click="handlePlus">+</button>
            <div v-if="error">{{ error }}</div>
            <div v-else>( $25 to $10000 )</div>

            <div>
              <PriceButton @amount="handleAmountButtonChange" :value="100" />
              <PriceButton @amount="handleAmountButtonChange" :value="250" />
              <PriceButton @amount="handleAmountButtonChange" :value="500" />
              <PriceButton @amount="handleAmountButtonChange" :value="1000" />
              <PriceButton @amount="handleAmountButtonChange" :value="2500" />
              <PriceButton @amount="handleAmountButtonChange" :value="5000" />
            </div>

            <FormInput label="Group Gift Name" v-model="gift.groupGiftName" />
            <FormInput label="Your Name" v-model="gift.name" />
            <FormInput label="Your Email" v-model="gift.email" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Home from "@/views/Home.vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import Vue from "vue";
import alias from "@/assets/alias.svg?inline";
import ImageButton from "@/components/ImageButton.vue";
import PriceButton from "@/components/PriceButton.vue";
import FormInput from "@/components/FormInput.vue";

@Component({
  components: {
    Home,
    alias,
    ImageButton,
    PriceButton,
    FormInput,
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

  @Watch("gift.amount")
  onPriceChanged(val: number): void {
    if (val < 25 || val > 10000) {
      this.error = "Value must be more than $25 or less than $10,000";
    } else {
      this.error = "";
    }
  }

  formattedCurrencyValue = "250.00";

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
  focusIn(): void {
    // this.formattedCurrencyValue = this.gift.amount.toString();
  }

  active(i: number): boolean {
    return this.gift.image === this.images[i];
  }

  handlePriceButtonClick(): void {
    console.log("lcikc");
    this.gift.amount = 100;
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
  }

  handleAmountButtonChange(value: number): void {
    this.gift.amount = value;
    this.formattedCurrencyValue = this.formatCurrency(this.gift.amount);
  }

  error = "";

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

  handleImage(image): void {
    if (this.gift.image !== image) {
      this.gift.image = image;
    } else {
      this.gift.image = null;
    }
  }
}
</script>

<style module>
.app {
  font-weight: 500;
  height: 100vh;
  width: 100vw;
  background: #f3f3f3;
  color: #2c3e50;
  overflow: auto;
}

.title {
  font-size: 32px;
  font-weight: 300;
  margin: 0 0 30px 0;
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
  -webkit-box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.23);
}

.gridCtn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
}

.images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1em;
  column-gap: 1em;
}

.priceButton {
  padding: 1em;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  margin-top: 1em;
}

input:focus + label {
  color: green;
}
</style>
