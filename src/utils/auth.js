const STORAGE_KEY = 'erp-demo-user';
const MOCK_ACCOUNT = {
  username: 'admin',
  password: '123456',
  name: '管理员'
};

export function getStoredUser() {
  const rawValue = localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function login(payload) {
  const username = payload.username.trim();
  const password = payload.password.trim();

  if (
    username !== MOCK_ACCOUNT.username ||
    password !== MOCK_ACCOUNT.password
  ) {
    throw new Error('账号或密码错误');
  }

  const user = {
    username: MOCK_ACCOUNT.username,
    name: MOCK_ACCOUNT.name,
    loginAt: new Date().toLocaleString('zh-CN', { hour12: false })
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getMockAccount() {
  return {
    username: MOCK_ACCOUNT.username,
    password: MOCK_ACCOUNT.password
  };
}
