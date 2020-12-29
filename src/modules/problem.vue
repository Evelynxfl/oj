<template>
    <div>
        <el-card class="box-card">
            <div class="search">
                <el-row type="flex" class="row-bg" :gutter="30">
                    <el-col :span="14"><div class="grid-content bg-purple">
                        <el-input v-model="problemName" placeholder="搜索题目名称" clearable @clear="getProblemList"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light">
                        <el-button type="primary" icon="el-icon-search" @click="seacherByName" >搜索</el-button>
                    </div></el-col>
                </el-row>
            </div>
            <el-table :data="problemList" style="width: 100%" fit stripe>
                <el-table-column
                    label="是否做过"
                    width="180">
                </el-table-column>
                <el-table-column
                    type="index"
                    label="#"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="题名">
                    <template slot-scope="scope">
                        <a :href="getProblemsHref(scope.row.problemId)">{{ scope.row.problemName }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="submissionSuccessNum"
                    label="通过次数">
                </el-table-column>
                <el-table-column
                    label="通过率"
                    :formatter='formatdata'>
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
            problemName:'',
            total:0,
            problemList:[],
            problemId:''

        }
    },
    created() {
        this.getProblemList()
    },
    methods: {
        async getProblemList() {
            console.log("hahaha");
            const { data: res } = await this.$http.get('http://gnibra7h.dongtaiyuming.net:11770/problem/showList',{ 
                    params:this.queryInfo 
            })
            console.log(res);
            if (res.code != 0) return;
            this.problemList = res.data  
            this.total = res.total  
        },
        async seacherByName() {
            const { data: res } = await this.$http.post('http://gnibra7h.dongtaiyuming.net:11770/problem/getProblemByName',{
                problemName:this.problemName
            })
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
        getProblemsHref:function(val){
	        return 'http://localhost:8080/problem_decs.html?'+val
        },
        formatdata(row, column, cellvalue, index){
            const submissionSuccessNum = parseInt(row.submissionSuccessNum)
            const submissionTotal = parseInt(row.submissionTotal)
            const data = ((submissionSuccessNum/submissionTotal)*100).toFixed(2)
            if((submissionSuccessNum/submissionTotal)*100)
                return data+'%'
            return 0+'%'
        }
    }
}
</script>

<style lang="less" scoped>
    .search{
        padding-bottom: 20px;
    }
    .pagination{
        padding-top: 20px;
    }
    a{
        color: black;
        text-decoration: none;
    }
</style>