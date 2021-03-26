<template>
  <div id="couponModal" v-if="modalOpen">
    <div class="fixed z-60 inset-0 overflow-y-auto">
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
              class="flex justify-between items-center py-3 px-4"
              :class="status === 'created' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'"
            >
              <h3
                class="text-xl leading-6 font-bold"
              >
                {{ status === 'created' ? "新增優惠券" : "編輯優惠券"}}
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
            <div class="flex justify-center bg-white px-4 pt-5 pb-4">
              <!-- 優惠券詳情 -->
              <div class="flex-grow grid gap-4">
                <label class="block">
                  <span class="text-gray-700">活動名稱</span>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="請輸入活動名稱"
                    v-model="tempCoupon.title"
                  />
                </label>
                <div class="grid md:grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-gray-700">優惠代碼</span>
                    <input
                      type="text"
                      class="input-field"
                      placeholder="請輸入優惠代碼"
                      v-model="tempCoupon.code"
                    />
                  </label>
                  <label class="block">
                    <span class="text-gray-700">優惠折扣</span>
                    <input
                      type="text"
                      class="input-field"
                      v-model="tempCoupon.percent"
                    />
                  </label>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <label class="block">
                    <span class="text-gray-700">到期日</span>
                    <input
                      type="date"
                      class="input-field"
                      v-model="due_date"
                    />
                  </label>
                  <label class="block">
                    <span class="text-gray-700">到期時間</span>
                    <input
                      type="time"
                      step="1"
                      class="input-field"
                      placeholder="請選擇時間"
                      v-model="due_time"
                    />
                  </label>
                </div>
                <div class="flex justify-start items-center">
                  <label class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      class="checkbox-field mr-1"
                      v-model="tempCoupon.enabled"
                    />
                    <span>是否啟用</span>
                  </label>
                </div>
              </div>
            </div>
            <!-- Modal Footer -->
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent
                shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white
                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="updateCoupon"
              >
                確定儲存
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
  name: 'CouponModal',
  props: ['item', 'status', 'isNew'],
  data() {
    return {
      modalOpen: false,
      tempCoupon: {
        title: '',
        code: '',
        percent: 100,
        deadline_at: 0,
        enabled: false,
      },
      due_date: '',
      due_time: '',
      dedlineAt: '',
    };
  },
  computed: {
    state() {
      return this.status;
    },
  },
  methods: {
    getCouponDetail(id, status) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;

      switch (status) {
        case 'created':
          this.tempCoupon = {};
          this.modalOpen = true;
          this.isLoading = false;
          break;
        default:
          this.axios
            .get(api)
            .then((res) => {
              this.tempCoupon = res.data.data;
              this.dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
              [this.due_date, this.due_time] = this.dedlineAt;
              this.modalOpen = true;
              this.isLoading = false;
            }).catch(() => {
              this.$bus.$emit('message:push', '資料索取失敗', 'danger');
              this.isLoading = false;
            });
          break;
      }
    },
    updateCoupon() {
      this.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = '';
      let statusMsg = '';

      if (this.state === 'created') {
        httpMethod = 'post';
        statusMsg = '新增成功！';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
        httpMethod = 'patch';
        statusMsg = '更新成功！';
      }

      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;

      this.axios[httpMethod](api, this.tempCoupon).then(() => {
        this.modalOpen = false;
        this.$bus.$emit('message:push', statusMsg, 'success');
        this.$emit('updateList');
        this.isLoading = false;
      }).catch(() => {
        this.$bus.$emit('message:push', '發生錯誤！請連絡相關人員處理', 'danger');
        this.modalOpen = false;
        this.isLoading = false;
      });
    },
  },
};
</script>
