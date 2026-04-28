<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getMockAccount, login } from '../utils/auth';

const router = useRouter();
const loading = ref(false);
const errorMessage = ref('');
const demoAccount = getMockAccount();
const form = reactive({
  username: demoAccount.username,
  password: demoAccount.password
});

async function handleSubmit() {
  errorMessage.value = '';
  loading.value = true;

  try {
    login(form);
    await router.push({ name: 'home' });
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="page page-login">
    <section class="login-panel">
      <div class="brand-block">
        <p class="brand-eyebrow">ERP DEMO</p>
        <h1>PC 端登录</h1>
        <p class="brand-copy">
          这是一个本地演示登录页，成功登录后会进入工作台，并支持退出。
        </p>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <label class="field">
          <span>账号</span>
          <input
            v-model="form.username"
            type="text"
            autocomplete="username"
            placeholder="请输入账号"
          />
        </label>

        <label class="field">
          <span>密码</span>
          <input
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            placeholder="请输入密码"
          />
        </label>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <button class="primary-button" type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <div class="tips">
          <span>演示账号：{{ demoAccount.username }}</span>
          <span>演示密码：{{ demoAccount.password }}</span>
        </div>
      </form>
    </section>
  </main>
</template>
