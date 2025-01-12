<template>
    <div class="container_2">
        <div class="forms-container_2">
            <div class="signup" id="app">
                <form action="" class="sign-up-form">
                    <h2 class="title">ClassMind</h2>
                    <div class="input-field_2">
                        <div class="el-icon-user-solid" style="font-size: 24px; margin-top: 15px; margin-left: 15px;">
                        </div>
                        <input type="username" placeholder="用户名" v-model="username">
                    </div>
                    <div class="input-field_2">
                        <div class="el-icon-key" style="font-size: 24px; margin-top: 15px; margin-left: 15px;"></div>
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="input-field_2">
                        <div class="el-icon-s-custom" style="font-size: 24px; margin-top: 15px; margin-left: 15px;">
                        </div>
                        <select v-model="type" class="custom-select_1"
                            style="width: calc(100% - 50px); height: 55px; border-radius: 55px; padding-left: 5px; font-size: 1.1rem; color: #333; background-color: #f0f0f0; border: none; outline: none; margin-left: -8px;">
                            <option value="" disabled selected>人员类别</option>
                            <option value="0">管理员</option>
                            <option value="1">学生</option>
                            <option value="2">教师</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="注册" class="btn" @click="register" style="font-size: 20px;">
                    </div>
                </form>
            </div>
        </div>
        <div class="panels-container_2">
            <div class="panel right-panel">
                <div class="content_sign_up" style="margin-top: 20px; margin-right:-550px;">
                    <h3>
                        已经注册过账号?
                    </h3>
                    <button class="btn transparent" id="sign-in-btn"
                        style="margin-top: 30px; margin-right: 10px; font-size: 16px;" @click="toLogin">登录</button>
                </div>
                <img src="../../../assets/images/student.svg" class="image_sign_up">
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

.container_2 {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    overflow: hidden;
}

.forms-container_2 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

}

form.sign-up-form {
    display: flex;
    margin-left: -50%;
    margin-top: 8%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-column: 1 /2;
    grid-row: 1 / 2;
    padding: 0 5rem;
    overflow: hidden;
    /* transition: 0.2s 0.7s ease-in-out; */
    /* z-index: 10; */
    /* 确保表单在最上层 */
}


.container_2::before {
    content: ' ';
    position: absolute;
    width: 2000px;
    height: 2800px;
    border-radius: 50%;
    background: linear-gradient(145deg, #4481eb, #04befe);
    top: 10%;
    left: 48%;
    transform: translateY(-50%);
    z-index: 0;
}

form.sign-up-form {
    z-index: 2;
}



.title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
}

.input-field_2 {
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


.input-field_2 i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    font-size: 1.1rem;

}

.input-field_2 input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 400;
    font-size: 1.1rem;
    color: #333;
}

.input-field_2 input::placeholder {
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

.signup {
    position: absolute;
    top: 45%;
    right: -10%;
    transform: translate(-50%, -50%);
    width: 70%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 7;
}

.panels-container_2 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 5;
}

.panel .content_sign_up {
    color: #fff;
    margin-right: -145%;
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
    pointer-events: all;
    padding: 3rem 12% 2rem 17%;
}

.image_sign_up {
    width: 100%;
    margin-right: 100%;
}

.right-panel .image_sign_up {
    transform: translateX(1000px);
}

.btn {
    margin-top: 30px;
    margin-bottom: 50px;
    width: 380px;
}
</style>

<script>
export default {
    // name: "registerView",
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
                    if (error.response) {
                        // 请求已发出，服务器响应的状态码不在 2xx 范围内
                        alert(error.response.data.message);
                    } else if (error.request) {
                        // 请求已发出，但没有收到响应
                        alert('注册失败，请检查网络连接或联系管理员');
                    } else {
                        // 在设置请求时触发了错误
                        alert('注册失败，请检查网络连接或联系管理员');
                    }
                });
        },
        toLogin() {
            this.$router.push('/Login');
        }
    }
};
</script>