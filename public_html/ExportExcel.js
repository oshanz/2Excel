/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */

//MimeTypes
//MS OFFICE 2003  : data:application/vnd.ms-excel
//MS OFFICE 2007  : data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

/**
 * 
 * @param {String} table id
 * @param {String} strFileName
 * @returns {Boolean}
 */
function ExportExcel(table, strFileName) {
    var ele = document.getElementById(table);
    if (ele.nodeType === 1) {
        var a = document.createElement('a');
        a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(ele.outerHTML);
        a.setAttribute('download', strFileName + '_' + new Date().toLocaleString() + '.xlsx');
        a.click();
        return true;
    } else {
        alert('Not a table');
        return false;
    }
}

function getHeaders() {
    var div_out = document.createElement('div');
    div_out.setAttribute('hidden', 'true');
    var div = document.createElement('div');
    div.setAttribute('id', 'strFileName');
    var ol = document.createElement('ol');
    ol.setAttribute('id', 'selectable');
    var li;
    $.each(document.getElementById('tblId').rows[0].cells, function(index, v) {
        li = document.createElement('li');
        li.innerHTML = v.innerHTML.trim();
        ol.appendChild(li);
    });
    div.appendChild(ol);
    div_out.appendChild(div);
    document.body.appendChild(div_out);
    $('.inline').colorbox({inline: true, width: "50%"});

//    $("#selectable").sortable();
}