<template>
  <v-row justify="center">
    <v-dialog v-model="Dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Idea?</v-card-title>
        <v-card-text>You can edit the Idea if you just need to change something. Why not have a list of your wonderful thoughts!</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn text @click="Dialog = false">Cancel</v-btn>

          <v-btn color="error" text @click="ConfirmDelete(IdeaID)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      Dialog: false,
      IdeaID: ''
    }
  },

  methods: {
    ShowModal (IdeaID) {
      this.Dialog = true
      this.IdeaID = IdeaID
    },

    ConfirmDelete (IdeaID) {
      this.$emit('ConfirmDelete', IdeaID)
      this.Dialog = false
    }
  }
}
</script>

<style scoped>
</style>
