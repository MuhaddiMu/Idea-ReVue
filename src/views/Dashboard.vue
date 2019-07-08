<template>
  <div class="Dashboard">
    <v-container my-4>
      <v-layout row flat class="mb-3">
        <v-tooltip top
          ><v-btn
            flat
            small
            color="grey"
            slot="activator"
            @click="SortBy('Name')"
            ><v-icon left small>highlight</v-icon>By Project</v-btn
          ><span>Sort By Project Name</span></v-tooltip
        >
        <v-tooltip top
          ><v-btn
            flat
            small
            color="grey"
            slot="activator"
            @click="SortBy('Idea')"
            ><v-icon left small>wb_incandescent</v-icon>By Ideas</v-btn
          ><span>Sort By Idea Name</span></v-tooltip
        >
      </v-layout>

      <v-card flat v-for="Project in Projects" :key="Project.id">
        <v-layout row wrap :class="`pa-3 Project ${Project.Status}`">
          <v-flex xs12 md6>
            <div class="body-2 grey--text">Project</div>
            <div>{{ Project.Title }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="body-2 grey--text">Idea</div>
            <div>{{ Project.Person }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="body-2 grey--text">Deadline</div>
            <div>{{ Project.Date }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip :class="` white--text ${Project.Status}`" small>{{
                Project.Status
              }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import DB from '../firebase'
export default {
  data() {
    return {
      Projects: []
    };
  },
  created(){
    DB.collection('Projects').onSnapshot(res => {
      const Changes = res.docChanges()

      Changes.forEach(Change => {
        if(Change.type === 'added'){
          this.Projects.push({
            ...Change.doc.data(),
            id: Change.doc.id
          })
        }
      })

    })
  },
  methods: {
    SortBy(Prop) {
      this.Projects.sort((a, b) => (a[Prop] < b[Prop] ? -1 : 1));
    }
  }
};
</script>

<style>
.Project.Pending {
  border-left: 4px solid #fb8c00;
}

.Project.Review {
  border-left: 4px solid #1976d2;
}

.Project.Completed {
  border-left: 4px solid #4caf50;
}

.v-chip.Pending {
  background-color: #fb8c00 !important;
}

.v-chip.Review {
  background-color: #1976d2 !important;
}

.v-chip.Completed {
  background-color: #4caf50 !important;
}
</style>
