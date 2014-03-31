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
	var div_inner = ['<div id="strFileName"><table border="1" width="100%"><thead><tr><th>', '<input type="button" onclick="$(' + "'#strFileName input:checkbox'" + ').prop(' + "'checked'" + ', true);" value="Select All"/>', '</th><th>Column</th></tr></thead><tbody>'];
	$.each(document.getElementById('tblId').rows[0].cells, function(index, v) {
		div_inner.push('<tr>');
		div_inner.push('<td align="center"><input name="type" type="checkbox" value="' + index + '")/></td>');
		div_inner.push('<td align="center">' + v.innerHTML.trim() + '</td>');
		div_inner.push('</tr>');
	});
	div_inner.push('</tbody><button onclick="count()">Next</button></div>');
	$.colorbox({
		html : div_inner.join(''),
		width : "50%"
	});
}

function count() {
	var div_sort_out = document.createElement('div');
	//    div_sort_out.setAttribute('hidden', 'true');
	div_sort_out.setAttribute('id', 'div_sort_out');
	var div_sort = ['<div><ul id="sortable">'];
	$.each($.find("input[name=type]:checked"), function(index, v) {
		div_sort.push('<li class="ui-state-default">' + v.value + '</li>');
	});
	div_sort.push('</ul><div>');
	div_sort_out.innerHTML = div_sort.join('');
	document.body.appendChild(div_sort_out);
	$("#sortable").sortable();
	$("#sortable").disableSelection();
}

function create() {
	var all = [];
	$.each(document.getElementById('tblId').rows[0].cells, function(index, v) {
		all.push(index);
	});
	var select = [];
	$.each($.find("#sortable li"), function(index, v) {
		select.push(parseInt(v.innerHTML.trim()));
	});
	var rem = $(all).not(select).get();
	var htmlData = $('#tblId').clone();
	var l = rem.length;
	for (var i = 0; i < l; i++) {
		htmlData.find("tr th:eq(" + (rem[i] - i) + "),tr td:eq(" + (rem[i] - i) + ")").remove().end().html();
	}
	window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent('<table>' + htmlData.html() + '</table>'));
}