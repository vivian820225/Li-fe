<template>
  <div class="w-full mx-auto">
    <Loading :active.sync="isLoading" />
    <div class="max-w-screen-xl mx-auto font-sans xl:px-0 lg:px-8 px-4">
      <Breadcrumb />
      <section class="product-container">
        <div id="productInfo" class="info">
          <div
            class="inline-block px-4 py-1 text-sm text-gray-500
            bg-gray-200 rounded-full mb-4"
          >
            {{ tempProduct.category }}
          </div>
          <h2 class="text-4xl font-bold mb-4">
            {{ tempProduct.title }}
          </h2>
          <div class="text-lg">
            {{ tempProduct.content }}
          </div>
          <hr class="divider-line" />
          <div class="event text-lg">
            全店購物不限金額，全台免運<br />
            開幕慶限時 9 折，優惠碼 green2021
          </div>
          <hr class="divider-line" />
          <div class="mb-6">
            <div v-if="!tempProduct.price" class="text-4xl font-bold font-ubu">
              NT$ {{ tempProduct.origin_price }}
            </div>
            <div v-else class="flex justify-start items-center">
              <div class="text-4xl font-bold mr-6">
                優惠價
                <span class="font-ubu">NT$ {{ tempProduct.price }}</span>
              </div>
              <div class="text-lg line-through text-gray-500">
                原價
                <span class="font-ubu">NT$ {{ tempProduct.origin_price }}</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex justify-center items-center flex-none mr-4">
              <button
                type="button"
                class="text-xl w-10 h-10 hover:text-primary-default transition"
                :class="{'text-gray-300 pointer-events-none': quantity === 1}"
                @click="quantity = quantity - 1"
              >
                <span class="material-icons text-3xl block">remove</span>
              </button>
              <input
                type="number"
                class="q-number"
                :value="quantity"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              />
              <button
                type="button"
                class="text-xl w-10 h-10 hover:text-primary-default transition"
                @click="quantity = quantity + 1"
              >
                <span class="material-icons text-3xl">add</span>
              </button>
            </div>
            <button
              type="button"
              class="flex-grow btn bg-primary-default mr-4 hover:bg-primary-dark transition"
              @click="addToCart(tempProduct.id)"
            >
              加入購物車
              <span class="material-icons"> shopping_basket </span>
            </button>
            <button
              type="button"
              :class="{ 'bg-primary-default': isLike }"
              @click="isLike = !isLike"
              class="flex-none border-2 border-primary-default rounded-lg px-3 py-2
              hover:bg-gray-50 transition"
            >
              <span
                class="material-icons block text-primary-dark"
                v-if="isLike"
              >
                favorite
              </span>
              <span class="material-icons block text-primary-default" v-else>
                favorite_border
              </span>
            </button>
          </div>
        </div>
        <div class="main-content">
          <div class="product-pic mb-10">
            <img
              class="w-full rounded-2xl mb-4"
              :src="(currentImg = tempProduct.imageUrl[0])"
              :alt="tempProduct.title"
            />
            <div class="other-pic flex justify-start items-center">
              <img
                class="w-16 h-16 object-cover rounded-2xl mr-4 cursor-pointer"
                v-for="(img, key) in tempProduct.imageUrl"
                :key="tempProduct.id + key"
                :src="img"
                @click="currentImg = img"
              />
            </div>
          </div>
          <section class="product-description mb-10">
            <h3 class="product-section-title">產品描述</h3>
            <hr class="divider-line" />
            <div class="text-lg">
              <p>
                典雅白釉陶瓷設計，簡約穩重，適合自家擺設或送禮祝賀，為日常的生活空間點綴些色彩。
                盆器底部孔洞設計，增加散熱通風空間，為植物根部打造優良的生活環境，健康茁壯。
              </p>
              <img src="https://picsum.photos/800/300" alt="" />
              <p>盆器資訊 盆器尺寸：高 11 CM X 寬 9 CM 盆器材質：白釉陶瓷</p>
            </div>
          </section>
          <section class="fqa mb-10">
            <h3 class="product-section-title">常見問答</h3>
            <hr class="divider-line" />
            <Accordion id="accordion-fqa" :content="fqa" ref="linkDiv"/>
            <!-- 多項展開，增加 multiple -->
            <!-- <Accordion id="accordion-fqa" :content="fqa" multiple="multiple" /> -->
          </section>
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
                  <div class="info mr-4 flex-grow">
                    <div class="flex justify-start items-center mb-2 text-sm">
                      <p class="mr-6">{{ item.username }}</p>
                      <p class="text-gray-500">
                        <span class="mr-2">{{ item.createdTime }} 天前</span>所留下的購買評價
                      </p>
                    </div>
                    <p>{{ item.review }}</p>
                  </div>
                  <StarRating :score="item.rating" class="mr-4"/>
                   <img
                    :src="tempProduct.imageUrl[0]"
                    :alt="tempProduct.title"
                    class="w-14 h-14 rounded-lg flex-none"
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
      </section>
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
      <HotProducts :products="products" class="md:mb-12 mb-6"/>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import Breadcrumb from '@/components/Breadcrumb.vue';
import HotProducts from '@/components/HotProducts.vue';
import Accordion from '@/components/Accordion.vue';
import StarRating from '@/components/StarRating.vue';

export default {
  name: 'Product',
  components: {
    Breadcrumb,
    HotProducts,
    Accordion,
    StarRating,
  },
  data() {
    return {
      products: [],
      cart: [],
      tempProduct: {
        imageUrl: [],
      },
      quantity: 1,
      currentImg: '',
      isLike: false,
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
      isLoading: false,
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
        {
          id: 4,
          active: false,
          title: '退款換貨須知',
          details: `
            <p>
              <a id="guideLink" class="underline cursor-pointer">點我了解</a>
              完整退款換貨須知
            </p>
          `,
        },
      ],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getProduct(id);
    this.getProducts();
    this.getCart();
  },
  mounted() {
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;

      this.axios
        .get(api)
        .then((res) => {
          this.products = res.data.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.tempProduct = res.data.data;
          this.isLoading = false;
        }).catch(() => {
        });
    },
    goToGuide() {
      this.$router.push('/guide').catch(() => {});
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
    addToCart(id) {
      this.isLoading = true;
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
              this.isLoading = false;
            }).catch(() => {
              this.isLoading = false;
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
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.product-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem;
  grid-template-areas: "G2 G1";
  .info {
    grid-area: G1;
  }
  .main-content {
    grid-area: G2;
    max-width: 768px;
  }
  .event {
    padding-left: 1rem;
    @apply border-l-4 border-primary-default;
  }
  .q-number {
    max-width: 60px;
    margin: 0 0.5rem;
    padding: 0.5rem;
    @apply text-xl border-2 border-gray-900 rounded-lg font-bold;
  }
  .product-description {
    p,
    img {
      margin-bottom: 1rem;
    }
  }
  .product-section-title {
    @apply font-bold text-3xl;
  }
}
</style>
