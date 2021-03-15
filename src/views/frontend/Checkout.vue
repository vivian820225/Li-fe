<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <StepsBar :steps="steps" class="max-w-screen-md mx-auto mb-8" />
    <div class="grid grid-cols-3 grid-rows-3 gap-8 mb-16">
      <div class="col-span-2 row-span-3 bg-gray-100 rounded-lg p-8">
        <!-- 購物車內容 -->
        <section>
          <div class="flex justify-between items-end mb-4">
            <h3 class="section-title">購物車內容</h3>
            <router-link
              to="/products"
              class="font-bold underline text-primary-default
              hover:text-primary-dark transition"
            >
              繼續購物
            </router-link>
          </div>
          <div class="cart-main" v-if="cart.lenght < 1">
            <h3 class="font-bold">您的購物車目前是空的喔！</h3>
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
                    <div class="content">
                      <p class="name truncate">{{ item.product.title }}</p>
                      <div class="sm:block inline-block">
                        <span class="price"
                          >NT$ {{ item.product.price | currency }}</span
                        >
                        <span class="origin"
                          >NT$ {{ item.product.origin_price | currency }}</span
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
                        @click="
                          quantityUpdate(item.product.id, item.quantity - 1)
                        "
                        :disabled="item.quantity === 0"
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
                  <td class="text-right w-12">
                    <button
                      class="btn-close text-gray-300 hover:text-red-700 transition"
                      type="button"
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
          <h3 class="section-title mb-4">收件資料</h3>
          <form action="">
            <div class="grid grid-cols-1 gap-6">
              <label class="block">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-gray-700">收件人姓名</span>
                  <span class="text-gray-500 text-sm">*必填</span>
                </div>
                <input
                  type="text"
                  class="input-field"
                  placeholder="請填寫真實姓名"
                />
              </label>
              <label class="block">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-gray-700">連絡電話</span>
                  <span class="text-gray-500 text-sm">*必填</span>
                </div>
                <input
                  type="number"
                  class="input-field"
                  placeholder="09101234567"
                />
              </label>
              <label class="block">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-gray-700">Email</span>
                  <span class="text-gray-500 text-sm">*必填</span>
                </div>
                <input
                  type="email"
                  class="input-field"
                  placeholder="example@service.com"
                />
              </label>
              <label class="block">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-gray-700">收件地址</span>
                  <span class="text-gray-500 text-sm">*必填</span>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <select
                    class="select-field"
                  >
                    <option>縣市</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Other</option>
                  </select>
                  <select
                    class="select-field"
                  >
                    <option>鄉鎮市區</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Other</option>
                  </select>
                </div>
                <input
                  type="text"
                  class="input-field"
                  placeholder="請輸入完整地址"
                />
              </label>
              <label class="block">
                <span class="text-gray-700 block mb-1">備註</span>
                <textarea
                  class="input-field"
                  rows="3"
                  placeholder="請填入想告知或提醒我們的內容..."
                ></textarea>
              </label>
            </div>
            <hr class="divider-line">
            <!-- 付款方式 -->
            <h3 class="section-title mb-4">請選擇付款方式</h3>
            <div class="flex mb-8">
              <label
                for="atm"
                class="inline-block relative py-2 px-4 font-bold
                bg-white border-2 border-primary-default rounded-lg
                hover:bg-primary-default transition cursor-pointer mr-4"
                >
                <span>ATM 轉帳</span>
                <input
                  type="radio"
                  name="payment"
                  id="atm"
                  value="atm"
                  class="opacity-0 absolute"
                  v-model="payment.value"
                >
              </label>
              <label
                for="creditcard"
                class="inline-block relative py-2 px-4 font-bold
                bg-white border-2 border-primary-default rounded-lg
                hover:bg-primary-default transition cursor-pointer mr-4"
              >
                <span>信用卡付款</span>
                <input
                  type="radio"
                  name="payment"
                  id="creditcard"
                  value="creditcard"
                  class="opacity-0 absolute"
                  v-model="payment.value"
                >
              </label>
              <label
                for="linepay"
                class="inline-block relative py-2 px-4 font-bold
                bg-white border-2 border-primary-default rounded-lg
                hover:bg-primary-default transition cursor-pointer"
              >
                <span>LINE Pay</span>
                <input
                  type="radio"
                  name="payment"
                  id="linepay"
                  value="linepay"
                  class="opacity-0 absolute"
                  v-model="payment.value"
                >
              </label>
            </div>
            <p class="mb-8 text-gray-500">
              * 確認訂單完成後，匯款帳戶資訊將會寄送至您的 Email 信箱，
              再請查看您的信件。( 若 24 小時內未收到信件，煩請來信或來電給客服人員，
              我們會立即為您處理，謝謝您的配合。)
            </p>
            <div class="block mb-8">
              <div class="mt-2">
                <div>
                  <label class="inline-flex items-center">
                    <input type="checkbox"
                    class="checkbox-field"
                    checked="">
                    <p class="ml-2">
                      我已確實詳讀並同意
                      <a class="underline text-primary-default cursor-pointer">服務條款</a>
                      及
                      <a class="underline text-primary-default cursor-pointer">資料使用政策</a>。
                    </p>
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" class="btn w-full bg-primary-default">
              確認訂單
            </button>
          </form>
        </section>
      </div>
      <!-- 金額、折扣 -->
      <div class="bg-gray-100 rounded-lg p-8">
        <section>
          <h3 class="section-title mb-4">訂單摘要</h3>
          <div class="flex justify-between items-center mb-2">
            <span class="text-lg">商品總計</span>
            <span class="font-bold font-ubu text-lg text-secondary-default">
              NT$ {{ totalprice | currency }}
            </span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-lg">運費</span>
            <span class="font-bold font-ubu text-lg text-secondary-default">
              NT$ {{ shippingfee | currency }}
            </span>
          </div>
          <hr class="divider-line">
          <label class="block">
            <span class="text-gray-700 block mb-1">優惠折扣碼</span>
            <div class="flex mb-4">
              <input
                type="text"
                class="input-field flex-grow mr-2"
                placeholder="請輸入優惠折扣碼"
              />
              <button type="button" class="font-bold text-primary-default underline flex-none w-16
                border-2 border-primary-default rounded-lg hover:bg-primary-default
                hover:text-gray-900 transition">
                使用
              </button>
            </div>
          </label>
          <div class="flex justify-between items-center">
            <span class="text-lg">折扣</span>
            <span class="font-bold font-ubu text-lg text-secondary-default">
              NT$ 50
            </span>
          </div>
          <hr class="divider-line">
          <div class="flex justify-between items-center">
            <span class="text-xl">結帳總金額</span>
            <span class="font-bold text-2xl font-ubu text-secondary-default">
              NT$ 2,470
            </span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import StepsBar from '@/components/StepsBar.vue';

export default {
  name: 'Checkout',
  data() {
    return {
      cart: [],
      totalprice: 0,
      shippingfee: 120,
      payment: {
        value: '',
        checked: false,
      },
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
    };
  },
  components: {
    StepsBar,
  },
  created() {
    this.getCart();
  },
  methods: {
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
        this.isLoading = false;
        this.getCart();
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
