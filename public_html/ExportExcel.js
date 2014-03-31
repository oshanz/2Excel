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
function ExportExcel(table_id, strFileName) {
	var ele = document.getElementById(table_id);
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

function cExport(table_id) {
	var ele = document.getElementById(table_id);
	if (ele.nodeType === 1) {
		var div_inner = ['<div id="strFileName"><table border="1" width="100%"><thead><tr><th><input type="button" onclick="$(' + "'#strFileName input:checkbox'" + ').prop(' + "'checked'" + ', true);" value="Select All"/></th><th>Column</th></tr></thead><tbody>'];
		$.each(ele.rows[0].cells, function(index, v) {
			div_inner.push('<tr>');
			div_inner.push('<td align="center"><input name="type" type="checkbox" value="' + index + '")/></td>');
			div_inner.push('<td align="center">' + v.innerHTML.trim() + '</td>');
			div_inner.push('</tr>');
		});
		div_inner.push('</tbody><button onclick="cExportExcel()">Save</button></div>');
		$.colorbox({
			html : div_inner.join(''),
			width : "50%"
		});
	} else {
		alert('Not a table');
	}
}

function cExportExcel() {
	var table_id = 'tblId';
	var all = [];
	$.each(document.getElementById(table_id).rows[0].cells, function(index, v) {
		all.push(index);
	});
	var select = [];
	$.each($.find("#strFileName input[name=type]:checked"), function(index, v) {
		select.push(parseInt(v.value));
	});
	var rem = $(all).not(select).get();
	var htmlData = $('#'+table_id).clone();
	var l = rem.length;
	for (var i = 0; i < l; i++) {
		htmlData.find("tr th:eq(" + (rem[i] - i) + "),tr td:eq(" + (rem[i] - i) + ")").remove().end().html();
	}
	var a = document.createElement('a');
	a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent('<table>' + htmlData.html() + '</table>');
	a.setAttribute('download', 'strFileName' + '_' + new Date().toLocaleString() + '.xlsx');
	a.click();
}