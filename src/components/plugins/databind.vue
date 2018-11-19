<template>
<div class="form-group databind">
  <label class="control-label">{{title}}</label>
  <div class="input-group">
    <input type="text" :value='value.text' class="form-control" disabled placeholder="点击右边按钮选择绑定字段">
    <div class="input-group-btn" @click="$modal.show(modalname)">
      <button type="button" class="btn btn-info" aria-label="Bold"><span class="glyphicon glyphicon-link"></span></button>
    </div>
  </div>
  <modal :name='modalname' width='50%' height='500' @opened="modalOpened">
    <div class="modalheader">
      {{title}}
      <button type="button" class="close" style="float:right; background:none;" @click='$modal.hide(modalname)'><span aria-hidden="true">&times;</span></button>
    </div>
    <div id='datafields' class="datafields">

    </div>
  </modal>
</div>
</template>
<script>
export default {
  props: ["dataschema", 'modalname', "title","value"],
  data(){
    return {

    }
  },
  methods: {
    modalOpened(event) {
      var vue = this;
      var func=function(node){
        if(node.nodes!=undefined&&node.nodes.length!=undefined){
          for(var i=0;i<node.nodes.length;i++){
            var cnode =node.nodes[i];
            cnode["state"]={selected:false};
            cnode["level"]=node.level+"."+cnode.id;
            if(cnode.id==vue.value.id){
              cnode["state"]={selected:true};
            }
            func(cnode);
          }
        }
      }

      for(var i=0;i<this.dataschema.length;i++){
        var node =this.dataschema[i];
        node["state"]={selected:false};
        node['level']=node.id;
        if(node.id==vue.value.id){
          node["state"]={selected:true};
        }
        func(node);
      }

      var treeobj = $("#datafields").treeview({
        data: this.dataschema,
        selectedIcon: 'glyphicon glyphicon-ok',
        onNodeSelected: function(event, data) {

          var temp={};
          for(var key in data){
            temp[key]=data[key];
          }
          vue.$emit('nodeselect',temp);
          vue.$modal.hide(vue.modalname);
        }
      });
    }
  }
}
</script>
<style lang='less'>
.modalheader {
    background-color: #EEEEEE;
    padding: 10px;
    color: #5bc0de;
    position: absolute;top:0px;left:0px;width:100%;
}
.databind{
.v--modal-overlay .v--modal-box{padding-top: 40px !important;}
}
.datafields{width:100%;height: 100%;overflow: auto;}
</style>
