<template>
  <div class="cart" :class="{ 'show': cartopen }">
    <div class="cart-container">
      <h2 class="section-title sm:mb-4">
        我的購物車
      </h2>
      <div class="cart-main text-center" v-if="cartlist.length < 1">
        <h3 class="font-bold text-lg py-8">您的購物車是空的喔！</h3>
        <router-link
          to="/products"
          class="btn bg-primary-default hover:bg-primary-dark transition"
        >
          快來看看吧！
        </router-link>
      </div>
      <!-- 購物車列表 -->
      <div class="cart-main" v-else>
        <div class="table-wrapper">
          <vuescroll :ops="ops">
            <table class="cart-list table-auto w-full mb-2">
              <tbody class="divide-y-2">
                <tr
                  v-for="item in cartlist"
                  :key="item.product.id"
                  class="cart-item"
                >
                  <td class="sm:py-4">
                    <div class="pic">
                      <img :src="item.product.imageUrl[0]" alt="" />
                    </div>
                  </td>
                  <td class="sm:whitespace-nowrap">
                    <div class="content">
                      <router-link
                        class="name truncate"
                        :to="`/product/${item.product.id}`">
                        {{ item.product.title }}
                      </router-link>
                      <div class="sm:block inline-block">
                        <span class="price"
                          >NT {{ item.product.price | currency }}</span
                        >
                        <span class="origin"
                          >NT {{ item.product.origin_price | currency }}</span
                        >
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="qty">
                      <button
                        type="button"
                        class="btn-minus"
                        @click="quantityUpdate(item.product.id, item.quantity - 1)"
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
                        @click="quantityUpdate(item.product.id, item.quantity + 1)"
                      >
                        <span class="material-icons text-base">add</span>
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      class="btn-close hover:text-red-700 transition"
                      type="button"
                      @click="deleteProduct(item.product.id)"
                    >
                      <span class="material-icons">close</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </vuescroll>
        </div>
        <div class="flex justify-between items-center mb-4">
          <p class="font-bold text-xl">小計</p>
          <p class="font-bold font-ubu text-xl text-secondary-default">
            NT {{ totalprice | currency }}
          </p>
        </div>
        <router-link
          v-if="cartlist.length"
          to="/checkout"
          class="btn w-full text-center bg-primary-default hover:bg-primary-dark transition"
        >
          訂單結帳
        </router-link>
        <router-link
          v-else
          to="/products"
          class="btn w-full text-center bg-primary-default hover:bg-primary-dark transition"
        >
          繼續購物
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';

export default {
  name: 'SideCart',
  props: ['cartlist', 'cartopen', 'totalprice'],
  data() {
    return {
      ops: {
        rail: {
          opacity: '0.2',
          background: '#FFFFF',
          border: undefined,
          size: '6px',
        },
        bar: {
          background: '#ECECEC',
          keepShow: false,
          size: '4px',
          minSize: 0.2,
        },
      },
    };
  },
  components: {
    vuescroll,
  },
  methods: {
    quantitySelected(value) {
      return this.value === value;
    },
    deleteProduct(id) {
      this.$emit('deleteproduct', id);
    },
    quantityUpdate(id, num) {
      this.$emit('qtyupdate', id, num);
    },
    shoppingCartClose() {
      this.$emit('cartclose');
    },
  },
};
</script>

<style lang="scss">
  .table-wrapper {
    height: 80vh;
    max-height: 700px;
    margin-bottom: 1rem;
    border-bottom: 4px solid #184D47;
    border-style: dotted;
  }

  @media screen and (max-width: 768px) {
    .table-wrapper {
      height: 60vh;
      max-height: 580px;
    }
  }
  @media screen and (max-width: 520px) {
    .table-wrapper {
      height: 70vh;
      max-height: 400px;
    }
  }
</style>
