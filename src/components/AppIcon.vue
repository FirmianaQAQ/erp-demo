<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 18
  },
  strokeWidth: {
    type: Number,
    default: 1.8
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <template v-if="name === 'brand'">
      <path
        d="M4 9.5L6.6 4.5L11 7L12 9L13 7L17.4 4.5L20 9.5V18.5C20 19.6 19.1 20.5 18 20.5H6C4.9 20.5 4 19.6 4 18.5V9.5Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5 13.5H9.51M14.5 13.5H14.51M9 17C9.8 17.7 10.8 18 12 18C13.2 18 14.2 17.7 15 17"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'home'">
      <path
        d="M3 10.5L12 3L21 10.5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V10.5Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 21V13H15V21"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'dashboard'">
      <path
        d="M4 4H10V10H4V4ZM14 4H20V7H14V4ZM14 11H20V20H14V11ZM4 14H10V20H4V14Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'bell'">
      <path
        d="M6 9C6 5.7 8.7 3 12 3C15.3 3 18 5.7 18 9V12.7L19.4 15.2C19.8 16 19.3 17 18.4 17H5.6C4.7 17 4.2 16 4.6 15.2L6 12.7V9Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 20C10.5 20.6 11.2 21 12 21C12.8 21 13.5 20.6 14 20"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'screen'">
      <path
        d="M4 5H20V16H4V5Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linejoin="round"
      />
      <path
        d="M8 20H16M12 16V20"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'language'">
      <path
        d="M4 5H12M8 5C8 10 6 14 3 17M6 10C7.5 12.5 9.5 14.8 12 17M14 5H21M17.5 5C17.5 10 16 14 13 17M15 14H20"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'search'">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        :stroke-width="strokeWidth"
        stroke="currentColor"
      />
      <path
        d="M16 16L20 20"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
      />
    </template>

    <template v-else-if="name === 'refresh'">
      <path
        d="M20 12C20 16.4 16.4 20 12 20C8.7 20 5.9 18 4.7 15.2M4 12C4 7.6 7.6 4 12 4C15.3 4 18.1 6 19.3 8.8"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
      />
      <path
        d="M18.8 4.5V9H14.3M5.2 19.5V15H9.7"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'base'">
      <path
        d="M4 7L12 3L20 7L12 11L4 7ZM4 12L12 16L20 12M4 17L12 21L20 17"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'sales'">
      <path
        d="M4 18L10 12L14 16L20 8"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 8H20V13"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'planning'">
      <path
        d="M5 5H11V11H5V5ZM13 5H19V11H13V5ZM9 13H15V19H9V13Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linejoin="round"
      />
      <path
        d="M11 8H13M16 11V13M8 11V13"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
      />
    </template>

    <template v-else-if="name === 'purchase'">
      <path
        d="M4 7H20L18.5 17H5.5L4 7ZM8 7V5.5C8 4.1 9.1 3 10.5 3H13.5C14.9 3 16 4.1 16 5.5V7"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'outsource'">
      <path
        d="M8 8H4V4M16 16H20V20M4 4L10 10M20 20L14 14M16 8H20V4M8 16H4V20M20 4L14 10M4 20L10 14"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'production'">
      <path
        d="M12 3L14 6L18 7L17 11L20 14L17 17L18 21L14 22L12 19L10 22L6 21L7 17L4 14L7 11L6 7L10 6L12 3Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linejoin="round"
      />
      <circle
        cx="12"
        cy="14"
        r="2.2"
        :stroke-width="strokeWidth"
        stroke="currentColor"
      />
    </template>

    <template v-else-if="name === 'finance'">
      <path
        d="M12 3V21M17 7.5C17 5.6 15 4 12 4C9 4 7 5.4 7 7.4C7 9.4 8.8 10.1 12 10.8C15 11.5 17 12.2 17 14.6C17 16.8 14.8 18 12 18C9.2 18 7 16.7 7 14.5"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'reports'">
      <path
        d="M5 19V11M10 19V5M15 19V14M20 19V8"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
      />
    </template>

    <template v-else-if="name === 'flow'">
      <path
        d="M4 7H14M10 3L14 7L10 11M20 17H10M14 13L10 17L14 21"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'link'">
      <path
        d="M10 14L8 16C6.3 17.7 3.7 17.7 2 16C0.3 14.3 0.3 11.7 2 10L6 6C7.7 4.3 10.3 4.3 12 6M14 10L16 8C17.7 6.3 20.3 6.3 22 8C23.7 9.7 23.7 12.3 22 14L18 18C16.3 19.7 13.7 19.7 12 18"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="scale(0.9) translate(1.4 1.4)"
      />
    </template>

    <template v-else-if="name === 'function'">
      <path
        d="M4 12H9L11 5L14 19L16 12H20"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'settings'">
      <path
        d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
      />
      <path
        d="M19.4 15L21 12L19.4 9L16.5 8.6L15 6L12 4.5L9 6L7.5 8.6L4.6 9L3 12L4.6 15L7.5 15.4L9 18L12 19.5L15 18L16.5 15.4L19.4 15Z"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>
