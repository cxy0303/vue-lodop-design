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
        </select>
      </div>
      <div class="form-group">
        <label class="control-label">默认图片类型</label>
        <select class="form-control" v-model='data.style.defaultimgtype'>
            <option value=0>
              本地上传
            </option>
            <option value=1>
              http url
            </option>
        </select>
      </div>
      <div class="form-group">
        <label class="control-label">默认图片</label>
        <div v-if='data.style.defaultimgtype==0'>
          <a class="img-thumbnail" style="width:100%;height:180px;" :style='{backgroundImage:"url(\""+data.style.defaultimg+"\")"}'></a>
          <button type="button" class="btn btn-info btn-sm btn-block upload">
            <input type='file' @change='uploadimg($event)'/><span class="glyphicon glyphicon-upload"></span>
            上传本地图片
          </button>
        </div>
        <input type='text' class="form-control" v-model='data.style.defaultimg' v-if='data.style.defaultimgtype==1'/>
      </div>
      <div class="form-group">
        <label class="control-label">图片绑定类型</label>
        <select class="form-control" v-model='data.databindtype'>
            <option value=0>
              base64
            </option>
            <option value=1>
              http url
            </option>
        </select>
      </div>
      <databind :dataschema='dataschema' modalname='field' :value='data.databind' title='图片绑定' @nodeselect='databindselect'></databind>

      <div class="form-group">
        <label class="control-label">图片填充类型</label>
        <select class="form-control" v-model='data.style.backgroundSize'>
            <option value=0>
              截取图片
            </option>
            <option value=1>
              铺满
            </option>
            <option value=2>
              等比缩放
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
    </form>
  </div>

</div>
</template>
<script>
import databind from '../plugins/databind'
export default {
  components: {
    databind
  },
  props: ["data", 'dataschema'],
  methods: {
    databindselect(data){
        this.data.databind={id:data.id,text:data.text};
    },
    uploadimg(event) {
      var vue=this;
      var file = event.target.files[0];
      var reader = new FileReader();
        debugger
      reader.onloadend = function() {
        var dataURL = reader.result;
        vue.data.style.defaultimg = dataURL;
      };
      reader.readAsDataURL(file); // 读出 base64
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
    .upload{
      position: relative;
    }
    .img-thumbnail{
      background-size:contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    input[type='file'] {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}
</style>
