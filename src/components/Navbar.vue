<template>
  <div class="navbar">
    <Loading :active.sync="isLoading" />
    <nav
      class="navbar relative md:max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4 md:py-8 py-4"
    >
      <div class="flex justify-between items-center">
        <router-link to="/" class="navbar__logo">
          <img src="@/assets/images/logo.svg" alt="" />
        </router-link>
        <div class="menu justify-end items-center flex">
          <ul class="justify-end items-center hidden md:flex">
            <li class="mr-8">
              <router-link
                class="transition hover:text-secondary-light"
                to="/products"
              >
                產品總覽
              </router-link>
            </li>
            <li class="mr-8">
              <router-link
                class="transition hover:text-secondary-light"
                to="/discount"
              >
                優惠活動
              </router-link>
            </li>
            <li class="mr-8">
              <router-link class="transition hover:text-secondary-light" to="/blog">
                綠色生活
              </router-link>
            </li>
            <li class="mr-6">
              <router-link class="transition hover:text-secondary-light" to="/about">
                品牌故事
              </router-link>
            </li>
          </ul>
          <span class="divider bg-secondary-light mr-6 hidden md:block"></span>
          <ul class="flex justify-end items-center md:mr-0 mr-10">
            <li class="hidden sm:block md:mr-8 mr-6">
              <router-link
                class="transition hover:text-secondary-light"
                to="/account"
              >
                <span class="material-icons"> account_circle </span>
              </router-link>
            </li>
            <li class="hidden sm:block md:mr-8 mr-6">
              <router-link
                class="transition hover:text-secondary-light"
                to="/favorites"
              >
                <span class="material-icons"> favorite </span>
              </router-link>
            </li>
            <li>
              <a href="#" class="transition hover:text-secondary-light"
              @click.prevent="sideCartOpen = !sideCartOpen">
                <span class="material-icons"> shopping_basket </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Menu Button -->
      <div class="absolute inset-y-0 right-4 flex items-center md:hidden">
        <button
          @click="isOpen = !isOpen"
          aria-expanded="false"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400
          hover:text-white hover:bg-gray-700 focus:outline-none
          focus:ring-2 focus:ring-inset focus:ring-white transition"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            :class="isOpen ? 'hidden' : 'block'"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            :class="isOpen ? 'block' : 'hidden'"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <ul
      v-if="isMobile"
      :class="isOpen ? 'flex' : 'hidden'"
      class="absolute bg-gray-100 top-16 left-0 right-0 flex-col items-center
      w-full text-center z-10"
    >
      <li class="w-full">
        <router-link
          class="transition hover:text-white hover:bg-secondary-light py-3"
          to="/products"
        >
          產品總覽
        </router-link>
      </li>
      <li class="w-full">
        <router-link
          class="transition hover:text-white hover:bg-secondary-light py-3"
          to="/discount"
        >
          優惠活動
        </router-link>
      </li>
      <li class="w-full">
        <router-link
        class="transition hover:text-white hover:bg-secondary-light py-3"
        to="/blog">
          綠色生活
        </router-link>
      </li>
      <li class="w-full">
        <router-link
          class="transition hover:text-white hover:bg-secondary-light py-3"
          to="/about">
          品牌故事
        </router-link>
      </li>
      <li class="w-full sm:hidden">
        <router-link
          class="transition hover:text-white hover:bg-secondary-light py-3"
          to="/account">
          會員專區
        </router-link>
      </li>
      <li class="w-full sm:hidden">
        <router-link
          class="transition hover:text-white hover:bg-secondary-light py-3"
          to="/favorites">
          我的收藏
        </router-link>
      </li>
    </ul>
    <SideCart
    :cartlist="cart"
    :cartopen="sideCartOpen"
    :totalprice="totalprice"
    @qtyupdate="quantityUpdate"
    @deleteproduct="removeCartItem"
    @cartclose="sideCartOpen = !sideCartOpen"
    />
    <OverlayMask
    :overlayopen="sideCartOpen"
    @overlayclose="closeCart()"
    />
  </div>
</template>

<script>
import SideCart from '@/components/SideCart.vue';
import OverlayMask from '@/components/OverlayMask.vue';

export default {
  name: 'Navbar',
  data() {
    return {
      windowWidth: window.innerWidth,
      isOpen: false,
      isMobile: false,
      isLoading: false,
      sideCartOpen: false,
      cart: [],
      totalprice: 0,
    };
  },
  components: {
    SideCart,
    OverlayMask,
  },
  created() {
    this.getCart();
    this.$bus.$on('get-cart', () => {
      this.getCart();
      this.sideCartOpen = true;
    });
  },
  mounted() {
    this.mediaCheck();
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.mediaCheck();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.mediaCheck());
  },
  methods: {
    mediaCheck() {
      if (this.windowWidth <= 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    closeCart() {
      this.sideCartOpen = false;
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
            this.totalprice += (item.product.price * item.quantity);
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
      this.axios
        .patch(api, data)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.isLoading = true;
      this.axios
        .delete(api)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        });
    },
    removeAllCartItem() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.isLoading = true;
      this.axios
        .delete(api)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        });
    },
  },
};
</script>

<style lang="scss">
.navbar {
  .material-icons, a
  {
    display: block;
  }
}

.divider {
  width: 2px;
  height: 1.5rem;
}

@media (max-width: 768px) {
  .navbar__logo {
    height: 32px;
    img {
      width: auto;
      height: 100%;
    }
  }
}
</style>
