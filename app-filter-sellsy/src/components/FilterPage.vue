<template>
  <div class="row container-fluid">
    <div class="col-12 card-columns">
      <!-- titre -->
      <div class="col-12 header">
        <h3>
          Nouveautés (
          {{ filteredData.length }} )
        </h3>
      </div>
      <!-- filtres -->
      <div class="col-2 "></div>
      <!-- produits -->
      <produit-card
        v-for="(produit, index) in filteredData"
        :key="index"
        :produit="produit"
      ></produit-card>
    </div>
  </div>
</template>

<script>
import ProduitCard from "./ProduitCard.vue";
import data from "../data/produits.json";
export default {
  name: "FilterPage",
  components: {
    "produit-card": ProduitCard,
  },
  data() {
    return {
      filteredData: [],
    };
  },
  methods: {
    getData() {
      this.filteredData = data;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
