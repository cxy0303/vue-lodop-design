<template>
<pre class="editor" ref='editor'>
</pre>
</template>
<script>
export default {
  model:{
    prop:"content",
    event:"sure"
  },
  props:["content"],
  data() {
    return {
      editor: null
    }
  },
  watch:{
    "content"(){
        this.editor.setValue(this.content);
    }
  },
  mounted() {
    if (this.editor == null) {
      this.editor = ace.edit(this.$refs.editor);
      this.editor.setTheme("ace/theme/chrome");
      this.editor.session.setMode("ace/mode/javascript");
      this.editor.setValue(this.content);
    }
  }
}
</script>

<style lang='less'>
.editor {
    width: 100%;
    height: 100%;
}
</style>
