<template>
  <h3>Funds Status</h3>
  <br />
  <div class="container">
    <div class="row">
      <div class="col">
        <h5 align="left">Current State</h5>
        <EasyDataTable
          :headers="headers"
          :items="fundsStatusToShow"
          table-class-name="customize-table"
          alternating
        >
        </EasyDataTable>
      </div>
      <div class="col">
        <h5 align="left">Actual Sums</h5>
      
        <pie-chart
          :data="pieChartData"
          loading="Loading..."
          empty="No data"
        ></pie-chart>
      </div>
    </div>
    <br />
    <div class="row">
      <h5 align="left">History</h5>
      <line-chart
        :data="lineChartData"
        xtitle="Time"
        ytitle="Profit (NIS)"
        loading="Loading..."
        empty="No data"
        :curve="false"
      ></line-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FUNDS_MODULE, GET_FUNDS_GETTER } from "../store/storeconstants";
import { getFundsStatus, getFundsStatusHistory } from "../services/ApiRequests";

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
      fundsStatus: [],

      fundsStatusHistoryPromise: {},
      fundsStatusHistory: [],
    };
  },
  components: {},
  computed: {
    ...mapGetters(FUNDS_MODULE, {
      funds: GET_FUNDS_GETTER,
    }),
    fundsStatusToShow: function () {
      let result = [];

      let funds = this.funds;

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
            console.log(`No status found for fund ${fund.fundName}`);
            return [];
          }

          fundStatus.fundName = fund.fundName;
          result.push(fundStatus);
        });
      }

      return result;
    },
    pieChartData: function() {
      let res = []
      this.fundsStatusToShow.forEach(status => {
        let element = [status.fundName, status.actualSum]
        res.push(element)
      });

      return res;
    },
    lineChartData: function () {
      let result = [];

      this.funds.forEach((fund) => {
        let fundName = fund.fundName;
        let fundId = fund.fundId;

        let statusHistoryPerFund = this.fundsStatusHistory.filter(
          (x) => x.fundId == fundId
        );

        let lineData = {};
        statusHistoryPerFund.forEach(historyUnit => {
          lineData[historyUnit.toTime] =  historyUnit.status;
        })

        let line = {}
        line.name = fundName;
        line.data = lineData;

        result.push(line);
      });

      return result;
    },
  },
  methods: {
    async populateFundsStatus() {
      let now = new Date().toISOString();
      let today = now.split("T")[0];
      this.fundsStatusPromise = await getFundsStatus(today);
    },
    async populateFundsStatusHistory() {
      this.fundsStatusHistoryPromise = await getFundsStatusHistory(6);
    },
  },
  watch: {
    fundsStatusPromise(newVal) {
      this.fundsStatus = newVal;
    },
    fundsStatusHistoryPromise(newVal) {
      this.fundsStatusHistory = newVal;
    },
  },
  mounted() {
    this.populateFundsStatus();
    this.populateFundsStatusHistory();
  },
  created() {},
};
</script>
