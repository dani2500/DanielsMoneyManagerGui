<template>
  <h2>Fund Actions Table</h2>

  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Filtration Settings</h5>
            <div class="row">
              <div class="col">
                <label>From</label>
                <input type="date" class="form-control" v-model="fromTime" required/>
              </div>
              <div class="col">
                <label>To</label>
                <input type="date" class="form-control" v-model="toTime" required/>
              </div>
              <div class="col">
                <label>Fund</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="filterByFundId"
                >
                  <option
                    v-for="option in fundsForSearch"
                    :value="option.fundId"
                    :key="option.fundId"
                  >
                    {{ option.fundName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Operations</h5>
            <div class="row">
              <div class="col">
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseAddAction"
                  aria-expanded="false"
                  aria-controls="collapseAddAction"
                >
                  Add Action
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="populateForMultipleDelete"
                  :disabled="itemsSelected.length == 0"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br />

  <div class="collapse" id="collapseAddAction">
    <div class="card card-body">
      <h5 class="card-title">Add Action Menu</h5>
      <form id="new-action-form" v-on:submit.prevent="addAction">
        <div class="row">
          <div class="col-2">
            <label>Fund</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="newActionId"
              required
            >
              <option
                v-for="option in funds"
                :value="option.fundId"
                :key="option.fundId"
              >
                {{ option.fundName }}
              </option>
            </select>
          </div>
          <div class="col">
            <label>Investment Sum</label>
            <input
              type="number"
              step="0.01"
              min="1"
              class="form-control"
              v-model="newActionInvestmentSum"
              required
            />
          </div>
          <div class="col">
            <label>Current State</label>
            <input
              type="number"
              step="0.01"
              min="1"
              class="form-control"
              v-model="newActionCurrState"
              required
            />
          </div>
          <div class="col">
            <label>Date</label>
            <input
              type="date"
              class="form-control"
              v-model="newActionDate"
              required
            />
          </div>
          <div class="col">
            <label>Note</label>
            <input type="text" class="form-control" v-model="newActionNote" />
          </div>
          <div class="col">
            <button
              type="submit"
              class="btn btn-primary"
              form="new-action-form"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <br />

  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">Search</span>
    </div>
    <input
      type="text"
      class="form-control"
      v-model="searchValue"
      aria-describedby="basic-addon1"
    />
  </div>

  <EasyDataTable
    :headers="headers"
    :items="fundActionsTableContent"
    v-model:items-selected="itemsSelected"
    :search-field="searchField"
    :search-value="searchValue"
    table-class-name="customize-table"
    alternating
  >
    <template #item-operation="item">
      <div class="operation-wrapper">
        <img
          src="../assets/delete.png"
          class="operation-icon"
          @click="populateForSingleDelete(item)"
          width="20"
          height="20"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
        />
        <img
          src="../assets/edit.png"
          class="operation-icon"
          @click="populateForEdit(item)"
          width="20"
          height="20"
          data-bs-toggle="modal"
          data-bs-target="#edit-modal"
        />
      </div>
    </template>
  </EasyDataTable>

  <div class="modal" tabindex="-1" id="delete-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Fund Action</h5>
        </div>
        <div class="modal-body">
          <p>{{ deleteText }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="closeDeleteModal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="yesDeleteFundAction()"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="edit-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Fund Action</h5>
        </div>
        <div class="modal-body">
          <form id="edit-action-form" v-on:submit.prevent="editAction">
            <div class="row">
            <label>Fund</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="editActionFund"
              required
            >
              <option
                v-for="option in funds"
                :value="option.fundId"
                :key="option.fundId"
              >
                {{ option.fundName }}
              </option>
            </select>
          </div>
          <div class="row">
            <label>Investment Sum</label>
            <input
              type="number"
              step="0.01"
              min="1"
              class="form-control"
              v-model="editActionInvestmentSum"
              required
            />
          </div>
          <div class="row">
            <label>Current State</label>
            <input
              type="number"
              step="0.01"
              min="1"
              class="form-control"
              v-model="editActionCurrState"
              required
            />
          </div>
          <div class="row">
            <label>Date</label>
            <input
              type="date"
              class="form-control"
              v-model="editActionDate"
              required
            />
          </div>
          <div class="row">
            <label>Note</label>
            <input type="text" class="form-control" v-model="editActionNote" />
          </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="closeEditModal"
          >
            Close
          </button>
          <button class="btn btn-primary" type="submit" form="edit-action-form">
            Save changes
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
  GET_FUND_ACTIONS_GETTER,
  GET_FUNDS_GETTER,
  POPULATE_FUND_ACTIONS_ACTION,
  ADD_FUND_ACTION_ACTION,
  DELETE_FUND_ACTION_ACTION,
  UPDATE_FUND_ACTION_ACTION,
} from "../store/storeconstants";

export default {
  data() {
    return {
      headers: [
      { text: "Fund", value: "fundName", sortable: true },
        { text: "Investment Sum", value: "investmentSum", sortable: true },
        { text: "Current Sum", value: "currentState", sortable: true },
        { text: "Date", value: "investmentDate", sortable: true },
        { text: "Note", value: "note"},
        { text: "Operation", value: "operation" },
      ],
      itemsSelected: [],

      newActionId: -1,
      newActionInvestmentSum: 0,
      newActionCurrState: 0,
      newActionDate: "",
      newActionNote: null,

      editActionId: -1,
      editActionFund: -1,
      editActionInvestmentSum: 0,
      editActionCurrState: 0,
      editActionDate: "",
      editActionNote: null,

      deleteText: "",
      deleteCandidates: "",

      fromTime: "1970-01-01",
      toTime: "2050-01-01",
      filterByFundId: -1,

      searchField: ["fundName", "investmentSum", "currentState", "investmentDate", "note" ],
      searchValue: "",
    };
  },
  components: {},
  computed: {
    ...mapGetters(FUNDS_MODULE, {
      funds: GET_FUNDS_GETTER,
      fundActions: GET_FUND_ACTIONS_GETTER,
    }),
    fundActionsTableContent: function () {
      let result = [];

      let actions = this.fundActions
      let funds = this.funds

      if (actions !== undefined && actions.length > 0) {
        actions.forEach((action) => {
          let currFundId = action.fundId;
          let fund = funds.find((x) => x.fundId == currFundId);
          if (fund === undefined) {
            console.log(`No fund name found for fund id ${currFundId}`);
            return [];
          }
          action.fundName = fund.fundName;
          action.investmentDate = action.investmentDate.slice(0,10)
          result.push(action);
        });
      }

      return result;
    },
    fundsForSearch: function () {
      let options = [];
      options.push({
        fundId: -1,
        fundName: "All",
      });

      this.funds.forEach(fund => {
        options.push(fund)
      })

      return options;
    },
  },
  mounted() {
    let today = new Date();
    let fromDate = new Date();

    this.toTime = today.toISOString().split("T")[0];
    fromDate.setDate(today.getDate() - 365);
    this.fromTime = fromDate.toISOString().split("T")[0];

    this.filterByFundId = -1;
  },
  watch: {
    funds(newFunds) {
      if (newFunds.length > 0) {
        this.newActionId = newFunds[0].value;
      }
    },
    fromTime() {
      this.filterData();
    },
    toTime() {
      this.filterData();
    },
    filterByFundId() {
      this.filterData();
    },
  },
  methods: {
    ...mapActions(FUNDS_MODULE, {
      populateFundActions: POPULATE_FUND_ACTIONS_ACTION,
      addFundAction: ADD_FUND_ACTION_ACTION,
      deleteFundActions: DELETE_FUND_ACTION_ACTION,
      updateFundAction: UPDATE_FUND_ACTION_ACTION,
    }),
    filterData(){
      if (!this.fromTime){
        this.fromTime = '1970-01-01'
      }
      if (!this.toTime){
        this.toTime = '2050-01-01'
      }

      this.populateFundActions({
        fromTime: this.fromTime,
        toTime: this.toTime,
        fundId: this.filterByFundId,
      });
    },
    populateForSingleDelete(item) {
      this.deleteText = `Are you sure you would like do delete record the sum of ${item.investmentSum} from fund: ${item.fundName}`;
      this.deleteCandidates = item.fundActionId.toString();
    },
    populateForMultipleDelete() {
      this.deleteText = `Are you sure you would like to delete all the selected fund actions?`;
      let idxs = this.itemsSelected.map((ca) => ca.fundActionId);
      this.deleteCandidates = idxs.toString();
    },
    async yesDeleteFundAction() {
      await this.deleteFundActions(this.deleteCandidates);
      this.$refs.closeDeleteModal.click();
    },
    populateForEdit(item) {
      this.editActionId = item.fundActionId;
      this.editActionFund = item.fundId;
      this.editActionInvestmentSum = item.investmentSum;
      this.editActionCurrState = item.currentState;
      this.editActionDate = item.investmentDate.split("T")[0];
      this.editActionNote = item.note;
    },
    async addAction() {
      let note = null;
      if (this.newActionNote != ""){
        note = this.newActionNote;
      }

      let action = {
        fundId: this.newActionId,
        investmentSum: this.newActionInvestmentSum,
        currentState: this.newActionCurrState,
        note: note,
        investmentDate: this.newActionDate,
      };
      await this.addFundAction(action);

      // Clear
      this.newActionId = -1;
      this.newActionInvestmentSum = 0;
      this.newActionCurrState = 0;
      this.newActionNote = "";
      this.newActionDate = "";

      if (this.funds.length > 0) {
        this.newActionId = this.funds[0].value;
      }
    },
    async editAction() {
      let note = null;
      if (this.editActionNote != ""){
        note = this.editActionNote;
      }

      let action = {
        fundActionId: this.editActionId,
        fundId: this.editActionFund,
        investmentSum: this.editActionInvestmentSum,
        currentState: this.editActionCurrState,
        note: note,
        investmentDate: this.editActionDate,
      };
      await this.updateFundAction(action);
      this.$refs.closeEditModal.click();
    },
  },
};
</script>
