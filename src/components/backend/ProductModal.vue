<template>
  <div id="productModal" v-if="modalOpen">
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
              :class="isNew ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'"
            >
              <h3
                class="text-xl leading-6 font-bold"
              >
                {{ isNew ? "新增商品" : "編輯商品"}}
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
            <div class="flex md:flex-row flex-col justify-center bg-white px-4 pt-5 pb-4">
              <!-- 圖片上傳 -->
              <div class="flex-non md:mr-8">
                <!-- 圖片顯示 -->
                <img
                  v-if="tempProduct.imageUrl.length > 0"
                  class="w-full max-w-xs h-48 object-cover rounded-lg mb-4"
                  :src="tempProduct.imageUrl[0]"
                  alt
                />
                <div class="flex" v-if="tempProduct.imageUrl.length > 1">
                  <img
                    class="w-12 h-12 object-cover rounded-lg mb-4 mr-2"
                    v-for="(img, i) in tempProduct.imageUrl"
                    :key="i"
                    :src="img"
                    alt
                  />
                </div>
                <div class="block mb-4">
                  <label for="imageUrl">請輸入圖片網址</label>
                  <input
                    type="text"
                    id="imageUrl"
                    class="input-field"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl[0]"
                  />
                </div>
                <div class="block">
                  <label for="customFile">
                    或 上傳圖片 <span class="text-xs">( 圖片大小不得大於 2MB )</span>
                    <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <div class="overflow-hidden relative w-full mb-4">
                    <button
                      class="bg-gray-500 hover:bg-gray-600 text-white
                      py-2 px-4 w-full inline-flex justify-center items-center rounded-lg"
                    >
                        <i class="fas fa-upload mr-2"></i>
                        <span>選擇圖片</span>
                    </button>
                    <input
                      type="file"
                      id="customFile"
                      ref="file"
                      class="cursor-pointer absolute opacity-0 left-0 top-0 bottom-0 right-0"
                      @change="uploadFile"
                    />
                  </div>
                </div>
              </div>
              <!-- 商品詳情 -->
              <div class="md:flex-grow grid grid-cols-1 gap-4">
                <label class="block">
                  <span class="text-gray-700">商品名稱</span>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="請輸入商品名稱"
                    v-model="tempProduct.title"
                  />
                </label>
                <div class="grid md:grid-flow-col gap-4">
                  <label class="block">
                    <span class="text-gray-700">分類</span>
                    <input
                      type="text"
                      class="input-field"
                      placeholder="請輸入商品分類"
                      v-model="tempProduct.category"
                    />
                  </label>
                  <label class="block">
                    <span class="text-gray-700">單位</span>
                    <input
                      type="text"
                      class="input-field"
                      placeholder="請輸入商品單位"
                      v-model="tempProduct.unit"
                    />
                  </label>
                </div>
                <div class="grid md:grid-flow-col gap-4">
                  <label class="block">
                    <span class="text-gray-700">原價</span>
                    <input
                      type="text"
                      class="input-field"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </label>
                  <label class="block">
                    <span class="text-gray-700">售價</span>
                    <input
                      type="text"
                      class="input-field"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </label>
                </div>
                <label class="block">
                  <span class="text-gray-700">商品說明</span>
                  <textarea
                      type="text"
                      class="input-field"
                      placeholder="請輸入商品說明"
                      v-model="tempProduct.description"
                      rows="3"
                    ></textarea>
                </label>
                <label class="block vueEditor">
                  <span class="text-gray-700">詳細介紹</span>
                  <vue-editor
                    v-model="tempProduct.content"
                    :editor-toolbar="customToolbar"
                  >
                  </vue-editor>
                </label>
                <div class="flex justify-start items-center">
                  <label class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      class="checkbox-field mr-1"
                      v-model="tempProduct.enabled"
                    />
                    <span>是否啟用</span>
                  </label>
                  <label class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      class="checkbox-field mr-1"
                      v-model="tempProduct.options.popular"
                    />
                    <span>熱門商品</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="checkbox-field mr-1"
                      v-model="tempProduct.options.recommend"
                    />
                    <span>推薦商品</span>
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
                @click="updateProduct"
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
import { VueEditor } from 'vue2-editor';

export default {
  name: 'ProductModal',
  props: ['product', 'isNew'],
  data() {
    return {
      customToolbar: [
        // [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'code-block'],
      ],
      modalOpen: false,
      tempProduct: {
        imageUrl: [],
        options: {
          popular: false,
          recommend: false,
        },
      },
      status: {
        fileUploading: false,
      },
    };
  },
  components: { VueEditor },
  methods: {
    getProductDetail(id, type) {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;

      switch (type) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
            options: {
              popular: false,
              recommend: false,
            },
          };
          this.modalOpen = true;
          this.$store.dispatch('updateLoading', false);
          break;
        default:
          this.axios
            .get(api)
            .then((res) => {
              this.tempProduct = res.data.data;
              this.modalOpen = true;
              this.$store.dispatch('updateLoading', false);
            }).catch(() => {
              this.$bus.$emit('message:push', '資料索取失敗', 'danger');
              this.$store.dispatch('updateLoading', false);
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
    uploadFile() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();

      formData.append('file', uploadedFile);
      this.status.fileUploading = true;
      this.axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.status.fileUploading = false;
        // 200 為 HTTP 狀態碼 Successful responses 請求成功
        if (res.status === 200) {
          this.tempProduct.imageUrl.push(res.data.data.path);
        }
      }).catch(() => {
        this.$bus.$emit('message:push', '上傳不可超過 2MB', 'danger');
        this.status.fileUploading = false;
      });
    },
  },
};
</script>

<style lang="scss">
  // @import "~vue2-editor/dist/vue2-editor.css";
  .vueEditor {
    .ql-snow .ql-toolbar button, .ql-snow.ql-toolbar button {
      float: initial;
    }
    .quillWrapper .ql-snow.ql-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 8px 4px;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      border-width: 2px;
      @apply border-gray-500;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      border-width: 2px;
      @apply border-gray-500;
    }
    .quillWrapper .ql-toolbar.ql-snow .ql-formats {
      display: flex;
      align-items: center;
      margin: 0 .5rem;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
</style>
