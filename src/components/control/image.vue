<template>
<vuedraggableresizable :parent="true" :minh='22' :x="left" :y="top" :w='data.width' :h='data.height' printtype='atext' :active='active' :draggable="data.style.HOrient!=2||data.style.VOrient!=2" @resizing='onresize' @dragging="ondragging" @activated='onactivated'
  :axis='axis'>
  <a style='width:100%;height:100%;display:block;background-repeat:no-repeat;' :style='{backgroundImage:"url(\""+data.style.defaultimg+"\")",backgroundSize:backgroundSize}'>
  </a>
</vuedraggableresizable>
</template>
<script>
import vuedraggableresizable from '../plugins/draggresize/vue-draggable-resizable'
export default {
  components: {
    vuedraggableresizable
  },
  props: ["data", "index", "active", "pageinfo"],
  data() {
    return {}
  },
  computed: {
    backgroundSize() {
      if (this.data.style.backgroundSize == 0) {
        return "auto";
      } else if (this.data.style.backgroundSize == 1)
        return "cover";
      else if (this.data.style.backgroundSize == 2)
        return "contain";
    },
    left() {
      if (this.data.style.HOrient == 2) {
        this.data.x = (this.pageinfo.width - this.data.width) / 2;
      }
      return this.data.x;

    },
    top() {
      if (this.data.style.VOrient == 2) {
        this.data.y = (this.pageinfo.height - this.data.height) / 2;
      }
      return this.data.y;

    },
    axis() {
      if ((this.data.style.VOrient == 2 && this.data.style.HOrient == 2) || (this.data.style.VOrient != 2 && this.data.style.HOrient != 2)) {
        return "both";
      } else if (this.data.style.VOrient == 2) {
        return "x";
      } else if (this.data.style.HOrient == 2) {
        return "y";
      }
    }
  },
  methods: {
    onresize(x, y, width, height) {
      this.data.x = x;
      this.data.y = y;
      this.data.width = width;
      this.data.height = height;
    },
    ondragging(x, y) {
      this.data.x = x;
      this.data.y = y;
    },
    onactivated() {
      this.$emit("onactived", this.index);
    }
  },
  mounted() {

  }
}
</script>
