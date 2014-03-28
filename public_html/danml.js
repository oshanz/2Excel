/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function download(strData, strFileName) {

}

function ExportExcel(table) {
    if (!table.nodeType) {
        var strData = document.getElementById(table).outerHTML;
        var strFileName = "ftable.xls";
        var D = document, a = D.createElement("a");
        var strMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        if ('download' in a) { //html5 A[download]
            a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
            a.setAttribute("download", strFileName);
            a.innerHTML = "downloading...";
            D.body.appendChild(a);
            setTimeout(function() {
                a.click();
                D.body.removeChild(a);
            }, 66);
            return true;
        } /* end if('download' in a) */

        setTimeout(function() {
            D.body.removeChild(f);
        }, 333);
        return true;
    } else {
        alert('Not a table');
        return false;
    }
}