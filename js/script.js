$(document).ready(function () {
	if (!OCA.Files) return;

	var appid = 'openwebdavfolder';

	var icon = 'app';

	var $openFolder = $('<a/>')
		.attr('id', 'openwebdavfolder').attr('title', 'Open folder in file explorer')
		.append($('<img/>').attr('alt', t(appid, 'Open folder')).attr('src', OC.imagePath(appid, icon)))
		.addClass('button')
		.on('click', openFolder)
		.appendTo('#controls .creatable');

	OCA.Files.fileActions.registerAction({
		name: 'open-webdavfile',
		displayName: '',
		altText: 'Open file in associated app',
		mime: 'all',
		permissions: OC.PERMISSION_READ,
		icon: OC.imagePath(appid, icon + '.svg'),
		type: OCA.Files.FileActions.TYPE_INLINE,
		actionHandler: openFile
	});

	function getBaseUrl () {
		if (getOSName() === 'Linux') {
			return (location.protocol === 'https:' ? 'davs' : 'dav') + ':' + '//' + location.hostname + (location.port.length ? ':' + location.port : '') + '/remote.php/webdav';
		}
		return 'openwebdav://' + location.hostname + (location.protocol === 'https:' ? '@SSL' : '') + (location.port.length ? '@' + location.port : '') + '/DavWWWRoot/remote.php/webdav';
	}

	function openFolder () {
		open(getBaseUrl() + FileList._currentDirectory);
	}

	function openFile (file, context) {
		var lastChar = FileList._currentDirectory.substr(-1);
		open(getBaseUrl() + FileList._currentDirectory + (lastChar !== '/' ? '/' : '') + context.fileInfoModel.attributes.name);
	}

	function open (url) {
		console.log(url);
		window.open(url, '_self');
	}

	function getOSName () {
		var OSName = "Unknown";
		if (window.navigator.userAgent.indexOf("Windows NT 10.0") !== -1) OSName = "Windows 10";
		if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) OSName = "Windows 8";
		if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) OSName = "Windows 7";
		if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1) OSName = "Windows Vista";
		if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1) OSName = "Windows XP";
		if (window.navigator.userAgent.indexOf("Windows NT 5.0") !== -1) OSName = "Windows 2000";
		if (window.navigator.userAgent.indexOf("Mac") !== -1) OSName = "Mac/iOS";
		if (window.navigator.userAgent.indexOf("X11") !== -1) OSName = "UNIX";
		if (window.navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";
		return OSName;
	}

});
