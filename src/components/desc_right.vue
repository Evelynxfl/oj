<template>
    <div class="code">
        <div class="nav">
             <el-select class="select" v-model="language.languageName" placeholder="选择语言" 
                    @change="getSelectId(language.languageName)">
                <el-option
                    v-for="item in language"
                    :key="item.languageId"
                    :label="item.languageName"
                    :value="item.languageId">
                </el-option>
            </el-select>
            <el-button plain type="success" @click="testCode">提交</el-button>
        </div>
        <code-mirror ref="codeMirror"></code-mirror>
        
    </div>
</template>

<script>
import CodeMirror from '../components/codemirror.vue'

export default {
    data() {
        return {
            language:[],
            mycode:'',
            languageId:'',
            problemId:'',
            uid:'1001',
            page:0,
            size:10,
            submission:{}          
        }
    },
    components: {
      CodeMirror
    },
    created() {
        this.getLanguage()
        this.parseUrl()
        this.historyData()
    },
    methods: {
        async getLanguage(){
           const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/language/showList',null)
           if (res.msg != "success") return this.$message.error('题目列表加载失败')
           this.language = res.data
        //    console.log( res.data)
        },
        getSelectId(val){
            this.languageId = val
        },
        parseUrl(){
            var url = location.href
            console.log(url)
            var i=url.indexOf('?')
            if(i == -1)return
            var querystr = url.substr(i+1)
            this.problemId = parseInt(querystr)
            // console.log(this.problemId)
        },
        // 获取编辑器的值
        getValue() {
            return this.$refs.codeMirror.code
        },
        //获取记录代码
        async historyData(){
            console.log(this.uid,this.problemId);
             const {data:record} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/submission/getSubmissionByProblemIdAndUserId',{
               params:{
                   problemId:this.problemId,
                   uid:this.uid,
                   page:this.page,
                   size:this.size
               }
            }) 
            console.log(record.data)
            if(record.msg!="success") return this.$message.error('历史记录加载失败')
            this.$emit('sendMsg',record.data,this.page,this.size,record.total)
        },
        
        async testCode(){
            this.mycode = this.getValue()
            if(this.mycode === ''||this.languageId ==''){
                this.$message.error('代码或语言不能为空')
                return;
            }
            const rLoading = this.openLoading()
            const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/submission/runCode',{
                code:this.mycode,
                languageId:this.languageId,
                uid:this.uid,
                problemId:this.problemId

            })
            console.log(res);
            this.testRes = res.data
            rLoading.close()
            if(res.msg!='success')return this.$message.error('提交代码失败');
            this.historyData()
            
        }
        
    },

}
</script>

<style lang="less">
    .code{
       width: 100%;
       border: 1px solid #eee;
       background-color: #f2f8f7;
       padding: 5px;
    }
    .CodeMirror{
        height: 100%;
        overflow: hidden;
    }
    .CodeMirror-scroll {
        // width: 100%;
        height: 650px;
    }
    .nav{
        height: 45px;
        z-index: 9999;
        .el-button--success.is-plain{
            position: absolute;
            right: 20px;
        }
        .select{
            height: 20px;
            width: 110px;
            font-size: 14px;
        }
    }
    
</style>