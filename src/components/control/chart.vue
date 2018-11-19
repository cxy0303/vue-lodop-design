<template>
<vuedraggableresizable :parent="true" :minh='100' :minw='100' :x="left" :y="top" :w='data.width' :h='data.height' :active='active' :draggable="data.style.HOrient!=2||data.style.VOrient!=2" @resizing='onresize' @dragging="ondragging" @activated='onactivated' :axis='axis'>
  <div style="width:100%;height:100%;border:1px solid black">
    <linechart :width='this.data.width-40' :height='this.data.height-80' :type='serialtype' :charttitle='data.charttitle' :chartfoot='data.chartfoot'></linechart>
    <!-- <table border=1>
      <tr v-for='(tr,index) in demochartdata'>
        <td v-for='(value,key) in tr'>
          {{value}}
        </td>
      </tr>
    </table> -->
  </div>
</vuedraggableresizable>
</template>
<script>
import vuedraggableresizable from '../plugins/draggresize/vue-draggable-resizable'
import linechart from '../plugins/lodop_linechart'
export default {
  components: {
    vuedraggableresizable,linechart
  },
  props: ["data", "index", "active", "pageinfo"],
  data() {
    return {}
  },
  computed: {
    serialtype(){
      debugger
      if(this.data.charttype==0)
        return "line";
      else if(this.data.charttype==1)
        return "bar";
      else if(this.data.charttype==5)
        return "pie";
    },
    demochartdata() {
      if (this.data.xdata.length <= 0)
        return [];
      var xdata = [];
      for (var i = 0; i < this.data.xdata.length; i++) {
        var item = this.data.xdata[i];
        if (item["group"]) {
          xdata.splice(0, 0, item);
        }else{
          xdata.push(item);
        }
      }
      debugger
      var data = [];
      for (var i = 0; i < 3; i++) {
        var trdata = {};
        for (var j = 0; j < xdata.length; j++) {
          var item = xdata[j];
          if (i == 0)
            trdata[item.id] = item.text;
          else {
            if (j == 0) {
              trdata[item.id] = '分组' + i;
            } else {
              trdata[item.id] = parseInt(Math.random() * 100)
            }
          }
        }
        data.push(trdata);
      }
      return data;
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
  }
}
</script>
