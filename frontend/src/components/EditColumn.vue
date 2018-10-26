<template>
    <b-card draggable="true"
        v-bind:class="{ drag: true, dragging, over }"
        @drop="onDrop"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragleave="onDragLeave"
        no-body>
        <div slot="header">
            <strong>{{'@' + column.screenName}}</strong>
        </div>
        <b-card-body>
            <b-form>
                <b-form-group label="Tweet count">
                    <b-input type="number" v-model.number="column.count" @input="$emit('change')"></b-input>
                </b-form-group>
            </b-form>
        </b-card-body>
    </b-card>
</template>

<script>
export default {
  props: {
    index: Number,
    column: Object
  },
  data() {
    return {
      dragging: false,
      over: false
    };
  },
  methods: {
    onDrop(event) {
      let droppedIndex = Number(event.dataTransfer.getData("index"));
      if (droppedIndex != this.index) {
        this.$emit("move", this.index, droppedIndex);
      }
      this.over = false;
    },
    onDragOver(event) {
      event.preventDefault();
      this.over = true;
    },
    onDragStart(event) {
      event.dataTransfer.setData("index", this.index);
      this.dragging = true;
    },
    onDragEnd(event) {
      this.dragging = false;
    },
    onDragLeave(event) {
      this.over = false;
    }
  }
};
</script>

<style scoped>
.drag {
  cursor: move;
}

.dragging {
  opacity: 0.2;
}

.over {
  border-color: #d66853;
  border-style: dashed;
}
</style>
