/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */

//MimeTypes
//MS OFFICE 2003  : data:application/vnd.ms-excel
//MS OFFICE 2007  : data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

/**
 *
 * @param {String} table_id
 * @param {String} strFileName
 */
function ExportExcel(table_id, strFileName) {
	if ($('#' + table_id).is('table')) {
		var a = document.createElement('a');
		a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(document.getElementById(table_id).outerHTML);
		a.setAttribute('download', strFileName + '_' + new Date().toLocaleString() + '.xlsx');
		a.click();
	} else {
		alert('Not a table');
	}
}

function cExport(table_id, strFileName) {
	if ($('#' + table_id).is('table')) {
		var div_inner = ['<div id="selection_list"><table border="1" width="100%"><thead><tr><th><input type="button" onclick="$(' + "'#selection_list input:checkbox'" + ').prop(' + "'checked'" + ', true);" value="Select All"/></th><th>Column Name</th></tr></thead><tbody>'];
		$.each(document.getElementById(table_id).rows[0].cells, function(index, v) {
			div_inner.push('<tr>');
			div_inner.push('<td align="center"><input name="type" type="checkbox" value="' + index + '")/></td>');
			div_inner.push('<td align="center">' + v.innerHTML.trim() + '</td>');
			div_inner.push('</tr>');
		});
		div_inner.push('</tbody><button onclick="cExportExcel()">Save</button><input id="strFileName" type="text" placeholder="File Name"/></div>');
		$.colorbox({
			html : div_inner.join(''),
			width : "50%",
			opacity : 0.50,
			title : "Select Columns to Save"
		});
	} else {
		alert('Not a table');
	}
}

function cExportExcel() {
	var table_id = 'tblId';
	var fileName = $('#strFileName').val() || 'gs_report';
	console.log(fileName);
	return;
	var all = [];
	$.each(document.getElementById(table_id).rows[0].cells, function(index, v) {
		all.push(index);
	});
	var select = [];
	$.each($.find("#selection_list input[name=type]:checked"), function(index, v) {
		select.push(parseInt(v.value));
	});
	var rem = $(all).not(select).get();
	var htmlData = $('#' + table_id).clone();
	for (var i = 0; i < rem.length; i++) {
		htmlData.find("tr th:eq(" + (rem[i] - i) + "),tr td:eq(" + (rem[i] - i) + ")").remove().end().html();
	}
	var a = document.createElement('a');
	a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent('<table>' + htmlData.html() + '</table>');
	a.setAttribute('download', fileName + '_' + new Date().toLocaleString() + '.xlsx');
	a.click();
	$.colorbox.remove();
}