<template>
  <div>
      <!-- table表格 -->
      <el-table :data="tableData" border style="width: 100%" id="haa-table">
          <el-table-column prop="Chr" label="Chr" width="50">
          </el-table-column>
          <el-table-column prop="Gene" label="Gene" width="100">
          </el-table-column>
          <el-table-column prop="Pop" label="Pop" width="140">
          </el-table-column>
          <el-table-column prop="PopSize" label="PopSize" width="50">
          </el-table-column>
          <el-table-column prop="Plateau" label="Plateau" width="140">
          </el-table-column>
          <el-table-column prop="Altitude" label="Altitude" width="80">
          </el-table-column>
          <el-table-column prop="Phenotype" label="Phenotype" width="160">
          </el-table-column>
          <el-table-column prop="Ref" label="Ref" width="120">
          </el-table-column>
          <el-table-column prop="TissueSpecificExpression" label="TissueSpecificExpression" width="120">
          </el-table-column>
          <el-table-column prop="Tissue-specific expression of eQTLs" label="Tissue-specific expression of eQTLs" width="200">
          </el-table-column>
      </el-table>
      
      <!-- pagination分页 -->
      <el-row>
      <el-col style="text-align:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </el-col>
      </el-row>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
      return {
        currentPage:0,
        pageSizes:[10,20,30],
        size:10,
        total:180,
        tableData:[]
      }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      axios.get('/haadata.json').then(result => {
        console.log(result.data)
        this.tableData = result.data.data
      })
      },
    //获取表格数据自行分页
    getTableData(){
      //allData为全部数据
      this.tableData = this.tableData.slice(
        (this.page -1) * this.size,
        this.page * this.size
      );
      this.total = this.tableData.length
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size = val;
        this.page =1;
        this.getTableData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getTableData();
      },
      onSubmit:function(){
          alert(JSON.stringify(this.form)); 
          /* 要让form中的对象显示在网页中，所以要转换成字符串 */
      },

     
    },

  mounted(){
    this.getData()
  }
};
</script>

<style>

</style>

