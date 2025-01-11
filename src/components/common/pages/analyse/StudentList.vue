<!-- 学员总览 -->
<template>
    <div>
        <h1>学员总览</h1>
        <Scatter style="width:400px;height: 200px;"></Scatter>
    </div>
</template>

<script>
import Scatter from '../first/Scatter.vue';
export default {
    name: 'studentlist',
    // data(){
    //     return;
    // }
    components: {
        Scatter
    }
}
</script>