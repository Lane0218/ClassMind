<template>
    <div class="container">
        <div class="forms-container" style="margin-top: 25px;">
            <div class="signin" id="app">
                <form action="" class="sign-in-form">
                    <h2 class="title">ClassMind</h2>
                    <div class="input-field">
                        <div class="el-icon-user-solid" style="font-size: 24px; margin-top: 15px; margin-left: 15px;">
                        </div>
                        <input type="username" placeholder="用户名" v-model="username">
                    </div>
                    <div class="input-field">
                        <div class="el-icon-key" style="font-size: 24px; margin-top: 15px; margin-left: 15px;"></div>
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="input-field">
                        <div class="el-icon-s-custom" style="font-size: 24px; margin-top: 15px; margin-left: 15px;">
                        </div>
                        <select v-model="type" class="custom-select"
                            style="width: calc(100% - 50px); height: 55px; border-radius: 55px; padding-left: 5px; font-size: 1.1rem; color: #333; background-color: #f0f0f0; border: none; outline: none; margin-left: -8px;">
                            <option value="" disabled selected>人员类别</option>
                            <option value="0">管理员</option>
                            <option value="1">学生</option>
                            <option value="2">教师</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="登录" class="btn" @click="login" style="font-size: 20px;">
                    </div>
                </form>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content" style="margin-top: 30px; margin-right: 100px;">
                    <h3>
                        还没有注册账号？
                    </h3>
                    <button class="btn transparent" id="sign-up-btn"
                        style="margin-top: 30px; margin-right: 25px; font-size: 16px;" @click="toRegister">
                        注册</button>
                </div>
                <img src="../../../assets/images/teacher.svg" class="image_sign_in">

            </div>
        </div>
    </div>
</template>

<style>
* {
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

form.sign-in-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-column: 1 /2;
    grid-row: 1 / 2;
    padding: 0 5rem;
    overflow: hidden;
    /* transition: 0.2s 0.7s ease-in-out; */
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
    z-index: 0;
    /* transition: 1.8s ease-in-out; */
}

.title {
    font-size: 24px;
    color: #444;
    margin-bottom: -10px;
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


.signin {
    position: absolute;
    top: 45%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 70%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
    /* transition: 1s 0.7s ease-in-out; */
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
    /* transition: .9s .6s ease-in-out; */
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
    /* pointer-events: none; */
}

.image_sign_in {
    width: 100%;
    /* transition: 1.1s .4s ease-in-out; */
}


.btn {
    margin-top: 30px;
    margin-bottom: 50px;
    width: 380px;
}

.custom-select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
}
</style>



<script>

export default {
    // name: "loginView",
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
                    if (error.response) {
                        // 请求已发出，服务器响应的状态码不在 2xx 范围内
                        alert(error.response.data.message);
                    } else if (error.request) {
                        // 请求已发出，但没有收到响应
                        alert('登录失败，请检查网络连接或联系管理员');
                    } else {
                        // 在设置请求时触发了错误
                        alert('登录失败，请检查网络连接或联系管理员');
                    }
                });
        },
        toRegister() {
            this.$router.push('/Register');
        }
    }
}

</script>