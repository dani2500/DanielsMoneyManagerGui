<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div>
          <button
            type="button"
            class="btn btn-primary"
            @click="openAddEditModal(null)"
          >
            Add Fund
          </button>
        </div>
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <label>To Time</label>
        <input type="date" class="form-control" v-model="toTime" />
      </div>
    </div>
  </div>

  <br />

  <EasyDataTable 
  :headers="headers" 
  :items="fundsStatusToTable" 
  table-class-name="customize-table"
  alternating>
    <template #item-operation="item">
      <div class="operation-wrapper">
        <img
          src="../assets/delete.png"
          class="operation-icon"
          @click="openDeleteModal(item)"
          width="20"
          height="20"
        />
        <img
          src="../assets/edit.png"
          class="operation-icon"
          @click="openAddEditModal(item)"
          width="20"
          height="20"
        />
      </div>
    </template>
  </EasyDataTable>

  <!-- Add Edit Modal -->
  <div
    v-if="showAddEditModal"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Fund</h1>
        </div>
        <div class="modal-body">
          <form id="fund-form" @submit.prevent="submitFund()">
            <label class="form-label">Fund Name</label>
            <input
              type="text"
              class="form-control"
              v-model="inputFundName"
              required
            />
          </form>
          <div class="alert alert-danger" role="alert" v-if="errorMessage">
            {{ errorMessage }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="closeFundModal"
            @click="showAddEditModal = false"
          >
            Close
          </button>
          <button type="submit" form="fund-form" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <div
    v-if="showDeleteModal"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Fund</h1>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you would like to delete fund:
            {{ currentFundName }}
          </p>
          <div class="alert alert-danger" role="alert" v-if="errorMessage">
            {{ errorMessage }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="closeDeleteModal"
            @click="showDeleteModal = false"
          >
            Close
          </button>
          <button
            type="submit"
            class="btn btn-danger"
            @click="deleteFund()"
            :disabled="isDisableDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  FUNDS_MODULE,
  GET_FUNDS_STATUS_GETTER,
  SET_FUNDS_STATUS_TO_TIME_ACTION,
  GET_FUNDS_GETTER,
  ADD_FUND_ACTION,
  UPDATE_FUND_ACTION,
  DELETE_FUND_ACTION,
} from "../store/storeconstants";

export default {
  data() {
    return {
      headers: [
        { text: "Fund", value: "fundName" },
        { text: "Invested Sum", value: "investedSum" },
        { text: "Actual Sum", value: "actualSum" },
        { text: "Profit", value: "profit" },
        { text: "First Investement Time", value: "firstInvestmentDate" },
        { text: "Last Investement Time", value: "lastInvestmentDate" },
        { text: "Operation", value: "operation" },
      ],
      inputFundName: "",
      errorMessage: "",
      isNew: false,
      currentFundId: -1,
      currentFundName: -1,
      showAddEditModal: false,
      showDeleteModal: false,
      isDisableDelete: false,
      toTime: new Date().toISOString().split("T")[0],
    };
  },
  components: {},
  computed: {
    ...mapGetters(FUNDS_MODULE, {
      funds: GET_FUNDS_GETTER,
      fundsStatus: GET_FUNDS_STATUS_GETTER,
    }),
    fundsStatusToTable: function () {
      let result = [];
      
      let fundsString = JSON.stringify(this.funds); //pull it out of proxy state
      let funds = JSON.parse(fundsString);

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

          let newFundElement = {};
          newFundElement.fundName = fund.fundName;
          newFundElement.fundId = fund.fundId;
          newFundElement.firstInvestmentDate = fundStatus.firstInvestmentDate;
          newFundElement.lastInvestmentDate = fundStatus.lastInvestmentDate;
          newFundElement.investedSum = fundStatus.investedSum;
          newFundElement.actualSum = fundStatus.actualSum;
          newFundElement.profit = fundStatus.profit;
          result.push(newFundElement);
        });
      }
      
      return result;
    },
  },
  methods: {
    ...mapActions(FUNDS_MODULE, {
      addFundAction: ADD_FUND_ACTION,
      editFundAction: UPDATE_FUND_ACTION,
      deleteFundAction: DELETE_FUND_ACTION,
      updateStatusToTimeAction: SET_FUNDS_STATUS_TO_TIME_ACTION,
    }),
    openDeleteModal(row) {
      this.currentFundId = row.fundId;
      this.showDeleteModal = true;
      this.currentFundName = row.fundName;

      if (row.investedSum > 0) {
        this.errorMessage = "Fund still has related actions!!!";
        this.isDisableDelete = true;
      } else {
        this.errorMessage = "";
        this.isDisableDelete = false;
      }
    },
    async deleteFund() {
      let deleteData = {
        fundId: this.currentFundId,
      };

      try {
        await this.deleteFundAction(deleteData);
        this.$refs.closeDeleteModal.click();
      } catch (err) {
        this.errorMessage = err;
      }
    },
    openAddEditModal(row) {
      this.showAddEditModal = true;
      this.errorMessage = "";

      if (row) {
        this.isNew = false;
        this.currentFundId = row.fundId;
        this.inputFundName = row.fundName;
      } else {
        this.isNew = true;
        this.inputFundName = "";
      }
    },
    submitFund() {
      if (this.isNew) {
        this.addFund();
      } else {
        this.editFund();
      }
    },
    async addFund() {
      this.errorMessage = "";

      let newFund = {
        fundName: this.inputFundName,
      };

      console.log(newFund)

      try {
        await this.addFundAction(newFund);
        this.$refs.closeFundModal.click();
        this.inputFundName = "";
      } catch (err) {
        this.errorMessage = err;
      }
    },
    async editFund() {
      this.errorMessage = "";

      let newFund = {
        fundName: this.inputFundName,
        fundId: this.currentFundId,
      };

      try {
        await this.editFundAction(newFund);
        this.$refs.closeFundModal.click();
        this.inputFundName = "";
      } catch (err) {
        this.errorMessage = err;
      }
    },
  },
  watch: {
    toTime(newVal){
      this.updateStatusToTimeAction(newVal);
    }
  },
  mounted() {},
  created() {},
};
</script>
