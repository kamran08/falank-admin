<template>
    <div>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="_1adminOverveiw_table_recent row">
                                </div>
                            </div>
                        </div>
                        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                        <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
                            <div class="_overflow _table_div">
                                <Table :columns="columns1" :data="dataCoatchVideo.data">
                                     <template  slot-scope="{ row }" slot="schoolName" v-if="row.schoolName">
                                            <span> {{(row.schoolName)?row.schoolName:""}}</span>                        
                                      </template>

                                     <template  slot-scope="{ row }" slot="sport" v-if="row.sport">
                                            <span> {{(row.sport)?row.sport+" ":""}}</span>                        
                                        </template>

                                     <template  slot-scope="{ row }" slot="city" v-if="row.city">
                                            <span> {{(row.city)?row.city:""}}</span>                      
                                        </template>

                                     <template  slot-scope="{ row }" slot="division" v-if="row.division">
                                            <span> {{(row.division)?row.division:""}}</span>                        
                                        </template>
                                     <template  slot-scope="{ row }" slot="state" v-if="row.state">
                                            <span> {{(row.state)?row.state:""}}</span>                        
                                        </template>
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
        <Modal v-model="aprroveModal" width="600" :closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="close"></Icon>
            </p>
            <div style="text-align:center">
                Are you sure you want Approved this
            </div>
            <div slot="footer">
                <Button type="primary" :loading="isLoad" @click="aprovedSchoolMethod">
                    <span v-if="!isLoad">Approve</span>
                    <span v-else>loading...</span>
                </Button>
                <Button type="success" @click="aprroveModal=false">Close</Button>
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
                        video_length: '',
                    },
                    updateValue: {
                        id: '',
                        title: '',
                        body: '',
                        video_length: '',
                    },
                    editIndex: -1,
                   columns1: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },

                    {
                        title: 'School Name',
                        slot: 'schoolName',
                        width: 150,
                       
                    },
                    {
                        title: 'Sports Type',
                        slot: 'sport',
                        width: 150,
                        
                    },
                    {
                        title: 'City',
                        slot: 'city',
                        width: 100,
                       
                    },
                    {
                        title: 'Division',
                        slot: 'division',
                        width: 150,
                        
                    },
                    {
                        title: 'State',
                        slot: 'state',
                        width: 150,
                        
                    },
                 
                   
                    {   
                        title: 'Action',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.showRemove(params.index)
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
                                            this.approveSchool(params.index)
                                        }
                                    }
                                }, 'Approve')
                            ]);
                        }
                    }
                 ],
                    dataUsers: [],
                    isLoad:false,
                    approveId:-1,
                    approveIndex:-1,
                    aprroveModal:false,
                }
            },
            methods: {
                showEdit(index) {
                        this.updateValue = _.clone(this.dataCoatchVideo[index]);
                        console.log(this.updateValue)
                        this.editIndex = index
                        this.editModal = true
                    },
                    showRemove(index) {
                        this.removeId = this.dataCoatchVideo.data[index].id
                        this.removeIndex = index
                        this.deleteModal = true
                    },
                    approveSchool(index) {
                        this.approveId = this.dataCoatchVideo.data[index].id
                        this.approveIndex = index
                        this.aprroveModal = true
                    },
                    async removeItem() {
                        const res = await this.callApi('delete', '/app/schoolList', {
                            id: this.removeId
                        })
                        if (res.status == 200) {
                            this.dataCoatchVideo.data.splice(this.removeIndex,1)
                            this.s("deleted successfully!!")
                            this.deleteModal = false
                        } else {
                            this.swr()
                        }
                        this.deleteModal = false
                    },
                    async aprovedSchoolMethod() {
                          this.isLoad= true


                        const res = await this.callApi('post', '/app/schoolList', {
                            id: this.approveId
                        })
                        if (res.status == 200) {
                            this.dataCoatchVideo.data.splice(this.approveIndex,1)
                            this.s("deleted successfully!!")
                            this.aprroveModal = false
                            this.isLoad = false
                        } else {
                            this.isLoad = false
                            this.swr()
                        }
                        this.isLoad = false
                        // this.aprroveModal = false
                    },
                    async Update() {
                        
                        if (this.updateValue.title.trim() == '') {
                            return this.e('Video title can not be empty!!!')
                        }
                        if (this.updateValue.body.trim() == '') {
                            return this.e('Video can not be empty!!!')
                        }
                        if (this.updateValue.video_length.trim() == '') {
                            return this.e('Video length can not be empty!!!')
                        }
                        this.loading = true
                        const response = await this.callApi('put', '/app/schoolList', this.updateValue);
                        if (response.status === 200) {
                            this.dataCoatchVideo[this.editIndex].id = this.updateValue.id
                            this.dataCoatchVideo[this.editIndex].title = this.updateValue.title
                            this.dataCoatchVideo[this.editIndex].body = this.updateValue.body
                            this.dataCoatchVideo[this.editIndex].video_length = this.updateValue.video_length

                            this.updateValue = {
                                id: '',
                                title: '',
                                body: '',
                                video_length: '',
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
                        this.loading = true

                        const response = await this.callApi('post', '/app/schoolList', this.form_data)
                        if (response.status === 200) {

                            this.dataCoatchVideo.unshift(response.data)
                            this.s('Item added');
                            this.form_data = {
                                title: '',
                                body: '',
                                video_length: ''

                            }
                            this.loading = false
                            this.addModal = false
                        } else {
                            this.loading = false
                            this.swr()
                        }
                    },
                      async getpaginate(page){
                        const res = await this.callApi('get',`/app/schoolList?page=${page}`)
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
                this.loading = true
                const res = await this.callApi('get', `/app/schoolList?page=${page}`)
                if (res.status == 200) {
                    this.dataCoatchVideo = res.data
                } else {
                    this.swr()
                }
                this.loading = false
            },
    }
</script>