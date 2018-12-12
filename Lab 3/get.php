<?php
 
header("Content-type: text/plain; charset=windows-1251");
header("Cache-Control: no-store, no-cache, must-revalidate");
$tmp = file_get_contents('prev.txt');
echo $tmp;
?>