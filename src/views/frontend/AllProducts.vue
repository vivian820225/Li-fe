<template>
  <div class="w-full mx-auto">
    <Loading :active.sync="isLoading" />
    <EventCarousel class="md:mb-16 mb-8" />
    <section class="products max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
      <div class="flex justify-between items-start md:flex-row flex-col">
        <!-- 分類 -->
        <div class="category-section lg:mr-16 md:mr-8">
          <h3 class="font-bold md:text-3xl text-2xl mb-6">商品分類</h3>
          <div class="category-wrapper">
            <ul class="category md:block flex flex-row">
              <li>
                <a class="item">
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
                <a class="item">
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
                <a class="item">
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
                <a class="item">
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
                <a class="item">
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
                <a class="item">
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
                <a class="item border-none">
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
        <div class="products-list-section mb-8 md:mb-28">
          <div class="flex sm:justify-between justify-end items-center mb-6">
            <p class="text-gray-500 md:block hidden">全部商品共 24 項，顯示 1 - 12 項</p>
            <Select
              :data="Options"
              v-model="selectedOption"
              @valueSelect="onValueSelect"
            >
              <template v-slot:SelectLabel> 排序 </template>
            </Select>
          </div>
          <div class="products-list">
            <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
              <ProductCard
                :item="product"
                :is-like="isLike"
                v-for="(product, idx) in products"
                :key="idx"
              />
            </div>
            <div class="pagnation-section flex justify-end items-center">
              <Pagination
                class=""
                :pages="pagination"
                @updateList="getProducts()"
              />
              <!-- <Select
              :data="pagination"
              v-model="pagination.current_page"
              @valueSelect="getProducts()">
                <template v-slot:SelectLabel>
                  前往頁面
                </template>
              </Select> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import EventCarousel from '@/components/EventCarousel.vue';
import ProductCard from '@/components/ProductCard.vue';
import Select from '@/components/Select.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'AllProducts',
  data() {
    return {
      products: [],
      isLike: false,
      isDown: false,
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      pagination: {},
      isLoading: false,
      selectToggle: false,
      selectedOption: '上架時間由新到舊',
      Options: ['上架時間由新到舊', '上架時間由舊到新', '價格由低到高', '價格由高到低'],
    };
  },
  components: {
    EventCarousel,
    ProductCard,
    Select,
    Pagination,
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollSection();
    });
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;

      this.axios
        .get(api)
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    onValueSelect(value) {
      this.selectedOption = value;
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

<style lang="scss">
.category-section {
  max-width: 100%;
}
.category-wrapper {
  width: 100%;
  transition: all .2s;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }
}
.category {
  @apply pb-8;
  li {
    display: block;
    @apply border rounded mr-4;
    .item-icon {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &:first-of-type {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-all.svg");
      }
    }
    &:nth-of-type(2) {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-plant.svg");
      }
    }
    &:nth-of-type(3) {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-pots.svg");
      }
    }
    &:nth-of-type(4) {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-light.svg");
      }
    }
    &:nth-of-type(5) {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-deco.svg");
      }
    }
    &:nth-of-type(6) {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-candle.svg");
      }
    }
    &:last-of-type {
      .item-icon {
        background-image: url("~@/assets/images/icon/icon-customization.svg");
      }
    }
    &:hover {
      @apply text-primary-default bg-gray-50;
      &:first-of-type {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-all-yellow.svg");
        }
      }
      &:nth-of-type(2) {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-plant-yellow.svg");
        }
      }
      &:nth-of-type(3) {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-pots-yellow.svg");
        }
      }
      &:nth-of-type(4) {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-light-yellow.svg");
        }
      }
      &:nth-of-type(5) {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-deco-yellow.svg");
        }
      }
      &:nth-of-type(6) {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-candle-yellow.svg");
        }
      }
      &:last-of-type {
        .item-icon {
          background-image: url("~@/assets/images/icon/icon-customization-yellow.svg");
        }
      }
    }
  }
  .item {
    @apply flex justify-between items-center
      whitespace-nowrap px-3 py-2 cursor-pointer;
    img {
      margin-right: 8px;
    }
  }
}

.listbox-item {
  @apply text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9;
  &:hover {
    @apply text-white bg-indigo-600;
  }
  .flex justify-start items-center {
    @apply ml-3 block font-normal truncate;
    &:hover {
      @apply font-semibold;
    }
  }
}

@screen md {
  .category-wrapper {
    overflow: initial;
    padding: 0;
  }
  .category {
    width: 200px;
    overflow-x: hidden;
    @apply border rounded-lg pb-0;
    li {
      @apply border-none mr-0;
    }
    .item {
      @apply px-4 py-3 border-b;
    }
  }
}
</style>
