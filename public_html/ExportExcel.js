/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */

//MimeTypes
//MS OFFICE 2003  : data:application/vnd.ms-excel
//MS OFFICE 2007  : data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

function ExportExcel(table, strFileName) {
    if (!table.nodeType) {
        var strData = encodeURIComponent(document.getElementById(table).outerHTML);
        var strMimeType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        a = document.createElement('a');
        a.href = strMimeType + ',' + strData;
        if ('download' in a) { //html5 A[download]
            a.setAttribute('download', strFileName + '.xlsx');
        }
        a.innerHTML = 'Processing...';
        document.body.appendChild(a);
        setTimeout(function() {
            a.click();
            document.body.removeChild(a);
        }, 1000);
        return true;
    } else {
        alert('Not a table');
        return false;
    }
}
