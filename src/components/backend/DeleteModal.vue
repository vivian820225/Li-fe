<template>
  <div id="productModal" v-if="modalOpen">
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
        <!-- Modal -->
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-sm sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <!-- Modal Heading -->
            <div class="flex justify-between items-center py-3 px-4 bg-red-500">
              <h3
                class="text-xl leading-6 font-bold text-white"
              >
                刪除所選的項目
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
            <div class="flex flex-col justify-center items-center bg-white px-4 pt-5 pb-4">
              <p class="text-xl mb-2">
                您是否確定要刪除
                <strong class="text-red-500 font-bold pl-2">
                  <font class="font-ubu" v-if="!item.title">{{ item.id }}</font>
                  <font v-else>{{ item.title }}</font>
                </strong>
              </p>
              <p class="text-sm text-gray-500">- 刪除後無法返回動作，請謹慎操作 -</p>
            </div>
            <!-- Modal Footer -->
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent
                shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white
                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="deleteData"
              >
                確定刪除
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border
                border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
                text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="modalOpen = !modalOpen"
              >
                取消
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: ['item', 'isProduct', 'isCoupon'],
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    getDelData() {
      this.modalOpen = true;
    },
    deleteData() {
      let api = '';
      let msg = '';

      if (this.isProduct) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.item.id}`;
        msg = '商品刪除成功';
      } else if (this.isCoupon) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.item.id}`;
        msg = '優惠券刪除成功';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.item.id}`;
        msg = '圖片刪除成功';
      }

      this.axios
        .delete(api)
        .then(() => {
          this.modalOpen = false;
          this.$bus.$emit('message:push', msg, 'success');
        }).catch(() => {
          this.modalOpen = false;
          this.$bus.$emit('message:push',
            '發生錯誤！請連絡相關人員處理',
            'danger');
        });

      this.$emit('updateList');
    },
  },
};
</script>
