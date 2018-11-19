<template>
<div class="attr" v-bar='{scrollThrottle: 30}'>
  <div class="container-fluid">
    <p class='title' :class="{show:!printattrshow}" @click='printattrshow=!printattrshow'>
      打印属性<span class="glyphicon" :class='[printattrshow?"glyphicon glyphicon-menu-down":"glyphicon glyphicon-menu-right"]'></span>
    </p>
    <form v-if='printattrshow'>
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
      <div class="form-group">
        <label class="control-label">标题</label>
        <textarea class="form-control" v-model='data.charttitle' />
      </div>
      <div class="form-group">
        <label class="control-label">尾注</label>
        <textarea class="form-control" v-model='data.chartfoot' />
      </div>
      <div class="form-group">
        <label class="control-label">对齐</label>
        <div class="form-inline tcenter">
          <a class="checkbox" :class='{checked:data.style.HOrient==2}' @click='data.style.HOrient=(data.style.HOrient==2?0:2)'><label>水平居中</label></a>
          <a class="checkbox" :class='{checked:data.style.VOrient==2}' @click='data.style.VOrient=(data.style.VOrient==2?0:2)'><label>垂直居中</label></a>
        </div>
      </div>
    </form>
    <p class='title' :class="{show:!datattrshow}" @click='datattrshow=!datattrshow'>
      图表数据<span class="glyphicon" :class='[datattrshow?"glyphicon glyphicon-menu-down":"glyphicon glyphicon-menu-right"]'></span>
    </p>
    <form v-if='datattrshow'>
      <div class="form-group">
        <label class="control-label">报表类型</label>
        <select class="form-control" v-model='data.charttype'>
            <option value=0>
              线图
            </option>
            <option value=1>
              柱状图
            </option>
            <option value=5>
              饼图
            </option>
        </select>
      </div>
      <databind :dataschema='dataschema' modalname='field' :value='data.databind' title='主字段' @nodeselect='databindselect' v-if='data.itemtype!=2&&data.itemtype!=3'></databind>
      <div class="form-group">
        <label class="control-label">x轴</label>
        <div class="list-group">
          <button type="button" class="list-group-item" :class='{show:item.show&&item!=groupitem,group:item==groupitem}' v-for='(item,index) in this.data.xdata'>{{item.text}}
            <span class="glyphicon" v-if='group!=item' @click='item.show=!item.show' :class='[item.show?"glyphicon-eye-close":"glyphicon-eye-open"]'></span>
            <span class="glyphicon glyphicon-tasks" @click='setgroup(item)'>按此列值分组</span>
          </button>
        </div>
      </div>
    </form>
    <p class='title' :class="{show:!styleattrshow}" @click='styleattrshow=!styleattrshow'>
      图表样式<span class="glyphicon" :class='[styleattrshow?"glyphicon glyphicon-menu-down":"glyphicon glyphicon-menu-right"]'></span>
    </p>
    <form v-if='styleattrshow'>
      <div class="form-group">
        <label class="control-label">左坐标样式</label>
        <select class="form-control" v-model='leftstyle'>
            <option value='-'>
              默认
            </option>
            <option value=0>
              隐藏
            </option>
            <option value=1>
              自动
            </option>
            <option value=2>
              无
            </option>
            <option value=3>
              值
            </option>
            <option value=4>
              Mark
            </option>
            <option value=5>
              文本
            </option>
        </select>
      </div>
      <div class="form-group">
        <label class="control-label">底坐标样式</label>
        <select class="form-control" v-model='bottomstyle'>
            <option value='-'>
              默认
            </option>
            <option value=0>
              隐藏
            </option>
            <option value=1>
              自动
            </option>
            <option value=2>
              无
            </option>
            <option value=3>
              值
            </option>
            <option value=4>
              Mark
            </option>
            <option value=5>
              文本
            </option>
        </select>
      </div>
      <div class="form-group">
        <label class="control-label">图例样式</label>
        <select class="form-control" v-model='chartlegendstyle'>
            <option value='-'>
              默认
            </option>
            <option value=0>
              隐藏
            </option>
            <option value=1>
              左边/值
            </option>
            <option value=2>
              左边/百分比
            </option>
            <option value=3>
              x值
            </option>
            <option value=4>
              Plain
            </option>
            <option value=5>
              右边/值
            </option>
            <option value=6>
              右边/百分比
            </option>
        </select>
      </div>
      <div class="form-group">
        <label class="control-label">图例位置</label>
        <select class="form-control" v-model='chartserialPosition'>
            <option value='-'>
              默认
            </option>
            <option value=0>
              左边
            </option>
            <option value=1>
              右边
            </option>
            <option value=2>
              上面
            </option>
            <option value=3>
              下面
            </option>
          </select>
      </div>
      <div class="form-group">
        <label class="control-label">标注样式</label>
        <select class="form-control" v-model='chartserialStyle'>
            <option value='-'>
              默认
            </option>
            <option value=0>
              隐藏
            </option>
            <option value=1>
              值
            </option>
            <option value=2>
              百分比
            </option>
            <option value=3>
              文本
            </option>
            <option value=4>
              文本/百分比
            </option>
            <option value=5>
              文本/值
            </option>
            <option value=6>
              Legend
            </option>
            <option value=7>
              百分比和
            </option>
            <option value=8>
              文本/百分比 和
            </option>
            <option value=9>
              x值
            </option>
          </select>
      </div>
      <div class="form-group">
        <label class="control-label">标注透明</label>
        <select class="form-control" v-model='chartserialOpacity'>
            <option value='-'>
              默认
            </option>
            <option value=0>
              不透明
            </option>
            <option value=1>
              透明
            </option>
          </select>
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
  props: ["data", "dataschema"],
  data() {
    return {
      groupitem: {},
      printattrshow: false,
      datattrshow: false,
      styleattrshow: false
    }
  },
  computed: {
    leftstyle: {
      get() {
        return this.data.printstyle[0];
      },
      set(v) {
        this.data.printstyle.splice(0, 1, v);
      }
    },
    bottomstyle: {
      get() {
        return this.data.printstyle[1];
      },
      set(v) {
        this.data.printstyle.splice(1, 1, v);
      }
    },
    topstyle: {
      get() {
        return this.data.printstyle[2];
      },
      set(v) {
        this.data.printstyle.splice(2, 1, v);
      }
    },
    rightstyle: {
      get() {
        return this.data.printstyle[3];
      },
      set(v) {
        this.data.printstyle.splice(3, 1, v);
      }
    },
    chartlegendstyle: {
      get() {
        return this.data.printstyle[4];
      },
      set(v) {
        this.data.printstyle.splice(4, 1, v);
      }
    },
    chartserialPosition: {
      get() {
        return this.data.printstyle[5];
      },
      set(v) {
        this.data.printstyle.splice(5, 1, v);
      }
    },
    chartserialStyle:{
      get() {
        return this.data.printstyle[6];
      },
      set(v) {
        this.data.printstyle.splice(6, 1, v);
      }
    },
    chartserialOpacity:{
      get() {
        return this.data.printstyle[7];
      },
      set(v) {
        this.data.printstyle.splice(7, 1, v);
      }
    },
    itemtype() {
      return this.data.itemtype;
    }
  },
  methods: {
    setgroup(item) {
      for (var i = 0; i < this.data.xdata.length; i++) {
        this.data.xdata[i]["group"] = false;
      }
      this.groupitem = item;
      item["group"] = true;
    },
    databindselect(data) {
      this.data.databind = {
        id: data.id,
        text: data.text
      };
      if (data.cols) {
        this.data.xdata = [];
        for (var i = 0; i < data.cols.length; i++) {
          var item = data.cols[i];
          this.data.xdata.push({
            id: item.id,
            text: item.text,
            show: true,
            group: false
          })
        }
        this.data.xdata[0]["group"] = true;
        this.group = this.data.xdata[0];
      }
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
<style lang='less' scoped>
.show {
    background-color: #6699FF;
    color: white !important;
}
.title {
    span {
        font-size: 12px;
        float: right;
        margin-top: 2px;
        margin-right: 5px;
    }
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}
.glyphicon-tasks {
    display: none !important;
    padding: 5px;
    background-color: #5bc0de;
    &::before {
        margin-right: 5px;
    }
    font-size: 12px;
    vertical-align: top;
}
.group {
    .glyphicon-tasks {
        display: inline-block !important;
    }
}
.list-group {

    .show {
        background-color: #00CC66;
        color: white;
    }
    .list-group-item {
        &:hover .glyphicon-tasks {
            display: inline-block !important;
        }
        span {
            float: right;
            padding: 5px;
            display: inline-block;
            vertical-align: middle;
            border-radius: 5px;
            color: white;
            margin-left: 10px;
        }
        .glyphicon-eye-close {
            background-color: red;
        }
        .glyphicon-eye-open {
            background-color: #00CC66;
        }
    }
}
ul li {
    list-style: none;
}
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
