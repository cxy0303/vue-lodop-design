<template>
<div class="body">
  <div class="top">
    <a @click='addtext'><span class='glyphicon glyphicon-text-width'></span>普通文本</a>
    <a @click='addtable'><span class='glyphicon glyphicon-th'></span>表格</a>
    <a @click='addchart'><span class="glyphicon glyphicon-stats"></span>图表</a>
    <a @click='addimage'><span class="glyphicon glyphicon-picture"></span>图片</a>
    <a @click='remove' class="remove" v-show='selectindex!=null'><span class='glyphicon glyphicon-remove'></span>删除</a>
    <a @click='save' class="save"><span class='glyphicon glyphicon-save'></span> 保存 </a>
    <div class="rightbar">
      <a @click='showsourcecode=!showsourcecode' :class='{active:showsourcecode}'><span class='glyphicon glyphicon-info-sign'></span></a>
      <a @click='selectindex=null' class="preview"><span class='glyphicon glyphicon-cog'></span>页面设置</a>
      <a @click='preview'><span class='glyphicon glyphicon-print'></span>打印预览</a>
    </div>
  </div>
  <div class="content">
    <div class="left">
      <p class='title'>
        数据结构
      </p>
      <div style="height:100%;" v-bar>
        <div style="height:100%;">
          <div id='treedata'>

          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="scroll" v-bar v-if='!showsourcecode'>
        <div style="padding:20px;" ref='scroll'>
          <div id='page' class="page" :style='{width:page.width+"px",height:page.height+"px"}'>
            <component :id='item.id' :is='item.type' v-for='(item,index) in controls' :index='index' :key='item.id' :active='selectindex==index' :data='item.data' :pageinfo='page' @selected='selected' @onactived='onactived'>
            </component>
          </div>
        </div>
      </div>
      <editor v-model='sourcecode'></editor>
    </div>
    <div class="right">
      <component :is='attr' :data='selectdata' :selecteddata='selecteddata' :dataschema='dataschema' :pageinfo='page'></component>
    </div>
  </div>
  <v-dialog/>
</div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import aimage from './control/image.vue'
import achart from './control/chart.vue'
import atext from './control/text.vue'
import atable from './control/table.vue'
import atext_attr from './controlattribute/attr.vue'
import atable_attr from './controlattribute/tableattr.vue'
import achart_attr from './controlattribute/chartattr.vue'
import aimage_attr from './controlattribute/imageattr.vue'
import page_attr from './controlattribute/pageattr.vue'
import editor from '@/components/plugins/editor'
export default {
  components: {
    atext,
    atable,
    achart,
    aimage,
    atext_attr,
    atable_attr,
    achart_attr,
    aimage_attr,
    page_attr,
    editor
  },
  data() {
    return {
      tables: [],
      selectindex: null,
      page: {
        width: 760,
        height: 1003,
        pagetype: 'A4',
        intOrient: 1
      },
      controls: [],
      selecteddata: {},
      dataschema: [],
      data: {},
      showsourcecode: false
    }
  },
  computed: {
    selectdata() {
      if (this.selectindex == null)
        return {};
      else {
        return this.controls[this.selectindex].data;
      }
    },
    attr() {
      if (this.selectindex == null)
        return 'page_attr';
      return this.controls[this.selectindex].type + "_attr";
    },
    sourcecode: {
      get() {
        var json=JSON.stringify(this.dataschema,null,'\t');
        return json;
      },
      set(v) {
        this.data = v;
      }
    }
  },
  methods: {
    save() {
      if (sunagyreport)
        sunagyreport.save.call(this, JSON.stringify(this.controls));
    },
    getid(pre) {
      return pre + new Date().getMilliseconds() + Math.random() * 100;
    },
    addtext() {
      this.controls.push({
        id: this.getid("atext"),
        type: 'atext',
        data: {
          value: '普通文本',
          width: 150,
          height: 32,
          x: 10,
          y: 10,
          itemtype: 0,
          databind: {
            id: '',
            text: ''
          },
          style: {
            color: '#000',
            fontFamily: '宋体',
            fontSize: '12px',
            fontSpacing: 0,
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            border: '',
            borderType: 0,
            HOrient: 0,
            VOrient: 0
          }
        }
      });
      this.selectindex = this.controls.length - 1;
    },
    addtable() {
      this.controls.push({
        id: this.getid('atable'),
        type: 'atable',
        data: {
          thead: {
            rows: [{
              cells: [{
                  width: 100,
                  height: 28,
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
                },
                {
                  width: 100,
                  height: 28,
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
                },
                {
                  width: 100,
                  height: 28,
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
              ]
            }]
          },
          tbody: {
            rows: [{
                cells: [{
                    width: 100,
                    height: 28,
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
                  },
                  {
                    width: 100,
                    height: 28,
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
                  },
                  {
                    width: 100,
                    height: 28,
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
                  }
                ]
              },
              {
                unprint: true,
                cells: [{
                    width: 100,
                    height: 28,
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
                  },
                  {
                    width: 100,
                    height: 28,
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
                  },
                  {
                    width: 100,
                    height: 28,
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
                  }
                ]
              }
            ]
          },
          x: 30,
          y: 30,
          width: 303,
          height: 84,
          itemtype: 0,
          databind: {
            id: '',
            text: ''
          },
          style: {
            color: '#000',
            boderType: 0,
            HOrient: 0,
            VOrient: 0
          }
        }
      });
      this.selecteddata = {
        blocktype: -1, //0:表头；1:数据
        type: -1, //-1:整张表;0:选择一行；1：选择一列;2:单元格选择
        row: -1,
        col: -1
      }
      this.selectindex = this.controls.length - 1;
    },
    addchart() {
      this.controls.push({
        id: this.getid('achart'),
        type: 'achart',
        data: {
          x: 30,
          y: 30,
          width: 300,
          height: 200,
          itemtype: 0,
          charttype: 0,
          charttitle: '',
          chartfoot: '',
          xdata: [],
          printstyle: ['-', '-', '-', '-', '-', '-', '-', '-', '1', '1', '0', '0', '0', '1', '0', '0', '3', '6', '1'],
          databind: {
            id: '',
            text: ''
          },
          style: {
            color: '#000',
            boderType: 0,
            HOrient: 0,
            VOrient: 0
          }
        }
      });
      this.selectindex = this.controls.length - 1;
    },
    addimage() {
      this.controls.push({
        id: this.getid('aimage'),
        type: 'aimage',
        data: {
          x: 30,
          y: 30,
          width: 300,
          height: 200,
          itemtype: 0,
          databindtype: 0,
          databind: {
            id: '',
            text: ''
          },
          style: {
            backgroundSize: 0,
            defaultimgtype: 0,
            defaultimg: '',
            HOrient: 0,
            VOrient: 0
          }
        }
      });
      this.selectindex = this.controls.length - 1;
    },
    remove() {
      if (this.selectindex != null) {
        this.controls.splice(this.selectindex, 1);
        this.selectindex = null;
      }
    },
    onactived(index) {
      this.selectindex = index;
    },
    preview() {
      var printobj = new PrintToLodop(this.controls, this.data, this.page);
      var test=printobj.databinds;
      printobj.print();
    },
    selected(selecteddata) {
      this.selecteddata = selecteddata;
    },
    createtestdata() {
      this.dataschema = [{
          id: 'OrderId',
          text: '订单编号'
        },
        {
          id: 'OrderAmount',
          text: '订单金额'
        },
        {
          id: 'OrderTime',
          text: '订单时间'
        },
        {
          id: 'OrderCreater',
          text: '订单创建者'
        },
        {
          id: 'OrderType',
          text: '订单类型'
        },
        {
          id: 'Image',
          text: '图片'
        },
        {
          id: 'OrderItems',
          text: '订单商品<div style="padding-left:14px;padding-top:5px;">【编号,名称，单价，数量】</div>',
          cols: [{
              id: 'ItemCode',
              text: '编号'
            },
            {
              id: 'ItemName',
              text: '名称'
            },
            {
              id: 'ItemAmount',
              text: '金额'
            },
            {
              id: 'ItemPrice',
              text: '单价'
            },
            {
              id: 'ItemQty',
              text: '数量'
            },
            {
              id: 'ItemUnit',
              text: '规格'
            }
          ]
        },
        {
          id: 'OrderReport',
          text: '订单报表',
          cols: [{
              id: 'OrderProductA',
              text: '产品A'
            },
            {
              id: 'OrderProductB',
              text: '产品B'
            },
            {
              id: 'OrderProductC',
              text: '产品C'
            },
            {
              id: 'OrderProductD',
              text: '产品D'
            },
            {
              id: 'OrderProductE',
              text: '产品E'
            },
            {
              id: 'OrderProductf',
              text: '产品F'
            },
            {
              id: 'OrderProductG',
              text: '产品G'
            },
            {
              id: 'OrderProductH',
              text: '产品H'
            },
            {
              id: 'OrderProductI',
              text: '产品I'
            },
            {
              id: 'OrderMonth',
              text: '月份'
            }
          ]
        },
        {
          id: 'OrderShip',
          text: '发货单',
          nodes: [{
              id: 'ShipCode',
              text: '发货单号'
            },
            {
              id: 'ShipTime',
              text: '发货日期'
            },
            {
              id: 'ShipItems',
              text: '发货商品',
              cols: [{
                  id: 'ItemId',
                  text: '编号'
                },
                {
                  id: 'ItemName',
                  text: '发货商品名称'
                },
                {
                  id: 'ItemAmount',
                  text: '金额'
                },
                {
                  id: 'ItemPrice',
                  text: '单价'
                },
                {
                  id: 'ItemQty',
                  text: '数量'
                },
                {
                  id: 'ItemUnit',
                  text: '规格'
                }
              ]
            }
          ]
        }
      ]
      this.data = {
        OrderCode: "AD234234234234",
        OrderTime: '2018-05-03',
        OrderCreater: "陈星宇",
        OrderAmount: '13000',
        Image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526981085800&di=e3705bf3e568a46c619c4eb0fba7bdb5&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F314e251f95cad1c85e377d83733e6709c83d5182.jpg',
        OrderItems: [{
          ItemCode: 'i0',
          ItemName: '电脑',
          ItemPrice: '5000',
          ItemQty: '1'
        }],
        OrderShip: {
          ShipCode: 'aaaaaa',
          ShipTime: '2018-05-02',
          ShipItems: [{
            ItemId: 's1',
            ItemName: 'item1',
            ItemPrice: '5000',
            ItemQty: 1,
            ItemUnit: '5000'
          }]
        },
        OrderReport: [{
            OrderProductA: '10',
            OrderProductB: '20',
            OrderProductC: '30',
            OrderProductD: '10',
            OrderProductE: '20',
            OrderProductF: '30',
            OrderProductG: '10',
            OrderProductH: '20',
            OrderProductI: '30',
            OrderMonth: '1月份'
          },
          {
            OrderProductA: '5000',
            OrderProductB: '20',
            OrderProductC: '40',
            OrderProductD: '50',
            OrderProductE: '20',
            OrderProductF: '40',
            OrderProductG: '50',
            OrderProductH: '20',
            OrderProductI: '40',
            OrderMonth: '2月份'
          }
        ]
      }

      for (var i = 0; i <= 100; i++) {
        this.data.OrderItems.push({
          ItemCode: 'i' + i,
          ItemName: '空调' + i,
          ItemPrice: 80 * i,
          ItemQty: i
        })
        this.data.OrderShip.ShipItems.push({
          ItemCode: 'si' + i,
          ItemName: '空调' + i,
          ItemPrice: 50 * i,
          ItemQty: i,
          ItemUnit: 50 * i
        });
      }
    }
  },
  mounted() {
    if (typeof sunagyreport != 'undefined') {
      sunagyreport.setschema.call(this);
      sunagyreport.load.call(this);
    } else {
      this.createtestdata();
    }
    this.$nextTick(function() {
      if (!this.showsourcecode) {
        this.page.width = document.getElementById('page').offsetWidth;
        this.page.height = document.getElementById('page').offsetHeight;
      }
      var treeobj = $("#treedata").treeview({
        data: this.dataschema,
        showTags: true
      });
    });
  },
  watch: {
    'page.intOrient' (v) {
      var temp = this.page.width;
      this.page.width = this.page.height;
      this.page.height = temp;
      this.$refs["scroll"].style.overflowX = 'auto';
      for (var i = 0; i < this.controls.length; i++) {
        var control = this.controls[i];
        var t_mep = control.data.x;
        control.data.x = control.data.y;
        control.data.y = t_mep;

        if (control.data.x + control.data.width > this.page.width) {
          control.data.x = this.page.width - control.data.width;
        }
        if (control.data.y + control.data.height > this.page.height) {
          control.data.y = this.page.height - control.data.height;
        }
      }
    }
  }
}
</script>
<style lang='less'>
.badge {
    width: auto;
    height: auto;
    border-radius: 0;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    border-radius: 10px;
}
.body {
    width: 100%;
    height: 100%;
    padding-top: 38px;
}
.top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 38px;
    border-bottom: 1px solid #EEEEEE;
    text-align: center;
    font-size: 0;
    a {
        position: relative;
        font-size: 13px;
        color: black;
        display: inline-block;
        height: 100%;
        line-height: 38px;
        vertical-align: middle;
        border: 1px solid #EEEEEE;
        padding: 0 10px;
        border-bottom: none;
        border-left: none;
        span {
            font-size: 130%;
            margin-right: 5px;
            position: relative;
        }
        &:first-child {
            border-left: 1px solid #EEEEEE;
        }
        &:hover {
            background-color: lighten(#EEEEEE, 5%);
        }
    }
    .remove {
        background-color: #CC0000;
        color: white;
        &:hover {
            background-color: lighten(#CC0000,5%);
        }
    }
    .rightbar {
        position: absolute;
        top: 0;
        height: 100%;
        right: 300px;
        border-left: 1px solid #EEEEEE;
    }
    .save {
        position: absolute;
        right: 0;
        background-color: #33CC00;
        color: white;
        &:hover {
            background-color: lighten(#33CC00, 5%);
        }
    }
}
.content {
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 300px;
    padding-right: 300px;
}
.left {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    padding: 38px 10px 10px;
    border-right: 1px solid #EEEEEE;
    .title {
        color: #6699FF;
        position: absolute;
        top: 10px;
        left: 10px;
        font-weight: bolder;
        border-left: 5px solid #6699FF;
        padding-left: 10px;
        margin-bottom: 20px;
    }
}
.right {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    border-left: 1px solid #EEEEEE;
}
.center {
    background-color: #EEEEEE;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
}
.scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.page {
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    // width: 210mm;
    // height: 297mm;
    position: relative;
    & > div {
        border: 1px dashed #DDDDDD;
    }
}
.datahiden {
    // display: none;
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
