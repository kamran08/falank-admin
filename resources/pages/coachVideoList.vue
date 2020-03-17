<template>
    <div>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="_1adminOverveiw_table_recent row">

                                    <div class="con-md-4">
                                        <button @click="addModal=true,imgurl=false" class="_btn _action_btn view_btn1 category_button" type="button" style="width: 210px; padding:5px; margin-left: 5px;">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                        <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
                            <div class="_overflow _table_div">
                                <Table :columns="columns1" :data="dataCoatchVideo.data">
                                </Table>
                                <div>
                                    <Page :current="dataCoatchVideo.page" :total="dataCoatchVideo.total" @on-change="getpaginate" :page-size="20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="editModal" width="800" :closable="false">
            <p slot="header" style="color:#369;text-align:center">
                <Icon type="plus"></Icon>
                <span> Edit </span>
            </p>
            <div style="">
                <div class="">
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15">Title </p>
                            <Input v-model="updateValue.title" type="textarea" :rows="2" placeholder="title... " />
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15 mar_t15">Video </p>
                            <Input v-model="updateValue.body" type="textarea" :rows="10" placeholder="Video... " />
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15 mar_t15">Video Length </p>
                            <Input v-model="updateValue.video_length" type="text" placeholder="Video Length... " />
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15 mar_t15">Image </p>
                              <div class="">
                  <div class="row">
                           
                            
                      <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                        <img :src="imgurl" alt="">

                        <div class="_1upload_upload" >
                              <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess1"
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

                            <p class="_upload_text">add picture</p>
                      </div>       
                  </div>
                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button class="all_button" type="primary" :loading="loading" @click="Update">
                    <span v-if="!loading">Update</span>
                    <span v-else>Updating...</span>
                </Button>
                <Button type="success" @click="editModal=false">Close</Button>
            </div>
        </Modal>
        <Modal v-model="addModal" width="800" :closable="false">
            <p slot="header" style="color:#369;text-align:center">
                <Icon type="plus"></Icon>
                <span> Add </span>
            </p>
            <div style="">
                <div class="">
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15">Title </p>
                            <Input v-model="form_data.title" type="textarea" :rows="2" placeholder="title... " />
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15 mar_t15">Video </p>
                            <Input v-model="form_data.body" type="textarea" :rows="10" placeholder="Video... " />
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15 mar_t15">Video Length </p>
                            <Input v-model="form_data.video_length" type="text" placeholder="Video Length... " />
                        </div>
                        <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                            <p class="_label _mar_b15 mar_t15">Image </p>
                              <div style="">
                 <div class="">
                  <div class="row">
                           
                            
                      <div class="col-12 col-md-12 col-lg-12 _mar_b20">
                        <img :src="imgurl" alt="">

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

                            <p class="_upload_text">add picture</p>
                      </div>       
                  </div>
                </div>
                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button class="all_button" type="primary" :loading="loading" @click="addItem">
                    <span v-if="!loading">add</span>
                    <span v-else>adding...</span>
                </Button>
                <Button type="success" @click="addModal=false">Close</Button>
            </div>
        </Modal>
        <Modal v-model="deleteModal" width="600" :closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="close"></Icon>
            </p>
            <div style="text-align:center">
                Are you sure you want delete this
            </div>
            <div slot="footer">
                <Button type="error" :loading="loading" @click="removeItem">
                    <span v-if="!loading">Delete</span>
                    <span v-else>Deleting...</span>
                </Button>
                <Button type="success" @click="deleteModal=false">Close</Button>
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
        data() {
                return {
                    ImageModal: false,
                    addModal: false,
                    removeId: -1,
                    removeIndex: -1,
                    editModal: false,
                    deleteModal: false,
                    loading: false,
                    dataCoatchVideo: [],
                    isLoading: true,
                    item_name: '',
                    isEdit: false,
                    form_data: {
                        title: '',
                        body: '',
                        video_length: '',
                        img: '',
                    },
                    updateValue: {
                        id: '',
                        title: '',
                        body: '',
                        video_length: '',
                        img: '',
                    },
                    editIndex: -1,
                    columns1: [{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    }, {
                        title: 'title	',
                        key: 'title',

                    }, {
                        title: 'body	',
                        key: 'body',

                    }, {
                        title: 'video length	',
                        key: 'video_length',

                    }, {
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
                                }, 'Edit'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.showRemove(params.row, params.index)
                                        }
                                    }
                                }, 'Delete'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.showImage(params)
                                        }
                                    }
                                }, 'show image')
                            ]);
                        }
                    }],
                    dataUsers: [],
                    blength:'',
                    imgurl:'',
                    singleImage:false
                }
            },
            methods: {
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

                                this.form_data.img = window.location.origin+res.image_path;
                                this.imgurl = this.form_data.img 
                                let t = this.imgurl.length
                            this.imgurl=this.imgurl.substring(this.blength, t);
                    },
                    handleSuccess1(res, file) {

                            this.updateValue.img = window.location.origin+res.image_path;
                            this.imgurl = this.updateValue.img 
                            let t = this.imgurl.length
                            this.imgurl=this.imgurl.substring(this.blength, t);
                    },
                showImage(params){
                    console.log(params)
                    
                    if(params.row.img==null || params.row.img==''){
                        return this.i("no image found!!")
                    }
                    let t = params.row.img.length
                    console.log(this.blength,t)
                    this.singleImage = params.row.img.substring(this.blength, t);
                    this.ImageModal= true
                },
         
                 showEdit(index) {
                        this.updateValue = _.clone(this.dataCoatchVideo.data[index]);
                         let t = this.dataCoatchVideo.data[index].img.length
                        this.imgurl = this.dataCoatchVideo.data[index].img.substring(this.blength, t);
                        this.editIndex = index
                        this.editModal = true
                    },
                    showRemove(item, index) {
                        this.removeId = item.id
                        this.removeIndex = index
                        this.deleteModal = true
                    },
                    async removeItem() {
                        const res = await this.callApi('delete', '/app/coachVideos', {
                            id: this.removeId
                        })
                        if (res.status == 200) {
                            this.dataCoatchVideo.data.splice(this.removeIndex, 1)
                            this.s("deleted successfully!!")
                            this.deleteModal = false
                        } else {
                            this.swr()
                        }
                        this.deleteModal = false
                    },
                    async Update() {
                        
                        if (this.updateValue.title.trim() == '') {
                            return this.e('Video title can not be empty!!!')
                        }
                        if (this.updateValue.img.trim() == '') {
                            return this.e('Video title can not be empty!!!')
                        }
                        if (this.updateValue.body.trim() == '') {
                            return this.e('Video can not be empty!!!')
                        }
                        if (this.updateValue.video_length.trim() == '') {
                            return this.e('Video length can not be empty!!!')
                        }
                        this.loading = true
                        const response = await this.callApi('put', '/app/coachVideos', this.updateValue);
                        if (response.status === 200) {
                            this.dataCoatchVideo.data[this.editIndex].id = this.updateValue.id
                            this.dataCoatchVideo.data[this.editIndex].title = this.updateValue.title
                            this.dataCoatchVideo.data[this.editIndex].body = this.updateValue.body
                            this.dataCoatchVideo.data[this.editIndex].video_length = this.updateValue.video_length
                            this.dataCoatchVideo.data[this.editIndex].img = this.updateValue.img

                            this.updateValue = {
                                id: '',
                                title: '',
                                body: '',
                                video_length: '',
                                img: '',
                            }

                            this.editIndex = -1
                            this.loading = false
                            this.editModal = false
                            this.s('Item updated successfully !');
                        } else {
                            this.swr();
                            this.editModal = false
                            this.loading = false
                        }

                    },

                    editItem(item, index) {
                        if (!confirm("WARNING!!! Are you sure to edit this info?")) {
                            return;
                        }
                        this.form_data = _.clone(item);
                        this.editIndex = index
                        this.isEdit = true;
                    },

               

                    async addItem() {
                        if (this.form_data.title.trim() == '') {
                            return this.e('Video title can not be empty!!!')
                        }
                     
                        if (this.form_data.body.trim() == '') {
                            return this.e('Video can not be empty!!!')
                        }
                        if (this.form_data.video_length.trim() == '') {
                            return this.e('Video length can not be empty!!!')
                        }
                        if (!this.form_data.img || this.form_data.img.trim() == '') {
                            return this.e('Image can not be empty!!!')
                        }
                        this.loading = true
                        const response = await this.callApi('post', '/app/coachVideos', this.form_data)
                        if (response.status === 200) {

                            this.dataCoatchVideo.data.unshift(response.data)
                            this.s('Item added');
                            this.form_data = {
                                title: '',
                                body: '',
                                video_length: '',
                                img: ''

                            }
                            this.loading = false
                            this.addModal = false
                        } else {
                            this.swr()
                        }
                    },
             async getpaginate(page){
                const res = await this.callApi('get',`/app/coachVideos?page=${page}`)
                    if(res.status == 200){
                        this.dataCoatchVideo=res.data;
                    }
                    else{
                        this.e('Oops!','Something went wrong, please try again!')
                        this.le();
                    }
            },
            },

            async created() {
                this.blength = window.location.origin.length
                // console.log(this.blength,window.location.origin)
                let page =1
                this.loading = true
                const res = await this.callApi('get', `/app/coachVideos?page=${page}`)
                if (res.status == 200) {
                    this.dataCoatchVideo = res.data
                } else {
                    this.swr()
                }
                this.loading = false
            },
    }
</script>