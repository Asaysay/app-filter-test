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
    <div class="col-3">
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
      <div id="prixCheckboxes">
        <h6>Prix</h6>
        <div v-for="(prix, index) in filters" :key="index" class="form-check">
          <div v-if="prix.categorie == 'prix'">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="prix.checked"
              v-on:change="getFilteredData()"
            />
            <label class="form-check-label">
              {{ prix.name }}
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
    <div class="col-8 card-columns">
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
        //   sexe
        {
          checked: false,
          categorie: "sexe",
          name: "Hommes",
          value: "Homme"
        },
        {
          checked: false,
          categorie: "sexe",
          name: "Femmes",
          value: "Femme"
        },
        {
          checked: false,
          categorie: "sexe",
          name: "Mixte",
          value: "Mixte"
        },
        // sport
        {
          checked: false,
          categorie: "sport",
          name: "Football",
          value: "Football"
        },
        {
          checked: false,
          categorie: "sport",
          name: "Basket",
          value: "Basket"
        },
        {
          checked: false,
          categorie: "sport",
          name: "Running",
          value: "Running"
        },
        // prix
        {
          checked: false,
          categorie: "prix",
          name: "Moins €50",
          value: "0-49,99"
        },
        {
          checked: false,
          categorie: "prix",
          name: "€50 - €100",
          value: "50-100"
        },
        {
          checked: false,
          categorie: "prix",
          name: "€100 - €150",
          value: "100,01-150"
        },
        {
          checked: false,
          categorie: "prix",
          name: "Plus de €150",
          value: "150,01-1000", // à revoir pour le ma
        },
        // couleur
        {
          checked: false,
          categorie: "couleur",
          name: "Pourpre",
          value: "pourpre"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Noir",
          value: "noir"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Rouge",
          value: "rouge"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Orange",
          value: "orange"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Bleu",
          value: "bleu"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Blanc",
          value: "blanc"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Marron",
          value: "marron"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Vert",
          value: "vert"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Jaune",
          value: "jaune"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Multicolore",
          value: "multicolore"
        },
        {
          checked: false,
          categorie: "couleur",
          name: "Gris",
          value: "gris"
        }
      ],
    };
  },
  methods: {
    getFilteredData() {
      this.filteredData = data;
      if (this.selectedFilters.length > 0) {
        let selectedSexFilters = [];
        let selectedPrixFilters = [];
        let selectedCouleurFilters = [];
        let selectedSportFilters = [];

        this.selectedFilters.forEach((filter) => {
          switch (filter.categorie) {
            case "sexe":
              selectedSexFilters.push(filter.value);
              break;
            case "prix":
              switch (filter.value) {
                case "0-49,99":
                  selectedPrixFilters.push(0, 49.99);
                  break;
                case "50-100":
                  selectedPrixFilters.push(50, 100);
                  break;
                case "100,01-150":
                  selectedPrixFilters.push(100.01, 150);
                  break;
                case "150,01-1000":
                  selectedPrixFilters.push(150.01, 1000); // à revoir pour le max
                  break;
              }
              break;
            case "couleur":
              selectedCouleurFilters.push(filter.value);
              break;
            case "sport":
              selectedSportFilters.push(filter.value);
              break;
          }
        });
        const filters = {
          sexe: selectedSexFilters,
          prix: selectedPrixFilters,
          couleur: selectedCouleurFilters,
          sport: selectedSportFilters,
        };

        console.log(filters);

        const filterKeys = Object.keys(filters);
        const validData = this.filteredData.filter((produit) => {
          return filterKeys.every((categorieKey) => {

            // pour les catégories où aucune checkbox selected
            if (filters[categorieKey].length == 0) {
              return true;
            }

            // Pour les prix
            // à revoir => version permettant de filtrer selon un min et un max mais, n'exclue pas les entres deux
            // ex => si 50-100 et Plus de 150 sélectionnés afficher a tous les produits entre 50.01 et 1000 euros mais n'exclue pas les produits allant de 100 à 150 euros
            if (categorieKey == "prix") {
                filters[categorieKey] = filters[categorieKey].sort((a, b) => a-b);
                let prix = filters[categorieKey];
                let min = Math.min(...prix);
                let max = Math.max(...prix);
                let prixProduit = parseFloat(produit[categorieKey]);
                
                if(( prixProduit > min) && ( prixProduit< max)){
                    console.log(produit)
                    return true;
                }
            }

           
            // Pour les couleurs
            if (categorieKey == "couleur") {
              let produitCategorieKeyValue = produit[categorieKey]
                .toString()
                .toLowerCase();
              if (typeof produitCategorieKeyValue === "string") {
                produitCategorieKeyValue = produitCategorieKeyValue.split(", ");
              }
              produitCategorieKeyValue.forEach((couleur) =>
                couleur.toLowerCase()
              );
              return produitCategorieKeyValue.some((couleur) =>
                filters[categorieKey].includes(couleur)
              );
            }

            // Pour les filtres simples ( ex sexe )
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
