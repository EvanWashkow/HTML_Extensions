<?php
	
	// A more powerful way to include PHP files. This supports '/directory/file.php' directives.
	function url_helper($path) {

		// If the include path begins with a '/', go to the web root to include the file.
		if (substr($path, 0, 1) === '/') {
			$path_to_root   = '';
			$parents = explode('/', $_SERVER['REQUEST_URI']);

			foreach ($parents as $parent) {
				if ($parent)
					$path_to_root = $path_to_root . '../';
			}
			$path = $path_to_root . substr($path, 1);
		}

		return $path;
	}
?>