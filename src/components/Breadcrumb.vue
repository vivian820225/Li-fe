<template>
  <div class="breadcrumb">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{ 'linked' : !!breadcrumb.link }"
      >
        {{ breadcrumb.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      breadcrumbList: [],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  methods: {
    routeTo(prevRouteTo) {
      if (this.breadcrumbList[prevRouteTo].link) {
        this.$router.push(this.breadcrumbList[prevRouteTo].link);
      }
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 1rem;
}
ul {
  display: flex;
  list-style: none;
  padding: 0;
  font-size: 14px;
}
li {
  color: #2D2D2D;
  cursor: pointer;
  &:last-child {
    cursor: default;
  }
  &:not(:first-child)::before {
    content: ">";
    margin-left: 8px;
    margin-right: 4px;
  }
  &.linked {
    color: #909090;
    &:hover {
      color: #FFC107;
    }
  }
}
</style>
