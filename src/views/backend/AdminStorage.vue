<template>
  <div class="w-full">
    <Loading :active.sync="isLoading"/>
    <div class="flex justify-center items-end flex-col">
      <div class="min-w-max w-full flex justify-between items-center">
          <h2 class="font-bold md:text-2xl text-xl flex items-center">
            <span class="material-icons text-3xl mr-2">
              panorama
            </span>
            圖片列表
          </h2>
      </div>
      <table
        class="max-w-full w-full md:table flex flex-row flex-no-wrap md:bg-white
        md:rounded-b-none rounded-lg overflow-hidden my-5"
      >
        <thead>
          <tr
            v-for="(item, i) in storage.length"
            :key="i"
            class="flex flex-col flex-no wrap md:table-row rounded-l-lg
            md:rounded-none mb-2 md:mb-0
            bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th
              class="py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              圖片
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
            v-for="(item, idx) in storage"
            :key="idx"
          >
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
            md:border-none border-b border-gray-100">
              <img
                class="w-16 h-16 object-cover rounded-lg"
                :src="item.path"
                alt=""
              >
            </td>
            <td class="py-1 px-3 md:text-center md:border-none border-b border-transparent">
              <div class="flex md:justify-center justify-start">
                <button
                  type="button"
                  class="md:p-2 px-2 rounded-r-md text-red-400 transform transition
                  md:hover:scale-125 hover:text-red-500 flex items-center"
                  @click="openDelModal(item)"
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
        @updateList="getStorage()"
      />
    </div>
    <transition name="fade">
      <DeleteModal
        :item="tempItem"
        ref="DeleteModal"
        @updateList="getStorage()"
      />
    </transition>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import DeleteModal from '@/components/backend/DeleteModal.vue';

export default {
  name: 'AdminStorage',
  data() {
    return {
      storage: [],
      tempItem: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
    DeleteModal,
  },
  created() {
    this.getStorage();
  },
  methods: {
    getStorage(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`;
      this.axios
        .get(api)
        .then((res) => {
          this.storage = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          this.$bus.$emit('message:push', '資料索取失敗', 'danger');
          this.isLoading = false;
        });
    },
    openDelModal(item) {
      this.tempItem = { ...item };
      this.$refs.DeleteModal.getDelData(this.tempItem.id);
    },
  },
};
</script>
