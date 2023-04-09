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
            Add Category
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
  :items="categoriesBalance" 
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
          <h1 class="modal-title fs-5">Category</h1>
        </div>
        <div class="modal-body">
          <form id="category-form" @submit.prevent="submitCategory()">
            <label class="form-label">Category Name</label>
            <input
              type="text"
              class="form-control"
              v-model="inputCategoryName"
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
            ref="closeCategoryModal"
            @click="showAddEditModal = false"
          >
            Close
          </button>
          <button type="submit" form="category-form" class="btn btn-primary">
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
          <h1 class="modal-title fs-5">Category</h1>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you would like to delete category:
            {{ currentCategoryName }}
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
            @click="deleteCategory()"
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
  CASH_ACTIONS_MODULE,
  GET_CATEGORIES_GETTER,
  GET_CATEGORIES_BALANCES_GETTER,
  ADD_CASH_ACTION_CATEGORY_ACTION,
  UPDATE_CASH_ACTION_CATEGORY_ACTION,
  SET_CATEGORIES_BALANCES_TO_TIME_ACTION,
  DELETE_CASH_ACTION_CATEGORY_ACTION,
} from "../store/storeconstants";

export default {
  data() {
    return {
      headers: [
        { text: "Category", value: "categoryName" },
        { text: "Sum", value: "sum" },
        { text: "Actions Count", value: "cashActionsCount" },
        { text: "Operation", value: "operation" },
      ],
      inputCategoryName: "",
      errorMessage: "",
      isNew: false,
      currentCategoryId: -1,
      currentCategoryName: -1,
      showAddEditModal: false,
      showDeleteModal: false,
      isDisableDelete: false,
      toTime: new Date().toISOString().split("T")[0],
    };
  },
  components: {},
  computed: {
    ...mapGetters(CASH_ACTIONS_MODULE, {
      categories: GET_CATEGORIES_GETTER,
      balancesById: GET_CATEGORIES_BALANCES_GETTER,
    }),
    categoriesBalance: function () {
      let result = [];

      let categoriesString = JSON.stringify(this.categories); //pull it out of proxy state
      let categories = JSON.parse(categoriesString);

      if (
        categories !== undefined &&
        categories.length > 0 &&
        this.balancesById !== undefined &&
        this.balancesById.length > 0
      ) {
        categories.forEach((category) => {
          let categoryName = category.text;
          let currCategoryId = category.value;
          let currBalanceRow = this.balancesById.find(
            (x) => x.categoryId == currCategoryId
          );

          let currBalanceSum = -1;
          let currActionsCount = -1;
          if (currBalanceRow === undefined) {
            console.log(`No balance found for category ${categoryName}`);
            return [];
          } else {
            currBalanceSum = currBalanceRow.categoryBalance;
            currActionsCount = currBalanceRow.cashActionsCount;
          }

          let newCategoryElement = {};
          newCategoryElement.categoryName = categoryName;
          newCategoryElement.categoryId = currCategoryId;
          newCategoryElement.sum = currBalanceSum;
          newCategoryElement.cashActionsCount = currActionsCount;
          result.push(newCategoryElement);
        });
      }
      return result;
    },
  },
  methods: {
    ...mapActions(CASH_ACTIONS_MODULE, {
      addCashActionCategory: ADD_CASH_ACTION_CATEGORY_ACTION,
      editCashActionCategory: UPDATE_CASH_ACTION_CATEGORY_ACTION,
      deleteCashActionCategory: DELETE_CASH_ACTION_CATEGORY_ACTION,
      updateBalancesToTime: SET_CATEGORIES_BALANCES_TO_TIME_ACTION,
    }),
    openDeleteModal(row) {
      this.currentCategoryId = row.categoryId;
      this.showDeleteModal = true;
      this.currentCategoryName = row.categoryName;

      if (row.cashActionsCount > 0) {
        this.errorMessage = "Category still has related actions!!!";
        this.isDisableDelete = true;
      } else {
        this.errorMessage = "";
        this.isDisableDelete = false;
      }
    },
    async deleteCategory() {
      let deleteData = {
        categoryId: this.currentCategoryId,
      };

      try {
        await this.deleteCashActionCategory(deleteData);
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
        this.currentCategoryId = row.categoryId;
        this.inputCategoryName = row.categoryName;
      } else {
        this.isNew = true;
        this.inputCategoryName = "";
      }
    },
    submitCategory() {
      if (this.isNew) {
        this.addCategory();
      } else {
        this.editCategory();
      }
    },
    async addCategory() {
      this.errorMessage = "";

      let newCategory = {
        categoryName: this.inputCategoryName,
      };

      try {
        await this.addCashActionCategory(newCategory);
        this.$refs.closeCategoryModal.click();
        this.inputCategoryName = "";
      } catch (err) {
        this.errorMessage = err;
      }
    },
    async editCategory() {
      this.errorMessage = "";

      let newCategory = {
        categoryName: this.inputCategoryName,
        categoryId: this.currentCategoryId,
      };

      try {
        await this.editCashActionCategory(newCategory);
        this.$refs.closeCategoryModal.click();
        this.inputCategoryName = "";
      } catch (err) {
        this.errorMessage = err;
      }
    },
  },
  watch: {
    toTime(newVal){
      this.updateBalancesToTime(newVal);
    }
  },
  mounted() {},
  created() {},
};
</script>
