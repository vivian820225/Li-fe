<template>
  <div class="w-full">
    <Loading :active.sync="isLoading"/>
    <div class="flex justify-center items-end flex-col">
      <div class="min-w-max w-full flex justify-between items-center">
          <h2 class="font-bold md:text-2xl text-xl flex items-center">
            <span class="material-icons text-3xl mr-2">
              fact_check
            </span>
            訂單管理列表
          </h2>
      </div>
      <table
        class="max-w-full w-full md:table flex flex-row flex-no-wrap md:bg-white
        md:rounded-b-none rounded-lg overflow-hidden my-5"
      >
        <thead>
          <tr
            v-for="(item, i) in orders.length"
            :key="i"
            class="flex flex-col flex-no wrap md:table-row rounded-l-lg
            md:rounded-none mb-2 md:mb-0
            bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th
              class="py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              訂單成立時間
            </th>
            <th
              class="py-2 px-3 text-left whitespace-nowrap
              md:border-none border-b border-gray-300"
            >
              應付金額
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300"
            >
              使用優惠券
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300"
            >
              是否付款
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-gray-300"
            >
              付款狀態
            </th>
            <th
              class="md:w-32 sm:w-24 py-2 px-3 md:text-center text-left md:border-none
              border-b border-transparent"
            >
              訂單詳情
            </th>
          </tr>
        </thead>
        <tbody class="flex-1 md:flex-none text-gray-600 text-sm font-light">
          <tr
            class="flex flex-col flex-no wrap md:table-row mb-2 md:mb-0 text-gray-500
            md:border-b border-gray-200 md:hover:bg-gray-100 bg-gray-50"
            v-for="(item, idx) in orders"
            :key="idx"
          >
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
            md:border-none border-b border-gray-100">
              {{ item.created.datetime }}
            </td>
            <td class="md:py-1 py-2 px-3 text-left whitespace-nowrap
            md:border-none border-b border-gray-100">
              {{ item.amount | currency }}
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
            md:border-none border-b border-gray-100">
            <span
              v-if="item.coupon"
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
            <td class="md:py-1 py-2 px-3 md:text-center
            md:border-none border-b border-gray-100">
            <label
              :for="item.id"
              class="flex md:justify-between items-center relative w-full
              cursor-pointer select-none"
            >
              <strong
                v-if="item.paid"
                class="text-green-500 md:flex-grow mr:mr-0 mr-2"
              >
                已付款
              </strong>
              <span
                v-else
                class="text-gray-500 md:flex-grow mr:mr-0 mr-2"
              >
                尚未付款
              </span>
              <div class="relative flex items-center">
                <input
                  type="checkbox"
                  class="toggle appearance-none transition-colors cursor-pointer
                  w-10 h-6 rounded-full shadow-inner"
                  :class="item.paid ? 'toggle-color' : 'bg-gray-300'"
                  :id="item.id"
                  v-model="item.paid"
                  @change="setOrderPaid(item)"
                />
                <span
                  class="w-4 h-4 right-5 absolute rounded-full
                  transform transition-transform bg-gray-100"
                  :class="item.paid ? 'translate-x-4' : ''"
                />
              </div>
            </label>
            </td>
            <td class="md:py-1 py-2 px-3 md:text-center
            md:border-none border-b border-gray-100">
              <span
                v-if="item.paid"
                class="bg-green-200 px-2 py-1 text-xs rounded-full font-ubu"
              >
                Completed
              </span>
              <span
                v-else
                class="bg-red-200 px-2 py-1 text-xs rounded-full font-ubu"
              >
                Outstanding
              </span>
            </td>
            <td class="py-1 px-3 md:text-center md:border-none border-b border-transparent">
              <div class="flex md:justify-center justify-start">
                <button
                  type="button"
                  class="md:p-2 px-2 rounded-l-md text-blue-500 transition
                hover:text-blue-600 flex items-center"
                @click="openModal(item)"
                >
                  <span class="material-icons text-xl">find_in_page</span>
                  <span>訂單詳情</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :pages="pagination"
        @updateList="getOrders()"
      />
    </div>
    <transition name="fade">
      <OrderModal
        :order-detail="orderDetail"
        ref="OrderModal"
        @updateList="getOrders()"
      />
    </transition>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/backend/OrderModal.vue';

export default {
  name: 'AdminOrders',
  data() {
    return {
      orders: {},
      orderDetail: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
    OrderModal,
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      this.axios
        .get(api)
        .then((res) => {
          this.orders = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
    },
    setOrderPaid(item) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      this.axios.patch(api, item.id).then(() => {
        this.$bus.$emit('message:push', '訂單狀態修改成功', 'success');
        this.getOrders();
      });
    },
    openModal(item) {
      this.orderDetail = { ...item };
      this.$refs.OrderModal.getOrderDetail(this.orderDetail.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  .toggle {
    border-color: transparent;
    &:checked {
      background-image: none;
    }
    &.toggle-color {
      @apply bg-green-400;
    }
  }
</style>
