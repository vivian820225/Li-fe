<template>
  <div>
    <Loading :active.sync="isLoading"/>
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
          <h1 class="h3">商品管理列表</h1>
          <button
            type="button"
            class="btn btn-primary"
            @click="openModal('new')"
            >
            建立新產品
          </button>
      </div>
      <table class="table mt-3">
        <thead>
          <tr>
            <th>分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="120">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in products" :key="idx">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price | currency  }}</td>
            <td>{{ item.price | currency  }}</td>
            <td>
              <span v-if="item.enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', item)"
                >
                  刪除
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

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
      isLoading: false,
    };
  },
  components: {
    Pagination,
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
          // console.log(res);
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
