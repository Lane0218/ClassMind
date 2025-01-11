<!-- <template>
    <div id="app" class="background-image">
        <h1>Welcome to Our Website</h1>
        <p>This is an example of a page with a faded background image and text overlay.</p>
        <button class="login-button" @click="login">进入</button>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods:{
        login(){
            this.$router.push('/FirstPage')
        }
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    height: 100vh;
    /* Fill the viewport height */
    display: flex;
    align-items: center;
    /* Center items vertically */
    justify-content: center;
    /* Center items horizontally */
    flex-direction: column;
}

.background-image {
    position: relative;
    color: white;
    /* 确保文本颜色与背景对比 */
    width: 100vw;
    /* Fill the viewport width */
    height: 100vh;
    /* Fill the viewport height */
}

.background-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('../../assets/images/background.jpeg');
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    /* 背景淡化 */
    z-index: -1;
    /* 确保内容在背景之上 */
}

.login-button {
    background-color: #007bff;
    /* Blue background */
    color: white;
    /* White text */
    padding: 10px 20px;
    /* Padding around the text */
    margin-top: 20px;
    /* Space above the button */
    border: none;
    /* No border */
    border-radius: 5px;
    /* Rounded corners */
    cursor: pointer;
    /* Pointer cursor on hover */
    font-size: 16px;
    /* Text size */
}

.login-button:hover {
    background-color: #0056b3;
    /* Darker blue on hover */
}
</style> -->


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