<template>
  <div class="row container-fluid">
    <!-- titre -->
    <div class="col-12 header">
      <h3>
        Nouveautés (
        {{ filteredData.length }} )
      </h3>
    </div>
    <!-- filter -->
    <div class="col-2">
      <div id="sexCheckboxes">
        <h6>Sexe</h6>
        <div v-for="(sex, index) in filters" :key="index" class="form-check">
          <div v-if="sex.categorie == 'sexe'">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="sex.checked"
              v-on:change="getFilteredData()"
            />
            <label class="form-check-label">
              {{ sex.name }}
            </label>
          </div>
        </div>
      </div>
      <div id="sportCheckboxes">
        <h6>Sport</h6>
        <div v-for="(sport, index) in filters" :key="index" class="form-check">
          <div v-if="sport.categorie == 'sport'">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="sport.checked"
              v-on:change="getFilteredData()"
            />
            <label class="form-check-label">
              {{ sport.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- produits -->
    <div class="col-9 card-columns">
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
  computed: {
    selectedFilters: function () {
      let selectedFilters = [];
      let checkedFilters = this.filters.filter((obj) => obj.checked);
      checkedFilters.forEach((element) => {
        selectedFilters.push(element.value);
      });
      return selectedFilters;
    },
  },
  data() {
    return {
      filteredData: [],
      filters: [
        {
          checked: false,
          categorie: "sexe",
          name: "Hommes",
          value: "Homme",
        },
        {
          checked: false,
          categorie: "sexe",
          name: "Femmes",
          value: "Femme",
        },
        {
          checked: false,
          categorie: "sexe",
          name: "Mixte",
          value: "Mixte",
        },
        {
          checked: false,
          categorie: "sport",
          name: "Football",
          value: "Football",
        },
        {
          checked: false,
          categorie: "sport",
          name: "Basket",
          value: "Basket",
        },
        {
          checked: false,
          categorie: "sport",
          name: "Running",
          value: "Running",
        },
      ],
    };
  },
  methods: {
    getFilteredData() {
      this.filteredData = data;
    }
  },
  mounted() {
    this.getFilteredData();
  },
};
</script>
