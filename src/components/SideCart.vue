<template>
  <div class="cart" :class="{ show: cartopen }">
    <div class="cart-container">
      <h2 class="section-title sm:mb-4">
        我的購物車
        <span class="sub-section-title"> My Cart </span>
      </h2>
      <div class="cart-main" v-if="cartlist.lenght < 1">
        <h3 class="font-bold">您的購物車目前是空的喔！</h3>
        <router-link
          to="/products"
          class="font-bold underline text-primary-default"
        >
          快來看看吧！
        </router-link>
      </div>
      <!-- 購物車列表 -->
      <div class="cart-main" v-else>
        <table class="cart-list table-auto w-full mb-8">
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
                >
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
