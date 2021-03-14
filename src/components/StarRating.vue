<template>
  <div class="rating">
    <ul class="star-list">
      <li
        v-for="(star, idx) in maxStars"
        :key="idx"
        class="star"
        :class="{ 'active': star <= stars }"
      >
        <span class="material-icons">
          star
        </span>
      </li>
    </ul>
    <span class="rating-counter" v-if="hasCounter">
      {{ counter }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    score: {
      type: Number,
      required: true,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
    hasCounter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stars: this.score,
    };
  },
  computed: {
    counter() {
      return `${this.stars} of ${this.maxStars}`;
    },
  },
  methods: {
    // rate(star) {
    //   if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
    //     this.stars = this.stars === star ? star - star : star;
    //   }
    // },
  },
};
</script>

<style lang="scss">
.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  .star-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .star {
    color: #ECECEC;
  }
  .active {
    color: #FFC107;
  }
  .rating-counter {
    color: #4B4B4B;
    font-size: 14px;
  }
}
</style>
