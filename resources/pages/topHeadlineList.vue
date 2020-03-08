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
                                        <button @click="addModal=true" class="_btn _action_btn view_btn1 category_button" type="button" style="width: 210px; padding:5px; margin-left: 5px;">Add</button>
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
                            <p class="_label _mar_b15">Head Line </p>
                            <Input v-model="updateValue.body" type="textarea" :rows="10" placeholder="Head Line... " />
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
                            <p class="_label _mar_b15">Head Line </p>
                            <Input v-model="form_data.body" type="textarea" :rows="10" placeholder="Head Line... " />
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
    </div>
</template>

<script>
    export default {
        data() {
                return {
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
                    },
                    updateValue: {
                        id: '',
                        title: '',
                        body: '',
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
                        title: 'Head Line',
                        key: 'body',

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
                                }, 'Delete')
                            ]);
                        }
                    }],
                    dataUsers: []
                }
            },
            methods: {
                showEdit(index) {
                        this.updateValue = _.clone(this.dataCoatchVideo.data[index]);
                        this.editIndex = index
                        this.editModal = true
                    },
                    showRemove(item, index) {
                        this.removeId = item.id
                        this.removeIndex = index
                        this.deleteModal = true
                    },
                    async removeItem() {
                        const res = await this.callApi('delete', '/app/topHedline', {
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
                            return this.e('top headline title can not be empty!!!')
                        }
                        if (this.updateValue.body.trim() == '') {
                            return this.e('top headline can not be empty!!!')
                        }
                          this.loading = true
                        const response = await this.callApi('put', '/app/topHedline', this.updateValue);
                        if (response.status === 200) {
                            this.dataCoatchVideo.data[this.editIndex].id = this.updateValue.id
                            this.dataCoatchVideo.data[this.editIndex].title = this.updateValue.title
                            this.dataCoatchVideo.data[this.editIndex].body = this.updateValue.body
                            this.dataCoatchVideo.data[this.editIndex].video_length = this.updateValue.video_length

                            this.updateValue = {
                                id: '',
                                title: '',
                                body: '',
                            }

                            this.editIndex = -1
                            this.loading = false
                            this.editModal = false
                            this.s('top headline updated successfully !');
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
                            return this.e('top headline title can not be empty!!!')
                        }
                        if (this.form_data.body.trim() == '') {
                            return this.e('top headline can not be empty!!!')
                        }
                          this.loading = true
                        const response = await this.callApi('post', '/app/topHedline', this.form_data)
                        if (response.status === 200) {

                            this.dataCoatchVideo.data.unshift(response.data)
                            this.s('Item added');
                            this.form_data = {
                                title: '',
                                body: '',
                            }
                              this.loading = false
                            this.addModal = false
                        } else {
                              this.loading = false
                            this.swr()
                        }
                    },
                 async getpaginate(page){
                    const res = await this.callApi('get',`/app/topHedline?page=${page}`)
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
                let page = 1
                const res = await this.callApi('get', `/app/topHedline?page=${page}`)
                if (res.status == 200) {
                    this.dataCoatchVideo = res.data
                } else {
                    this.swr()
                }
                this.isLoading = false
            },
    }
</script>