<template>
<vuedraggableresizable :minh='mh' :minw='mw' :parent="true" :x="left" :y="top" :w='data.width' :h='data.height' :style='data.style' :axis='axis' @resizing='onresize' @dragging="ondragging" @activated='onactivated' :draggable="(data.style.HOrient!=2||data.style.VOrient!=2)&&tableeditype==0"
  @resizestart='resizestart' :handles="[ 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']">
  <table :id='id' :width='data.width' :height='data.height'  @mousemove='tablemousemove($event)' table-layout="fixed" :border='data.style.borderType>0?1:0' :style="{borderSpacing:'2px 2px',borderCollapse:data.style.borderType==2?'collapse':'separate'}">
    <thead>
      <tr v-for='(row,rindex) in data.thead.rows'>
        <td v-for='(cell,cindex) in row.cells' @mousemove="mousemove($event)" @mousedown="mousedown($event)" :width='cell.width+"px"' :height='cell.height+"px"' :class='{selected:tdactive(rindex,cindex,0)}' @click='selecttd(rindex,cindex,0)' :style='cell.style'>
          <div class="nowrap" :style='[{width:cell.width+"px",fontFamily:cell.style.fontFamily}]' v-if='!row.unprint'>
            {{cell.value}}
          </div>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(row,rindex) in data.tbody.rows'>
        <td v-for='(cell,cindex) in row.cells' @mousemove="mousemove($event)" @mousedown="mousedown($event)" :width='cell.width+"px"' :height='cell.height+"px"' class='nowrap databind' :class='{selected:tdactive(rindex,cindex,1)}' @click='selecttd(rindex,cindex,1)'
          :style='cell.style'>
          <div class="nowrap" :style='[{width:cell.width+"px",fontFamily:cell.style.fontFamily}]' v-if='!row.unprint'>
            <template v-if='cell.databind&&cell.databind.id&&cell.databind.id!=""'>
                <span class='glyphicon glyphicon-link'></span>{{cell.databind.text}}
            </template>
            <template v-else>
                {{cell.value}}
            </template>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <div slot='default' class="table-bar"> -->
  <a class="tablehandle" @click='selecttable'>
      <span class="glyphicon glyphicon-th"></span>
    </a>
  <div class="table-columns">
    <a v-for='(cell,index) in data.tbody.rows[0].cells' :style='{width:cell.width+"px"}' @click='selectcol(index)'>
        <span class="glyphicon " :class='{"glyphicon-lock":cell.collock}'></span>
      </a>
  </div>
  <div class="table-rows">
    <a v-for='(cell,index) in subjectrow' :style='{height:cell.height+"px"}' @click='selecttr(cell.index,cell.blocktype)'>
        <span class="glyphicon glyphicon-lock" v-if='cell.rowlock'></span>
      </a>
  </div>
  <div class="table-rowtype">
    <div class="table-thead" :style='{height:theadrowheight+"px"}'>
      <span>表<br />头</span>
    </div>
    <div class="table-tbody" :style='{height:tbodyrowheight+"px"}'>
      <span>数<br />据</span>
    </div>
  </div>
  <!-- </div> -->
</vuedraggableresizable>
</div>
</template>
<script>
import vuedraggableresizable from '../plugins/draggresize/vue-draggable-resizable'
export default {
  components: {
    vuedraggableresizable
  },
  props: ["data", "index", "active", "pageinfo", "id"],
  data() {
    return {
      tableeditype: 0,
      tddraggable: null,
      downx: 0,
      downy: 0,
      currentx: 0,
      currenty: 0,
      downw: 0,
      downh: 0,
      downw_next: 0,
      downh_next: 0,
      mh: 10,
      mw: 10,
      select: {
        blocktype: -1, //0:表头；1:数据
        type: -1, //-1:整张表;0:选择一行；1：选择一列;2:单元格选择
        row: -1,
        col: -1
      }
    }
  },
  methods: {
    mousemove(event) {
      var obj = event.currentTarget;
      if (this.tddraggable != null)
        return;
      if (obj.tagName == "TD") {
        this.x = event.offsetY;
        this.mx = obj.offseHeight;
        if (event.offsetX > obj.offsetWidth - 10) {
          if (obj.cellIndex >= obj.parentNode.cells.length - 1)
            return;
          obj.style.cursor = 'col-resize';
          this.tableeditype = 1;
        } else if (event.offsetY > obj.offsetHeight - 10) {
          if(obj.parentNode.rowIndex >= this.data.thead.rows.length + this.data.tbody.rows.length - 1){
            return;
          }
          obj.style.cursor = 'row-resize';
          this.tableeditype = 2;
        } else {
          obj.style.cursor = 'default';
          this.tableeditype = 0;
        }
      }
    },
    mousedown(event) {
      if (this.tableeditype > 0) {
        this.tddraggable = event.currentTarget;
        this.downx = event.screenX;
        this.downy = event.screenY;
        this.downw = parseFloat(event.target.offsetWidth);
        this.downh = parseFloat(event.target.offsetHeight);
        this.downh_next = null;
        this.downw_next = null;
      } else {
        this.tddraggable = null;
      }
    },
    tablemousemove(event) {
      if (this.tableeditype <= 0 || this.tddraggable == null) {
        return;
      }
      if (this.tableeditype == 1) {
        var cellindex = this.tddraggable.cellIndex;
        var delay_w = event.screenX - this.downx;
        for (var i = 0; i < this.data.thead.rows.length; i++) {
          this.data.thead.rows[i].cells[cellindex].width = this.downw + delay_w;
          if (cellindex + 1 < this.data.thead.rows[i].cells.length) {
            if (this.downw_next == null)
              this.downw_next = parseFloat(this.data.thead.rows[i].cells[cellindex + 1].width);
            this.data.thead.rows[i].cells[cellindex + 1].width = this.downw_next - delay_w;
          }
        }
        for (var i = 0; i < this.data.tbody.rows.length; i++) {
          this.data.tbody.rows[i].cells[cellindex].width = this.downw + delay_w;
          if (cellindex + 1 < this.data.tbody.rows[i].cells.length) {
            if (this.downw_next == null)
              this.downw_next = parseFloat(this.data.tbody.rows[i].cells[cellindex + 1].width);
            this.data.tbody.rows[i].cells[cellindex + 1].width = this.downw_next - delay_w;
          }
        }
      } else if (this.tableeditype == 2) {
        var rowindex = this.tddraggable.parentNode.rowIndex
        var delay_h = event.screenY - this.downy;
        var row = null;
        var minh = 20;
        for (var i = 0; i < this.tddraggable.parentNode.cells.length; i++) {
          var cell = this.tddraggable.parentNode.cells[i];
          if (cell.children.length >= 1) {
            var h = parseFloat(cell.children[0].offsetHeight);
            if (minh < h)
              min = h;
          }
        }
        if (rowindex >= this.data.thead.rows.length) {
          row = this.data.tbody.rows[rowindex - this.data.thead.rows.length];
        } else {
          row = this.data.thead.rows[rowindex];
        }
        var nextrow = null;
        if (rowindex + 1 < this.data.thead.rows.length) {
          nextrow = this.data.thead.rows[rowindex + 1];
        } else if (rowindex - this.data.thead.rows.length + 1 < this.data.tbody.rows.length) {
          nextrow = this.data.tbody.rows[rowindex - this.data.thead.rows.length + 1];
        }
        if (row.cells[0].height <= minh && delay_h < 0)
          return;
        for (var i = 0; i < row.cells.length; i++) {
          row.cells[i].height = this.downh + delay_h;
          if (nextrow != null) {
            if (this.downh_next == null)
              this.downh_next = parseFloat(nextrow.cells[i + 1].height);
            nextrow.cells[i].height = this.downh_next - delay_h;
          }
        }
      } else {
        return;
      }
    },
    resizestart() {
      this.mh = this.getminh();
      this.mw = this.getminw();
    },
    onresize(x, y, width, height) {
      this.data.x = x;
      this.data.y = y;
      this.tableresize(width, height);
    },
    ondragging(x, y) {
      this.data.x = x;
      this.data.y = y;
    },
    onactivated() {
      this.$emit("onactived", this.index);
    },
    tableresize(width, height) {
      var currentwidth = this.width;
      var currentheight = this.height;

      this.data.width = width;
      this.data.height = height;
      var row = this.data.thead.rows.length && this.data.thead.rows.length > 0 ? this.data.thead.rows[0] : this.data.tbody.rows[0]
      for (var i = 0; i < row.cells.length; i++) {
        if (row.cells[i]["collock"]) {
          var w = row.cells[i].width;
          currentwidth -= w;
          width -= w;
        }
      }

      for (var i = 0; i < this.data.thead.rows.length; i++) {
        var cell = this.data.thead.rows[i].cells[0];
        if (cell["rowlock"]) {
          var h = cell.height;
          currentheight -= h;
          height -= h;
        }
      }

      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        var cell = this.data.tbody.rows[i].cells[0];
        if (cell["rowlock"]) {
          var h = cell.height;
          currentheight -= h;
          height -= h;
        }
      }
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        var row = this.data.thead.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
          var cell = row.cells[j];
          if (!cell["collock"])
            cell.width += parseInt(cell.width / width * (width - currentwidth));
          if (!cell["rowlock"])
            cell.height += parseInt(cell.height / height * (height - currentheight));
        }
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        var row = this.data.tbody.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
          var cell = row.cells[j];
          if (!cell["collock"])
            cell.width += parseInt(cell.width / width * (width - currentwidth));
          if (!cell["rowlock"])
            cell.height += parseInt(cell.height / height * (height - currentheight));
        }
      }
    },
    selecttr(index, type) {
      this.select.row = index;
      this.select.type = 0;
      this.select.blocktype = type;
      this.$emit('selected', this.select);
    },
    selectcol(index) {
      this.select.col = index;
      this.select.type = 1;
      this.$emit('selected', this.select);
    },
    selecttd(row, col, blocktype) {
      this.select.blocktype = blocktype;
      this.select.type = 2;
      this.select.row = row;
      this.select.col = col;
      this.$emit('selected', this.select);
    },
    selecttable() {
      this.select = {
        blocktype: -1, //0:表头；1:数据
        type: -1, //0:选择一行；1：选择一列;2:单元格选择
        row: -1,
        col: -1
      }
      this.$emit('selected', this.select);
    },
    tdactive(rindex, cindex, blocktype) {
      if ((this.select.type == 0 || this.select.type == 2) && this.select.blocktype != blocktype)
        return false;
      if (this.select.type == 0) {
        return this.select.row == rindex;
      } else if (this.select.type == 1) {
        return this.select.col == cindex;
      } else {
        return this.select.row == rindex && this.select.col == cindex;
      }
    },
    getminh() {
      var mw = 0;
      var mh = 0;
      var table = document.getElementById(this.id);
      if (table != null) {
        for (var i = 0; i < table.tHead.rows.length; i++) {
          var row = table.tHead.rows[i];
          var rh = 0;
          if (this.data.thead.rows[i].cells[0]["rowlock"]) {
            rh = parseInt(this.data.thead.rows[i].cells[0].height);
            mh += rh + 1;
            continue;
          }
          for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j];
            var temp = parseInt(cell.children.length > 0 ? cell.children[0].offsetHeight : 20);
            if (rh < temp)
              rh = temp;
          }
          mh += rh + 1;
        }
        for (var i = 0; i < table.tBodies[0].rows.length; i++) {
          var rh = 0;
          var row = table.tBodies[0].rows[i];
          if (this.data.tbody.rows[i].cells[0]["rowlock"]) {
            rh = parseInt(this.data.tbody.rows[i].cells[0].height);
            mh += rh + 1;
            continue;
          }
          for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j];
            var temp = parseInt(cell.children.length > 0 ? cell.children[0].offsetHeight : 20);
            if (rh < temp)
              rh = temp;
          }
          mh += rh + 1;
        }
      }
      return mh;
    },
    getminw() {
      var row = this.data.thead.rows.length && this.data.thead.rows.lengt > 0 ? this.data.thead.rows[0] : this.data.tbody.rows[0];
      var w = 0;
      for (var i = 0; i < row.cells.length; i++) {
        var cell = row.cells[i];
        if (cell["collock"]) {
          w += cell.width;
        } else {
          w += 20;
        }
      }
      return w;
    }
  },
  mounted() {
    var vue = this;
    this.selecttable();
    document.addEventListener('mouseup', function() {
      vue.tableeditype = 0;
      vue.tddraggable = null;
    });
    document.addEventListener('click', function(event) {
      if (event.target.attributes['page'])
        vue.selectindex = null;
    });
  },
  computed: {
    height() {
      var h = 0;
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        h += parseFloat(this.data.thead.rows[i].cells[0].height);
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        h += parseFloat(this.data.tbody.rows[i].cells[0].height);
      }
      return h + 4;
    },
    width() {
      var w = 0;
      for (var i = 0; i < this.data.tbody.rows[0].cells.length; i++) {
        w += parseFloat(this.data.tbody.rows[0].cells[i].width);
      }
      return w + 4;
    },
    subjectrow() {
      var cells = [];
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        var cell = {
          height: this.data.thead.rows[i].cells[0].height,
          rowlock: this.data.thead.rows[i].cells[0]["rowlock"],
          blocktype: 0,
          index: i
        };
        cells.push(cell);
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        var cell = {
          height: this.data.tbody.rows[i].cells[0].height,
          rowlock: this.data.tbody.rows[i].cells[0]["rowlock"],
          blocktype: 1,
          index: i
        };
        cells.push(cell);
      }
      return cells;
    },
    theadrowheight() {
      var h = 0;
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        h += parseInt(this.data.thead.rows[i].cells[0].height);
      }
      return h;
    },
    tbodyrowheight() {
      var h = 0;
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        h += parseFloat(this.data.tbody.rows[i].cells[0].height);
      }
      return h;
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
  }
}
</script>
<style lang='less'>
// .table-bar{display: none;}
.vdr:hover .table-bar {
    display: block !important;
}
.hovered {
    background-color: lighten(#DDDDDD,5%);
}
.table-container {
    position: relative;
}
.table-columns {
    font-size: 0;
    width: 100%;
    position: absolute;
    top: -20px;
    left: 0;
    height: 20px;
    border-radius: 5px;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
    a {
        display: inline-block;
        background-color: #DDDDDD;
        height: 20px;
        border-left: 1px solid white;
        &:hover {
            .hovered
        }
    }
    span {
        font-size: 12px;
        vertical-align: middle;
    }
}
.table-rows {
    text-align: center;
    position: absolute;
    right: -21px;
    border-radius: 5px;
    top: 0;
    a {
        display: block;
        background-color: #DDDDDD;
        width: 20px;
        border-top: 1px solid white;
        &:hover {
            .hovered
        }
    }
    font-size: 12px;
}
.table-rowtype {
    width: 23px;
    position: absolute;
    left: -23px;
    top: 0;
    font-size: 12px;
}
.table-tbody,
.table-thead {
    width: 100%;
    text-align: center;
    display: table;
    table-layout: fixed;
    border: 1px solid #DDDDDD;
    border-right: none;
    color: grey;
    overflow: hidden;
    vertical-align: middle;
    position: relative;
    span {
        position: absolute;top:30%;left:5px;
        line-height: normal;
        display: table-cell;
        height: 100%;
        vertical-align: middle;
        overflow: hidden;
    }
}
.table-thead {
    border-bottom: none;
}
.selected {
    background-color: #FFFFCC;
}
.tablehandle {
    position: absolute;
    top: -25px;
    left: -22px;
    font-size: 20px;
}
.nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.handle {
    z-index: 1;
}
</style>
