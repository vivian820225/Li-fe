<template>
  <div class="w-full mx-auto">
    <section class="max-w-screen-xl mx-auto md:mb-8 mb-6 xl:px-0 lg:px-8 px-4">
      <div class="event-banner rounded-lg">
        <p class="content">
          輸入折扣碼
          <span class="code font-ubu">2021betterlife</span><br/>
          立即享有<span class="font-ubu"> 9 </span>折優惠
        </p>
      </div>
    </section>
    <section class="products max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
      <div class="flex justify-between items-start md:flex-row flex-col mb-8 md:mb-20">
        <!-- 分類 -->
        <div class="category-section lg:mr-12 md:mr-8 flex-none">
          <h3 class="font-bold md:text-3xl text-2xl sm:mb-6 mb-4">商品分類</h3>
          <div class="category-wrapper">
            <ul class="category md:block flex flex-row">
              <li>
                <a class="item" @click.prevent="filterCategory = '全部商品'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    全部商品
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
              <li>
                <a class="item" @click.prevent="filterCategory = '植栽 / 盆栽'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    植栽 / 盆栽
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
              <li>
                <a class="item" @click.prevent="filterCategory = '瓶器 / 陶器'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    瓶器 / 陶器
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
              <li>
                <a class="item" @click.prevent="filterCategory = '燈飾'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    燈飾
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
              <li>
                <a class="item" @click.prevent="filterCategory = '擺飾'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    擺飾
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
              <li>
                <a class="item" @click.prevent="filterCategory = '香氛蠟燭'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    香氛蠟燭
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
              <li>
                <a class="item border-none" @click.prevent="filterCategory = '客製化服務'">
                  <div class="flex justify-start items-center">
                    <span class="item-icon"></span>
                    客製化服務
                  </div>
                  <span class="hidden md:block material-icons"
                    >keyboard_arrow_right</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="products-list-section w-full">
          <div class="flex sm:justify-between justify-end items-center mb-6">
            <p v-if="filterCategory === '全部商品'" class="text-gray-500 md:block hidden">
              全部商品共 {{ allProducts.length }} 項
            </p>
            <p v-else class="text-gray-500 md:block hidden">
              已篩選出共 {{ filterProducts.length }} 項
            </p>
            <Select
              :data="Options"
              v-model="selectedOption"
              @valueSelect="onValueSelect"
            >
              <template v-slot:SelectLabel> 排序 </template>
            </Select>
          </div>
          <div class="products-list">
            <div class="block" v-if="filterProducts.length < 1">
              <p class="text-gray-500 text-center text-xl pt-8">
                此分類尚未有商品，請再等等我們上架！😭
              </p>
            </div>
            <div v-else class="block">
              <div class="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 mb-8">
                <ProductCard
                  :item="product"
                  v-for="(product, idx) in filterProducts"
                  :key="idx"
                  class="hover:shadow-lg transition-shadow rounded-lg"
                  @addtocart="addToCart"
                />
              </div>
              <div
              v-if="filterCategory === '全部商品'"
              class="pagnation-section flex sm:justify-end justify-center items-center">
                <Pagination
                  :pages="pagination"
                  @updateList="getProducts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '@/components/frontend/ProductCard.vue';
import Select from '@/components/frontend/Select.vue';
import Pagination from '@/components/Pagination.vue';
import { mapState } from 'vuex';

export default {
  name: 'AllProducts',
  data() {
    return {
      cart: [],
      // products: [],
      filterCategory: '全部商品',
      sortData: '',
      // pagination: {},
      selectToggle: false,
      selectedOption: '價格由高到低',
      Options: ['價格由低到高', '價格由高到低'],
      isDown: false,
    };
  },
  components: {
    ProductCard,
    Select,
    Pagination,
  },
  created() {
    this.$store.dispatch('productsModules/getAllProducts');
    this.$store.dispatch('productsModules/getProducts', 1);
    this.getCart();
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollSection();
    });
  },
  computed: {
    products: {
      get() {
        return this.$store.state.productsModules.products;
      },
      set(page) {
        this.$store.dispatch('productsModules/getProducts', page);
      },
    },
    pagination: {
      get() {
        return this.$store.state.productsModules.pagination;
      },
      set(page) {
        this.$store.dispatch('productsModules/getProducts', page);
      },
    },
    ...mapState('productsModules', {
      allProducts: (state) => state.allProducts,
      pagination: (state) => state.pagination,
    }),
    filterProducts() {
      let filterItems = [];
      switch (this.filterCategory) {
        case '植栽 / 盆栽':
        case '瓶器 / 陶器':
        case '燈飾':
        case '擺飾':
        case '香氛蠟燭':
        case '客製化服務':
          this.allProducts.forEach((item) => {
            if (item.category === this.filterCategory) {
              filterItems.push(item);
            }
          });
          break;
        default:
          filterItems = this.products;
          break;
      }
      // 排序
      filterItems.sort((a, b) => {
        if (this.sortData === '價格由低到高') {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
      return filterItems;
    },
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('productsModules/getProducts', page);
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$store.dispatch('updateLoading', true);
      this.axios
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
          this.totalprice = 0;
          this.cart.forEach((item) => {
            this.totalprice += (item.product.price * item.quantity);
          });
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$store.dispatch('updateLoading', false);
        });
    },
    addToCart(id) {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      const checkCart = this.cart.some((item) => {
        if (item.product.id === id) {
          const cart = {
            product: id,
            quantity: item.quantity + 1,
          };

          this.axios
            .patch(api, cart)
            .then(() => {
              this.$bus.$emit('message:push', '加入購物車成功', 'success');
              this.getCart();
              this.$store.dispatch('updateLoading', false);
            }).catch(() => {
              this.$bus.$emit('message:push', '發生錯誤，加入失敗', 'danger');
              this.$store.dispatch('updateLoading', false);
            });
          return true;
        }
        return false;
      });
      if (!checkCart) {
        const cart = {
          product: id,
          quantity: 1,
        };

        this.axios
          .post(api, cart)
          .then(() => {
            this.getCart();
            this.$bus.$emit('get-cart');
            this.$store.dispatch('updateLoading', false);
          }).catch(() => {
            this.$store.dispatch('updateLoading', false);
          });
      }
    },
    onValueSelect(value) {
      this.selectedOption = value;
      this.sortData = value;
    },
    scrollSection() {
      // category section scroll
      const container = document.querySelector('.category-wrapper');
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;

        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const distance = x - startX;
        container.scrollLeft = scrollLeft - distance;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/layout/_event-banner';
</style>
