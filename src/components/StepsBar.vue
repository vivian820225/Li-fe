<template>
  <div class="stepper">
    <li class="stepper__step"
      v-for="(step, id) in steps"
      :key="id"
      :class="{'done': step.done}"
    >
      <input
        class="stepper__input"
        type="checkbox"
        :id="step.id"
        :checked="step.done"
      />
      <label class="stepper__button" :for="step.id"></label>
      <p class="stepper__content">{{ step.title }}</p>
    </li>
  </div>
</template>

<script>
export default {
  name: 'StepsBar',
  props: ['steps'],
};
</script>

<style lang="scss">
.stepper {
  --s-stepper-bullet: 2rem;
  --s-stepper-bullet-half: calc(var(--s-stepper-bullet) / 2);
  --step-transition: background 0.5s, color 0.5s;
  --step-content: counter(current-step);
  --step-color: hsl(0, 0%, 80%);
  --step-text-color: hsl(0, 0%, 20%);
  --step-bar-bg: hsl(0, 0%, 80%);
  --step-bullet-bg: hsl(0, 0%, 80%);
  --step-bullet-color: #fff;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  counter-reset: current-step;
  z-index: 1;
  &__input {
    counter-increment: steps;
    display: none;
  }
  &__step {
    position: relative;
    list-style: none;
    counter-increment: current-step;
    // progress bar
    &::before {
      content: "";
      position: absolute;
      width: 20%;
      height: calc(var(--s-stepper-bullet-half) / 2);
      background: var(--step-bar-bg);
      transition: var(--step-transition);
      top: var(--s-stepper-bullet-half);
      right: 50%;
      transform: translate(0, -50%);
      z-index: -1;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: calc(var(--s-stepper-bullet-half) / 2);
      background: var(--step-bar-bg);
      transition: var(--step-transition);
      top: var(--s-stepper-bullet-half);
      left: 50%;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      transform: translate(0, -50%);
      z-index: -2;
    }
    &:last-of-type::after,
    &:first-of-type::before {
      display: none;
    }
    &.done::after,
    &.done::before {
      background: var(--primary);
    }
  }
  &__content {
    padding: 0.5rem;
    color: var(--step-text-color);
    font-family: "微軟正黑體", "Microsoft JhengHei", "Roboto",
    "Helvetica Neue",'Segoe UI', Arial, sans-serif;
    font-weight: bold;
    text-align: center;
    transition: opacity 0.5s 0.05s;
    &::selection {
      color: var(--step-text-color);
      background: var(--step-bullet-color);
    }
  }
  &__button {
    position: relative;
    display: block;
    color: var(--step-color);
    text-align: center;
    pointer-events: none;
    // bullet
    &::before {
      content: var(--step-content);
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--s-stepper-bullet);
      height: var(--s-stepper-bullet);
      margin: 0 auto;
      color: var(--step-bullet-color);
      background: var(--step-bullet-bg);
      font-family: Arial, Helvetica, sans-serif;
      border-radius: var(--s-stepper-bullet);
      transition: var(--step-transition);
    }
  }
}
.stepper__input:checked ~ .stepper__button {
  --step-color: hsl(0, 0%, 20%);
  --step-bar-bg: hsl(0, 0%, 80%);
  --step-bullet-bg: var(--step-bar-bg);
  --step-bullet-color: hsl(0, 0%, 20%);
  --step-content: "✔";
}
.stepper__input:checked ~ .stepper__content {
    opacity: .5;
    pointer-events: none;
    user-select: none;
}
.stepper__input:checked + .stepper__button {
  --step-bullet-bg: var(--primary);
  --step-bullet-color: #fff;
  --step-color: hsl(0, 0%, 80%);
  &::before {
    box-shadow: 0 0 0 4px var(--primary-shadow);
  }
}
</style>
