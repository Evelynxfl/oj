<template>
    <div class="cards">
        <div class="title">
            <span class="iconfont icon-quanbu"></span>
            <span>全部</span>
        </div>
        <div class="cardsItem">
            <div>
                <img src="../assets/images/sf.jpg" alt="" title="算法">
            </div>
            <div>
                <img src="../assets/images/shell.jpg" alt="" title="shell">
            </div>
            <div>
                <img src="../assets/images/sql.jpg" style='height:130px' alt="" title='数据库'>
            </div>
            <div>
                <img src="../assets/images/dxc.jpg" style='height:105px' alt="" title="多线程">
            </div>
            
            <div>
                <img src="../assets/images/p1.png" alt="" title="面试经典题">
            </div>
            <div>
                <img src="../assets/images/p2.png" alt="" title="剑指offer">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
}
</script>

<style lang="less">
    .cards{
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        .title{
            span{
                font-size: 20px;
                font-weight: 300;
                color: rgba(0, 0, 0, 0.65);
                padding-right: 10px;
            }
        }

        .cardsItem{
            display: flex;
            justify-content: space-between;
            text-align: center;
            line-height: 100px;
            div{
                width: 128px;
                height: 100px;
                border: 1px solid #cccccc;
                border-radius: 9%;
                cursor: pointer;
                overflow: hidden;
                margin: 10px 0 20px 0;;
                .new{
                    right: 10px;
                }
                .el-badge__content .is-fixed{
                    right: 45px;
                }
            }
            div:hover{
               box-shadow: 0 0 15px rgba(8, 8, 8, 0.15); 
            }
            img{
                width: 110px;
                padding-top: 7px;
            }
            
        }
    }
</style>