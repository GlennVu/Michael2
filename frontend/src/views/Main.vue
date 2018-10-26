<template>
<div>
  <b-modal title="Edit Layout" size="lg" id="editLayoutModal" hide-footer>
    <edit-layout :columns="columns"></edit-layout>
  </b-modal>

  <div class="row">
      <b-card class="col-12">
        <b-button v-b-modal.editLayoutModal><fa-icon icon="cogs"></fa-icon> Edit Layout</b-button>
      </b-card>
  </div>
  <div class="row">
    <div class="col-12 d-sm-none">
      <ul class="nav flex-column">
        <li class="nav-item" v-for="column in columns" :key="column.screenName">
          <a class="nav-link active" :href="'#' + column.screenName">@{{column.screenName}}</a>
        </li>
      </ul>
      <hr>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-4" v-for="column in columns" :key="column.screenName">
      <a :name="column.screenName"></a>
      <tweet-column :screen-name="column.screenName" :count="column.count"></tweet-column>
    </div>
  </div>

  <a href="#" class="back-to-top">Back to top</a>
</div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          screenName: "MakeSchool",
          count: 30
        },
        {
          screenName: "newsycombinator",
          count: 30
        },
        {
          screenName: "ycombinator",
          count: 30
        }
      ]
    };
  },
  created() {
    let storedData = localStorage.getItem("layoutColumns");

    if (storedData != null) {
      try {
        this.columns = JSON.parse(storedData);
      } catch (err) {
        console.error(err);
      }
    }
  },
  methods: {}
};
</script>

<style scoped>
a.back-to-top {
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 1em;
}
</style>

