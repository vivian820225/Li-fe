<template>
  <div class="w-full mx-auto">
    <div class="max-w-screen-xl mx-auto font-sans xl:px-0 lg:px-8 px-4">
      <Breadcrumb />
      <div class="product-container">
        <div class="grid lg:grid-cols-2 sm:grid-cols-3 gap-8 md:mb-8 mb-16">
          <div class="product-pic">
              <img
                class="w-full lg:rounded-2xl rounded-xl mb-4 lg:h-auto sm:h-4/5 object-cover"
                :src="currentImg"
                :alt="tempProduct.title"
              />
              <div class="other-pic flex justify-start items-center">
                <img
                  class="lg:w-16 lg:h-16 w-8 h-8 object-cover
                  lg:rounded-2xl rounded-lg lg:mr-4 mr-2 cursor-pointer"
                  v-for="(img, key) in tempProduct.imageUrl"
                  :key="tempProduct.id + key"
                  :src="img"
                  @click="currentImg = img"
                />
              </div>
            </div>
          <div id="productInfo" class="info lg:col-span-1 sm:col-span-2">
            <div
              class="inline-block px-4 py-1 text-sm text-gray-500
              bg-gray-200 rounded-full mb-4"
            >
              {{ tempProduct.category }}
            </div>
            <h2 class="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
              {{ tempProduct.title }}
            </h2>
            <div class="md:text-lg">
              {{ tempProduct.description }}
            </div>
            <hr class="divider-line" />
            <div class="event md:text-lg">
              全店購物不限金額，全台免運<br />
              開幕慶限時 9 折，優惠碼 green2021
            </div>
            <hr class="divider-line" />
            <div class="mb-6">
              <div v-if="!tempProduct.price" class="text-4xl font-bold font-ubu">
                NT$ {{ tempProduct.origin_price }}
              </div>
              <div v-else class="flex md:justify-start items-center">
                <div class="md:text-3xl text-2xl font-bold mr-6">
                  優惠價
                  <span class="font-ubu">NT$ {{ tempProduct.price }}</span>
                </div>
                <div class="md:text-lg line-through text-gray-500">
                  原價
                  <span class="font-ubu">NT$ {{ tempProduct.origin_price }}</span>
                </div>
              </div>
            </div>
            <div class="flex sm:justify-between justify-center sm:flex-nowrap flex-wrap">
              <div class="flex justify-center items-center flex-none sm:mr-4 sm:mb-0 mb-8">
                <button
                  type="button"
                  class="w-10 h-10 hover:text-primary-default transition"
                  :class="{'text-gray-300 pointer-events-none': quantity === 1}"
                  @click="quantity = quantity - 1"
                >
                  <span class="material-icons text-3xl block">remove</span>
                </button>
                <input
                  type="number"
                  class="q-number flex-auto"
                  :value="quantity"
                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                />
                <button
                  type="button"
                  class="w-10 h-10 hover:text-primary-default transition"
                  @click="quantity = quantity + 1"
                >
                  <span class="material-icons text-3xl">add</span>
                </button>
              </div>
              <div class="flex justify-between w-full">
                <button
                  type="button"
                  class="btn bg-primary-default mr-4 flex-grow
                  hover:bg-primary-dark transition"
                  @click="addToCart(tempProduct.id)"
                >
                  <span class="material-icons mr-2"> shopping_basket </span>
                  加入購物車
                </button>
                <button
                  v-if="favorList.indexOf(tempProduct.id) !== -1"
                  type="button"
                  class="flex-none border-2 border-primary-default
                  bg-primary-default rounded-lg px-3 py-2 hover:bg-gray-50
                  transition"
                  @click="removeFavorList(tempProduct.id)"
                >
                  <span class="material-icons text-primary-dark
                    block"
                  >
                    favorite
                  </span>
                </button>
                <button
                  v-else
                  type="button"
                  class="flex-none border-2 border-primary-default
                  rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                  @click="addToFavorList(tempProduct.id)"
                >
                  <span
                    class="material-icons text-primary-default
                    block"
                  >
                    favorite_border
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <section class="product-description">
            <h3 class="product-section-title">產品描述</h3>
            <hr class="divider-line" />
            <div class="text-lg">
              <p>{{ tempProduct.content }}</p>
              <p>
                適合自家擺設或送禮祝賀，為日常的生活空間點綴些色彩，
                打造優良的生活環境。
              </p>
              <img src="https://picsum.photos/800/300" alt="" />
              <p>
                商品退換貨詳情請見
                <router-link class="underline text-primary-default" to="/guide">退換貨須知</router-link>
              </p>
            </div>
          </section>
          <section class="fqa mb-10">
            <h3 class="product-section-title">常見問答</h3>
            <hr class="divider-line" />
            <Accordion id="accordion-fqa" :content="fqa" ref="linkDiv"/>
            <!-- 多項展開，增加 multiple -->
            <!-- <Accordion id="accordion-fqa" :content="fqa" multiple="multiple" /> -->
          </section>
        </div>
        <section class="review mb-16">
          <h3 class="product-section-title">購買評價</h3>
          <hr class="divider-line" />
          <ul class="divide-y-2">
            <li v-for="item in reviews" :key="item.username">
              <div class="flex justify-between items-start py-4">
                <img
                  :src="item.avatar" alt="user"
                  class="rounded-full w-8 h-8 flex-none mr-4"
                />
                <div class="flex justify-start items-start flex-grow md:flex-row flex-col">
                  <div class="info mr-4 flex-grow">
                    <div class="flex justify-start md:items-center items-start
                    md:flex-row flex-col mb-2 text-sm">
                      <p class="mr-6">{{ item.username }}</p>
                      <p class="text-gray-500">
                        <span class="mr-2">{{ item.createdTime }} 天前</span>所留下的購買評價
                      </p>
                    </div>
                    <p class="md:mb-0 mb-4 md:text-base text-sm">{{ item.review }}</p>
                  </div>
                  <StarRating :score="item.rating" class="mr-4"/>
                </div>
                <img
                  :src="tempProduct.imageUrl[0]"
                  :alt="tempProduct.title"
                  class="sm:w-14 sm:h-14 w-10 h-10 rounded-lg flex-none"
                >
              </div>
            </li>
            <li>
              <button
                type="button"
                class="w-full flex justify-center items-center
                text-primary-default text-lg p-4 hover:bg-gray-50 transition"
              >
                瀏覽更多評價
                <span class="material-icons">keyboard_arrow_down</span>
              </button>
            </li>
          </ul>
        </section>
      </div>
      <!-- 其他推薦 -->
      <div class="flex justify-between md:items-center items-end mb-4">
        <h2 class="section-title">你可能也會喜歡</h2>
        <a
          href="#"
          class="flex items-center text-gray-500 hover:text-primary-default transition"
        >
          更多商品
          <span class="material-icons ml-1 text-xl leading-none">
            arrow_forward
          </span>
        </a>
      </div>
      <RecProduct :products="allProducts" class="md:mb-12 mb-6"/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/frontend/product/Breadcrumb.vue';
import RecProduct from '@/components/frontend/home/RecProduct.vue';
import Accordion from '@/components/frontend/product/Accordion.vue';
import StarRating from '@/components/frontend/product/StarRating.vue';
import { mapState } from 'vuex';

export default {
  name: 'Product',
  components: {
    Breadcrumb,
    RecProduct,
    Accordion,
    StarRating,
  },
  data() {
    return {
      cart: [],
      tempProduct: {
        imageUrl: [],
      },
      quantity: 1,
      currentImg: '',
      shownReviews: [],
      reviews: [
        {
          username: 'jenny95412',
          avatar: 'https://i.pravatar.cc/100?img=38',
          createdTime: 4,
          review: '包裝保護的很好！植栽也很漂亮！👍',
          rating: 4,
          productItem: '',
          shown: true,
        },
        {
          username: 'sherry0530',
          avatar: 'https://i.pravatar.cc/100?img=5',
          createdTime: 16,
          review: '出貨快，包裝完整',
          rating: 4.2,
          productItem: '',
          shown: true,
        },
        {
          username: 'rose2167895216',
          avatar: 'https://i.pravatar.cc/100?img=37',
          createdTime: 16,
          review: '很喜歡~',
          rating: 5,
          productItem: '',
          shown: true,
        },
        {
          username: 'tom895216',
          avatar: 'https://i.pravatar.cc/100?img=60',
          createdTime: 48,
          review: '會再回購',
          rating: 4,
          productItem: '',
          shown: false,
        },
        {
          username: 'lifedesign216',
          avatar: 'https://i.pravatar.cc/100?img=58',
          createdTime: 26,
          review: '出貨快速，商品質感不錯',
          rating: 4.5,
          productItem: '',
          shown: false,
        },
      ],
      fqa: [
        {
          id: 1,
          active: true,
          title: '商品須知',
          details: `
            <p>
              商品照片僅供示意，依當時的庫存狀況提供最好狀態的植栽 / 盆栽。因每株植物都是獨一無二，即使品種相同，也會因生長過程，受溫度、日照等季節變化有不完全相同的樣貌。
            </p>
          `,
        },
        {
          id: 2,
          active: false,
          title: '付款方式',
          details: `
            <p>信用卡安全加密付款、ATM 轉帳繳費、7-11 ibon 代碼繳費、全家 FamiPort 代碼繳費、LINE Pay</p>
          `,
        },
        {
          id: 3,
          active: false,
          title: '運送說明',
          details: `
            <p>
              宅配免運滿 NT$ 1,000 後，運費統一 NT$ 120<br/>
              滿 NT$ 1,500 免運費<br/>
              實際運費金額以購物車結算或是到貨時收取的金額為準。
            </p>
          `,
        },
      ],
    };
  },
  computed: {
    allProducts() {
      return this.$store.state.productsModules.allProducts;
    },
    ...mapState('favorListModules', {
      favorList: (state) => state.favorList,
    }),
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
    this.getAllProducts();
    this.getCart();
  },
  methods: {
    getAllProducts() {
      this.$store.dispatch('productsModules/getAllProducts');
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$store.dispatch('updateLoading', true);
      this.axios
        .get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
          // eslint-disable-next-line prefer-destructuring
          this.currentImg = this.tempProduct.imageUrl[0];
          this.$store.dispatch('updateLoading', false);
        }).catch(() => {
        });
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
            quantity: item.quantity + this.quantity,
          };

          this.axios
            .patch(api, cart)
            .then(() => {
              this.getCart();
              this.$bus.$emit('get-cart');
              this.quantity = 1;
              this.$store.dispatch('updateLoading', false);
            }).catch(() => {
              this.$store.dispatch('updateLoading', false);
            });
          return true;
        }
        return false;
      });
      if (!checkCart) {
        const cart = {
          product: id,
          quantity: this.quantity,
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
    addToFavorList(id) {
      this.$store.dispatch('favorListModules/addToFavorList', id);
      this.$bus.$emit('message:push', '已加入收藏', 'success');
    },
    removeFavorList(id) {
      this.$store.dispatch('favorListModules/removeFavorList', id);
      this.$bus.$emit('message:push', '已移除收藏', 'warning');
    },
  },
};
</script>

<style lang="scss">
.product-container {
  position: relative;
  .event {
    padding-left: 1rem;
    @apply border-l-4 border-primary-default;
  }
  .q-number {
    max-width: 120px;
    margin: 0 0.5rem;
    padding: 0.5rem;
    @apply text-lg border-2 border-gray-900 rounded-lg font-bold;
  }
  .product-description {
    p,
    img {
      margin-bottom: 1rem;
    }
  }
  .product-section-title {
    @apply font-bold text-2xl;
  }
}

@screen lg {
  .product-container {
    .product-section-title {
      @apply text-4xl;
    }
  }
}

@screen md {
  .product-container {
    .q-number {
      @apply text-xl;
    }
    .product-section-title {
      @apply text-3xl;
    }
  }
}

@screen sm {
  .q-number {
      max-width: 60px;
    }
}
</style>
