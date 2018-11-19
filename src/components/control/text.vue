<template>
<vuedraggableresizable :parent="true" :minh='22' :x="left" :y="top" :w='data.width' :h='data.height' printtype='atext' :active='active' :draggable="data.style.HOrient!=2||data.style.VOrient!=2" @resizing='onresize' @dragging="ondragging" @activated='onactivated'
  :axis='axis' :style={textAlign:data.style.textAlign} >
  <p :style=[{textAlign:data.style.textAlign},pborder] v-if='data.style.borderType!=13'>
    <font v-for='n in data.value.length' :key='n' :style='[data.style,fontborder,{marginRight:data.style.fontSpacing}]' >{{data.value[n-1]}}</font>
  </p>
  <p v-if='data.style.borderType==13' class="grid">
    <font v-for='n in data.value.length' :key='n' :style='[data.style,fontborder,{paddingLeft:letterspacing,paddingRight:letterspacing}]' >
      {{data.value[n-1]==''?'&nbsp;':data.value[n-1]}}
    </font>
  </p>
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
    fontborder() {
      if (this.data.style.borderType == 1) {
        return {borderTop:"1px solid black"};
      } else if (this.data.style.borderType == 2) {
        return {borderBottom:"1px solid black"};
      } else if (this.data.style.borderType == 3) {
        return {borderLeft:"1px solid black"};
      } else if (this.data.style.borderType == 4) {
        return {borderRight:"1px solid black"};
      } else if (this.data.style.borderType == 5) {
        return {border:"1px solid black"};
      } else if (this.data.style.borderType == 6) {
        return {border:"1px solid black",borderRadius:'50%'};
      }else{
        return {};
      }
    },
    pborder() {
      if (this.data.style.borderType == 7) {
        return {borderTop:"1px solid black"};
      } else if (this.data.style.borderType == 8) {
        return {borderBottom:"1px solid black"};
      } else if (this.data.style.borderType == 9) {
        return {borderLeft:"1px solid black"};
      } else if (this.data.style.borderType == 10) {
        return {borderRight:"1px solid black"};
      } else if (this.data.style.borderType == 11) {
        return {border:"1px solid black"};
      } else if (this.data.style.borderType == 12) {
        return {border:"1px solid black",borderRadius:'50%'};
      }else{
        return {};
      }
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
    },
    letterspacing(){
      return parseInt(this.data.style.fontSpacing)/2+"px";
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
<style lang='less' scoped>
p{padding: 0px;margin: 0px;display: inline-block;max-width: 100%;max-height: 100%;overflow: hidden;}
font {
    display: inline;
}
.grid {
    font {
        border-left: 1px solid black;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        text-align: center !important;
        &:last-child {
            border-right: 1px solid black;
        }
    }
}
</style>
