<template>
	<div>
		<div class="content">
			<div class="container"> 
				<div class="row">
					<div class="col-lg-12">
                        <div class="row">
                         
                        </div>
						<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                        <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
                            <div class="_overflow _table_div">
                                 <Table  :columns="columns1" :data="dataUsers.data">
                                       <template v-if="row.img"  slot-scope="{ row }" slot="image">
                                            <span> <img :src="row.img" alt=""></span>                        
                                        </template>
                                       <template v-if="row.firstName"  slot-scope="{ row }" slot="firstName">
                                            <span> {{row.firstName}}</span>                        
                                        </template>
                                       <template v-if="row.lastName"  slot-scope="{ row }" slot="lastName">
                                            <span> {{row.lastName}}</span>                        
                                        </template>
                                       <template v-if="row.birthday"  slot-scope="{ row }" slot="birthday">
                                            <span> {{row.birthday}}</span>                        
                                        </template>

                                       <template v-if="row.zip"  slot-scope="{ row }" slot="zip">
                                            <span> {{row.zip}}</span>                        
                                        </template>
                                   
                                       <template v-if="row.address"  slot-scope="{ row }" slot="address">
                                            <span> {{row.address}}</span>                        
                                        </template>
                                       <template v-if="row.packType"  slot-scope="{ row }" slot="packType">
                                            <span> {{row.packType}}</span>                        
                                        </template>
                                       <template v-if="row.gender"  slot-scope="{ row }" slot="gender">
                                            <span> {{row.gender}}</span>                        
                                        </template>
                                       <template v-if="row.login_source"  slot-scope="{ row }" slot="login_source">
                                            <span> {{row.login_source}}</span>                        
                                        </template>
                                </Table>
                                <div>
                                    <Page :current="dataUsers.page" :total="dataUsers.total" @on-change="getpaginate" :page-size="20" />
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data(){
		return{
		    dataUsers:[],
			isLoading:true,
            item_name:'',
            isEdit:false,
            form_data: {
                id:'',
                info:'',
                isAvailable:'',
            },
            editIndex:'',
			 columns1: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        width: 120,
                        title: 'Profile	',
                         slot: 'image',
                       
                    },
                    {
                        width: 120,
                        title: 'FirstName',
                        slot: 'firstName',
                       
                    },
                    {
                        width: 120,
                        title: 'LastName	',
                        slot: 'lastName',
                       
                    },
                    {
                        width: 120,
                        title: 'Email',
                        key: 'email',
                       
                    },
                    {
                        width: 120,
                        title: 'Birthday',
                        slot: 'birthday',
                       
                    },
                    {
                        width: 120,
                        title: 'Zip Code',
                        slot: 'zip',
                       
                    },
                    {
                        width: 120,
                        title: 'Address',
                        slot: 'address',
                       
                    },
                    {
                        width: 120,
                        title: 'Pack Type',
                        slot: 'packType',
                       
                    },
                    {
                        width: 120,
                        title: 'Gender',
                        slot: 'gender',
                       
                    },
                    {
                        width: 120,
                        title: 'Login Source',
                        slot: 'login_source',
                       
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
                                            this.deleteItem(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
            ],
            dataUsers:[]
		}
	},
    methods:{
         async deleteItem(index){
            // console.log(id)
            if(!confirm("WARNING!!! Are you sure to delete this info?")){
                return;
            }
            let ob = {
                id:this.dataUsers.data[index].id
            }

            const response = await this.callApi('delete', '/app/deleteUser',ob)
            if (response.status === 200) {
                this.dataUsers.data.splice(index,1)
                this.s('Item deleted');

            }else{
                console.log(response);
                this.swr()
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

        cencelEdit(){
            this.form_data.id = '';
            this.form_data.name = '';
            this.isEdit = false;
            this.editIndex = -1;
        },

        async addItem(){
            if (this.form_data.info=='' || this.form_data.isAvailable == '') {
               return this.e('All field are required!')
            }
            this.loading = true
            const response = await this.callApi('post', '/app/bussniess', this.form_data)
            if (response.status === 200) {
                
                this.data.push(response.data)
                this.s('Item added');
                let form_data= {
                        id:'',
                        info:'',
                        isAvailable:'',
                }
                this.form_data = form_data
                this.loading = false

            }else{
                this.loading = false
                this.swr()
            }
        },

        async updateItem(){
            if (this.form_data.name=='') {
                return  this.e('Name is required')
            }
            this.loading = true
            const response = await this.callApi('put', '/app/bussniess', this.form_data);
            if (response.status === 200) {
                this.data[this.editIndex].info=this.form_data.info
                this.data[this.editIndex].isAvailable=this.form_data.isAvailable
                let form_data= {
                    id:'',
                    info:'',
                    isAvailable:'',
                }
                this.form_data = form_data
                this.editIndex = -1
                this.loading = false
                this.isEdit = false
                this.s('Item updated successfully !');
            }else{
                this.loading = false
                this.swr();
            }
        },
        async getpaginate(page){
              const res = await this.callApi('get',`/app/alluser?page=${page}`)
                if(res.status == 200){
                    this.dataUsers=res.data;
                }
                else{
                    this.e('Oops!','Something went wrong, please try again!')
                    this.le();
                }
        },
       async showRemove(id){

       }


    },
    
    async created(){
        let page = 1
          this.loading = true
        const res = await this.callApi('get',`/app/alluser?page=${page}`)
		if( res.status == 200){
			this.dataUsers = res.data
		} else {
			this.swr()
		}
		this.loading = false
	},
}
</script>



