/**
 * @author Trisquel
 */


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
var value;
while(value = arr.pop()) { value + 1 }

//var tds = document.querySelectorAll('#firstTable tbody td');