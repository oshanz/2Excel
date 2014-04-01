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
	var ele = document.getElementById(table_id);
	if (ele.nodeName == "TABLE") {
		var a = document.createElement('a');
		a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(ele.outerHTML);
		a.setAttribute('download', strFileName + '_' + new Date().toLocaleString() + '.xlsx');
		a.click();
	} else {
		alert('Not a table');
	}
}

/**
 *
 * @param {String} table_id
 * @param {String} strFileName
 */
function cExportExcel(table_id, strFileName) {
	var ele = document.getElementById(table_id);
	if (ele.nodeName == "TABLE") {
		var div_inner = ['<div id="selection_list"><table border="1" width="100%"><thead><tr><th><input type="button" onclick="$(' + "'#selection_list input:checkbox'" + ').prop(' + "'checked'" + ', true);" value="Select All"/></th><th>Column Name</th></tr></thead><tbody>'];
		$.each(ele.rows[0].cells, function(index, v) {
			div_inner.push('<tr>');
			div_inner.push('<td align="center"><input name="selection_column" type="checkbox" value="' + index + '")/></td>');
			div_inner.push('<td align="center">' + v.innerHTML.trim() + '</td>');
			div_inner.push('</tr>');
		});
		div_inner.push('</tbody><lable>File Name : </lable><input value="' + strFileName + '" id="strFileName" type="text" placeholder="File Name"/><button onclick="cExport(' + "'" + table_id + "'" + ')">Save</button></div>');
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

/**
 *dont use this function
 */
function cExport(table_id) {
	var all = [];
	$.each(tbl.rows[0].cells, function(index, v) {
		all.push(index);
	});
	var select = [];
	$("#selection_list input[name=selection_column]:checked").each(function(index, v) {
		select.push(parseInt(v.value));
	});
	rExportExcel(table_id, $('#strFileName').val() || 'gs_report', $(all).not(select).get());
	$.colorbox.remove();
}

/**
 *
 * @param {String} table_id
 * @param {String} strFileName
 * @param {Array} rc_array ,table column index to remove ex:- [0,3]
 */
function rExportExcel(table_id, strFileName, rc_array) {
	if (document.getElementById(table_id).nodeName == "TABLE") {
		var dom = $('#' + table_id).clone().get(0);
		for (var i = 0; i < rc_array.length; i++) {
			dom.tHead.rows[0].deleteCell((rc_array[i] - i));
			for (var j = 0; j < dom.tBodies[0].rows.length; j++) {
				dom.tBodies[0].rows[j].deleteCell((rc_array[i] - i));
			}
		}
		strExportExcel(dom.outerHTML, strFileName);
	} else {
		alert('Not a table');
	}
}

/**
 *
 */
function strExportExcel(strTable, strFileName) {
	var a = document.createElement('a');
	a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(strTable);
	a.setAttribute('download', strFileName + '_' + new Date().toLocaleString() + '.xlsx');
	a.click();
}