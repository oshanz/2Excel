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
 * @param {String} File Name
 * @param {int} animation miliseconds
 * @returns {Boolean}
 */
function ExportExcel(table, strFileName, animation) {
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
        }, animation);
        return true;
    } else {
        alert('Not a table');
        return false;
    }
}
