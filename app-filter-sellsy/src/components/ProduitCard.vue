<template>
  <div v-if="produit.article !== ''" class="card border-0">
    <div class="card-body p-0">
      <div class="text-center">
        <img
          class="img-fluid"
          style="width: 100%"
          :src="require(`@/assets/photos-produits/${produit.photo}`)"
          :alt="produit.photo"
          sizes="(max-width: 959px) 318px, (max-width: 959px) and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) 592px, (min-width: 960px) 592px"
        />
    </div>
      <div>
        <h6 class="card-title">{{ produit.article }}</h6>
        <h6>
          Chaussure de {{ produit.sport }}
          <span v-if="produit.sexe !== 'Mixte'">pour {{ produit.sexe }}</span>
        </h6>
        <div>
          <small
            >{{ getproduitCouleurLength() }} couleur<span
              v-if="getproduitCouleurLength() > 1"
              >s</span
            ></small
          >
        </div>
        <h6>{{ produit.prix }}</h6>
      </div>
      <div>
        <span v-for="(group, index) in produit.stack" :key="index" class="badge">{{
          group
        }}</span>
      </div>
    </div>
  </div> 
</template>
<script>
export default {
  data () {
    return {}
  },
  filters: {
    capitalize: (produit) => {
      return produit.toUpperCase()
    }
  },
  props: {
    produit: {
      type: Object
    }
  },
  methods: {
    getproduitCouleurLength () {
      let produitCouleur = this.produit.couleur.split(/[, ]+/)
      return produitCouleur.length
    }
  }
}
</script>
