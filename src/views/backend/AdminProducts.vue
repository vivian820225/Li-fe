<template>
  <div class="w-full">
    <Loading :active.sync="isLoading"/>
    <div class="flex justify-center items-end flex-col">
      <div class="min-w-max w-full flex justify-between items-center">
          <h2 class="font-bold md:text-2xl text-xl flex items-center">
            <span class="material-icons text-3xl mr-2">
              dashboard_customize
            </span>
            商品管理列表
          </h2>
          <button
            type="button"
            class="flex justify-center items-center rounded-lg px-3 py-2 border
            border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white
            transition select-none"
            @click="openModal('new')"
            >
            <span class="material-icons md:mr-2">library_add</span>
            <span class="md:inline-block hidden">建立新產品</span>
          </button>
      </div>
      <table
        class="max-w-full w-full md:table flex flex-row flex-no-wrap md:bg-white
        md:rounded-b-none rounded-lg overflow-hidden my-5"
      >
        <thead>
          <tr
            v-for="(item, i) in products.length"
            :key="i"
            class="flex flex-col flex-no wrap md:table-row rounded-l-lg
            md:rounded-none mb-2 md:mb-0
            bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th
              class="py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              分類
            </th>
            <th
              class="py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              產品名稱
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300"
            >
              原價
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300"
            >
              售價
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300"
            >
              是否啟用
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-transparent"
            >
              編輯
            </th>
          </tr>
        </thead>
        <tbody class="flex-1 md:flex-none text-gray-600 text-sm font-light">
          <tr
            class="flex flex-col flex-no wrap md:table-row mb-2 md:mb-0 text-gray-500
            md:border-b border-gray-200 md:hover:bg-gray-100 bg-gray-50"
            v-for="(item, idx) in products"
            :key="idx"
          >
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
            md:border-none border-b border-gray-100">
              {{ item.category }}
            </td>
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
            md:border-none border-b border-gray-100">
              {{ item.title }}
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
            md:border-none border-b border-gray-100">
              {{ item.origin_price | currency  }}
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
            md:border-none border-b border-gray-100">
              {{ item.price | currency  }}
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
            md:border-none border-b border-gray-100">
              <span
                v-if="item.enabled"
                class="bg-green-200 px-2 py-1 text-xs rounded-full font-ubu"
              >
                Active
              </span>
              <span
                v-else
                class="bg-yellow-200 px-2 py-1 text-xs rounded-full font-ubu"
              >
                Disabled
              </span>
            </td>
            <td class="py-1 px-3 md:text-center md:border-none border-b border-transparent">
              <div class="flex md:justify-center justify-start">
                <button
                  type="button"
                  class="md:p-2 px-2 rounded-l-md text-blue-500 transform transition
                  md:hover:scale-125 hover:text-blue-600 flex items-center"
                  @click="openModal('edit', item)"
                >
                  <span class="material-icons text-xl">edit</span>
                  <span class="md:hidden">編輯</span>
                </button>
                <button
                  type="button"
                  class="md:p-2 px-2 rounded-r-md text-red-400 transform transition
                  md:hover:scale-125 hover:text-red-500 flex items-center"
                  @click="openModal('delete', item)"
                >
                  <span class="material-icons text-xl">delete</span>
                  <span class="md:hidden">刪除</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :pages="pagination"
        @updateList="getProducts()"
      />
    </div>
    <transition name="fade">
      <ProductModal
        :product="tempProduct"
        :is-new="isNew"
        ref="ProductModal"
        @updateList="getProducts()"
      />
    </transition>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/backend/ProductModal.vue';

export default {
  name: 'AdminProducts',
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      pagination: {},
      isProduct: true,
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    Pagination,
    ProductModal,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.axios
        .get(api)
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.isNew = true;
          this.tempProduct = {
            imageUrl: [],
            options: {},
          };
          this.$refs.ProductModal.getProductDetail(this.tempProduct.id, type);
          break;
        case 'edit':
          this.tempProduct = { ...item };
          this.isNew = false;
          this.$refs.ProductModal.getProductDetail(this.tempProduct.id, type);
          break;
        case 'delete':
          this.tempProduct = { ...item };
          this.$refs.DeleteModal.getDelData(this.tempProduct.id);
          break;
        default:
          this.tempProduct = item;
          this.showProductModal = true;
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/layout/backend/_admin-products.scss';
</style>
