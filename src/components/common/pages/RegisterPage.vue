<template>
    <div>
        <h2>注册</h2>
        <input v-model="username" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
        <input v-model="type" placeholder="用户类型" />
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
        register() {
            // 将 type 转换为整数
            const data = {
                username: this.username,
                password: this.password,
                type: parseInt(this.type, 10)
            };
            this.$axios.post('http://127.0.0.1:5000/register', data)
                .then(response => {
                    alert(response.data.message);
                    this.$router.push('/Login');
                })
                .catch(error => {
                    console.error(error);
                    alert('注册失败，请检查网络连接或联系管理员');
                });
        }
    }
};
</script>