<template>
    <h3>Funds Status</h3>
  <EasyDataTable 
  :headers="headers" 
  :items="fundsStatusToTable" 
  table-class-name="customize-table"
  alternating>
  </EasyDataTable>
</template>

<script>
import { mapGetters } from "vuex";
  import {
    FUNDS_MODULE,
    GET_FUNDS_GETTER,
  } from "../store/storeconstants";
  import {
    getFundsStatus,
} from "../services/ApiRequests";

export default {
  data() {
    return {
      headers: [
        { text: "Fund", value: "fundName" },
        { text: "Invested Sum", value: "investedSum" },
        { text: "Actual Sum", value: "actualSum" },
        { text: "Profit", value: "profit" },
      ],
      fundsStatusPromise: {},
      fundsStatus: []
    };
  },
  components: {},
  computed: {
    ...mapGetters(FUNDS_MODULE, {
      funds: GET_FUNDS_GETTER,
    }),
    fundsStatusToTable: function () {
      let result = [];
      
      let funds = this.funds

      if (
        funds !== undefined &&
        funds.length > 0 &&
        this.fundsStatus !== undefined &&
        this.fundsStatus.length > 0
      ) {
        funds.forEach((fund) => {
          let fundStatus = this.fundsStatus.find(
            (x) => x.fundId == fund.fundId
          );

          if (fundStatus === undefined) {
            console.log(`No status found for category ${fund.fundName}`);
            return [];
          }

          fundStatus.fundName = fund.fundName;
          result.push(fundStatus);
        });
      }
      
      return result;
    },
  },
  methods: {
      async populateTable(){
        let now = new Date().toISOString();
        let today = now.split("T")[0];
        this.fundsStatusPromise = await getFundsStatus(today);
      }
    },
    watch: {
      fundsStatusPromise(newVal){
        this.fundsStatus = newVal;
      }
    },
    mounted() {
      this.populateTable();
    },
    created() {
      
    },
};
</script>
