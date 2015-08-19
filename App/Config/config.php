<?php

date_default_timezone_set('America/Bogota');

$url = ( empty($_SERVER['HTTP_HOST']) ) ? '' : 'http://' . $_SERVER['HTTP_HOST'] . '/' ;

define('URL_RAIZ', $url);
define('ROOT_DOMAIN', 'http://www.qh.local/');
define('PATH_APP', 'C:/wamp/www/sicex/App/');
define('PATH_REPORTS', PATH_APP . 'Reports/');


define("MAXREGEXCEL", 65000);
define('SPHINX_SERVER_DETAIL', '172.16.1.233');