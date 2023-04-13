<template>
  <h3>Categories Balances</h3>
    <EasyDataTable 
    :headers="headers" 
    :items="categoriesBalance" 
    table-class-name="customize-table"
    alternating>
    </EasyDataTable>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import {
    CASH_ACTIONS_MODULE,
    GET_CATEGORIES_GETTER,
  } from "../store/storeconstants";
  import {
  getCashActionsCategoriesBalances,
} from "../services/ApiRequests";
  
  export default {
    data() {
      return {
        headers: [
          { text: "Category", value: "categoryName" },
          { text: "Sum", value: "sum" },
        ],
        balancesByIdPromise: {},
        balancesById: [],
      };
    },
    components: {},
    computed: {
      ...mapGetters(CASH_ACTIONS_MODULE, {
        categories: GET_CATEGORIES_GETTER,
      }),
      categoriesBalance: function () {
        let result = [];
  
        let categories = this.categories

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
    },
    methods: {
      async populateCategories(){
        let now = new Date().toISOString();
        let today = now.split("T")[0];
        this.balancesByIdPromise = await getCashActionsCategoriesBalances(today);
      }
    },
    watch: {
      balancesByIdPromise(newVal){
        this.balancesById = newVal;
      }
    },
    mounted() {
      this.populateCategories();
    },
    created() {
      
    },
  };
  </script>
  