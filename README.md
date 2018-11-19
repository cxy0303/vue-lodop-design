# reportdesign

>基于lodop的vue简单打印设计工具

![image](https://github.com/cxy0303/vue-lodop-design/blob/master/help/1.png?raw=true)

一个很简单的设计工具，打印控件为lodop:http://www.lodop.net/

工具使用教程：
# 教程
一.传入的数据结构，用于绑定字段
树形结构，节点字段
{
  id:'', ---字段编号
  text:'',---字段名称
  nodes:'',---子节点
  cols:''----绑定表格时，没列的字段从这里选择
}
二.报表设计
  控件，目前只有很简单的几个，特别说明下table：先给table主题绑定一个包含cols的字段后，列绑定时才可以选择并绑定cols中的字段

三.打印
  设计完后会有设计的数据结构，然后在需要打印的页面引入PrintToLodop.js
  
  var PrintToLodop=new PrintToLodop(templatedata,data,pagesetting)
  PrintToLodop.print()
  templatedata:设计的数据模板结构
  data:打印数据，按照模板中的字段组合json数据即可，可以自己添加控件后打印预览，有测试数据，具体可以看代码index.vue
  pagesetting:lodop相关打印配置
  
## 主要公司内部用用，适合二次开发对接，直接用肯定不行，可能有bug，毕竟只是点到为止，公司应急用用哈哈
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
