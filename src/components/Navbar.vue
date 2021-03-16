<template>
  <div class="navbar">
    <Loading :active.sync="isLoading" />
    <nav id="navBar">
    <div class="navbar relative md:max-w-screen-xl mx-auto
      xl:px-0 lg:px-8 px-4 md:py-8 py-4 md:block flex justify-between items-center"
    >
        <!-- Menu Button -->
        <div
          class="flex items-center md:hidden mr-4 z-50"
          :class="isOpen ? 'fixed top-4' : 'relative'"
        >
          <button
            @click="isOpen = !isOpen"
            aria-expanded="false"
            class="inline-flex items-center justify-center p-2 text-gray-700
            border-2 border-gray-100 rounded-lg transition
            focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200"
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
        <div class="flex justify-between items-center flex-grow">
          <router-link to="/" class="navbar__logo">
            <img src="@/assets/images/logo.svg" alt="" />
          </router-link>
          <div class="menu justify-end items-center flex">
            <ul class="justify-end items-center hidden md:flex">
              <li class="mr-8">
                <router-link
                  class="text-gray-600 transition hover:text-secondary-light"
                  to="/products"
                >
                  產品總覽
                </router-link>
              </li>
              <li class="mr-8">
                <router-link
                  class="text-gray-600 transition hover:text-secondary-light"
                  to="/discount"
                >
                  優惠活動
                </router-link>
              </li>
              <li class="mr-8">
                <router-link class="text-gray-600 transition hover:text-secondary-light"
                to="/blog"
              >
                  綠色生活
                </router-link>
              </li>
              <li class="mr-6">
                <router-link class="text-gray-600 transition hover:text-secondary-light"
                to="/about"
              >
                  品牌故事
                </router-link>
              </li>
            </ul>
            <span class="divider bg-secondary-light mr-6 hidden md:block"></span>
            <ul class="flex justify-end items-center">
              <li class="hidden sm:block md:mr-8 mr-6">
                <a
                  href="#"
                  class="text-gray-600 transition hover:text-secondary-light"
                >
                  <span class="material-icons"> account_circle </span>
                </a>
              </li>
              <li class="md:mr-8 mr-6">
                <router-link
                  class="text-gray-600 transition hover:text-secondary-light"
                  to="/favorites"
                >
                  <span class="material-icons"> favorite </span>
                </router-link>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 transition hover:text-secondary-light"
                  @click.prevent="sideCartOpen = !sideCartOpen"
                >
                  <span class="material-icons"> shopping_basket </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
    </div>
    </nav>
    <!-- Mobile Menu -->
    <div
      v-if="isMobile"
      :class="isOpen ? 'flex' : 'hidden'"
      class="fixed bg-gray-100 top-0 left-0 right-0 bottom-0
      items-center justify-center text-center w-full z-40">
      <transition name="slide-fade">
        <ul
          v-if="isOpen"
          class="flex items-center flex-col text-lg w-2/3 divide-y-2">
          <li class="w-full">
            <router-link
              class="text-gray-500 tracking-wider py-3"
              to="/"
            >
              回首頁
            </router-link>
          </li>
          <li class="w-full">
            <router-link
              class="text-gray-500 tracking-wider py-3"
              to="/products"
            >
              產品總覽
            </router-link>
          </li>
          <li class="w-full">
            <router-link
              class="text-gray-500 tracking-wider py-3"
              to="/discount"
            >
              優惠活動
            </router-link>
          </li>
          <li class="w-full">
            <router-link
            class="text-gray-500 tracking-wider py-3"
            to="/blog">
              綠色生活
            </router-link>
          </li>
          <li class="w-full">
            <router-link
              class="text-gray-500 tracking-wider py-3"
              to="/about">
              品牌故事
            </router-link>
          </li>
          <li class="w-full sm:hidden">
            <router-link
              class="text-gray-500 tracking-wider py-3"
              to="/account">
              管理者專區
            </router-link>
          </li>
        </ul>
      </transition>
    </div>
    <SideCart
    :cartlist="cart"
    :cartopen="sideCartOpen"
    :totalprice="totalprice"
    @qtyupdate="quantityUpdate"
    @deleteproduct="removeCartItem"
    @cartclose="sideCartOpen = !sideCartOpen"
    />
    <!-- <LoginModal
    /> -->
    <OverlayMask
    :overlayopen="sideCartOpen"
    @overlayclose="closeCart()"
    />
  </div>
</template>

<script>
import SideCart from '@/components/SideCart.vue';
// import LoginModal from '@/components/Login.vue';
import OverlayMask from '@/components/OverlayMask.vue';

// eslint-disable-next-line func-names
window.onload = function () {
  const nav = document.querySelector('#navBar');
  const navTop = nav.offsetTop;
  const originalTop = nav.offsetHeight;

  function navSticky() {
    if (window.scrollY > navTop) {
      document.body.style.paddingTop = `${originalTop}px`;
      nav.classList.add('sticky');
    } else {
      document.body.style.paddingTop = 0;
      nav.classList.remove('sticky');
    }
  }

  window.addEventListener('scroll', navSticky);
};

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
    // LoginModal,
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
#navBar {
  position: relative;
  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, .9);
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    z-index: 50;
    .navbar {
      padding: 1rem;
    }
  }
}
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
