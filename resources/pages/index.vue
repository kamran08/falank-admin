<template>
	<div>
		<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
            <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
                <div class="coustom_design">
                    <div class="row" >
                        <div class="col-md-4 padding_coustom">
                            <Card class="padding_coustom_card">
                                <div style="text-align:center">
                                    <Icon type="ios-create-outline" /> {{alldata.user}}

                                    <h3>Total Users </h3>
                                </div>
                             </Card>
                            </div>
                        <div class="col-md-4 padding_coustom">
                        <Card class="padding_coustom_card">
                                <div style="text-align:center">
                                    <Icon type="ios-create-outline" />{{alldata.review}}
                                    <h3>Total Reviews</h3>
                                </div>
                            </Card>
                        </div>
                        <div class="col-md-4 padding_coustom">
                        <Card  class="padding_coustom_card">
                                <div style="text-align:center">
                                    <Icon type="ios-create-outline" />{{alldata.question}}

                                    <h3>Total Questions</h3>
                                </div>
                            </Card>
                        </div>
                        <div class="col-md-4 padding_coustom">
                        <Card  class="padding_coustom_card">
                                <div style="text-align:center">
                                    <Icon type="ios-create-outline" />{{alldata.video}}

                                    <h3>Total Videos</h3>
                                </div>
                            </Card>
                        </div>
                        <div class="col-md-4 padding_coustom">
                        <Card  class="padding_coustom_card">
                                <div style="text-align:center">
                                    <Icon type="ios-create-outline" />{{alldata.coachVideo}}

                                    <h3>Total  Coach Videos</h3>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="data">
                <h2 style="padding-bottom:10px;">Review of last 30 days</h2>
                <column-chart :data="data"></column-chart>
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
            alldata:[],
            data : []
			
		}
	},
    methods:{
        
    },
    
    async created(){
    
        const res = await this.callApi('get','/app/deshboardData')
		if( res.status == 200){
            this.alldata = res.data
         
                
            for(let item of this.alldata.stath){
                    //  let ob = {
                    //      [item.day]:item.numOfReview
                    //  }
                    let ob = []
                    ob.push (item.day)
                    ob.push (item.numOfReview)
                    this.data.push(ob)
                   
            }
                   
            
            console.log(this.data)
		} else {
			this.swr()
		}
		this.isLoading = false
	},
}
</script>
<style>
.coustom_design{
    background: #f5e9e9;
}
.padding_coustom{
    padding: 10px;
}
.padding_coustom_card{
    margin-left: 16px;
    margin-right: 11px;
    margin-bottom: 11px;

}
</style>



