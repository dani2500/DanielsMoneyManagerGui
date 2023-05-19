<template>
  <h3>Categories Balances</h3>
  <br />
  <div class="container">
    <div class="row">
      <div class="col">
        <h5 align="left">Current State</h5>
        <EasyDataTable
          :headers="headers"
          :items="categoriesBalance"
          table-class-name="customize-table"
          alternating
        >
        </EasyDataTable>
      </div>
      <div class="col">
        <h5 align="left">Sums</h5>
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
        ytitle="Sum (NIS)"
        loading="Loading..."
        empty="No data"
        :curve="false"
      ></line-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  CASH_ACTIONS_MODULE,
  GET_CATEGORIES_GETTER,
} from "../store/storeconstants";
import { getCashActionsCategoriesBalances, getCashActionsCategoriesBalanceHistory } from "../services/ApiRequests";

export default {
  data() {
    return {
      headers: [
        { text: "Category", value: "categoryName" },
        { text: "Sum", value: "sum" },
      ],

      balancesByIdPromise: {},
      balancesById: [],

      balancesHistoryPromise: {},
      balancesHistory: [],
    };
  },
  components: {},
  computed: {
    ...mapGetters(CASH_ACTIONS_MODULE, {
      categories: GET_CATEGORIES_GETTER,
    }),
    categoriesBalance: function () {
      let result = [];

      let categories = this.categories;

      if (
        categories !== undefined &&
        categories.length > 0 &&
        this.balancesById !== undefined &&
        this.balancesById.length > 0
      ) {
        categories.forEach((category) => {
          let categoryName = category.categoryName;
          let currCategoryId = category.categoryId;

          let currBalanceRow = this.balancesById.find(
            (x) => x.categoryId == currCategoryId
          );

          let currBalanceSum = -1;
          if (currBalanceRow === undefined) {
            console.log(`No balance found for category ${categoryName}`);
            return [];
          } else {
            currBalanceSum = currBalanceRow.categoryBalance;
          }

          let newCategoryElement = {};
          newCategoryElement.categoryName = categoryName;
          newCategoryElement.sum = currBalanceSum;
          result.push(newCategoryElement);
        });
      }

      return result;
    },
    lineChartData: function () {
      let result = [];

      this.categories.forEach((category) => {
        let categoryName = category.categoryName;
        let categoryId = category.categoryId;

        let balanceHistoryPerCategory = this.balancesHistory.filter(
          (x) => x.categoryId == categoryId
        );

        let lineData = {};
        balanceHistoryPerCategory.forEach(historyUnit => {
          lineData[historyUnit.toTime] =  historyUnit.balance;
        })

        let line = {}
        line.name = categoryName;
        line.data = lineData;

        result.push(line);
      });

      return result;
    },
    pieChartData: function() {
      let res = []
      this.categoriesBalance.forEach(category => {
        let sum = 0;
        if (category.sum > 0){
          sum = category.sum;
        }
        let element = [category.categoryName, sum]
        res.push(element)
      });

      return res;
    },
  },
  methods: {
    async populateCategoriesBalance() { //for pie chart
      let now = new Date().toISOString();
      let today = now.split("T")[0];
      this.balancesByIdPromise = await getCashActionsCategoriesBalances(today);
    },
    async populateCategoriesHistory() { //for line chart
      this.balancesHistoryPromise = await getCashActionsCategoriesBalanceHistory(6);
    },
  },
  watch: {
    balancesByIdPromise(newVal) {
      this.balancesById = newVal;
    },
    balancesHistoryPromise(newVal) {
      this.balancesHistory = newVal;
    },
  },
  mounted() {
    this.populateCategoriesBalance();
    this.populateCategoriesHistory();
  },
  created() {},
};
</script>
