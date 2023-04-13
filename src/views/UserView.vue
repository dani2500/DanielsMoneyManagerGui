<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div style="width: 80%; margin: 0 auto">
          <!--margin:0 auto;-->
          <OverallStatus />
        </div>
      </div>
      <div class="col">
        <div style="width: 80%; margin: 0 auto">
          <!--margin:0 auto;-->
          <CategoriesStatusSmall />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div style="width: 100%; margin: 0 auto">
            <!--margin:0 auto;-->
            <FundsStatusSmall />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesStatusSmall from "../components/CategoriesStatusSmall.vue";
import FundsStatusSmall from "../components/FundsStatusSmall.vue";
import OverallStatus from "../components/OverallStatus.vue";

export default {
  data() {
    return {};
  },
  components: {
    CategoriesStatusSmall,
    OverallStatus,
    FundsStatusSmall,
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
