<template>
    <div>
        <h2>登录</h2>
        <input v-model="username" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
        <input v-model="type" placeholder="用户类型" />
        <button @click="login">登录</button>
        <button @click="register">注册</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            type: ''
        };
    },
    methods: {
        login() {
            const data = {
                username: this.username,
                password: this.password,
                type: parseInt(this.type, 10)
            };
            this.$axios.post('http://127.0.0.1:5000/login', data)
                .then(response => {
                    // 登录成功，跳转到 FirstPage 页面
                    if (response.data.message === '登录成功') {
                        this.$router.push('/FirstPage');
                    } else {
                        // 登录失败，显示错误消息
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('登录失败，请检查网络连接或联系管理员');
                });
        },
        register() {
            this.$router.push('/Register');
        }
    }
};
</script>