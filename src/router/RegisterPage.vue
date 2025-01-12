<!-- <template>
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
</script> -->

<!-- <template>
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
</script> -->


<template>
    <div class="container">
        <h1>test</h1>
        <!-- <div class="forms-container">
            <div class="signin-signup" id="app">
                <form action="" class="sign-up-form">
                    <b>Home-school communication</b>
                    <h2 class="title"> Sign up</h2>
                    <div class="input-field">
                        <div class="el-icon-user-solid"></div>
                        <input type="username" placeholder="Username" v-model="username">
                    </div>
                    <div class="input-field">
                        <div class="el-icon-key"></div>
                        <input type="password" placeholder="Password" v-model="password">
                    </div>
                    <div class="input-field">
                        <div class="el-icon-key"></div>
                        <input type="type" placeholder="Type" v-model="type">
                    </div>
                    <input type="submit" value="Sign up" class="btn" @click="register" style="margin-bottom: 50px;">
                </form>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel right-panel">
                <div class="content">
                    <h3>
                        Aleady have an account?
                    </h3>
                    <p>If you aleady have an account,
                        <br>Please use your username and password to login.
                    </p>
                    <button class="btn transparent" id="sign-in-btn">Login</button>
                </div>
                <img src="../../../assets/images/student.png" class="image">
            </div>
        </div>-->
    </div>
</template>

<style>
/* * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body,
input {
    font-family: 'Poppins', sans-serif;
}

.container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    overflow: hidden;
}

.forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-column: 1 /2;
    grid-row: 1 / 2;
    padding: 0 5rem;
    overflow: hidden;
    transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
    z-index: 2;
}

.container::before {
    content: ' ';
    position: absolute;
    width: 2000px;
    height: 2800px;
    border-radius: 50%;
    background: linear-gradient(145deg, #4481eb, #04befe);
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    z-index: 6;
    transition: 1.8s ease-in-out;
}

form.sign-up-form {
    z-index: 1;
    opacity: 0;
}

.title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
}

.input-field {
    max-width: 380px;
    width: 100%;
    height: 55px;
    background-color: #f0f0f0;
    margin: 10px 0;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;

margin-top: 20px;
}

.input-field phonenum {
    margin-left: 0px;
}

.input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    font-size: 1.1rem;

}

.input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 400;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
    font-weight: 380;
}

.btn {
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 49px;
    cursor: pointer;
    background-color: #5995fd;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    transition: .5s;
}

.btn:hover {
    background-color: #4d84e2;
}

.social-text {
    padding: .7m 0;
    font-size: 1rem;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    height: 46px;
    width: 46px;
    border: 1px solid#333;
    margin: 0 0.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;
    border-radius: 1.1rem;
    transition: 0.3s;
}

.social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
}

.signin-signup {
    position: absolute;
    top: 45%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 70%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
    transition: 1s 0.7s ease-in-out;
}

.panels-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 7;

}

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
}

.panel .content {
    color: #fff;
    transition: .9s .6s ease-in-out;
}

.panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
}

.btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid#fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}

.right-panel {
    padding: 3rem 12% 2rem 17%;
    pointer-events: none;
}

.image {
    width: 100%;
    transition: 1.1s .4s ease-in-out;
}

.right-panel .content,
.right-panel .image {
    transform: translateX(1000px);
}

.container.sign-up-mode::before {
    transform: translate(100%, -50%);
    right: 52%;

}

.btn {
    margin-top: 30px;
    margin-bottom: 50px;
    width: 380px;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
    transform: translateX(-1000px);
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
    transform: translateX(0px);
}

.container.sign-up-mode .left-panel {
    pointer-events: none;
}

.container.sign-up-mode .right-panel {
    pointer-events: all;
}

.container.sign-up-mode .signin-signup {
    left: 25%;
}

.container.sign-up-mode form.sign-in-form {
    z-index: 1;
    opacity: 0;
}

.container.sign-up-mode form.sign-up-form {
    z-index: 2;
    opacity: 1;
}

*/
</style>

<script>
export default {
    name: "registerView",
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
                    // this.$router.push('/Login');
                })
                .catch(error => {
                    console.error(error);
                    alert('注册失败，请检查网络连接或联系管理员');
                });
        }
    }
};
</script>