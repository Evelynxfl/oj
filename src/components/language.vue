<template>
    <div>
        <el-card shadow="always">
        <div class="search">
            <el-row type="flex" class="row-bg" :gutter="30">
                <el-col :span="20"><div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-plus"  @click="dialogFormVisible = true">
                        添加语言
                    </el-button>
                </div></el-col>
                 <el-col :span="4"><div class="grid-content bg-purple-light">
                    <!-- <el-button type="primary" icon="el-icon-plus" >
                        添加语言
                    </el-button> -->
                </div></el-col>
            </el-row>
        </div>
        <el-table :data="languageList" style="width: 100%" fit stripe>
            <el-table-column
                width="120"
                prop="languageId"
                label="语言id">
            </el-table-column>
            <el-table-column
                width="130"
                prop="languageName"
                label="语言名字">
            </el-table-column>
            <el-table-column
                width="150"
                prop="languageSlug"
                label="语言插件">
            </el-table-column>
            <el-table-column
                width="150"
                prop="runCommand"
                label="运行指令">
            </el-table-column>
            <el-table-column
                width="380"
                prop="compileCommand"
                label="编译指令">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button type="primary" icon="el-icon-edit" size="mini"  @click="editLanguage(scope.$index, scope.row)"></el-button>   
                    </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">                        
                            <el-button type="danger" icon="el-icon-delete" size="mini"  @click="delLanguage(scope.row.languageId)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[2,4,6,8,10]"
                :page-size="queryInfo.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>    
    </el-card>
        <!-- 修改语言 -->
        <el-dialog title="修改语言" :visible.sync="dialogLanguageFormVisible" @close="editDialog">
         <el-form ref="languageFormInfo" :model="languageInfo"  :rules="languagerules" label-width="140px">
            <el-form-item>
                <el-form-item label="语言名称：" prop="languageName">
                    <el-input type="textarea" v-model="languageInfo.languageName"></el-input>
                </el-form-item>
                <el-form-item label="语言插件：" prop="languageSlug">
                    <el-input type="textarea" v-model="languageInfo.languageSlug"></el-input>
                </el-form-item>
                <el-form-item label="运行指令：" prop="runCommand">
                    <el-input type="textarea" v-model="languageInfo.runCommand"></el-input>
                </el-form-item>
                <el-form-item label="编译指令：" prop="compileCommand">
                    <el-input type="textarea" v-model="languageInfo.compileCommand"></el-input>
                </el-form-item> 
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editLanguageInfo">确定</el-button>
                <el-button @click="resetLoginForm">重置</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>

        <!-- 添加题目 -->
    <el-dialog title="添加语言" :visible.sync="dialogFormVisible" @close="editDialog">
         <el-form ref="languageForm" :model="language"  :rules="languagerules" label-width="140px">
            <el-form-item>
                <el-form-item label="语言名称：" prop="languageName">
                    <el-input type="textarea" v-model="language.languageName"></el-input>
                </el-form-item>
                <el-form-item label="语言插件：" prop="languageSlug">
                    <el-input type="textarea" v-model="language.languageSlug"></el-input>
                </el-form-item>
                <el-form-item label="运行指令：" prop="runCommand">
                    <el-input type="textarea" v-model="language.runCommand"></el-input>
                </el-form-item>
                <el-form-item label="编译指令：" prop="compileCommand">
                    <el-input type="textarea" v-model="language.compileCommand"></el-input>
                </el-form-item> 
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确定</el-button>
                <el-button @click="resetLoginForm">重置</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogLanguageFormVisible:false,
            dialogFormVisible:false,
            languageInfo:{},
            languageList:[],
            queryInfo:{
                page:1,
                size:6
            },
            total:0,
            language:{
                languageId:'',
                languageName:'',
                languageSlug:'',
                runCommand:'',
                compileCommand:''

            },
            languagerules: {
                languageName: [
                    { required: true, message: '请输入语言名字', trigger: 'blur' }
                ],
                languageSlug: [
                    { required: true, message: '请输入语言插件', trigger: 'blur' }
                ],
                runCommand: [
                    { required: true, message: '请输入运行指令', trigger: 'blur' }
                ],
                compileCommand: [
                    {  required: true, message: '请输入编译命令', trigger: 'blur' }
                ],
            },
        }
    },
    created() {
        this.showLanguageList()
    },
    methods: {
        //获取语言
        async showLanguageList(){
            if(Math.ceil(this.total/this.queryInfo.size)<this.queryInfo.page){
                this.queryInfo.page--;
            }
            const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/language/showList',{
                params:this.queryInfo
            })
            if(res.code != 0)return this.$message.error('获取语言失败')
            // console.log(res.data)
            this.languageList = res.data
            //  console.log(this.languageList)
            this.total = res.total
        },
        handleSizeChange(newSize){
            this.queryInfo.size = newSize
            this.showLanguageList()
        },
        handleCurrentChange(newPage){
            // console.log(newPage)
            this.queryInfo.page = newPage
            this.showLanguageList()
        },
        //删除语言
        async delLanguage(languageId){
            // console.log("hahah");
            console.log(languageId);
            const confirmResult = await this.$confirm('确认删除该语言?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }
            ).catch(err => err)
            // console.log(confirmResult)
            if(confirmResult != "confirm"){
                return this.$message.info('取消删除')
            }
            console.log('确认删除')
            const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/language/deleteLanguage',{
                params:{
                      languageId:languageId
                    }
            })
            if (res.code != 0) return this.$message.error('删除失败');
            this.$message.success('删除成功')
            this.total--;
            this.showLanguageList()
        },
        //重置表单
         resetLoginForm () {
            this.$refs.languageForm.resetFields()
        },
        //添加语言
        async submit(){
            const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/language/addLanguage',this.language)
            // console.log(res)
            if(res.msg != "success") return this.$message.error("添加语言失败")
            this.dialogFormVisible = false
            this.showLanguageList()
            this.$message.success('添加语言成功')
        },
        editDialog(){
            this.$refs.languageFormInfo.resetFields()
        },
        // 语言表单回显
        editLanguage(index,languageInfo){
            this.languageInfo = languageInfo
            // console.log(this.testFormInfo);
            this.dialogLanguageFormVisible = true 
        },
        //修改测试用例
        editLanguageInfo(){
            this.$refs.languageFormInfo.validate(async valid =>{
                console.log(valid)
                if(!valid) return
                // 发起用户信息请求
                const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/language/updateLanguage',this.languageForm)
                console.log(res)
                if (res.code != 0) return this.$message.error('获取语言信息失败');
                this.dialogtTestFormVisible = false
                this.showLanguageList()
                this.$message.success('语言信息修改成功')

            })
  
        },
        
    },
}
</script>

<style lang="less" scoped>
    .pagination{
        padding-top: 20px;
        padding-left: 20px;
    }

     .el-form-item .el-form-item {
        margin-bottom: 16px;
    }
    .el-form-item {
        margin-left: -48px;
    }
    .pagination{
        padding-top: 20px;
        padding-left: 20px;
    }
</style>