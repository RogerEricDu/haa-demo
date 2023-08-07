<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
            <el-select v-model="formInline.chr" placeholder="Chr:">
             <el-option label="Chr1" value="Chr1"></el-option>
             <el-option label="Chr2" value="Chr2"></el-option>
             <el-option label="Chr3" value="Chr3"></el-option>
             <el-option label="Chr4" value="Chr4"></el-option>
             <el-option label="Chr5" value="Chr5"></el-option>
             <el-option label="Chr6" value="Chr6"></el-option>
             <el-option label="Chr7" value="Chr7"></el-option>
             <el-option label="Chr8" value="Chr8"></el-option>
             <el-option label="Chr9" value="Chr9"></el-option>
             <el-option label="Chr10" value="Chr10"></el-option>
             <el-option label="Chr11" value="Chr11"></el-option>
             <el-option label="Chr12" value="Chr12"></el-option>
             <el-option label="Chr13" value="Chr13"></el-option>
             <el-option label="Chr14" value="Chr14"></el-option>
             <el-option label="Chr15" value="Chr15"></el-option>
             <el-option label="Chr16" value="Chr16"></el-option>
             <el-option label="Chr17" value="Chr17"></el-option>
             <el-option label="Chr18" value="Chr18"></el-option>
             <el-option label="Chr19" value="Chr19"></el-option>
             <el-option label="Chr20" value="Chr20"></el-option>
             <el-option label="Chr21" value="Chr21"></el-option>
             <el-option label="Chr22" value="Chr22"></el-option>
             <el-option label="ChrX" value="ChrX"></el-option>
             <el-option label="ChrY" value="ChrY"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
        <el-input v-model="formInline.gene" placeholder="gene"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="search">Search</el-button>
        </el-form-item>
    </el-form>
        <!-- table表格 -->
        <el-table :data="tableData" border style="width: 100%">
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
          formInline:{
        Chr:'',
        Gene:''
        },
          currentPage:1,
          pageSizes:[10,20,30],
          size:10,
          total:180,
          tableData:[],
          allData:[]
        };
    },
    methods:{
      search() {
        // 获取搜索值并将其转换为小写，实现大小写不敏感搜索
        let search = this.formInline.gene.toLowerCase();
        
        if (search) {
          // 使用filter方法找到匹配的项
          this.tableData = this.allData.filter((item) => {
            return (
              item.Chr.toLowerCase().indexOf(search) !== -1 ||
              item.Gene.toLowerCase().indexOf(search) !== -1
            );
          });         
          this.total = this.tableData.length; //****如果搜索为空则使用全部数据
          this.currentPage =1 ; //*****筛选后需要将当前页面重置为1
        } else {
          this.currentPage =1 ;
          this.getTableData();//更新带有筛选后数据的表格
        }
      },
        getData() {
        axios.get('/haadata.json')
        .then(result => {
          const data = result.data.data; // Assuming the actual data is in the 'data' property
          if (Array.isArray(data)) {
            this.allData = data; // Assign the data only if it is an array
            this.getTableData();//调用此方法初始化tableData和total
          } else {
            console.error('Error: Data is not an array');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
        //获取表格数据自行分页
        getTableData(){
            // 计算当前页的起始索引和结束索引
        const startIndex = (this.currentPage - 1) * this.size;
        const endIndex = startIndex + this.size;

        // 根据计算得到的索引对数据进行切片
        this.tableData = this.allData.slice(startIndex, endIndex);

        // 更新总数以用于分页
        this.total = this.allData.length;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size = val;
        this.currentPage =1;
        this.getTableData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getTableData();
      },
        onSubmit:function(){
            alert(JSON.stringify(this.form)); 
            /* 要让form中的对象显示在网页中，所以要转换成字符串 */
        },
  
       
      },
    created(){
      this.getData();
      this.getTableData();
    }
  };
  </script>
  
  <style>

  /* style for the form */
  .demo-form-inline{
    margin-bottom: 20px;
  }



  </style>
  
  