<template>
  <h2>Cash Actions Table</h2>

  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Filtration Settings</h5>
            <div class="row">
              <div class="col">
                <label>From</label>
                <input type="date" class="form-control" v-model="fromTime" />
              </div>
              <div class="col">
                <label>To</label>
                <input type="date" class="form-control" v-model="toTime" />
              </div>
              <div class="col">
                <label>Category</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="filterByCategoryId"
                >
                  <option
                    v-for="option in categoriesForSearch"
                    :value="option.categoryId"
                    :key="option.categoryId"
                  >
                    {{ option.categoryName }}
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
            <label>Category</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="newActionCategory"
              required
            >
              <option
                v-for="option in categories"
                :value="option.categoryId"
                :key="option.categoryId"
              >
                {{ option.categoryName }}
              </option>
            </select>
          </div>
          <div class="col-3">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              v-model="newActionDescription"
              required
            />
          </div>
          <div class="col-2">
            <label>Sum</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              v-model="newActionSum"
              required
            />
          </div>
          <div class="col-3">
            <label>Date</label>
            <input
              type="datetime-local"
              class="form-control"
              v-model="newActionDate"
              required
            />
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
  <input type="text" class="form-control" v-model="searchValue" aria-describedby="basic-addon1">
</div>

  <EasyDataTable
    :headers="headers"
    :items="cashActionsTableContent"
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
          <h5 class="modal-title">Delete Cash Action</h5>
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
            @click="yesDeleteCashAction()"
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
          <h5 class="modal-title">Edit Cash Action</h5>
        </div>
        <div class="modal-body">
          <form id="edit-action-form" v-on:submit.prevent="editAction">
            <div class="row">
              <label>Category</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="editActionCategory"
                required
              >
                <option
                  v-for="option in categories"
                  :value="option.categoryId"
                  :key="option.categoryId"
                >
                  {{ option.categoryName }}
                </option>
              </select>
              <label>Description</label>
              <input
                type="text"
                class="form-control"
                v-model="editActionDescription"
                required
              />
              <label>Sum</label>
              <input
                type="number"
                step="0.01"
                class="form-control"
                v-model="editActionSum"
                required
              />
              <label>Date</label>
              <input
                type="datetime-local"
                class="form-control"
                v-model="editActionDate"
                required
              />
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
  CASH_ACTIONS_MODULE,
  GET_CASH_ACTIONS_GETTER,
  GET_CATEGORIES_GETTER,
  POPULATE_CASH_ACTIONS_ACTION,
  ADD_CASH_ACTION_ACTION,
  DELETE_CASH_ACTION_ACTION,
  UPDATE_CASH_ACTION_ACTION,
} from "../store/storeconstants";

export default {
  data() {
    return {
      headers: [
        { text: "Category", value: "categoryName", sortable: true },
        { text: "Description", value: "description" },
        { text: "Sum", value: "sum", sortable: true },
        { text: "Time", value: "cashActionTime", sortable: true },
        { text: "Operation", value: "operation" },
      ],
      itemsSelected: [],

      newActionCategory: -1,
      newActionDescription: "",
      newActionSum: 0,
      newActionDate: "",

      editActionId: -1,
      editActionCategory: -1,
      editActionDescription: "",
      editActionSum: 0,
      editActionDate: "",

      deleteText: "",
      deleteCandidates: "",

      fromTime: "1970-01-01",
      toTime: "2050-01-01",
      filterByCategoryId: -1,

      searchField: ["description", "sum", "cashActionTime" ],
      searchValue: "",
    };
  },
  components: {},
  computed: {
    ...mapGetters(CASH_ACTIONS_MODULE, {
      categories: GET_CATEGORIES_GETTER,
      cashActions: GET_CASH_ACTIONS_GETTER,
    }),
    cashActionsTableContent: function () {
      let result = [];

      let actions = this.cashActions;
      let categories = this.categories;

      actions.forEach((action) => {
        let currCategoryId = action.categoryId;
        let category = categories.find((x) => x.categoryId == currCategoryId);
        if (category === undefined) {
          console.log(
            `No category name fount for category id ${currCategoryId}`
          );
          return [];
        }
        action.categoryName = category.categoryName;
        action.cashActionTime = action.cashActionTime.slice(0,16);
        result.push(action);
      });

      return result;
    },
    categoriesForSearch: function () {
      let options = [];
      options.push({
        categoryId: -1,
        categoryName: "All",
      });

      this.categories.forEach(category => {
        options.push(category)
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

    this.filterByCategoryId = -1;

    this.resetNewActionDate();
  },
  watch: {
    categories(newCategories) {
      if (newCategories.length > 0) {
        this.newActionCategory = newCategories[0].value;
      }
    },
    fromTime() {
      this.filterData();
    },
    toTime() {
      this.filterData();
    },
    filterByCategoryId() {
      this.filterData();
    },
  },
  methods: {
    ...mapActions(CASH_ACTIONS_MODULE, {
      populateCashActions: POPULATE_CASH_ACTIONS_ACTION,
      addCashAction: ADD_CASH_ACTION_ACTION,
      deleteCashActions: DELETE_CASH_ACTION_ACTION,
      updateCashAction: UPDATE_CASH_ACTION_ACTION,
    }),
    filterData(){
      if (!this.fromTime){
        this.fromTime = '1970-01-01'
      }
      if (!this.toTime){
        this.toTime = '2050-01-01'
      }

      this.populateCashActions({
        fromTime: this.fromTime,
        toTime: this.toTime,
        categoryId: this.filterByCategoryId,
      });
    },
    populateForSingleDelete(item) {
      this.deleteText = `Are you sure you would like do delete record: ${item.description} (Sum=${item.sum})`;
      this.deleteCandidates = item.cashActionId.toString();
    },
    populateForMultipleDelete() {
      this.deleteText = `Are you sure you would like to delete all the selected cash actions?`;
      let idxs = this.itemsSelected.map((ca) => ca.cashActionId);
      this.deleteCandidates = idxs.toString();
    },
    async yesDeleteCashAction() {
      await this.deleteCashActions(this.deleteCandidates);
      this.$refs.closeDeleteModal.click();
    },
    populateForEdit(item) {
      this.editActionCategory = item.categoryId;
      this.editActionDescription = item.description;
      this.editActionSum = item.sum;
      this.editActionDate = item.cashActionTime;
      this.editActionId = item.cashActionId;
    },
    async addAction() {
      let action = {
        categoryId: this.newActionCategory,
        description: this.newActionDescription,
        sum: this.newActionSum,
        cashActionTime: this.newActionDate,
      };
      await this.addCashAction(action);

      // Clear
      this.resetNewActionDate();

      this.newActionCategory = -1;
      this.newActionDescription = "";
      this.newActionSum = 0;

      if (this.categories.length > 0) {
        this.newActionCategory = this.categories[0].value;
      }
    },
    async editAction() {
      let action = {
        cashActionId: this.editActionId,
        categoryId: this.editActionCategory,
        description: this.editActionDescription,
        sum: this.editActionSum,
        cashActionTime: this.editActionDate,
      };
      await this.updateCashAction(action);
      this.$refs.closeEditModal.click();
    },
    resetNewActionDate(){
      var d = new Date();
      d.setUTCHours(24,0,0,0);
      this.newActionDate = d.toISOString().slice(0,16);
    }
  },
};
</script>