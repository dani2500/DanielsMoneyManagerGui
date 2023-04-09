<template>
  <h3>Overall Status</h3>

  <table class="table table-striped text-start">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>User Name</td>
        <td>{{ userName }}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ userEmail }}</td>
      </tr>
      <tr>
        <td>Total Balance (Current)</td>
        <td>{{ currCashActionsTotalBalance }}</td>
      </tr>
      <tr>
        <td>Total Balance (Till {{ prevDateStr }})</td>
        <td>{{ prevCashActionsTotalBalance }}</td>
      </tr>
    </tbody>
  </table>
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
