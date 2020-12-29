<template>
    <div>
        <el-card shadow="always">
            <div class="search">
                <el-row type="flex" class="row-bg" :gutter="30">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-input v-model="problemName" placeholder="输入关键字搜索" clearable @clear="getProblemList"></el-input>
                    </div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light">
                        <el-button type="primary" icon="el-icon-search" @click="seacherByName">搜索</el-button>
                    </div></el-col>
                     <el-col :span="6"><div class="grid-content bg-purple-light">
                        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">
                            添加题目
                        </el-button>
                    </div></el-col>
                </el-row>
            </div>
            <el-table :data="problemList" style="width: 100%" fit stripe>
                <el-table-column
                    type="index"
                    label="#"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="problemName"
                    label="题目名称">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editProblem(scope.row.problemId)"></el-button>   
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini"   @click="btnDelete(scope.row.problemId)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="查看该题目的测试用例" placement="top">
                            <el-button type="info" icon="el-icon-link" size="mini" @click="showTest(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                         <el-tooltip class="item" effect="dark" content="查看题目详情" placement="top">
                            <el-button type="primary" icon="el-icon-bangzhu" size="mini" @click="showProblemInfo(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="queryInfo.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>    
        </el-card>
                <!-- 修改题目 -->
                <el-dialog title="修改题目" :visible.sync="updatadialogFormVisible" @close="editDialog">
         <el-form ref="editform" :model="editForm"  :rules="rules" label-width="140px">
            <el-form-item>
                <el-form-item label="题目名称：" prop="problemName">
                    <el-input type="textarea" v-model="editForm.problemName"></el-input>
                </el-form-item>
                <el-form-item label="题目描述：" prop="description">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="输入格式：" prop="inputFormat">
                    <el-input type="textarea" v-model="editForm.inputFormat"></el-input>
                </el-form-item>
                <el-form-item label="输出格式：" prop="outputFormat">
                    <el-input type="textarea" v-model="editForm.outputFormat"></el-input>
                </el-form-item>
                <el-form-item label="样例输入：" prop="sampleInput">
                    <el-input type="textarea" v-model="editForm.sampleInput"></el-input>
                </el-form-item> 
                <el-form-item label="样例输出：" prop="sampleOutput">
                    <el-input type="textarea" v-model="editForm.sampleOutput"></el-input>
                </el-form-item>
                <el-form-item label="最大运行时间：" prop="timeLimit">
                    <el-input type="text" v-model="editForm.timeLimit"></el-input>
                </el-form-item>
                <el-form-item label="最大运行内存：" prop="memoryLimit">
                    <el-input type="text" v-model="editForm.memoryLimit"></el-input>
                </el-form-item>
                <el-form-item label="提示：" prop="hint">
                    <el-input type="textarea" v-model="editForm.hint"></el-input>
                </el-form-item>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editProblemInfo">确定</el-button>
            <el-button @click="updatadialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    <!-- 添加题目 -->
    <el-dialog title="添加题目" :visible.sync="dialogFormVisible">
         <el-form ref="form" :model="problem"  :rules="rules" label-width="140px">
            <el-form-item>
                <el-form-item label="题目名称：" prop="problemName">
                    <el-input type="textarea" v-model="problem.problemName"></el-input>
                </el-form-item>
                <el-form-item label="题目描述：" prop="description">
                    <el-input type="textarea" v-model="problem.description"></el-input>
                </el-form-item>
                <el-form-item label="输入格式：" prop="inputFormat">
                    <el-input type="textarea" v-model="problem.inputFormat"></el-input>
                </el-form-item>
                <el-form-item label="输出格式：" prop="outputFormat">
                    <el-input type="textarea" v-model="problem.outputFormat"></el-input>
                </el-form-item>
                <el-form-item label="样例输入：" prop="sampleInput">
                    <el-input type="textarea" v-model="problem.sampleInput"></el-input>
                </el-form-item> 
                <el-form-item label="样例输出：" prop="sampleOutput">
                    <el-input type="textarea" v-model="problem.sampleOutput"></el-input>
                </el-form-item>
                <el-form-item label="最大运行时间：" prop="timeLimit">
                    <el-input type="text" v-model="problem.timeLimit"></el-input>
                </el-form-item>
                <el-form-item label="最大运行内存：" prop="memoryLimit">
                    <el-input type="text" v-model="problem.memoryLimit"></el-input>
                </el-form-item>
                <el-form-item label="提示：" prop="hint">
                    <el-input type="textarea" v-model="problem.hint"></el-input>
                </el-form-item>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确定</el-button>
                <el-button @click="resetLoginForm">重置</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    <!-- 查看题目详情 -->
    <el-dialog
        title="题目内容详情"
        :visible.sync="isShowTotal"
        width="50%" class="problemInfo">
        <h1>{{problemInfo.problemName}}</h1>
        <p>{{problemInfo.description}}</p>
        <h4>输入格式</h4>
        <p>{{problemInfo.inputFormat}}</p>
        <h4>输出格式</h4>
        <p>{{problemInfo.outputFormat}}</p>
        <h4>样例输入</h4>
        <p>{{problemInfo.sampleInput}}</p>
        <h4>样例输出</h4>
        <p>{{problemInfo.sampleOutput}}</p>
        <h4>最大运行时间</h4>
        <p>{{problemInfo.timeLimit}}</p>
        <h4>最大运行内存</h4>
        <p>{{problemInfo.memoryLimit}}</p>
        <h4>答案提示</h4>
        <p>{{problemInfo.hint}}</p>

    </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo:{
                page:0,
                size:4
            },
            token:'',
            problemName:'',
            showAll:false,
            problemList:[],
            total:0,
           dialogFormVisible: false,
           updatadialogFormVisible:false,
           editForm:{},
           problemInfo:{},
           isShowTotal:false,
           problem:{
                problemName:"",
                timeLimit:'',
                memoryLimit:'',
                description:"",
                inputFormat:"",
                outputFormat:"",
                sampleInput:"",
                sampleOutput:"",
                hint:"",
            },
           
            rules: {
            problemName: [
                { required: true, message: '请输入题目名称', trigger: 'blur' },
            ],
            timeLimit: [
                { required: true, message: '请选择最大限制时间', trigger: 'blur' },
                { pattern:/^\+?[1-9]\d*$/, message: '题目的运行时间必须在0到60000MS之间' }
            ],
            sampleInput: [
                { required: true, message: '请输入样例输入', trigger: 'blur' }
            ],
            sampleOutput: [
                { required: true, message: '请输入样例输出', trigger: 'blur' }
            ],
            memoryLimit: [
                {  required: true, message: '请选择最大运行内存', trigger: 'blur' },
                { pattern:/^\+?[1-9]\d*$/, message: '题目的运行的内存必须在0到10000Mb之间' }
            ],
            description: [
                {  required: true, message: '请输入题目描述', trigger: 'blur' }
            ],
            inputFormat: [
                {  required: true, message: '请输入格式', trigger: 'blur' }
            ],
            outputFormat: [
                { required: true, message: '请输出格式', trigger: 'blur' },
            ],
            hint: [
                { message: '给出提示', trigger: 'blur' }
            ]
            },
        }      
    },
    created() {
        this.getProblemList()
        this.token = window.sessionStorage.getItem('token')
        // console.log(this.token);
    },
    methods: {
        async getProblemList() {
            const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/problem/showList',{ 
                    params:this.queryInfo 
            })
            console.log(res);
            if (res.msg != "success") return this.$message.error('列表加载失败');
            this.problemList = res.data  
            this.total = res.total  
        },
        async seacherByName() {
            const { data: res } = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/problem/getProblemByName',{
                problemName:this.problemName
            })
             if (res.code != 0) return
            if (res.data == '') return this.$message.error('没有该题目');
            this.problemList = res.data
        },

        handleSizeChange(newSize){
            // console.log(newSize)
            this.queryInfo.size = newSize;
            this.getProblemList()
        },
        handleCurrentChange(newPage){
            // console.log(newPage)
            this.queryInfo.page = newPage
            this.getProblemList()
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      resetLoginForm () {
            this.$refs.form.resetFields()
        },
        //添加题目
        async submit(){
            const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/problem/addProblem',this.problem)
            console.log(res)
            if(res.code != 0) return this.$message.error("添加失败")
            this.dialogFormVisible = false
            this.getProblemList()
            this.$message.success('添加题目成功')

        },
        //删除题目
        async btnDelete(problemId) {
            // console.log(window.sessionStorage.getItem('token'));
            // console.log(problemId);
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
            const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/problem/deleteProblem',{
                params:{
                      problemId:problemId
                }
            },{
                headers:{
                    'token':this.token
                }
            })
            console.log(res);
            if (res.code != 0) return this.$message.error('删除失败');
            this.$message.success('删除成功')
            this.total--;
            this.getProblemList()
        },
      //修改题目
        async editProblem(problemId){
            const {data:res} = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/problem/getProblem/'+problemId)
            if(res.msg != "success") return this.$message.error('获取信息失败')
            this.editForm = res.data
            this.updatadialogFormVisible = true
        },
        editDialog(){
            this.$refs.editform.resetFields()
        },
        editProblemInfo(){
            this.$refs.editform.validate(async valid =>{
                console.log(valid)
                if(!valid) return
                // 发起用户信息请求
                const {data:res} = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/problem/updateProblem',this.editForm)
                console.log(res)
                if (res.code != 0) return this.$message.error('修改题目信息失败');
                this.updatadialogFormVisible = false
                this.total--;
                this.getProblemList()
                this.$message.success('题目修改成功')

            })
            
        },
        showProblemInfo(index,problemInfo){
            console.log(problemInfo);
            this.problemInfo = problemInfo
            this.isShowTotal = true
        },
        //跳转查看测试用例
        showTest(index,problemInfo){
            let problemId = problemInfo.problemId
            console.log(problemId);
            this.$router.push({ name:'Test',query:{ problemId:problemId }})
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
    .problemInfo{
        line-height: 40px;
    }
</style>