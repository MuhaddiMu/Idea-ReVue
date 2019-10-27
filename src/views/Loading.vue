<template lang="html">
  <v-dialog
    v-model="getLoading"
    width="300"
    height="300"
    persistent
  >
    <v-card>
      <v-container>
        <v-row align="center" justify="center" class="title">
          Loading...
        </v-row>
        <v-row class="pa-3">
          <v-progress-linear
            indeterminate
            color="blue darken-2"
          ></v-progress-linear>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    getLoading () {
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style lang="css" scoped>
</style>
