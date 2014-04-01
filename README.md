2Excel
======

Customize HTML table dynamically and Export as Excel.

![ScreenShot](https://raw.githubusercontent.com/oshanz/2Excel/master/pic.jpg)

***Examples***   
ExportExcel.js need jquery + jquery ui

*Methods*

1. To export complete table  
function ExportExcel(table_id, strFileName);

2. Export without selected columns (buttons...)		ex :- rc_array=[0,3]       
function rExportExcel(table_id, strFileName, rc_array)

3. Export as user want		import colorbox.css with /images + jquery.colorbo-min.js      
function cExportExcel(table_id, strFileName)