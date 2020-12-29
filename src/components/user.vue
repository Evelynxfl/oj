<template>
    <div>
        <el-card shadow="always">
            <div class="search">
                <el-row type="flex" class="row-bg" :gutter="30">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-input placeholder="输入关键字搜索" clearable ></el-input>
                    </div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light">
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </div></el-col>
                     <el-col :span="6"><div class="grid-content bg-purple-light">
                        <el-button type="primary" icon="el-icon-plus">
                            添加题目
                        </el-button>
                    </div></el-col>
                </el-row>
            </div>
            <el-table :data="userList" style="width: 100%" fit stripe>
                <el-table-column
                    type="index"
                    label="#"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名称">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="用户邮箱">
                </el-table-column>
                <el-table-column
                    prop="preferLanguage.languageName"
                    label="擅长语言">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>   
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
                layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>    
        </el-card>
                <!-- 修改题目 -->
                <!-- <el-dialog title="修改题目" :visible.sync="updatadialogFormVisible" @close="editDialog">
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
    </el-dialog> -->
    <!-- 添加题目 -->
    <!-- <el-dialog title="添加题目" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
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
            userList:[]
        }
    },
   created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/user/showList',{ 
                    params:this.queryInfo 
            })
            console.log(res);
            if (res.code != 0) return this.$message.error('用户列表加载失败');
            this.userList = res.data  
            this.total = res.total  
        },
        // async seacherByName() {
        //     const { data: res } = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/problem/getProblemByName',{
        //         problemName:this.problemName
        //     })
        //      if (res.code != 0) return
        //     if (res.data == '') return this.$message.error('没有该题目');
        //     this.problemList = res.data
        // },
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
    }
}
</script>

<style lang="less" scoped>

</style>