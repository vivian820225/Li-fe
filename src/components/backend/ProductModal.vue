<template>
  <div id="productModal" v-if="modalOpen">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen
        pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
          shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center
                h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
                     1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77
                     1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Deactivate account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent
              shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Deactivate
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border
              border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
              text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: ['product', 'isNew'],
  data() {
    return {
      modalOpen: false,
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getProductDetail(id, type) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;

      switch (type) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
            options: {},
          };
          this.modalOpen = true;
          this.isLoading = false;
          break;
        default:
          this.axios
            .get(api)
            .then((res) => {
              this.tempProduct = res.data.data;
              this.modalOpen = true;
              this.isLoading = false;
            });
          break;
      }
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }
      this.axios[httpMethod](api, this.tempProduct).then(() => {
        this.modalOpen = false;
        if (httpMethod === 'post') {
          this.$bus.$emit('message:push', '商品新增成功', 'success');
        } else {
          this.$bus.$emit('message:push', '商品更新成功', 'success');
        }
        this.$emit('updateList');
      }).catch(() => {
        this.modalOpen = false;
        this.$bus.$emit('message:push', '商品新增失敗', 'danger');
      });
    },
    /**
     * 上傳圖片
     */
    uploadFile() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      // 選取 DOM 中的檔案資訊
      const uploadedFile = this.$refs.file.files[0];
      // 轉換成 FormData
      const formData = new FormData();
      // 新增 file 欄位
      formData.append('file', uploadedFile);
      this.status.fileUploading = true;
      this.axios.post(api, formData, {
        // 聲明傳遞的資料為 FormData 的格式
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.status.fileUploading = false;
        // 200 為 HTTP 狀態碼 Successful responses 請求成功
        if (res.status === 200) {
          // 將圖片路徑傳進去
          this.tempProduct.imageUrl.push(res.data.data.path);
          // console.log(res.data.data.path);
        }
      }).catch(() => {
        this.$bus.$emit('message:push', '上傳不可超過 2MB', 'danger');
        this.status.fileUploading = false;
      });
    },
  },
};
</script>
