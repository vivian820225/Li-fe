<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <Loading :active.sync="isLoading" />
    <StepsBar :steps="steps" class="max-w-screen-md mx-auto mb-8" />
    <validation-observer v-slot="{ invalid }">
      <form @submit.prevent="createOrder()">
        <div class="flex justify-between items-start lg:flex-row flex-col mb-16">
          <div class="flex-grow lg:w-auto w-full bg-gray-100 rounded-lg mr-8 sm:p-8 p-4">
            <!-- 購物車內容 -->
            <section>
              <div class="flex justify-between items-end mb-4">
                <h3 class="md:text-3xl text-2xl font-bold">購物車內容</h3>
                <router-link
                  to="/products"
                  class="font-bold underline text-primary-default
                  hover:text-primary-dark transition"
                >
                  繼續購物
                </router-link>
              </div>
              <div class="cart-main" v-if="cart.length < 1">
                <h3 class="font-bold text-center text-gray-500 py-4 mb-8 border-b-2">
                  您的購物車目前是空的喔！
                </h3>
              </div>
              <div class="cart-main" v-else>
                <table class="cart-list table-auto w-full mb-8">
                  <tbody class="divide-y-2">
                    <tr
                      v-for="item in cart"
                      :key="item.product.id"
                      class="cart-item"
                    >
                      <td class="w-16 sm:py-4">
                        <div class="pic">
                          <img :src="item.product.imageUrl[0]" alt="" />
                        </div>
                      </td>
                      <td class="sm:whitespace-nowrap">
                        <div class="flex sm:flex-col sm:items-start
                        flex-row sm:justify-start justify-between items-center">
                          <router-link
                            class="text-sm truncate sm:w-full sm:mr-0 mr-4"
                            :to="`/product/${item.product.id}`">
                            {{ item.product.title }}
                          </router-link>
                          <div class="block">
                            <span class="price"
                              >NT$ {{ item.product.price | currency }}</span
                            >
                            <span class="origin"
                              >NT$
                              {{ item.product.origin_price | currency }}</span
                            >
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex justify-end items-center">
                          <span class="text-sm mr-2">數量</span>
                          <button
                            type="button"
                            class="btn-minus"
                            @click="quantityUpdate(item.product.id, item.quantity - 1)"
                            :class="{'disabled':item.quantity === 1}"
                          >
                            <span class="material-icons text-base">remove</span>
                          </button>
                          <input
                            type="number"
                            class="q-number"
                            :value="item.quantity"
                            @keyup.enter="
                              quantityUpdate(item.product.id, $event.target.value)
                            "
                            onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                          />
                          <button
                            type="button"
                            class="btn-add"
                            @click="
                              quantityUpdate(item.product.id, item.quantity + 1)
                            "
                          >
                            <span class="material-icons text-base">add</span>
                          </button>
                        </div>
                      </td>
                      <td class="text-right lg:w-12">
                        <button
                          class="btn-close w-full text-gray-300 hover:text-red-700 transition"
                          type="button"
                          @click="removeCartItem(item.product.id)"
                        >
                          <span class="material-icons block">close</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <!-- 收件資料表單 -->
            <section>
              <h3 class="md:text-3xl text-2xl font-bold mb-4">收件資料</h3>
              <div class="grid grid-cols-1 gap-6">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label class="block">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-gray-700">收件人姓名</span>
                      <span class="text-gray-500 text-sm">*必填</span>
                    </div>
                    <input
                      type="text"
                      name="收件人姓名"
                      class="input-field"
                      :class="classes"
                      placeholder="請填寫真實姓名"
                      v-model="order.name"
                    />
                  </label>
                  <span class="text-red-500 text-sm">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider rules="required|numeric" v-slot="{ errors, classes }">
                  <label class="block">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-gray-700">聯絡電話</span>
                      <span class="text-gray-500 text-sm">*必填</span>
                    </div>
                    <input
                      type="number"
                      name="聯絡電話"
                      class="input-field"
                      :class="classes"
                      placeholder="09101234567"
                      v-model="order.tel"
                    />
                  </label>
                  <span class="text-red-500 text-sm">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <label class="block">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-gray-700">Email</span>
                      <span class="text-gray-500 text-sm">*必填</span>
                    </div>
                    <input
                      type="email"
                      name="Email"
                      class="input-field"
                      :class="classes"
                      placeholder="example@service.com"
                      v-model.lazy="order.email"
                    />
                  </label>
                  <span class="text-red-500 text-sm">{{ errors[0] }}</span>
                </validation-provider>
                  <label class="block" name="地址">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-gray-700">收件地址</span>
                      <span class="text-gray-500 text-sm">*必填</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                      <TwzipcodeCounty
                        id="twzipcode__county"
                        class="select-field"
                        v-model="tempAddress.county"
                      />
                      <TwzipcodeZipcode
                        id="twzipcode__zipcode"
                        class="select-field"
                        value-template=":county:city"
                        value="臺北市信義區"
                        text-template=":id :county:city"
                        :filter-by-county="tempAddress.county"
                        v-model="tempAddress.district"
                      />
                    </div>
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <input
                        type="text"
                        name="收件地址"
                        class="input-field"
                        :class="classes"
                        placeholder="請輸入完整地址"
                        v-model.trim.lazy="tempAddress.road"
                      />
                      <span class="text-red-500 text-sm">{{ errors[0] }}</span>
                    </validation-provider>
                  </label>
                <label class="block">
                  <span class="text-gray-700 block mb-1">備註</span>
                  <textarea
                    class="input-field"
                    rows="5"
                    placeholder="請填入想告知或提醒我們的內容..."
                    v-model="order.message"
                  ></textarea>
                </label>
              </div>
            </section>
          </div>
          <!-- 金額、折扣 -->
          <div class="lg:w-1/3 w-full bg-gray-100 rounded-lg sm:p-8 p-4">
            <section>
              <h3 class="md:text-3xl text-2xl font-bold mb-4">訂單摘要</h3>
              <div class="flex justify-between items-center mb-2">
                <span class="text-lg">商品總計</span>
                <span class="font-bold font-ubu text-lg text-secondary-default">
                  NT {{ totalprice | currency }}
                </span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-lg">
                  運費
                  <span
                    v-if="shipping === 0"
                    class="text-primary-default text-sm"
                  >
                    已達到免運條件
                  </span>
                </span>
                <span class="font-bold font-ubu text-lg text-secondary-default">
                  NT {{ shipping | currency }}
                </span>
              </div>
              <hr class="divider-line" />
              <label class="block">
                <span class="text-gray-700 block mb-1">優惠折扣碼</span>
                <div class="flex mb-4">
                  <input
                    type="text"
                    class="input-field flex-grow mr-2"
                    placeholder="請輸入優惠折扣碼"
                    v-model="couponCode"
                  />
                  <button
                    type="button"
                    class="font-bold text-primary-default flex-none w-16 border-2
                    border-primary-default rounded-lg hover:bg-primary-default
                    hover:text-gray-900 transition"
                    @click="useCoupon"
                  >
                    使用
                  </button>
                </div>
              </label>
              <div class="flex justify-between items-center" v-if="couponInfo.percent">
                <span class="text-lg">折扣</span>
                <span class="font-bold font-ubu text-lg text-secondary-default">
                  -NT {{ Math.floor(totalprice * (couponInfo.percent / 100)) | currency }}
                </span>
              </div>
              <hr class="divider-line" />
              <div class="flex justify-between items-center">
                <span class="text-xl">結帳總金額</span>
                <span
                  v-if="couponInfo.percent"
                  class="font-bold text-2xl font-ubu text-secondary-default"
                > NT {{
                  Math.floor(totalprice - totalprice * (couponInfo.percent / 100) + shipping)
                   | currency
                  }}
                </span>
                <span
                  v-else
                  class="font-bold text-2xl font-ubu text-secondary-default"
                >
                  NT {{ totalprice + shipping | currency}}
                </span>
              </div>
              <hr class="divider-line" />
              <!-- 付款方式 -->
              <h3 class="md:text-3xl text-2xl font-bold mb-4">請選擇付款方式</h3>
              <div class="flex mb-8 select-none text-center">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label
                    for="atm"
                    class="inline-block relative py-2 sm:px-4 px-2 font-bold border-2
                    border-primary-default rounded-lg hover:bg-primary-default
                    transition cursor-pointer mr-4"
                    :class="[order.payment === 'ATM' ? 'bg-primary-default': 'bg-white']"
                  >
                    <span>ATM 轉帳</span>
                    <input
                      type="radio"
                      name="payment"
                      id="atm"
                      value="ATM"
                      class="opacity-0 absolute"
                      v-model="order.payment"
                    />
                  </label>
                  <label
                    for="credit"
                    class="inline-block relative py-2 px-4 font-bold border-2
                    border-primary-default rounded-lg hover:bg-primary-default
                    transition cursor-pointer mr-4"
                    :class="[order.payment === 'Credit' ? 'bg-primary-default': 'bg-white']"
                  >
                    <span>信用卡付款</span>
                    <input
                      type="radio"
                      name="payment"
                      id="credit"
                      value="Credit"
                      class="opacity-0 absolute"
                      v-model="order.payment"
                    />
                  </label>
                  <label
                    for="applePay"
                    class="inline-block relative py-2 px-4 font-bold border-2
                    border-primary-default rounded-lg hover:bg-primary-default
                    transition cursor-pointer"
                    :class="[order.payment === 'ApplePay' ? 'bg-primary-default': 'bg-white']"
                  >
                    <span>LINE Pay</span>
                    <input
                      type="radio"
                      name="payment"
                      id="applePay"
                      value="ApplePay"
                      class="opacity-0 absolute"
                      v-model="order.payment"
                    />
                  </label>
                  <span class="text-red-500 text-sm">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <p class="mb-8 text-sm text-gray-500">
                * 確認訂單完成後，匯款帳戶資訊將會寄送至您的 Email 信箱，
                再請查看您的信件。( 若 24
                小時內未收到信件，煩請來信或來電給客服人員，
                我們會立即為您處理，謝謝您的配合。)
              </p>
              <div class="block mb-4">
                <label class="inline-flex items-center">
                  <input type="checkbox" class="checkbox-field" checked="" />
                  <p class="text-sm ml-2">
                    我已確實詳讀並同意
                    <a class="underline text-primary-default cursor-pointer"
                      >服務條款</a
                    >
                    及
                    <a class="underline text-primary-default cursor-pointer"
                      >資料使用政策</a
                    >。
                  </p>
                </label>
              </div>
              <button
                type="submit"
                class="btn w-full bg-primary-default"
                :disabled="invalid"
                :class="{'bg-primary-light text-gray-500 cursor-not-allowed' : invalid}"
              >
                確認訂單
              </button>
            </section>
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import StepsBar from '@/components/StepsBar.vue';
import { Zipcode, County } from 'twzipcode-vue';

export default {
  name: 'Checkout',
  data() {
    return {
      cart: [],
      totalprice: 0,
      shippingfee: 120,
      tempAddress: {
        county: '臺北市',
        district: '',
        road: '',
      },
      couponCode: '',
      couponInfo: {},
      order: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      orderId: '',
      steps: [
        {
          id: 1,
          title: '確認訂單資訊',
          done: true,
        },
        {
          id: 2,
          title: '訂單完成',
          done: false,
        },
      ],
      isLoading: false,
    };
  },
  components: {
    StepsBar,
    TwzipcodeZipcode: Zipcode,
    TwzipcodeCounty: County,
  },
  created() {
    this.getCart();
  },
  mounted() {
  },
  computed: {
    shipping() {
      let fee = this.shippingfee;
      if (this.totalprice > 3000) {
        fee = 0;
      } else {
        fee = 120;
      }
      return fee;
    },
  },
  methods: {
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.order.address = `${this.tempAddress.district}${this.tempAddress.road}`;
      const order = { ...this.order };

      if (this.couponInfo.enabled) {
        order.coupon = this.couponInfo.code;
      }

      this.axios.post(api, order).then((res) => {
        if (res.data.data.id) {
          this.getCart();
          this.orderId = res.data.data.id;
          this.$router.push({ path: '/order-completed' });
          this.isLoading = false;
        }
      }).catch(() => {
        this.$router.push({ path: '/order-failed' });
        this.isLoading = false;
      });
    },
    useCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      const code = {
        code: this.couponCode,
      };

      this.axios
        .post(api, code)
        .then((res) => {
          this.couponInfo = res.data.data;
          // eslint-disable-next-line no-console
          console.log(this.couponInfo);
          this.getCart();
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
      this.couponCode = '';
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
          this.totalprice = 0;
          this.cart.forEach((item) => {
            this.totalprice += item.product.price * item.quantity;
          });
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    quantityUpdate(id, num) {
      if (num < 0) {
        return;
      }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.isLoading = true;
      this.axios.patch(api, data).then(() => {
        this.getCart();
        this.$bus.$emit('update-cart');
        this.isLoading = false;
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.isLoading = true;
      this.axios.delete(api).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    removeAllCartItem() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.isLoading = true;
      this.axios.delete(api).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
  },
};
</script>
