<template>
    <div>
        <el-card shadow="always">
        <div class="search">
            <el-row type="flex" class="row-bg" :gutter="30">
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-input v-model="queryInfo.problemId" placeholder="输入题目id查找测试用例" clearable @clear="showCheckpoint" ></el-input>
                </div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-search" @click="seacherById">搜索</el-button>
                </div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加测试用例</el-button>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="showAll">查看所有测试用例</el-button>
                </div></el-col>
            </el-row>
        </div>
        <el-table :data="checkpointList"  style="width: 100%" fit stripe>
            <el-table-column
                prop="checkpointId"
                label="测试用例id">
            </el-table-column>
            <el-table-column
                prop="input"
                label="测试标准输入">
            </el-table-column>
            <el-table-column
                prop="output"
                label="测试标准输出">
            </el-table-column>
            <el-table-column
                prop="problemId"
                label="题目id">
            </el-table-column>
            <el-table-column
                prop="score"
                label="测试分数">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTest(scope.$index, scope.row)"></el-button>   
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deltest(scope.row.checkpointId)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[10,20,30,40,50]"
                :page-size="queryInfo.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>    
    </el-card>
    <!-- 修改测试用例 -->
    <el-dialog title="修改测试用例" :visible.sync="dialogtTestFormVisible" @close="editDialog">
         <el-form ref="editform" :model="testFormInfo"  :rules="testrules" label-width="150px">
            <el-form-item>
                <el-form-item label="题目id：" prop="problemId">
                    <el-input type="textarea" v-model="testFormInfo.problemId" :disabled="isdisable"></el-input>
                </el-form-item>
                <el-form-item label="测试用例标准输入：" prop="input">
                    <el-input type="textarea" v-model="testFormInfo.input" disabled=true></el-input>
                </el-form-item>
                <el-form-item label="测试用例标准输出：" prop="output">
                    <el-input type="textarea" v-model="testFormInfo.output"></el-input>
                </el-form-item>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editTestInfo">确定</el-button>
                <el-button @click="resetLoginForm">重置</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    <!-- 添加测试用例 -->
    <el-dialog title="添加测试用例" :visible.sync="dialogFormVisible" @close="editDialog">
         <el-form ref="testForm" :model="checkpoints"  :rules="testrules" label-width="150px">
            <el-form-item>
                <el-form-item label="题目id：" prop="problemId">
                    <el-input type="textarea" v-model="checkpoints.problemId"></el-input>
                </el-form-item>
                <el-form-item label="测试用例标准输入：" prop="input">
                    <el-input type="textarea" v-model="checkpoints.input"></el-input>
                </el-form-item>
                <el-form-item label="测试用例标准输出：" prop="output">
                    <el-input type="textarea" v-model="checkpoints.output"></el-input>
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
            dialogFormVisible:false,
            dialogtTestFormVisible:false,
             queryInfo:{
                page:1,
                size:10,
                problemId:''
            },
            total:0,
            isdisable:false,
            testFormInfo:{},
            checkpointList:[],
            checkpoints:{   
                problemId:'',
                isExactlyMatch:false,
                input:'',
                output:'',
                score:'10'
            },
            testrules: {
                problemId: [
                    { required: true, message: '请输入题目id', trigger: 'blur' }
                ],
                input: [
                    { required: true, message: '请输入测试用例，当输入多个值时请用#号分隔开', trigger: 'blur' }
                ],
                output: [
                    { required: true, message: '请输出测试用例', trigger: 'blur' }
                ],
            },
        }
    },
    created() {
        this.showTest()
    },
    methods: {
        //获取测试用例
        async showCheckpoint(){
            const {data:res} =  await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/checkpoint/showList',{
                params:this.queryInfo
            })
            if(res.msg != "success") return this.$message.error('获取测试用例失败')
            this.checkpointList = res.data
            this.total = res.total
            // console.log(res)
        },
        //分页
        handleSizeChange(newSize){
            console.log(newSize)
            this.queryInfo.size = newSize;
            this.showCheckpoint()
        },
        handleCurrentChange(newPage){
            console.log(newPage)
            this.queryInfo.page = newPage
            this.showCheckpoint()
        },
        //通过id查找测试用例
        async seacherById() {
            const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/checkpoint/getCheckpointByProblemId',{
                params:this.queryInfo
            })
            // console.log(this.queryInfo);
            // console.log(res);
             if (res.msg != 'success') return this.$message.error('查询失败')
            if (res.data == '')  this.$message.warning('该题目没有测试用例');
            this.checkpointList = res.data
            this.total = res.total
        },
        //删除测试用例
        async deltest(checkpointId){
            // console.log(checkpointId);
            const confirmResult = await this.$confirm('确认删除该题目?', '提示', {
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
            const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/checkpoint/deleteCheckpoint',{
                params:{
                      checkpointId:checkpointId
                    }
            })
            console.log(res);
            if (res.code != 0) return this.$message.error('删除失败');
            this.$message.success('删除成功')
            this.total--;
            // this.showCheckpoint()
            this.showTest()
        },
        // 测试用例表单回显
        editTest(index,testForm){
            this.testFormInfo = testForm
            // console.log(this.testFormInfo);
            this.dialogtTestFormVisible = true 
        },
        //修改测试用例
        editTestInfo(){
            this.$refs.editform.validate(async valid =>{
                console.log(valid)
                if(!valid) return
                // 发起用户信息请求
                const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/checkpoint/updateCheckpoint',this.testFormInfo)
                console.log(res)
                if (res.code != 0) return this.$message.error('修改测试用例信息失败');
                this.dialogtTestFormVisible = false
                this.showCheckpoint()
                this.$message.success('测试用例修改成功')
            })
  
        },
        //重置表单
        resetLoginForm () {
            this.$refs.testForm.resetFields()
        },
        //添加测试用例
        async submit(){
            const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/checkpoint/addCheckpoint',this.checkpoints)
            console.log(res)
            if(res.code != 0) return this.$message.error("添加测试用例失败")
            this.dialogFormVisible = false
            // this.showCheckpoint()
            this.$message.success('添加测试用例成功')
            this.showTest()

        },
        editDialog(){
            this.$refs.testForm.resetFields()
        },
        // 查看测试用例
        async showTest(){
            if(this.$route.query.problemId){
                const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/checkpoint/getCheckpointByProblemId',{
                    params:{
                        problemId:this.$route.query.problemId,
                        page:this.queryInfo.page,
                        size:this.queryInfo.size
                    }
                })
                if(res.msg != "success") return this.$message.error('获取测试用例失败')
                if (res.data == '') this.$message.warning('该题目没有测试用例');
                this.checkpointList = res.data
                this.total = res.total
                this.checkpoints.problemId=this.$route.query.problemId
                this.isdisable = true              
            }else{
                this. showCheckpoint()
            }    
        },
        showAll(){
            this.checkpoints.problemId=''
            this.isdisable = false
            this.showCheckpoint()
        }
    },
}
</script>

<style lang="less" scoped>
    .el-form-item .el-form-item {
        margin-bottom: 16px;
    }
    .el-form-item {
        margin-left: -60px;
    }
    .pagination{
        padding-top: 20px;
        padding-left: 20px;
    }
</style>