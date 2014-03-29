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
    if (!table.nodeType) {
        var a = document.createElement('a');
        a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(document.getElementById(table).outerHTML);
        a.setAttribute('download', strFileName + '_' + new Date().toLocaleString() + '.xlsx');
        a.click();
        return true;
    } else {
        alert('Not a table');
        return false;
    }
}

function getHeaders() {
    var columns = ['<div>', '<ol id="selectable">'];
    $.each(document.getElementById('tblId').rows[0].cells, function(index, v) {
        columns.push('<li>' + v.innerHTML.trim() + '</li>')
    });
    columns.push('</ol>');
    $.colorbox({html:columns.join('')});
}