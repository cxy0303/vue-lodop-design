<template>
<div class="attr" v-bar='{scrollThrottle: 30}'>
  <div class="container-fluid" v-if='this.selecteddata.type==-1'>
    <p class='title'>
      表格属性
    </p>
    <form>
      <div class="form-group">
        <label class="control-label">打印类型</label>
        <select class="form-control" v-model='data.itemtype'>
            <option value=0>
              打印一次
            </option>
            <option value=1>
              每页重复打印
            </option>
            <option value=4>
              多页打印
            </option>
            <option value=2>
              页码
            </option>
            <option value=3>
              总页数
            </option>
        </select>
      </div>
      <databind :dataschema='dataschema' modalname='field' :value='data.databind' title='数据字段绑定' @nodeselect='databindselect' v-if='data.itemtype!=2&&data.itemtype!=3'></databind>
      <div class="form-group">
        <label class="control-label">字体</label>
        <div class="form-inline">
          <select class="form-control" style='width:49%' v-model='data.style.fontFamily'>
            <option value="微软雅黑">
              微软雅黑
            </option>
            <option value="宋体">
              宋体
            </option>
            <option value="黑体">
              黑体
            </option>
          </select>
          <select class="form-control" style='width:49%' v-model='data.style.fontSize'>
            <option value="12px">
              12px
            </option>
            <option value="13px">
              13px
            </option>
            <option value="14px">
              14px
            </option>
            <option value="15px">
              15px
            </option>
            <option value="16px">
              16px
            </option>
            <option value="17px">
              17px
            </option>
          </select>
        </div>
        <div class="form-inlie" style="margin-top:5px;">
          <colorPicker v-model='data.style.color'></colorPicker>
          <button type="button" class="btn" :class='data.style.fontWeight!="normal"?"btn-info":"btn-default"' @click='data.style.fontWeight=(data.style.fontWeight=="normal"?"bolder":"normal")'>
              <span class="glyphicon glyphicon-bold"></span>
            </button>
          <button type="button" class="btn btn-default" :class='data.style.fontStyle!="normal"?"btn-info":"btn-default"' @click='data.style.fontStyle=(data.style.fontStyle=="normal"?"italic":"normal")'>
              <span class="glyphicon glyphicon-italic" aria-hidden="true"></span>
            </button>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">边框</label>
        <select class="form-control" v-model='data.style.borderType'>
            <option value="0">
              无
            </option>
            <option value="1">
              边框（不合并）
            </option>
            <option value="2">
              边框（合并）
            </option>
          </select>
      </div>
      <div class="form-group">
        <label class="control-label">文本对齐</label>
        <div style='text-align:center;'>
          <div class="btn-group">
            <button type="button" class="btn" :class='data.style.textAlign=="left"?"btn-info":"btn-default"' @click='data.style.textAlign="left"'>
              <span class="glyphicon glyphicon-align-left"></span>
            </button>
            <button type="button" class="btn" :class='data.style.textAlign=="center"?"btn-info":"btn-default"' @click='data.style.textAlign="center"'>
              <span class="glyphicon glyphicon-align-center"></span>
            </button>
            <button type="button" class="btn" :class='data.style.textAlign=="right"?"btn-info":"btn-default"' @click='data.style.textAlign="right"'>
              <span class="glyphicon glyphicon-align-right"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">表格位置</label>
        <div class="form-inline tcenter">
          <a class="checkbox" :class='{checked:data.style.HOrient==2}' @click='data.style.HOrient=(data.style.HOrient==2?0:2)'><label>水平居中</label></a>
          <a class="checkbox" :class='{checked:data.style.VOrient==2}' @click='data.style.VOrient=(data.style.VOrient==2?0:2)'><label>垂直居中</label></a>
        </div>
      </div>
    </form>
  </div>
  <div class="container-fluid" v-if='this.selecteddata.type==0'>
    <p class='title'>
      行属性
    </p>
    <form>
      <div class="form-group tcenter">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-info" @click='rowupinsert'>上方插入行</button>
          <button type="button" class="btn btn-danger" @click='rowdel'>删除</button>
          <button type="button" class="btn btn-info" @click='rowdowninsert'>下方插入行</button>
        </div>
      </div>
      <div class="form-group">
        <a class="checkbox" :class='{checked:rowunprint}' @click='rowunprint=!rowunprint'><label>不参与打印</label></a>
      </div>
      <div class="form-group">
        <label class="control-label">行高</label><a class="checkbox fright" :class='{checked:rowlock}' @click='rowlock=!rowlock' style='margin:0px;'>锁定</a>
        <input type="text" class="form-control" v-model='selectedrowheight'>
      </div>
      <div class="form-group">
        <label class="control-label">背景颜色</label>
        <colorPicker v-model='rowbackgroundcolor'></colorPicker>
      </div>
      <div class="form-group">
        <label class="control-label">字体</label>
        <div class="form-inline">
          <select class="form-control" style='width:49%' v-model='rowfont'>
            <option value="微软雅黑">
              微软雅黑
            </option>
            <option value="宋体">
              宋体
            </option>
            <option value="黑体">
              黑体
            </option>
          </select>
          <select class="form-control" style='width:49%' v-model='rowfontsize'>
            <option value="12px">
              12px
            </option>
            <option value="13px">
              13px
            </option>
            <option value="14px">
              14px
            </option>
            <option value="15px">
              15px
            </option>
            <option value="16px">
              16px
            </option>
            <option value="17px">
              17px
            </option>
          </select>
        </div>
        <div class="form-inlie" style="margin-top:5px;">
          <colorPicker v-model='colcolor'></colorPicker>
          <button type="button" class="btn" :class='colfontweight!="normal"?"btn-info":"btn-default"' @click='colfontweight=(colfontweight=="normal"?"bolder":"normal")'>
              <span class="glyphicon glyphicon-bold"></span>
            </button>
          <button type="button" class="btn btn-default" :class='colfontstyle!="normal"?"btn-info":"btn-default"' @click='colfontstyle=(colfontstyle=="normal"?"italic":"normal")'>
              <span class="glyphicon glyphicon-italic" aria-hidden="true"></span>
            </button>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">文本对齐</label>
        <div style='text-align:center;'>
          <div class="btn-group">
            <button type="button" class="btn" :class='rowtextalign=="left"?"btn-info":"btn-default"' @click='rowtextalign="left"'>
              <span class="glyphicon glyphicon-align-left"></span>
            </button>
            <button type="button" class="btn" :class='rowtextalign=="center"?"btn-info":"btn-default"' @click='rowtextalign="center"'>
              <span class="glyphicon glyphicon-align-center"></span>
            </button>
            <button type="button" class="btn" :class='rowtextalign=="right"?"btn-info":"btn-default"' @click='rowtextalign="right"'>
              <span class="glyphicon glyphicon-align-right"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="container-fluid" v-if='this.selecteddata.type==1'>
    <p class='title'>
      列属性
    </p>
    <form>
      <div class="form-group tcenter">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-info" @click='colleftinsert'>左侧插入列</button>
          <button type="button" class="btn btn-danger" @click='coldel'>删除</button>
          <button type="button" class="btn btn-info" @click='colrightinsert'>右侧侧插入列</button>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">列宽</label><a class="checkbox fright" :class='{checked:collock}' @click='collock=!collock' style='margin:0px;'>锁定</a>
        <input type="text" class="form-control" v-model='selectedcolwidth'>
      </div>
      <div class="form-group">
        <label class="control-label">背景颜色</label>
        <colorPicker v-model='colbackgroundcolor'></colorPicker>
      </div>
      <div class="form-group">
        <label class="control-label">字体</label>
        <div class="form-inline">
          <select class="form-control" style='width:49%' v-model='colfont'>
            <option value="微软雅黑">
              微软雅黑
            </option>
            <option value="宋体">
              宋体
            </option>
            <option value="黑体">
              黑体
            </option>
          </select>
          <select class="form-control" style='width:49%' v-model='colfontsize'>
            <option value="12px">
              12px
            </option>
            <option value="13px">
              13px
            </option>
            <option value="14px">
              14px
            </option>
            <option value="15px">
              15px
            </option>
            <option value="16px">
              16px
            </option>
            <option value="17px">
              17px
            </option>
          </select>
        </div>
        <div class="form-inlie" style="margin-top:5px;">
          <colorPicker v-model='colcolor'></colorPicker>
          <button type="button" class="btn" :class='colfontweight!="normal"?"btn-info":"btn-default"' @click='colfontweight=(colfontweight=="normal"?"bolder":"normal")'>
              <span class="glyphicon glyphicon-bold"></span>
            </button>
          <button type="button" class="btn btn-default" :class='colfontstyle!="normal"?"btn-info":"btn-default"' @click='colfontstyle=(colfontstyle=="normal"?"italic":"normal")'>
              <span class="glyphicon glyphicon-italic" aria-hidden="true"></span>
            </button>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">文本对齐</label>
        <div style='text-align:center;'>
          <div class="btn-group">
            <button type="button" class="btn" :class='coltextalign=="left"?"btn-info":"btn-default"' @click='coltextalign="left"'>
              <span class="glyphicon glyphicon-align-left"></span>
            </button>
            <button type="button" class="btn" :class='coltextalign=="center"?"btn-info":"btn-default"' @click='coltextalign="center"'>
              <span class="glyphicon glyphicon-align-center"></span>
            </button>
            <button type="button" class="btn" :class='coltextalign=="right"?"btn-info":"btn-default"' @click='coltextalign="right"'>
              <span class="glyphicon glyphicon-align-right"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="container-fluid" v-if='this.selecteddata.type==2'>
    <p class='title'>
      单元格属性
    </p>
    <form>
      <div class="form-group">
        <label class="control-label">默认文本</label>
        <textarea class="form-control" v-model='selectedcells.value' />
      </div>
      <databind v-if='this.selecteddata.blocktype==1' :dataschema='celldataschema' modalname='cellfield' :value='this.selectedcells.databind' title='表格数据字段绑定' @nodeselect='celldatabindselect'></databind>
      <div class="form-group col-md-12">
        <label class="control-label">列宽</label>
        <input type="text" class="form-control" v-model='selectedcellwidth'>
      </div>
      <div class="form-group col-md-12">
        <label class="control-label">行高</label>
        <input type="text" class="form-control" v-model='selectedcellheight'>
      </div>
      <div class="form-group">
        <label class="control-label">背景颜色</label>
        <colorPicker v-model='selectedcells.style.backgroundColor'></colorPicker>
      </div>
      <div class="form-group">
        <label class="control-label">字体</label>
        <div class="form-inline">
          <select class="form-control" style='width:49%' v-model='selectedcells.style.fontFamily'>
            <option value="微软雅黑">
              微软雅黑
            </option>
            <option value="宋体">
              宋体
            </option>
            <option value="黑体">
              黑体
            </option>
          </select>
          <select class="form-control" style='width:49%' v-model='selectedcells.style.fontSize'>
            <option value="12px">
              12px
            </option>
            <option value="13px">
              13px
            </option>
            <option value="14px">
              14px
            </option>
            <option value="15px">
              15px
            </option>
            <option value="16px">
              16px
            </option>
            <option value="17px">
              17px
            </option>
          </select>
        </div>
        <div class="form-inlie" style="margin-top:5px;">
          <colorPicker v-model='selectedcells.style.color'></colorPicker>
          <button type="button" class="btn" :class='selectedcells.style.fontWeight!="normal"?"btn-info":"btn-default"' @click='selectedcells.style.fontWeight=(selectedcells.style.fontWeight=="normal"?"bolder":"normal")'>
              <span class="glyphicon glyphicon-bold"></span>
            </button>
          <button type="button" class="btn" :class='selectedcells.style.fontStyle!="normal"?"btn-info":"btn-default"' @click='selectedcells.style.fontStyle=(selectedcells.style.fontStyle=="normal"?"italic":"normal")'>
              <span class="glyphicon glyphicon-italic" aria-hidden="true"></span>
            </button>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">文本对齐</label>
        <div style='text-align:center;'>
          <div class="btn-group">
            <button type="button" class="btn" :class='selectedcells.style.textAlign=="left"?"btn-info":"btn-default"' @click='selectedcells.style.textAlign="left"'>
              <span class="glyphicon glyphicon-align-left"></span>
            </button>
            <button type="button" class="btn" :class='selectedcells.style.textAlign=="center"?"btn-info":"btn-default"' @click='selectedcells.style.textAlign="center"'>
              <span class="glyphicon glyphicon-align-center"></span>
            </button>
            <button type="button" class="btn" :class='selectedcells.style.textAlign=="right"?"btn-info":"btn-default"' @click='selectedcells.style.textAlign="right"'>
              <span class="glyphicon glyphicon-align-right"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</template>
<script>
import colorPicker from '../plugins/colorPicker'
import databind from '../plugins/databind'
export default {
  components: {
    colorPicker,
    databind
  },
  props: ["data", "dataschema", "selecteddata"],
  computed: {
    fontSpacing: {
      get() {
        return parseInt(this.data.style.fontSpacing);
      },
      set(v) {
        if (v == '' || isNaN(v)) {
          v = 0;
        }
        this.data.style.fontSpacing = parseInt(v) + "px";
      }
    },
    itemtype() {
      return this.data.itemtype;
    },
    colfont: {
      get() {
        return this.selectedcells[0].style.fontFamily;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontFamily = v;
        }
      }
    },
    colfontweight: {
      get() {
        return this.selectedcells[0].style.fontWeight;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontWeight = v;
        }
      }
    },
    colfontstyle: {
      get() {
        return this.selectedcells[0].style.fontStyle;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontStyle = v;
        }
      }
    },
    colcolor: {
      get() {
        return this.selectedcells[0].style.color;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.color = v;
        }
      }
    },
    colbackgroundcolor: {
      get() {
        return this.selectedcells[0].style.backgroundColor;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.backgroundColor = v;
        }
      }
    },
    colfontsize: {
      get() {
        return this.selectedcells[0].style.fontSize;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontSize = v;
        }
      }
    },
    coltextalign: {
      get() {
        return this.selectedcells[0].style.textAlign;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.textAlign = v;
        }
      }
    },
    collock: {
      get() {
        return this.selectedcells[0]["collock"];
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          if (!this.selectedcells[0]["collock"]) {
            this.$set(this.selectedcells[i], "collock", false);
          }
          this.selectedcells[i]["collock"] = v;
        }
      }
    },
    selectedcolwidth: {
      get() {
        if (this.data.thead.rows.length && this.data.thead.rows.length > 0) {
          return this.data.thead.rows[0].cells[this.selecteddata.col].width;
        } else if (this.data.tbody.rows.length && this.data.tbody.rows.length > 0) {
          return this.data.tbody.rows[0].cells[this.selecteddata.col].width;
        }
      },
      set(v) {
        v = parseInt(v);
        var ori_width = 0;
        for (var i = 0; i < this.selectedcells.length; i++) {
          ori_width = this.selectedcells[i].width;
          this.selectedcells[i].width = v;
        }
        this.data.width += (v - ori_width);
      }
    },
    rowfont: {
      get() {
        return this.selectedcells[0].style.fontFamily;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontFamily = v;
        }
      }
    },
    rowfontweight: {
      get() {
        return this.selectedcells[0].style.fontWeight;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontWeight = v;
        }
      }
    },
    rowfontstyle: {
      get() {
        return this.selectedcells[0].style.fontStyle;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontStyle = v;
        }
      }
    },
    rowcolor: {
      get() {
        return this.selectedcells[0].style.color;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.color = v;
        }
      }
    },
    rowbackgroundcolor: {
      get() {
        return this.selectedcells[0].style.backgroundColor;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.backgroundColor = v;
        }
      }
    },
    rowfontsize: {
      get() {
        return this.selectedcells[0].style.fontSize;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.fontSize = v;
        }
      }
    },
    rowtextalign: {
      get() {
        return this.selectedcells[0].style.textAlign;
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          this.selectedcells[i].style.textAlign = v;
        }
      }
    },
    rowlock: {
      get() {
        return this.selectedcells[0]["rowlock"];
      },
      set(v) {
        for (var i = 0; i < this.selectedcells.length; i++) {
          if (!this.selectedcells[0]["rowlock"]) {
            this.$set(this.selectedcells[i], "rowlock", false);
          }
          this.selectedcells[i]["rowlock"] = v;
        }
      }
    },
    selectedrowheight: {
      get() {
        if (this.selecteddata.blocktype == 0) {
          return this.data.thead.rows[this.selecteddata.row].cells[0].height;
        } else {
          return this.data.tbody.rows[this.selecteddata.row].cells[0].height;
        }
      },
      set(v) {
        v = parseInt(v);
        var pri_height = 0;
        if (this.selecteddata.blocktype == 0) {
          for (var i = 0; i < this.data.thead.rows[this.selecteddata.row].cells.length; i++) {
            var cell = this.data.thead.rows[this.selecteddata.row].cells[i];
            pri_height = cell.height;
            cell.height = v;
          }
        } else {
          for (var i = 0; i < this.data.tbody.rows[this.selecteddata.row].cells.length; i++) {
            var cell = this.data.tbody.rows[this.selecteddata.row].cells[i];
            pri_height = cell.height;
            cell.height = v;
          }
        }
        this.data.height += (v - pri_height);
      }
    },
    selectedcellwidth: {
      get() {
        return this.selectedcells.width;
      },
      set(v) {
        v = parseInt(v);
        var ori_width = 0;
        var cells = this.getcolcells(this.selecteddata.col);
        for (var i = 0; i < cells.length; i++) {
          ori_width = cells[i].width;
          cells[i].width = v;
        }
        this.data.width += v - ori_width;
      }
    },
    selectedcellheight: {
      get() {
        return this.selectedcells.height;
      },
      set(v) {
        v = parseInt(v);
        var ori_height;
        var cells = this.getrowcells(this.selecteddata.row);
        for (var i = 0; i < cells.length; i++) {
          ori_height = cells[i].height;
          cells[i].height = v;
        }
        this.data.height += (v - ori_height);
      }
    },
    selectedcells() {
      var type = this.selecteddata.type;
      var blocktype = this.selecteddata.blocktype;
      var rowindex = this.selecteddata.row;
      var colindex = this.selecteddata.col;
      if (type == 0) {
        return this.getrowcells(rowindex);
      } else if (type == 1) {
        return this.getcolcells(colindex);
      } else if (type == 2) {
        if (blocktype == 0) {
          return this.data.thead.rows[rowindex].cells[colindex];
        } else if (blocktype == 1) {
          return this.data.tbody.rows[rowindex].cells[colindex];
        }
      }
      return cells;
    },
    selectedrow() {
      var type = this.selecteddata.type;
      var blocktype = this.selecteddata.blocktype;
      var rowindex = this.selecteddata.row;
      if (type == 0) {
        if (blocktype == 0) {
          return this.data.thead.rows[rowindex];
        } else {
          return this.data.tbody.rows[rowindex];
        }
      }
      return {};
    },
    rowunprint: {
      get() {
        if (this.selectedrow.unprint == undefined) {
          this.$set(this.selectedrow, 'unprint', false);
        }
        return this.selectedrow.unprint;
      },
      set(v) {
        this.selectedrow.unprint = v;
      }
    },
    celldataschema() {
      var tablebind = this.data.databind.id.split('.');
      var obj = null;
      var node = {
        nodes: this.dataschema
      };
      for (var i = 0; i < tablebind.length; i++) {
        var f = tablebind[i];
        if (f != '' && f != undefined) {
          for (var j = 0; j < node.nodes.length; j++) {
            if (f == node.nodes[j].id) {
              node = node.nodes[j];
              break;
            }
          }
        }
      }
      return node.cols;
    }
  },
  methods: {
    alert(msg) {
      this.$modal.show('dialog', {
        title: '<a class="glyphicon glyphicon-info-sign"></a>消息',
        text: msg,
        buttons: [{
          title: '确定'
        }]
      })
    },
    databindselect(data) {
      this.data.databind = {
        id: data.id,
        text: data.text
      };
    },
    celldatabindselect(data) {
      this.selectedcells.databind = {
        id: data.id,
        text: data.text
      }
    },
    colleftinsert() {
      var sw = 0;
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        var cell = {
          width: 50,
          height: this.selectedcells[i].height,
          value: '列标题',
          databind: {
            id: '',
            text: ''
          },
          style: {
            fontFamily: '宋体',
            color: '#000',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            backgroundColor: ''
          }
        }
        this.data.thead.rows[i].cells.splice(this.selecteddata.col, 0, cell);
        sw = cell.width;
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        var cell = {
          width: this.selectedcells[i].width,
          height: this.selectedcells[i].height,
          value: '数据绑定',
          databind: {
            id: '',
            text: ''
          },
          style: {
            fontFamily: '宋体',
            color: '#000',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            backgroundColor: ''
          }
        };
        this.data.tbody.rows[i].cells.splice(this.selecteddata.col, 0, cell);
        sw = cell.width;
      }
      this.data.width += sw;
      this.selecteddata.col += 1;
    },
    colrightinsert() {
      var sw = 0;
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        var cell = {
          width: 50,
          height: this.selectedcells[i].height,
          value: '列标题',
          databind: {
            id: '',
            text: ''
          },
          style: {
            fontFamily: '宋体',
            color: '#000',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            backgroundColor: ''
          }
        }
        this.data.thead.rows[i].cells.splice(this.selecteddata.col + 1, 0, cell);
        sw = cell.width;
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        var cell = {
          width: 50,
          height: this.selectedcells[i].height,
          value: '数据绑定',
          databind: {
            id: '',
            text: ''
          },
          style: {
            fontFamily: '宋体',
            color: '#000',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            backgroundColor: ''
          }
        };
        this.data.tbody.rows[i].cells.splice(this.selecteddata.col + 1, 0, cell);
        sw = cell.width;
      }
      this.data.width += sw;
    },
    coldel() {
      var sw = 0;
      debugger
      if(this.data.thead.rows[0].cells.length<=1){
        this.alert('至少保留一列！');
        return;
      }
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        sw = this.data.thead.rows[i].cells[this.selecteddata.col].width;
        this.data.thead.rows[i].cells.splice(this.selecteddata.col, 1);
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        sw = this.data.tbody.rows[i].cells[this.selecteddata.col].width;
        this.data.tbody.rows[i].cells.splice(this.selecteddata.col, 1);
        // 将被删除的列的宽度分摊添加到table-columns内
        var cells = this.data.tbody.rows[0].cells;
        var addwidth = (sw / cells.length).toFixed(2);
        for (var j = 0; j < cells.length; j++) {
          var oldwidth = cells[j].style.width.replace('px', '');
          this.data.tbody.rows[0].cells[j].style.width = (parseFloat(oldwidth) + parseFloat(addwidth)) + 'px';
        }
      }
      // 这里应该让表格的宽度适应更人性化
      // this.data.width -= sw;
      this.selecteddata.type = -1;
    },
    rowupinsert() {
      var h = 0;
      var row = {
        cells: []
      };
      for (var i = 0; i < this.selectedcells.length; i++) {
        var cell = {
          width: this.selectedcells[i].width,
          height: 28,
          value: this.selecteddata.blocktype == 0 ? '列标题' : '数据绑定',
          databind: {
            id: '',
            text: ''
          },
          style: {
            fontFamily: '宋体',
            color: '#000',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            backgroundColor: ''
          }
        }
        h = 28;
        row.cells.push(cell);
      }
      if (this.selecteddata.blocktype == 0) {
        this.data.thead.rows.splice(this.selecteddata.row, 0, row);
      } else {
        this.data.tbody.rows.splice(this.selecteddata.row, 0, row);
      }
      this.data.height += h;
      this.selecteddata.row += 1;
    },
    rowdowninsert() {
      var h = 0;
      var row = {
        cells: []
      };
      for (var i = 0; i < this.selectedcells.length; i++) {
        var cell = {
          width: this.selectedcells[i].width,
          height: 28,
          value: this.selecteddata.blocktype == 0 ? '列标题' : '数据绑定',
          databind: {
            id: '',
            text: ''
          },
          style: {
            fontFamily: '宋体',
            color: '#000',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            backgroundColor: ''
          }
        }
        h = 28;
        row.cells.push(cell);
      }
      if (this.selecteddata.blocktype == 0) {
        this.data.thead.rows.splice(this.selecteddata.row + 1, 0, row);
      } else {
        this.data.tbody.rows.splice(this.selecteddata.row + 1, 0, row);
      }
      this.data.height += h;
    },
    rowdel() {
      var sh = 0;
      if (this.selecteddata.blocktype == 0) {
        if(this.data.thead.rows.length<=1){
          this.alert('表头至少保留一行！');
          return;
        }
        var temp = this.data.thead.rows.splice(this.selecteddata.row, 1)[0];
        sh = temp.cells[0].height;
      } else {
        if(this.data.tbody.rows.length<=1){
          this.alert('数据区域至少保留一行！');
          return;
        }
        var temp = this.data.tbody.rows.splice(this.selecteddata.row, 1)[0];
        sh = temp.cells[0].height;
      }
      this.data.height -= sh;
      this.selecteddata.type = -1;
    },
    getcolcells(colindex) {
      var cells = [];
      for (var i = 0; i < this.data.thead.rows.length; i++) {
        cells.push(this.data.thead.rows[i].cells[colindex]);
      }
      for (var i = 0; i < this.data.tbody.rows.length; i++) {
        cells.push(this.data.tbody.rows[i].cells[colindex]);
      }
      return cells;
    },
    getrowcells(rowindex) {
      var cells = [];
      var blocktype = this.selecteddata.blocktype;
      if (blocktype == 0) {
        for (var i = 0; i < this.data.thead.rows[rowindex].cells.length; i++) {
          cells.push(this.data.thead.rows[rowindex].cells[i]);
        }
      } else if (blocktype == 1) {
        for (var i = 0; i < this.data.tbody.rows[rowindex].cells.length; i++) {
          cells.push(this.data.tbody.rows[rowindex].cells[i]);
        }
      }
      return cells;
    }
  },
  watch: {
    itemtype(v) {
      var type = parseInt(v);
      if ((type == 2 || type == 3) && this.data.value.indexOf("#") < 0 && this.data.value.indexOf("&") < 0) {
        this.data.value = '第#页，总共&页';
      }
    }
  }
}
</script>
<style lang='less'>
.attr {
    padding-top: 10px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .title {
        color: #6699FF;
        font-weight: bolder;
        border-left: 5px solid #6699FF;
        padding-left: 10px;
        margin-bottom: 20px;
    }
    .control-label {
        font-weight: normal;
    }
    .printpage {
        text-align: left;
        a {
            width: 49%;
        }
    }
    .container-fluid {
        padding-bottom: 100px;
    }
}
</style>
