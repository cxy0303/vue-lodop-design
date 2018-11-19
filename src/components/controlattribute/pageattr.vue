<template>
<div class="attr" v-bar='{scrollThrottle: 30}'>
  <div class="container-fluid">
    <p class='title'>
      页面设置
    </p>
    <div class="form-group">
      <label class="control-label">纸张类型</label>
      <select class="form-control" v-model='pageinfo.pagetype'>
            <option value='A4'>
              A4
            </option>
        </select>
    </div>
    <!-- <div class="form-group">
      <label class="control-label">宽</label>
      <input type='number' class="form-control" v-model='pageinfo.width' />
    </div>
    <div class="form-group">
      <label class="control-label">高</label>
      <input type='number' class="form-control" v-model='pageinfo.height' />
    </div> -->
    <div class="form-group tcenter">
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default" :class="{'btn-info':pageinfo.intOrient==1}" @click='pageinfo.intOrient=1'>纵向打印</button>
        <button type="button" class="btn btn-default" :class="{'btn-info':pageinfo.intOrient==2}" @click='pageinfo.intOrient=2'>横向打印</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ["pageinfo"]
}
</script>
