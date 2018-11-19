<template>
<div class="attr" v-bar='{scrollThrottle: 30}'>
  <div class="container-fluid">
    <p class='title'>
      打印属性
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
      <div class="form-group">
        <label class="control-label">默认文本</label>
        <textarea  class="form-control" v-model='data.value'/>
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
        <label class="control-label">字符间距</label>
        <input type="text" class="form-control" v-model='fontSpacing'>
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
        <label class="control-label">边框</label>
        <select class="form-control" v-model='data.style.borderType'>
            <option value="0">
              无
            </option>
            <option value="1">
              (字符)上边框
            </option>
            <option value="2">
              (字符)下边框
            </option>
            <option value="3">
              (字符)左边框
            </option>
            <option value="4">
              (字符)右边框
            </option>
            <option value="5">
              (字符)矩形边框
            </option>
            <option value="6">
              (字符) 圆形边框
            </option>
            <option value="7">
              (整体)上边框
            </option>
            <option value="8">
              (整体)下边框
            </option>
            <option value="9">
              (整体)左边框
            </option>
            <option value="10">
              (整体)右边框
            </option>
            <option value="11">
              (整体)矩形边框
            </option>
            <option value="12">
              (整体)圆形边框
            </option>
            <option value="13">
              表格
            </option>
          </select>
      </div>
      <div class="form-group">
        <label class="control-label">对齐</label>
        <div class="form-inline tcenter">
          <a class="checkbox" :class='{checked:data.style.HOrient==2}' @click='data.style.HOrient=(data.style.HOrient==2?0:2)'><label>水平居中</label></a>
          <a class="checkbox" :class='{checked:data.style.VOrient==2}' @click='data.style.VOrient=(data.style.VOrient==2?0:2)'><label>垂直居中</label></a>
        </div>
      </div>
      <!-- <div class="form-group">
        <label class="control-label">仅在以下页面打印</label>
        <div class="form-inline printpage">
          <a class="checkbox checked"><label>第一页</label></a>
          <a class="checkbox checked"><label>最后一页</label></a><br />
          <a class="checkbox checked"><label>奇数页</label></a>
          <a class="checkbox checked"><label>偶数页</label></a>
          <div style="margin-top:5px;">
            <label class="control-label">指定页面:</label>
            <input type='text' class="form-control" placeholder="多页用英文逗号分隔" />
          </div>
        </div>
      </div> -->
    </form>
  </div>
</div>
</template>
<script>
import colorPicker from '../plugins/colorPicker'
import databind from '../plugins/databind'
export default {
  components: {
    colorPicker,databind
  },
  props: ["data","dataschema"],
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
    itemtype(){
      return this.data.itemtype;
    }
  },
  methods: {
    databindselect(data){
        this.data.databind={id:data.id,text:data.text};
    }
  },
  watch:{
    itemtype(v){
      var type=parseInt(v);
      if((type==2||type==3)&&this.data.value.indexOf("#")<0&&this.data.value.indexOf("&")<0){
        this.data.value='第#页，总共&页';
      }
    }
  }
}
</script>
<style lang='less'>

</style>
