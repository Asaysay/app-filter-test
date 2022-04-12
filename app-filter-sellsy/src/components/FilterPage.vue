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
      <div id="couleurCheckboxes">
        <h6>Couleur</h6>
        <div
          v-for="(couleur, index) in filters"
          :key="index"
          class="form-check"
        >
          <div v-if="couleur.categorie == 'couleur'">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="couleur.checked"
              v-on:change="getFilteredData()"
            />
            <label class="form-check-label">
              {{ couleur.name }}
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
        selectedFilters.push({
          value: element.value,
          categorie: element.categorie,
        });
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
        {
          checked: false,
          categorie: "couleur",
          name: "Pourpre",
          value: "pourpre",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Noir",
          value: "noir",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Rouge",
          value: "rouge",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Orange",
          value: "orange",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Bleu",
          value: "bleu",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Blanc",
          value: "blanc",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Marron",
          value: "marron",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Vert",
          value: "vert",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Jaune",
          value: "jaune",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Multicolore",
          value: "multicolore",
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Gris",
          value: "gris",
        },
      ],
    };
  },
  methods: {
    getFilteredData() {
      this.filteredData = data;
      if (this.selectedFilters.length > 0) {
        let selectedSexFilters = [];
        let selectedCouleurFilters = [];
        let selectedSportFilters = [];

        this.selectedFilters.forEach((filter) => {
          switch (filter.categorie) {
            case "sexe":
              selectedSexFilters.push(filter.value);
              break;
            case "sport":
              selectedSportFilters.push(filter.value);
              break;
            case "couleur":
              selectedCouleurFilters.push(filter.value);
              break;
          }
        });

        const filters = {
          sexe: selectedSexFilters,
          sport: selectedSportFilters,
          couleur: selectedCouleurFilters,
        };

        console.log(filters);

        const filterKeys = Object.keys(filters);
        const validData = this.filteredData.filter((produit) => {
          return filterKeys.every((categorieKey) => {
            if (filters[categorieKey].length == 0) {
              console.log("filter", filters[categorieKey]);
              return true;
            }

            // Pour l'objet couleur
            if (categorieKey == "couleur") {
              let produitCategorieKey = produit[categorieKey].toString().toLowerCase();
               console.log(typeof produitCategorieKey)
               if(typeof produitCategorieKey === 'string'){
                    produitCategorieKey = produitCategorieKey.split(', ');
               }              
               produitCategorieKey.forEach(couleur => couleur.toLowerCase());
               console.log(produitCategorieKey);
                return produitCategorieKey.some((couleur) =>
                  filters[categorieKey].includes(couleur)
                );              
            }

            return filters[categorieKey].find(
              (filter) => filter === produit[categorieKey]
            );
          });
        });

        this.filteredData = validData;
      }
    },
  },
  mounted() {
    this.getFilteredData();
  },
};
</script>
