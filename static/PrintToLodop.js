var PrintToLodop = function(templdatedata, data, pagesetting) {
  this.templdatedata = templdatedata;
  this.data = data;
  this.pagesetting = pagesetting;
  this._databinds = null;
  try {
    var LODOP = getLodop();
    if (LODOP.VERSION) {
      if (LODOP.CVERSION) {
        this.LODOP = getCLodop();
        this.load = true;
      }
    }
  } catch (err) {
    this.load = false;
    this.msg = '请安装打印控件,若已安装请运行！';
  }
}
PrintToLodop.prototype = {
  get databinds() {
    if (this._databinds == null) {
      if (this.templdatedata) {
        this._databinds = {};
        for (var i = 0; i < this.templdatedata.length; i++) {
          var control = this.templdatedata[i];
          var bindid = control.data.databind.id;
          if ("atable" == control.type) {
            if (!this._databinds[bindid])
              this._databinds[bindid] = [];
            for (var j = 0; j < control.data.thead.rows.length; j++) {
              var row = control.data.thead.rows[j];
              for (var k = 0; k < row.cells.length; k++) {
                var cell = row.cells[k];
                if (cell['databind'] && cell['databind']['id']) {
                  var cbindid = cell['databind']['id'];
                  if(this._databinds[bindid].indexOf(cbindid)<0)
                    this._databinds[bindid].push(cbindid);
                }
              }
            }
            for (var j = 0; j < control.data.tbody.rows.length; j++) {
              var row = control.data.tbody.rows[j];
              for (var k = 0; k < row.cells.length; k++) {
                var cell = row.cells[k];
                if (cell['databind'] && cell['databind']['id']) {
                  var cbindid = cell['databind']['id'];
                  if(this._databinds[bindid].indexOf(cbindid)<0)
                  this._databinds[bindid].push(cbindid);
                }
              }
            }
          } else if ("atext" == control.type) {
            this._databinds[bindid] = "";
          } else if ("achart" == control.type) {
            if (!this._databinds[bindid])
              this._databinds[bindid] = [];
              for(var j=0;j<control.data.xdata.length;j++){
                var item=control.data.xdata[j];
                var cbindid=item.id;
                if(item.show&&this._databinds[bindid].indexOf(cbindid)<0){
                    this._databinds[bindid].push(cbindid);
                }
              }
          } else if ("aimage" == control.type) {
            this._databinds[bindid] = "";
          }
        }
      } else {
        this._databinds = {};
      }
    }
    return this._databinds;
  }
}
PrintToLodop.prototype.g_text = function(control) {
  var LODOP = this.LODOP;
  var tdata = control.data;
  var content = tdata.value;
  var databind = control.data.databind.id.split('.');
  var data;
  for (var i = 0; i < databind.length; i++) {
    if (this.data[databind[i]])
      data = this.data[databind[i]];
  }
  if (data && data != '') {
    content = data;
  }
  LODOP.ADD_PRINT_TEXT(tdata.y + "px", tdata.x + "px", tdata.width + "px", tdata.height + "px", content);
  LODOP.SET_PRINT_STYLEA(0, "ItemType", tdata.itemtype);
  for (var key in tdata.style) {
    switch (key) {
      case "color":
        LODOP.SET_PRINT_STYLEA(0, "FontColor", tdata.style[key]);
        break;
      case "fontFamily":
        LODOP.SET_PRINT_STYLEA(0, "FontName", tdata.style[key]);
        break;
      case "fontSize":
        LODOP.SET_PRINT_STYLEA(0, "FontSize", parseInt(tdata.style[key]) * 0.75);
        break;
      case "fontSpacing":
        LODOP.SET_PRINT_STYLEA(0, "letterSpacing", parseInt(tdata.style[key]));
        break;
      case "fontWeight":
        LODOP.SET_PRINT_STYLEA(0, "Bold", tdata.style[key] == "normal" ? 0 : 1);
        break;
      case "fontStyle":
        LODOP.SET_PRINT_STYLEA(0, "Italic", tdata.style[key] == "normal" ? 0 : 1);
        break;
      case "textAlign":
        {
          var v = tdata.style[key];
          var pv = 1;
          if (v == "left")
            pv = 1;
          else if (v == "center")
            pv = 2;
          else if (v == "right")
            pv = 3;
          LODOP.SET_PRINT_STYLEA(0, "Alignment", pv);
          break
        };
      case "borderType":
        LODOP.SET_PRINT_STYLEA(0, "TextFrame", tdata.style[key]);
        break;
      case "VOrient":
        LODOP.SET_PRINT_STYLEA(0, "VOrient", tdata.style[key]);
        break;
      case "HOrient":
        LODOP.SET_PRINT_STYLEA(0, "HOrient", tdata.style[key]);
        break;
      default:

    }
  }
}
PrintToLodop.prototype.g_table = function(control) {
  var LODOP = this.LODOP;
  var tableschema = control.data;
  var tabledata;
  var tablebind = tableschema.databind.id.split('.');
  for (var i = 0; i < tablebind.length; i++) {
    if (this.data[tablebind[i]])
      tabledata = this.data[tablebind[i]];
  }
  var table = document.createElement("table");
  if (tableschema.style.borderType > 0) {
    table.border = 1;
  }
  if (tableschema.style.borderType == 2)
    table.style.borderCollapse = 'collapse';

  for (var i = 0; i < tableschema.thead.rows.length; i++) {
    var row = tableschema.thead.rows[i];
    if (row["unprint"])
      continue;
    var tr = table.insertRow();
    for (var j = 0; j < row.cells.length; j++) {
      var cell = row.cells[j];
      var td = tr.insertCell();
      td.innerHTML = cell.value;
      td.style.width = cell.width + "px";
      td.style.height = cell.height + "px";
      for (var key in cell.style) {
        td.style[key] = cell.style[key];
      }
    }
  }

  if (table && tabledata.length) {
    for (var i = 0; i < tabledata.length; i++) {
      var ditem = tabledata[i];
      for (var j = 0; j < tableschema.tbody.rows.length; j++) {
        var row = tableschema.tbody.rows[j];
        if (row["unprint"])
          continue;
        var tr = table.insertRow();
        for (var k = 0; k < row.cells.length; k++) {
          var cell = row.cells[k];
          var td = tr.insertCell();
          td.innerHTML = cell.value;
          td.style.width = cell.width + "px";
          td.style.height = cell.height + "px";
          for (var key in cell.style) {
            td.style[key] = cell.style[key];
          }
          if (cell.databind && cell.databind.id && cell.databind.id != "") {
            td.innerHTML = ditem[cell.databind.id];
          }
        }
      }
    }
  }
  var tablehtml = table.outerHTML;
  LODOP.ADD_PRINT_TABLE(tableschema.y + "px", tableschema.x + "px", tableschema.width + "px", tableschema.height + "px", tablehtml);
  LODOP.SET_PRINT_STYLEA(0, "ItemType", 4);
}
PrintToLodop.prototype.g_chart = function(control) {
  var LODOP = this.LODOP;
  var tableschema = [];
  var tablebind = control.data.databind.id.split('.');
  var tabledata;
  for (var i = 0; i < tablebind.length; i++) {
    if (this.data[tablebind[i]])
      tabledata = this.data[tablebind[i]];
  }

  for (var i = 0; i < control.data.xdata.length; i++) {
    var item = control.data.xdata[i];
    if (item.group) {
      tableschema.splice(0, 0, item);
    } else
      tableschema.push(item);
  }
  var table = document.createElement("table");

  var titletr = table.insertRow();
  for (var i = 0; i < tableschema.length; i++) {
    var item = tableschema[i];
    var cell = titletr.insertCell();
    cell.innerHTML = item.text;
  }
  for (var i = 0; i < tabledata.length; i++) {
    var rowdata = tabledata[i];
    var tr = table.insertRow();
    for (var j = 0; j < tableschema.length; j++) {
      var item = tableschema[j];
      var cell = tr.insertCell();
      cell.innerHTML = rowdata[item.id];
    }
  }
  var tablehtml = table.outerHTML;
  LODOP.ADD_PRINT_CHART(control.data.y + "px", control.data.x + "px", control.data.width + "px", control.data.height + "px", control.data.charttype, tablehtml);
  LODOP.SET_PRINT_STYLEA(0, "ChartStyle", control.data.printstyle.join(''));
  // LODOP.SET_PRINT_STYLEA(0,"ChartLeftTitle","ChartLeftTitle");
  // LODOP.SET_PRINT_STYLEA(0,"ChartRightTitle","ChartRightTitle");
  // LODOP.SET_PRINT_STYLEA(0,"ChartBottomTitle","ChartBottomTitle");
  // LODOP.SET_PRINT_STYLEA(0,"ChartTopTitle","ChartTopTitle");
  LODOP.SET_PRINT_STYLEA(0, "ChartTitle", control.data.charttitle);
  LODOP.SET_PRINT_STYLEA(0, "ChartFoot", control.data.chartfoot);
}
PrintToLodop.prototype.g_image = function(control) {
  var LODOP = this.LODOP;
  var databind = control.data.databind.id.split('.');
  var data;
  for (var i = 0; i < databind.length; i++) {
    if (this.data[databind[i]])
      data = this.data[databind[i]];
  }

  var imgdata;
  var imgtype;
  if (control.data.databind.id && control.data.databind.id != '') {
    imgtype = control.data.databindtype;
    imgdata = data;
  } else {
    imgtype = control.data.style.defaultimgtype;
    imgdata = control.data.style.defaultimg;
  }
  if (imgtype == 1) {
    imgdata = "URL:" + imgdata;
  }
  LODOP.ADD_PRINT_IMAGE(control.data.y, control.data.x, control.data.width, control.data.height, imgdata);
  LODOP.SET_PRINT_STYLEA(0, "ItemType", control.data.itemtype);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", control.data.style.backgroundSize);
}
PrintToLodop.prototype.print = function() {
  if (!this.load) {
    alert(this.msg);
    return;
  }
  this.LODOP.PRINT_INIT("sunagy报表设计");
  if (this.pagesetting) {
    this.LODOP.SET_PRINT_PAGESIZE(this.pagesetting.intOrient, this.pagesetting.width, this.pagesetting.height, this.pagesetting.pagetype);
  }
  for (var i = 0; i < this.templdatedata.length; i++) {
    var control = this.templdatedata[i];
    var data = control.data;
    if ("atext" == control.type) {
      this.g_text.call(this, control);
    } else if ("atable" == control.type) {
      this.g_table.call(this, control);
    } else if ("achart" == control.type) {
      this.g_chart.call(this, control);
    } else if ("aimage" == control.type) {
      this.g_image.call(this, control);
    }
  }
  LODOP.PREVIEW();
}
