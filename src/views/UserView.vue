<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div style="width: 70%; margin: 0 auto">
          <!--margin:0 auto;-->
          <OverallStatus />
        </div>
      </div>
      <div class="col-sm">
        <div style="width: 70%; margin: 0 auto">
          <!--margin:0 auto;-->
          <CategoriesStatusSmall />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesStatusSmall from "../components/CategoriesStatusSmall.vue";
import OverallStatus from "../components/OverallStatus.vue";

export default {
  data() {
    return {};
  },
  components: {
    CategoriesStatusSmall,
    OverallStatus,
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
