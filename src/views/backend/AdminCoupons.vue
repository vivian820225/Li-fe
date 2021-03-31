<template>
  <div class="w-full">
    <div class="flex justify-center items-end flex-col">
      <div class="min-w-max w-full flex justify-between items-center">
          <h2 class="font-bold md:text-2xl text-xl flex items-center">
            <span class="material-icons text-3xl mr-2">
              paid
            </span>
            優惠券管理列表
          </h2>
          <button
            type="button"
            class="flex justify-center items-center rounded-lg px-3 py-2 border
            border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white
            transition select-none"
            @click="openModal('created')"
            >
            <span class="material-icons md:mr-2">library_add</span>
            <span class="md:inline-block hidden">新增優惠券</span>
          </button>
      </div>
      <table
        class="max-w-full w-full md:table flex flex-row flex-no-wrap md:bg-white
        md:rounded-b-none rounded-lg overflow-hidden my-5"
      >
        <thead>
          <tr
            v-for="(item, i) in coupons.length"
            :key="i"
            class="flex flex-col flex-no wrap md:table-row rounded-l-lg
            md:rounded-none mb-2 md:mb-0
            bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th
              class="md:w-40 py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              生成時間
            </th>
            <th
              class="md:w-40 py-2 px-3 text-left md:border-none
              border-b border-gray-300 whitespace-nowrap"
            >
              有效期限
            </th>
            <th
              class="py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300 whitespace-nowrap"
            >
              活動名稱
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300 whitespace-nowrap"
            >
              優惠券代碼
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300 whitespace-nowrap"
            >
              狀態
            </th>
            <th
              class="md:w-40 py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              更新時間
            </th>
            <th
              class="md:w-12 py-2 px-3 md:text-center text-left md:border-none
              border-b border-transparent whitespace-nowrap"
            >
              編輯
            </th>
          </tr>
        </thead>
        <tbody class="flex-1 md:flex-none text-gray-600 text-sm font-light">
          <tr
            class="flex flex-col flex-no wrap md:table-row mb-2 md:mb-0 text-gray-500
            md:border-b border-gray-200 md:hover:bg-gray-100 bg-gray-50"
            v-for="(item) in coupons"
            :key="item.id"
          >
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-100">
              {{ item.created.datetime }}
            </td>
            <td class="md:py-1 py-2 px-3 text-left
              md:border-none border-b border-gray-100">
              {{ item.deadline.datetime }}
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
              md:border-none border-b border-gray-100">
              {{ item.title }}
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
              md:border-none border-b border-gray-100">
              {{ item.code }}
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
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-100">
              {{ item.updated.datetime }}
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
        @updateList="getCoupons"
      />
    </div>
    <transition name="fade">
      <CouponModal
        :item="tempCoupon"
        :status="status"
        ref="CouponModal"
        @updateList="getCoupons"
      />
    </transition>
    <transition name="fade">
      <DeleteModal
        :item="tempCoupon"
        :is-coupon="isCoupon"
        ref="DeleteModal"
        @updateList="getCoupons"
      />
    </transition>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import CouponModal from '@/components/backend/CouponModal.vue';
import DeleteModal from '@/components/backend/DeleteModal.vue';

export default {
  name: 'AdminCoupons',
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      pagination: {},
      isCoupon: true,
      isNew: false,
      status: '',
    };
  },
  components: {
    Pagination,
    CouponModal,
    DeleteModal,
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.axios
        .get(api)
        .then((res) => {
          this.coupons = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.$store.dispatch('updateLoading', false);
        }).catch(() => {
          this.$bus.$emit('message:push', '資料索取失敗', 'danger');
          this.$store.dispatch('updateLoading', false);
        });
    },
    openModal(status, item) {
      this.status = status;
      switch (status) {
        case 'created':
          this.isNew = true;
          this.status = 'created';
          this.tempCoupon = {};
          this.$refs.CouponModal.getCouponDetail(this.tempCoupon.id, status);
          break;
        case 'edit':
          this.isNew = false;
          this.status = 'edit';
          this.tempCoupon = { ...item };
          this.$refs.CouponModal.getCouponDetail(this.tempCoupon.id, status);
          break;
        case 'delete':
          this.tempCoupon = { ...item };
          this.$refs.DeleteModal.getDelData(this.tempCoupon.id);
          break;
        default:
          break;
      }
    },
  },
};
</script>
