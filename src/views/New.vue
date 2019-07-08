<template>
  <div class="New">
    <h1 class="display-1 grey--text mt-2">New Ideas</h1>
    <v-container>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="Idea in Ideas" :key="Idea.id">
          <template v-slot:header>
            <div>{{ Idea.Title }}</div>
          </template>
          <v-card>
            <v-card-text class="px-4 grey--text"
              ><div class="font-weight-bold ">{{ Idea.Date }}</div>
              {{ Idea.Person }} – {{Idea.Status}}</v-card-text
            >
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import DB from '../firebase'
export default {
  data() {
    return {
      Ideas: []
    };
  },

created(){
    DB.collection('Projects').onSnapshot(res => {
      const Changes = res.docChanges()

      Changes.forEach(Change => {
        if(Change.type === 'added'){
          this.Ideas.push({
            ...Change.doc.data(),
            id: Change.doc.id
          })
        }
      })

    })
  },
};
</script>
