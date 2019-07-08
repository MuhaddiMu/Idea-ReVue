<template>
  <div class="text-xs-center">
    <v-dialog width="600px" v-model="Dialogue">
      <template v-slot:activator="{ on }">
        <v-btn class="success" flat v-on="on"
          ><v-icon small>wb_incandescent</v-icon> New Idea</v-btn
        >
      </template>

      <v-card>
        <v-card-text>
          <h1>Create New Idea</h1>
          <v-form class="px-3" ref="Form">
            <v-text-field
              prepend-icon="folder"
              v-model="Title"
              label="Title"
              :rules="TitleRules"
            ></v-text-field>
            <v-textarea
              :rules="InfoRules"
              label="Information"
              prepend-icon="edit"
            ></v-textarea>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="formattedDate"
                  label="Picker in menu"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  :rules="DateRules"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
            <v-btn class="success" flat @click="CreateIdea" :loading="loading">Create IDEA</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { format } from "date-fns";
import DB from '../firebase';
export default {
  data() {
    return {
      Title: "",
      Info: "",
      date: "",
      menu: false,
      TitleRules: [v => !!v || "Name is required"],
      InfoRules: [v => !!v || "Idea  Information is required"],
      DateRules: [v => !!v || "Date is required"],
      loading: false,
      Dialogue: false,
    };
  },

  methods: {
    CreateIdea() {
      if (this.$refs.Form.validate()) {
        this.loading = true
          const Project = {
              Title: this.Title,
              Person: "Muhaddis",
              Status: 'Pending',
              Date: format(this.date, "Do MMMM YYYY")
          }
          DB.collection('Projects').add(Project).then(() => {
            this.loading = false
            this.Dialogue = false
            this.$emit('Ideated')
            })
      }
    }
  },

  computed: {
    formattedDate() {
      return this.date ? format(this.date, "Do MMMM YYYY") : "";
    }
  }
};
</script>
