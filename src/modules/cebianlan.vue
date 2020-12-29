<template>
    <div>
        <div class="lunbo">
            <el-carousel height="144px" direction="horizontal" autoplay arrow="never">
                <el-carousel-item v-for="(item , index) in src" :key="index">
                    <h3 class="medium">
                        <img :src="item.url" class="rightImg"/>
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="vivo_ad">
            <img src="../assets/images/vivo_ad.jpg" alt="">
        </div>
        <div class="calendar">
            <el-calendar v-model="value" class="cal">
               <template>
                   <div class="dot"></div>
               </template> 
            </el-calendar>
        </div>
    </div>
</template>

<script>
export default {
   data() {
       return {
            src:[
                { url: require('../assets/images/course1.jpg') },
                { url: require('../assets/images/course2.png') },
                { url: require('../assets/images/course3.png') },
            ],
            value: new Date()
       }
   },   
}
</script>

<style lang="less">
.lunbo{
    width: 244px;
    height: 144px;
    margin-bottom: 20px;
    .medium{
        border-radius: 9%;
        .rightImg{
            width: 244px;
            height: 144px;
        }
   }
}
.vivo_ad{
    width: 244px;
    height: 144px;
    margin-bottom: 20px;
   
    img{
        width: 100%;
        height: 100%;
        border-radius: 30px;
    }
}
img:hover{
    box-shadow: -1px 7px 15px #cccccc;
}

.el-badge__content.is-fixed{
    right: 45px;
}

.calendar{
    font-size: 9px;
    .el-calendar-table .el-calendar-day {
        height: 30px;
    }
    .el-button--mini{
        padding: 6px 9px;
    }
}
.el-backtop, .el-calendar-table td.is-today{
    width: 20px;
    height: 20px;
    background-color:#d1e4fc;
    border-radius: 50%;
}
   
</style>