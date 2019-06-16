<?php
$eventDispatcher = \OC::$server->getEventDispatcher();
if(\OC_User::isLoggedIn()) {
	$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function() {
		OCP\Util::addScript('openwebdavfolder', 'script');
		OCP\Util::addStyle('openwebdavfolder', 'style');
	});
}
