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
                                     <template  slot-scope="{ row }" slot="reviewFor" v-if="row.legend">
                                            <span> {{(row.legend.name)?row.legend.name:""}}</span>                        
                                      </template>

                                     <template  slot-scope="{ row }" slot="reviwer" v-if="row.reviwer">
                                            <span> {{(row.reviwer.firstName)?row.reviwer.firstName+" ":""}}{{(row.reviwer.lastName)?row.reviwer.lastName:""}}</span>                        
                                        </template>
                                     <template  slot-scope="{ row }" slot="legend" v-if="row.legend">
                                            <span> {{(row.legend.name)?row.legend.name:""}}</span>                      
                                        </template>
                                     <template  slot-scope="{ row }" slot="school" v-if="row.school">
                                            <span> {{(row.school)?row.school.schoolName:""}}</span>                        
                                        </template>
                                     <template  slot-scope="{ row }" slot="coach" v-if="row.coach">
                                            <span> {{(row.coach)?row.coach.name:""}}</span>                        
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
                        title: 'Review For',
                        slot: 'reviewFor',
                         width: 120,
                       
                    },
                    {
                        title: 'Reviwer',
                        slot: 'reviwer',
                        width: 100,
                       
                    },
                    {
                        title: 'Legand Name',
                        slot: 'legend',
                        width: 150,
                        
                    },
                    {
                        title: 'School Name',
                        slot: 'school',
                        width: 150,
                       
                    },
                    {
                        title: 'Coach Name',
                        slot: 'coach',
                        width: 150,
                       
                    },
                    {
                        title: 'Review Type',
                        key: 'review_type',
                        width: 150,
                       
                    },
                    {
                        title: 'content ',
                        key: 'content',
                        width: 150,
                       
                    },
                    {
                        title: 'rating',
                        key: 'rating',
                        width: 100,
                       
                    },
                    {   
                        title: 'Action',
                        key: 'action',
                       width: 120,
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
                                }, 'Delete')
                            ]);
                        }
                    }
                 ],
                    dataUsers: []
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
                    async removeItem() {
                        const res = await this.callApi('delete', '/app/reviewList', {
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
                        const response = await this.callApi('put', '/app/reviewList', this.updateValue);
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

                        const response = await this.callApi('post', '/app/reviewList', this.form_data)
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
                        const res = await this.callApi('get',`/app/reviewList?page=${page}`)
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
                const res = await this.callApi('get', `/app/reviewList?page=${page}`)
                if (res.status == 200) {
                    this.dataCoatchVideo = res.data
                } else {
                    this.swr()
                }
                this.loading = false
            },
    }
</script>