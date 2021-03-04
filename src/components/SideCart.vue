<template>
  <div class="cart">
    <div class="cart-container">
      <h2 class="section-title mb-4">
        我的購物車
        <span class="sub-section-title">
          My Cart
        </span>
      </h2>
      <div class="cart-main" v-if="cartlist.lenght < 1">
        <h3 class="font-bold">您的購物車目前是空的喔！</h3>
        <router-link
        to="/products"
        class="font-bold underline text-primary-default">
          快來看看吧！
        </router-link>
      </div>
      <div class="cart-main" v-else>
        <table class="table-auto w-full mb-8">
          <tbody class="divide-y-2">
            <tr v-for="item in cartlist" :key="item.product.id" class="cart-item">
              <td class="py-4 whitespace-nowrap">
                <div class="pic">
                  <img :src="item.product.imageUrl[0]" alt="">
                </div>
              </td>
              <td>
                <div class="content">
                  <p class="name truncate">{{ item.product.title }}</p>
                  <div class="block">
                    <span class="price">NT$ {{ item.product.price | currency }}</span>
                    <span class="origin">NT$ {{ item.product.origin_price | currency }}</span>
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
                    <span class="material-icons">remove</span>
                  </button>
                  <input
                    type="number"
                    class="q-number"
                    :value="item.quantity"
                    @keyup.enter="quantityUpdate(item.product.id, $event.target.value)"
                    onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                  />
                  <button
                    type="button"
                    class="btn-add"
                    @click="quantityUpdate(item.product.id, item.quantity + 1)"
                  >
                    <span class="material-icons">add</span>
                  </button>
                </div>
              </td>
              <td>
                <button class="hover:text-red-700 transition btn-close" type="button">
                  <span class="material-icons">close</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between items-center mb-4">
          <p class="font-bold text-xl">小計</p>
          <p class="font-bold font-ubu text-xl text-secondary-default">
            NT$ {{ totalprice | currency }}
          </p>
        </div>
        <button
        type="button"
        class="btn w-full bg-primary-default hover:bg-primary-dark transition">
          訂單結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideCart',
  props: ['cartlist', 'cartopen', 'totalprice'],
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
  .cart {
    width: 100%;
    max-width: 420px;
    height: 100%;
    padding: 2.5rem 1rem 0 1.25rem;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fff;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    z-index: 100;
  }
  .cart-item {
    vertical-align: middle;
    .pic {
      max-width: 48px;
      height: 48px;
      border-radius: .5rem;
      overflow: hidden;
      img {
        width: auto;
        max-width: initial;
        height: 100%;
      }
    }
    .name {
      max-width: 120px;
    }
    .price {
      @apply font-ubu text-secondary-default text-lg font-bold mr-2;
    }
    .origin {
      @apply font-ubu text-gray-500 line-through text-sm;
    }
  }
  .qty {
    @apply flex justify-center items-center;
  }
  .q-number {
    max-width: 36px;
    text-align: center;
    -moz-appearance: textfield;
    z-index: 1;
    @apply block p-1 border-gray-300;
    &:focus {
      @apply ring-gray-700 border-gray-700;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .btn-minus {
    @apply relative inline-flex items-center p-1
    border border-gray-300 text-sm font-medium rounded-l-md
    text-gray-700 bg-white;
    &:hover {
      @apply bg-gray-50;
    };
  }
  .btn-add {
    @apply relative inline-flex items-center p-1
    rounded-r-md border border-gray-300 bg-white
    text-sm font-medium text-gray-500;
    &:hover {
      @apply bg-gray-50;
    };
  }
  .btn-close {
    width: 36px;
    height: 36px;
  }
</style>
