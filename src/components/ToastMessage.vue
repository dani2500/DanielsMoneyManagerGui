<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toastRef"
  >
    <div class="toast-header">
      <img
        src="../assets/error.png"
        class="rounded me-2"
        width="20"
        height="20"
      />
      <strong class="me-auto">Error</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">An API error occured. Checkout the console.</div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";
import { mapGetters } from "vuex";
import { GET_TOAST_SHOW_GETTER } from "../store/storeconstants";

export default {
  data() {
    return {
      currToast: null,
    };
  },
  mounted() {
    this.currToast = new Toast(this.$refs.toastRef);
  },
  computed: {
    ...mapGetters({
      showToastGetter: GET_TOAST_SHOW_GETTER,
    }),
  },
  watch: {
    showToastGetter(newVal) {
      if (newVal) {
        this.currToast.show();
        console.log('Show Toast!!!!')
      } else {
        this.currToast.hide();
        console.log('Hide Toast!!!!')
      }
    },
  },
};
</script>
