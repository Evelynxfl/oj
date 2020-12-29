<template>
  <div id="container">
    <navbar></navbar>
      <div class="box" ref="box">
            <div class="left">
                <desc-left :errInfo="errMsg" :page="page" :size="size" :total="total"></desc-left>
            </div>
            <div class="resize" title="收缩侧边栏">
                ⋮
            </div>
            <div class="mid">
                <desc-right @sendMsg="geterrMsg"></desc-right>
            </div>
        </div>
  </div>
</template>

<script>
import navbar from '../../components/navBar.vue'
import descLeft from '../../modules/desc_left.vue'
import descRight from '../../modules/desc_right.vue'
export default {
  data() {
    return {
      errMsg:[],
      page:0,
      size:0,
      total:0
    }
  },
  name: 'problem_decs',
  components: { 
    navbar,
    descLeft,
    descRight
   },
  methods: {
    dragControllerDiv: function () {
      var resize = document.getElementsByClassName('resize');
      var left = document.getElementsByClassName('left');
      var mid = document.getElementsByClassName('mid');
      var box = document.getElementsByClassName('box');
      for (let i = 0; i < resize.length; i++) {
          // 鼠标按下事件
          resize[i].onmousedown = function (e) {
              //颜色改变提醒
              resize[i].style.background = '#818181';
              var startX = e.clientX;
              resize[i].left = resize[i].offsetLeft;
              // 鼠标拖动事件
              document.onmousemove = function (e) {
                  var endX = e.clientX;
                  var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                  var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
                  if (moveLen < 400) moveLen = 400; // 左边区域的最小宽度为32px
                  if (moveLen > maxT - 500) moveLen = maxT - 500; //右边区域最小宽度为150px

                  resize[i].style.left = moveLen; // 设置左侧区域的宽度

                    for (let j = 0; j < left.length; j++) {
                        left[j].style.width = moveLen + 'px';
                        mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';
                    }
              };
                    // 鼠标松开事件
                  document.onmouseup = function (evt) {
                      //颜色恢复
                      resize[i].style.background = '#d6d6d6';
                      document.onmousemove = null;
                      document.onmouseup = null;
                      resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                  };
                  resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                  return false;
          };
      }
    },
    geterrMsg(data,page,size,total){
      this.errMsg=data
      this.page = page
      this.size = size
      this.total = total
      // console.log(this.errMsg)
      // console.log(page)
      // console.log(size)
    }
  },
  mounted() {
    this.dragControllerDiv();
    
  },
}
</script>

<style lang="less" scoped>
  /* 拖拽相关样式 */
    /*包围div样式*/
    .box {
        width: 100%;
        height: 100%;
        margin: 1% 0px;
        overflow: hidden;
        border: 1px solid #999;
        margin-top: -20px;
    }
    /*左侧div样式*/
    .left {
        width: calc(52% - 10px);  /*左侧初始化宽度*/   
        height: 100%;
        background: #FFFFFF;
        float: left;
        min-width: 400px;
        // border: 1px solid #ccc;
    }
    /*拖拽区div样式*/
    .resize {
        cursor: col-resize;
        float: left;
        position: relative;
        top: 45%;
        background-color: #d6d6d6;
        border-radius: 5px;
        // margin-top: -10px;
        width: 10px;
        height: 100%;
        background-size: cover;
        background-position: center;
        font-size: 32px;
        color: white;
    }
    /*拖拽区鼠标悬停样式*/
    .resize:hover {
        color: #444444;
    }
    /*右侧div'样式*/
    .mid {
        float: left;
        width: 693px;
        height: 100%;
        background: #fff;
    }

</style>
