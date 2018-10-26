<template>
<div>
    <div class="row">
        <div class="col">
            <b-form>
                <b-form-group label="Theme">
                    <b-form-select v-model="theme">
                        <option value="day">Day</option>
                        <option value="night">Night</option>
                    </b-form-select>
                </b-form-group>

                <b-form-group label="Columns">
                    <div class="row">
                        <div class="col-4" v-for="(column, index) in columns" :key="column.screenName">
                            <edit-column :index="index" :column="column" @move="moveColumn" @change="save()"></edit-column>
                        </div>
                    </div>
                </b-form-group>
            </b-form>
            <b-button @click="close()" class="float-right">Close</b-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    columns: Array
  },
  data() {
    return {
      theme: "day"
    };
  },
  created() {
    this.load();
  },
  watch: {
    theme(newVal, oldValue) {
      document.body.classList.remove(oldValue);
      document.body.classList.add(newVal);
      this.save();
    }
  },
  methods: {
    close() {
      this.$parent.hide();
    },
    load() {
      let storedData = localStorage.getItem("layoutTheme");

      if (storedData != null) {
        this.theme = storedData;
      }
    },
    save() {
      localStorage.setItem("layoutTheme", this.theme);
      localStorage.setItem("layoutColumns", JSON.stringify(this.columns));
    },
    moveColumn(from, index) {
      let t = this.columns[index];
      this.columns.splice(index, 1);
      this.columns.splice(from, 0, t);
      this.save();
    }
  }
};
</script>

<style>
body.night {
  background-color: #11151c;
  color: #d66853;
}
body.night .card,
body.night .modal-content {
  background-color: #212d40;
}

body.night hr {
  background-color: #d66853;
}

body.night .close,
body.night .close:hover {
  color: #d66853;
  text-shadow: none;
}
</style>

