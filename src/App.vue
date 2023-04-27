<template>
  <v-app>
    <v-toolbar  style="background:#0064c7" >
      <v-spacer></v-spacer><v-spacer></v-spacer>
      <v-toolbar-title style="color:#fff" > <i
                        aria-hidden="true"
                        class="material-icons"
                      >menu</i> FRAMEWORKS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  style="background:#0075d9;color:#fff"  class="r" dark @click="showDialog = true">
        <v-icon left>mdi-plus</v-icon>
        Add
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <home-view :items="items" @delete-item="deleteItem" @edit-item="editItem" ></home-view>

      <item-dialog v-if="showDialog && !showEditDialog || !showDialog && showEditDialog" @close="showDialog = false; showEditDialog = false" @add="addItem" @update="updateItem" v-bind:item="items[editIndex]" v-bind:isEditing="showEditDialog"></item-dialog>
    </v-container>
  </v-app>
</template>

<script>
import homeView from './views/HomeView.vue'
import ItemDialog from './components/ItemDialog.vue';

export default {
  name: 'app',
  components: {
    homeView,
    ItemDialog
  },
  data() {
    return {
      items: [],
      showDialog: false,
      showEditDialog: false,
      editIndex: -1 
    };
  },
  methods: {
    addItem(item) {
      this.items.push(item);
      this.showDialog = false;
      this.showEditDialog = false;
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    editItem(index) {
      this.editIndex = index;
      this.showDialog = false;
      this.showEditDialog = true;
    },
    updateItem(item) {
      this.items[this.editIndex] = item;
    }
  },
};
</script>

<style>

.v-btn {
  margin: 0;
  color: blue;
}

</style>
