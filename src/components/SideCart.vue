<template>
  <div class="cart" :class="{show: cartopen}">
    <div class="cart-container">
      <h2 class="section-title sm:mb-4">
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
        <table class="cart-list table-auto w-full mb-8">
          <tbody class="divide-y-2">
            <tr v-for="item in cartlist" :key="item.product.id" class="cart-item">
              <td class="sm:py-4">
                <div class="pic">
                  <img :src="item.product.imageUrl[0]" alt="">
                </div>
              </td>
              <td class="sm:whitespace-nowrap">
                <div class="content">
                  <p class="name truncate">{{ item.product.title }}</p>
                  <div class="sm:block inline-block">
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
                    <span class="material-icons text-base">remove</span>
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
                    <span class="material-icons text-base">add</span>
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
        <router-link
          v-if="cartlist.length"
          to="/checkout"
          class="btn w-full text-center bg-primary-default hover:bg-primary-dark transition">
          訂單結帳
        </router-link>
        <router-link
          v-else
          to="/products"
          class="btn w-full text-center bg-primary-default hover:bg-primary-dark transition">
        繼續購物
        </router-link>
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
    width: 420px;
    height: 100%;
    padding: 2.5rem 1rem 0 1.25rem;
    position: fixed;
    top: 0;
    right: -420px;
    background-color: #fff;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    transition: .3s ease-in-out;
    z-index: 100;
    &.show {
      right: 0;
      transition: .5s ease-in-out;
    }
  }
  .cart-list {
    max-height: 60vh;
    overflow-y: scroll;
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
      @apply text-sm;
    }
    .price {
      @apply font-ubu text-secondary-default font-bold mr-2;
    }
    .origin {
      @apply font-ubu text-gray-500 line-through text-sm;
    }
  }
  .qty {
    @apply flex justify-center items-center;
  }
  .q-number {
    @apply block font-ubu border-gray-300 text-sm;
    max-width: 36px;
    padding: 6px 4px;
    text-align: center;
    border-right-color: transparent;
    border-left-color: transparent;
    -moz-appearance: textfield;
    z-index: 1;
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

  @media screen and (max-width: 620px) {
    .cart {
      max-width: 240px;
      padding: 1rem 1rem 0 1rem;
    }
    .cart-item {
      display: grid;
      grid-template-areas:
      "t1 t3 t3 t4"
      "t2 t2 t2 t2";
      padding: .75rem 0;
      td {
        display: block;
        &:first-of-type {
          grid-area: t1;
        }
        &:nth-of-type(2) {
          grid-area: t2;
        }
        &:nth-of-type(3) {
          grid-area: t3;
        }
        &:last-of-type {
          grid-area: t4;
          text-align: right;
        }
      }
      .pic {
        height: 34px;
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .name {
        display: inline-block;
      }
      .price {
        margin-right: 0;
      }
      .origin {
        display: none;
      }
    }
  }
</style>
