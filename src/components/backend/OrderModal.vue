<template>
  <div id="orderModal" v-if="modalOpen">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen
        pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 transition-opacity"
          aria-hidden="true"
          @click="modalOpen = !modalOpen"
        >
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <!-- Modal -->
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <!-- Modal Heading -->
            <div
              class="flex justify-between items-center py-3 px-4 bg-gray-700 text-white"
            >
              <h3
                class="text-xl leading-6 font-bold"
              >
                訂單詳情
              </h3>
              <button
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                @click="modalOpen = !modalOpen"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <!-- Modal Content -->
            <div class="grid grid-flow-row gap-4 bg-white px-4 pt-5 pb-4">
              <!-- 訂購人詳情 -->
              <div class="grid grid-flow-row gap-2">
                <span>
                  訂單編號：{{tempOrder.id}}
                </span>
                <span>
                  訂購人：{{tempOrder.user.name}}
                </span>
                <span>
                  聯絡信箱：{{tempOrder.user.email}}
                </span>
                <span>
                  連絡電話：{{tempOrder.user.tel}}
                </span>
                <span>
                  收件地址：{{tempOrder.user.address}}
                </span>
              </div>
              <div class="block">
                <h3 class="font-bold text-xl mb-2">訂單詳情</h3>
                <table
                  class="max-w-full w-full mb-4 md:table flex flex-row flex-no-wrap md:bg-white
                  md:rounded-b-none rounded-lg overflow-hidden"
                >
                  <thead>
                    <tr
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
                        商品名稱
                      </th>
                      <th
                        class="py-2 px-3 text-left whitespace-nowrap
                        md:border-none border-b border-gray-300"
                      >
                        售價
                      </th>
                      <th
                        class="py-2 px-3 text-left whitespace-nowrap
                        md:border-none border-b border-transparent"
                      >
                        數量
                      </th>
                    </tr>
                  </thead>
                  <tbody class="flex-1 md:flex-none text-gray-600 text-sm font-light">
                    <tr
                      class="flex flex-col flex-no wrap md:table-row mb-2 md:mb-0 text-gray-500
                      md:border-b border-gray-200 bg-gray-50"
                      v-for="(item, i) in tempOrder.products"
                      :key="i"
                    >
                      <td
                        class="md:py-1 py-2 px-3 text-left whitespace-nowrap
                        md:border-none border-b border-gray-100">
                        {{ item.product.category }}
                      </td>
                      <td
                        class="md:py-1 py-2 px-3 text-left whitespace-nowrap
                        md:border-none border-b border-gray-100">
                        {{ item.product.title }}
                      </td>
                      <td
                        class="md:py-1 py-2 px-3 text-left whitespace-nowrap
                        md:border-none border-b border-gray-100">
                        {{ item.product.price }}
                      </td>
                      <td
                        class="md:py-1 py-2 px-3 text-left whitespace-nowrap
                        md:border-none border-b border-gray-100">
                        {{ item.quantity }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-end text-lg">
                  <span class="mr-4">訂單金額</span>
                  <span class="font-ubu">
                    NTD {{ tempOrder.amount | currency }}
                  </span>
                </div>
              </div>
            </div>
            <!-- Modal Footer -->
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border
                border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
                text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="modalOpen = !modalOpen"
              >
                關閉
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderModal',
  props: ['order-detail'],
  data() {
    return {
      modalOpen: false,
      tempOrder: {
        user: {},
        products: [],
      },
    };
  },
  methods: {
    getOrderDetail(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;

      this.axios
        .get(api)
        .then((res) => {
          this.tempOrder = res.data.data;
          this.modalOpen = true;
          this.isLoading = false;
        });
    },
  },
};
</script>
