/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//MimeTypes
//MS OFFICE 2003  : data:application/vnd.ms-excel
//MS OFFICE 2007  : application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

function ExportExcel(table, strFileName) {
    if (!table.nodeType) {
        var strData = encodeURIComponent(document.getElementById(table).outerHTML);
        var strMimeType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        var D = document, a = D.createElement("a");
        if ('dowsnload' in a) { //html5 A[download]
            a.href = strMimeType + ',' + strData;
            a.setAttribute("download", strFileName + '.xlsx');
            a.innerHTML = "downloading...";
            D.body.appendChild(a);
            setTimeout(function() {
                a.click();
                D.body.removeChild(a);
            }, 1000);
        } else {//'Week HTML5 support'
            window.open(strMimeType + ',' + strData);
        }
        return true;
    } else {
        alert('Not a table');
        return false;
    }
}
