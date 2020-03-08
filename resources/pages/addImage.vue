<template>
	<div>
		<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
                      
						<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                        <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
                            <div class="_overflow _table_div">
                                 <Table  :columns="columns1" :data="dataCoatchVideo">
                                </Table>
                                
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
         <Modal v-model="editModal" width="800" :closable="false" >
                <p slot="header" style="color:#369;text-align:center">
                    <Icon type="plus"></Icon>
                    <span> EDIT {{updateValue.name}} IMAGE</span>
                </p>
                <div style="">
                  <div class="">
                  <div class="row">
                           
                            
                      <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                        <img :src="updateValue.url" alt="">

                        <div class="_1upload_upload" >
                              <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                type="drag"
                                action="/uploadImages"
                              >
                                <div>
                                  <div class="_1upload_main">
                                    <p class="_1upload_icon">
                                      <i class="fas fa-camera"></i>
                                    </p>
                                  </div>
                                </div>
                              </Upload>
                            </div>
                            <!-- Upload -->

                            <p class="_upload_text">Change add picture</p>
                      </div>       
                  </div>
                </div>
                </div>
                <div slot="footer">
                    <Button class="all_button" type="primary"   :loading="loading" @click="Update">
                        <span v-if="!loading">Update</span>
                        <span v-else>Updating...</span>
                    </Button>
                    <Button type="success" @click="editModal=false" >Close</Button>
                </div>
        </Modal>
         <Modal v-model="ImageModal" width="600" :closable="false" >
              <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="close"></Icon>
              </p>
              <div style="text-align:center" v-if="singleImage">
                  <img :src="singleImage" alt="">
              </div>
              <div slot="footer">
                  <Button type="success"  @click="ImageModal=false, singleImage=false">Close</Button>
              </div>
        </Modal>
	</div>
</template>

<script>
export default {
    data(){
		return{
            addModal:false,
            removeId:-1,
            removeIndex:-1,
            editModal:false,
            deleteModal:false,
            loading:false,
		    dataCoatchVideo:[],
			isLoading:true,
            item_name:'',
            isEdit:false,
            form_data: {
                title:'',
                body:'',
                video_length:'',
            },
            updateValue: {
                id:'',
                url:'',
            },
            editIndex:-1,
			 columns1: [
                
                    {
                        title: 'title	',
                        key: 'name',
                       
                    },
                    {   
                        title: 'Image',
                        key: 'action',
                       
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showImage(params)
                                        }
                                    }
                                }, 'view'),
                             
                            ]);
                        }
                    },
                        {   
                        title: 'Action',
                        key: 'action',
                       
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showEdit(params.index)
                                        }
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
            ],
            dataUsers:[],
            ImageModal:false,
            singleImage : false
		}
	},
    methods:{
        handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      
    },
    handleSuccess(res, file) {

       this.updateValue.url = window.location.host+res.image_path;
    },
        showEdit(index){
            this.updateValue = _.clone(this.dataCoatchVideo[index]);
            this.updateValue.name= this.updateValue.name.toUpperCase()
            console.log(this.updateValue)
            this.editIndex = index
            this.editModal= true
        },
        showImage(params){
            console.log(params)
            this.ImageModal= true
            this.singleImage = params.row.url
        },
        showRemove(item,index){
            this.removeId = item.id
            this.removeIndex = index
            this.deleteModal= true
        },
       async removeItem(){
           const res = await this.callApi('post', '/app/deleteVideos', {id:this.removeId})
           if(res.status == 200){
               this.dataCoatchVideo.data.splice(this.removeIndex,1)
               this.s("deleted successfully!!")
               this.deleteModal = false
           }
           else{
               this.swr()
           }
            this.deleteModal= false
        },
        async Update(){
            
           
            if (!this.updateValue.url || this.updateValue.url=='') {
               return this.e('image can not be empty!!!')
            }
           
            this.loading = true
            const response = await this.callApi('post', '/app/updateAddImage', this.updateValue);
            if (response.status === 200) {
                this.dataCoatchVideo[this.editIndex].id=this.updateValue.id
                this.dataCoatchVideo[this.editIndex].url=this.updateValue.url
                
                this.updateValue= {
                     id:'',
                     url:'',
                }

                this.editIndex = -1
                this.loading = false
                this.editModal = false
                this.s('Item updated successfully !');
            }else{
                this.swr();
                this.editModal= false
                this.loading= false
            }


        },
      

        editItem(item,index){
            if(!confirm("WARNING!!! Are you sure to edit this info?")){
                return;
            }
            this.form_data = _.clone(item);
            this.editIndex = index
            this.isEdit = true;
        },

   
      
        async getpaginate(page){
                const res = await this.callApi('get',`/app/indexVideos?page=${page}`)
                    if(res.status == 200){
                        this.dataCoatchVideo=res.data;
                    }
                    else{
                        this.e('Oops!','Something went wrong, please try again!')
                        this.le();
                    }
            },
    },
    
    async created(){
        let page =1
        this.loading = true
        const res = await this.callApi('get',`/app/indexAddImage`)
		if( res.status == 200){
			this.dataCoatchVideo = res.data
		} else {
			this.swr()
		}
		this.loading = false
	},
}
</script>



