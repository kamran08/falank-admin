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
                                     <template  slot-scope="{ row }" slot="coach" v-if="row.coach">
                                            <span> {{(row.coach.name)?row.coach.name:""}}</span>                        
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
                                     <template  slot-scope="{ row }" slot="created_at" v-if="row.created_at">
                                            <span> {{(row.created_at)?row.created_at:""}}</span>                        
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
        <Modal v-model="isEdit" width="600" :closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="close"></Icon>
            </p>
            <div style="text-align:center">
                <div class="build-section-inner">
                                <!-- <div class="build-section-inner-top"> -->
                                   
                                    <div class="build-right">
                                        <div class="build-right-title">
                                            <h3>What are you working on?</h3>
                                            <p>* We’ll guide you step-by-step to add the school/coach you need.</p>
                                        </div>
                                        <div class="build-right-form">
                                            <p>(Avg. Time of Completion - 2 minutes)</p>
                                            <div class="build-right-form-inner">
                                                <form action="#">
                                                    <div class="build-input">
                                                        <label for="">School name <span class="required">*</span></label>
                                                        <input type="text" v-model="form_data.schoolName" >
                                                    </div>
                                                    <div class="build-input" v-if="form_data.coach">
                                                        <label for="">Coach name <span class="required">*</span></label>
                                                        <input type="text" v-model="form_data.coach.name" >
                                                    </div>
                                                    <div class="build-input">
                                                        <label for="">City <span class="required">*</span></label>
                                                        <input type="text" v-model="form_data.city" >
                                                    </div>
                                                    <div class="build-input">
                                                        <label for="">Division <span class="required">*</span></label>
                                                        <select name="" id="" v-model="form_data.division" >
                                                            <option value="Club/Travel">Club/Travel</option>
                                                            <option value="FL">FL</option>
                                                            <option value="High School">High School</option>
                                                            <option value="Junior College">Junior College</option>
                                                            <option value="MCLA">MCLA</option>
                                                            <option value="MO">MO</option>
                                                            <option value="NAIA">NAIA</option>
                                                            <option value="NCAA DI">NCAA DI</option>
                                                            <option value="NCAA DII">NCAA DII</option>
                                                            <option value="NCAA DIII">NCAA DIII</option>
                                                        </select>
                                                    </div>
                                                    <div class="build-input">
                                                        <label for="">State <span class="required">*</span></label>
                                                        <input type="text" v-model="form_data.state" >
                                                    </div>
                                                    <div class="build-input">
                                                        <label for="">Sport <span class="required">*</span> </label>
                                                        <select name="" id="" v-model="form_data.sport" >
                                                            <option v-for="(item,index) in allSports" :key="index" :value="item.value">{{item.name}}</option>
                                                            
                                                        </select>
                                                    </div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                <!-- </div> -->
                           
                            </div>
            </div>
            <div slot="footer">
                <Button type="primary" :loading="isLoad" @click="updateCoach">
                    <span v-if="!isLoad">Update</span>
                    <span v-else>loading...</span>
                </Button>
                <Button type="success" @click="isEdit=false">Close</Button>
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
                        
                    },
                    updateValue: {
                     
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
                        title: 'Coach Name',
                        slot: 'coach',
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
                        title: 'Date/Time',
                        slot: 'created_at',
                        width: 180,
                        
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
                                            this.editItem(params.row,params.index)
                                        }
                                    }
                                }, 'Edit'),
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
                    allSports:[],
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
                        }
                        else if(res.status==401){
                            this.e("you are not authenticate user")
                        } 
                        else {
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
                        // if (!confirm("WARNING!!! Are you sure to edit this info?")) {
                        //     return;
                        // }
                        // this.i(index)
                        let d = JSON.parse(JSON.stringify(item))
                        this.form_data = d
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
                    async updateCoach(){
                        if(!this.form_data.schoolName || this.form_data.schoolName.trim()==''){
                            this.e("School Name Can not be empty!!")
                            return
                        }
                        if(!this.form_data.coach.name || this.form_data.coach.name.trim()==''){
                            this.e("Coach Name Can not be empty!!")
                            return
                        }
                        if(!this.form_data.city || this.form_data.city.trim()==''){
                            this.e("City Name Can not be empty!!")
                            return
                        }
                        if(!this.form_data.division || this.form_data.division.trim()==''){
                            this.e("Division Name Can not be empty!!")
                            return
                        }
                        if(!this.form_data.state || this.form_data.state.trim()==''){
                            this.e("State Name Can not be empty!!")
                            return
                        }
                        if(!this.form_data.sport || this.form_data.sport.trim()==''){
                            this.e("Sport Can not be empty!!")
                            return
                        }
                        this.isLoad = true
                        const res = await this.callApi('put', '/app/schoolList', this.form_data)
                        if(res.status==200){
                            this.dataCoatchVideo.data[this.editIndex].schoolName = res.data.data.schoolName
                            this.dataCoatchVideo.data[this.editIndex].city = res.data.data.city
                            this.dataCoatchVideo.data[this.editIndex].division = res.data.data.division
                            this.dataCoatchVideo.data[this.editIndex].state = res.data.data.state
                            this.dataCoatchVideo.data[this.editIndex].sport = res.data.data.sport
                            this.dataCoatchVideo.data[this.editIndex].coach.name = res.data.data.coach.name
                            this.s("updated successfully!!")
                            this.isEdit = false
                            this.isLoad = false
                        }
                        else{
                            this.e("please check your network!!")
                            this.isLoad = false
                        }
                    }
            },

            async created() {
                let page = 1
                this.loading = true
                const res = await this.callApi('get', `/app/schoolList?page=${page}`)
                if (res.status == 200) {
                    this.dataCoatchVideo = res.data
                } else {
                    // this.swr()
                }
                this.loading = false

            const res2 = await this.callApi('get','/app/getAllSports')
            if(res2.status==200){
                this.allSports = res2.data
            }
            },
    }
</script>

<style >
    .ivu-btn-error {
        margin-right: 5px;
    }
    .ivu-btn-primary {
        margin-right: 5px;
    }
</style>