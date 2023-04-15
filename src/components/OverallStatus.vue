<template>
  <h3>Overall Status</h3>

  <EasyDataTable
    :headers="headers"
    :items="tableData"
    table-class-name="customize-table"
    alternating
  >
  </EasyDataTable>
</template>

<script>
import { mapGetters } from "vuex";
import {
  AUTH_MODULE,
  GET_USER_NAME_GETTER,
  GET_USER_EMAIL_GETTER,
} from "../store/storeconstants";
import {
  getCashActionsCategoriesTotalBalance,
  getFundsStatusTotal,
} from "../services/ApiRequests";

export default {
  data() {
    return {
      headers: [
        { text: "Field", value: "fieldName" },
        { text: "Value", value: "value" },
      ],

      currFundsTotalStatusPromise: {},
      currFundsTotalStatus: 0,

      prevFundsTotalStatusPromise: {},
      prevFundsTotalStatus: 0,

      currCashActionsTotalBalancePromise: {},
      currCashActionsTotalBalance: 0,

      prevCashActionsTotalBalancePromise: {}, //previous month
      prevCashActionsTotalBalance: 0,

      prevDateStr: "",
    };
  },
  computed: {
    ...mapGetters(AUTH_MODULE, {
      userName: GET_USER_NAME_GETTER,
      userEmail: GET_USER_EMAIL_GETTER,
    }),
    tableData: function () {
      let res = [];

      res.push({
        fieldName: "User Name",
        value: this.userName,
      });

      res.push({
        fieldName: "Email",
        value: this.userEmail,
      });

      res.push({
        fieldName: "Total Cash",
        value: this.currCashActionsTotalBalance,
      });

      res.push({
        fieldName: `Total Cash (Till ${this.prevDateStr})`,
        value: this.prevCashActionsTotalBalance,
      });

      res.push({
        fieldName: "Total Funds",
        value: this.currFundsTotalStatus,
      });

      res.push({
        fieldName: `Total Funds (Till ${this.prevDateStr})`,
        value: this.prevFundsTotalStatus,
      });

      return res;
    },
  },
  watch: {
    currFundsTotalStatusPromise(newVal) {
      let totalSum = newVal.totalSum;
      this.currFundsTotalStatus = totalSum;
    },
    prevFundsTotalStatusPromise(newVal) {
      let totalSum = newVal.totalSum;
      this.prevFundsTotalStatus = totalSum;
    },

    currCashActionsTotalBalancePromise(newVal) {
      let totalBalance = newVal.totalBalance;
      this.currCashActionsTotalBalance = totalBalance;
    },
    prevCashActionsTotalBalancePromise(newVal) {
      let totalBalance = newVal.totalBalance;
      this.prevCashActionsTotalBalance = totalBalance;
    },
  },
  mounted() {
    this.populateTotal();
  },
  methods: {
    async populateTotal() {
      let currDate = new Date();
      let prevDate = new Date();

      let currDateStr = currDate.toISOString().split("T")[0];
      prevDate.setDate(currDate.getDate() - 30);
      this.prevDateStr = prevDate.toISOString().split("T")[0];

      this.currCashActionsTotalBalancePromise =
        await getCashActionsCategoriesTotalBalance(currDateStr);
      this.prevCashActionsTotalBalancePromise =
        await getCashActionsCategoriesTotalBalance(this.prevDateStr);

      this.currFundsTotalStatusPromise = await getFundsStatusTotal(
        currDateStr
      );
      this.prevFundsTotalStatusPromise = await getFundsStatusTotal(
        this.prevDateStr
      );
    },
  },
};
</script>
