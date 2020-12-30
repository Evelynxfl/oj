<template>
    <div class="desc_left">
        <el-tabs type="border-card"  v-model="activeName">
            <el-tab-pane name="desc">
              <span slot="label"><i class="iconfont icon-pinglun1"></i> 题目描述</span>
              <div class="content">
                  <h4>{{problemDesc.problemName}}</h4>
                  <p class="desc">{{problemDesc.description}}</p>
                  <p class="t1">格式：</p>
                  <div class="input">
                      输入：<span>{{problemDesc.inputFormat}}</span><br>
                      输出：<span>{{problemDesc.outputFormat}}</span>
                  </div>
                  <p class="t1">示例：</p>
                  <div class="input">
                      输入：<span>{{problemDesc.sampleInput}}</span><br>
                      输出：<span>{{problemDesc.sampleOutput}}</span>
                  </div>
                  <p class="count" style="color:#ccc"><span>通过次数</span><span class="t">{{problemDesc.submissionSuccessNum}}</span>|<span>提交次数</span><span class="t">{{problemDesc.submissionTotal}}</span></p>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="iconfont icon-pinglun"></i> 评论</span>
              评论
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="iconfont icon-wentijiexi-"></i> 题解</span>
              题解
            </el-tab-pane>
            <el-tab-pane name="record">         
              <span slot="label"><i class="iconfont icon-jilu"></i> 提交记录</span>
                <div v-if="this.errInfo.length == 0?true:false" class="history">暂无提交记录</div>
              <div class="errMsg" v-else>
                <div class="errWrap">
                <p>执行结果：<span v-if='errInfo[0].judgeResultSlug=="AC"' class='successP'>执行成功</span><span class="errorP" v-else>执行失败</span></p>
                <div class="errInfo">
                    <p v-if='errInfo[0].judgeResultSlug=="AC"' class='successInfo'>
                        {{errInfo[0].judgeLog}}
                    </p>
                    <p class="errInfo" v-else>
                        {{errInfo[0].judgeLog}}
                    </p>
                </div>
            </div>
                <el-table
                    class="table"
                    :data="errInfo"
                    style="width: 100%;cursor: pointer;"
                    @row-click="rowClick">
                    <el-table-column
                        prop="submitTime"
                        label="提交时间"
                        width="180">
                        
                    </el-table-column>
                    <el-table-column
                        prop="judgeResultSlug"
                        label="提交结果"
                        width="180">
                        <template slot-scope="scope">
                            <span v-if='scope.row.judgeResultSlug=="AC"' style="color:#1cf139">执行成功</span>
                            <span style="color:red" v-else>执行失败</span>
                            <!-- {{scope.row.judgeResultSlug=="AC"?"执行成功":"执行失败"}}                             -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="usedTime"
                        label="运行时间">
                        <template slot-scope="scope">
                            {{scope.row.usedTime}}ms                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="usedMemory"
                        label="消耗内存">
                        <template slot-scope="scope">
                            {{scope.row.usedMemory}}mb                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="language.languageName"
                        label="语言">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[5,10, 20, 30, 40]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>    
            </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            title="测试日志详情"
            :visible.sync="dialogVisible"
            width="30%">
            <span v-html="logs" style="line-height:30px"></span>
        </el-dialog>
    </div>
</template>

<script>
import '../assets/font/iconfont.css'
export default {
    data() {
        return {
            problemId:'',
            problemDesc:{},
            activeName:'desc',
            uid:'1001',
            dialogVisible:false,
            logs:''
        }
    },
   props:["errInfo","page","size","total"],
    created() {
     this.parseUrl(),
     this.problemInfo(this.problemId)
    //  this.historyData()  
   },
   methods: {
    parseUrl(){
      var url = location.href
      console.log(url)
      var i=url.indexOf('?')
      if(i == -1)return
      var querystr = url.substr(i+1)
      // var arr = querystr.split("&")
      // console.log(querystr)
      this.problemId = parseInt(querystr)
    //   console.log(this.problemId)
    },
    async problemInfo(id){
        const {data: res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/problem/getProblem/'+id)
        if (res.code != 0) return this.$message.error('获取问题详情');
        this.problemDesc = res.data
        // console.log(res.data)
    },
    handleSizeChange(newSize){
        // console.log(newSize)
        this.size = newSize;
        this.historyData()
    },
    handleCurrentChange(newPage){
        // console.log(newPage)
        this.page = newPage
        this.historyData()
    },
    rowClick(row,col,e){
        // console.log(row);
        this.logs = row.judgeLog
        this.dialogVisible = true
    }
   },
   computed: {
        newName() {
            if(this.errInfo) { // 判断是否有值传过来
                this.historyData()
            }
            return 'John' //没有传值的默认值
        }
    }
}
</script>

<style lang="less" scoped>
    .content{
        font-size: 13px;
        line-height: 2;
        h4{
            font-weight: 500;
        }
        .t1{
            font-weight: 600;
        }
        .input{
            width: 100%;
            line-height: 2;
            padding: 10px 15px;
            background-color:#eee;
            
        }
        .desc{
            margin-bottom: 30px;
        }
        .count{
            font-size: 12px;
            font-weight: bold;
            color: #1cf139;
            span{
                padding: 0 15px;
            }
            .t{
                color: black;
            }
        }
        .pagination{
            padding-top: 20px;
        }
    }
    .history{
        height: 100%;
        text-align: center;
        color: #999;
        padding:20px 0 ;
    }
    /deep/ .el-dialog__body{
        padding:11px 20px !important;
    }
    .errMsg{
        .errWrap{
            background-color: rgb(247, 244, 244);
            padding: 10px;
            p{
                color: #999;
                font-size: 12px;
                span{
                    color: red;
                    padding: 12px;
                }
            }
            .successInfo{
                background-color: rgb(247, 244, 244);
                p{
                    color: red;
                }
            }
            .errInfo{
                background-color:rgb(248, 179, 179);
    
                p{
                    color: black !important;
                }
            }
            .errorP{
                    color: red;
                }
            .successP{
                    color: rgb(18, 221, 18);
            }
        }
        .table{
            margin-top: 30px;
            padding: 10px;
            text-align: center;
        }
    }
    
</style>