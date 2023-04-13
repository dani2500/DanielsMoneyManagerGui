<template>
  <h3>Overall Status</h3>

    <EasyDataTable 
    :headers="headers" 
    :items="tableData" 
    table-class-name="customize-table"
    alternating>
    </EasyDataTable>
</template>

<script>
import { mapGetters } from "vuex";
import {
  AUTH_MODULE,
  GET_USER_NAME_GETTER,
  GET_USER_EMAIL_GETTER,
} from "../store/storeconstants";
import { getCashActionsTotalBalances } from "../services/ApiRequests";

export default {
  data() {
    return {
      headers: [
        { text: "Field", value: "fieldName" },
        { text: "Value", value: "value" },
      ],
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
    tableData: function (){
      let res = [];

      res.push({
        fieldName: 'User Name',
        value: this.userName
      });

      res.push({
        fieldName: 'Email',
        value: this.userEmail
      });

      res.push({
        fieldName: 'Total Balance (Current)',
        value: this.currCashActionsTotalBalance
      });

      res.push({
        fieldName: `Total Balance (Till ${this.prevDateStr})`,
        value: this. prevCashActionsTotalBalance
      });

      return res;
    }
  },
  watch: {
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
        await getCashActionsTotalBalances(currDateStr);
      this.prevCashActionsTotalBalancePromise =
        await getCashActionsTotalBalances(this.prevDateStr);
    },
  },
};
</script>
