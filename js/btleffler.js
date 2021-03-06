var trackClick = function (event) {
	"use strict";
	var $this = $(this),
		href = $this.attr("href"),
		target = $this.attr("target");

	var cb = function () {
		if (target !== "_blank" && event.which === 1)
			window.location = href;
	};

	event.preventDefault();

	if (target === "_blank" || event.which !== 1)
		window.open(href, "_blank");

	ga("send", "event", "outbound", "click", href, { "hitCallback": cb });
};

$(function() {
	"use strict";

	// Creating the console.
	var header = '\nvar btleffler = {\n' +
	 '\t"contact": {\n' +
	 '\t\t"email": "<a href="mailto:btleffler@gmail.com" title="email">btleffler@gmail.com</a>",\n' +
	 '\t\t"twitter": "<a href="https://twitter.com/bleff" title="twitter">@bleff</a>"\n' +
	 '\t},\n' +
	 '\t"Ajaxer": "<a href="http://btleffler.github.io/Ajaxer">http://btleffler.github.io/Ajaxer</a>",\n' +
	 '\t"GitHub": "<a href="https://github.com/btleffler" title="btleffler on Github">https://github.com/btleffler</a>",\n' +
	 '\t"hash-cli": "<a href="http://btleffler.github.io/node-hash-cli">http://btleffler.github.io/node-hash-cli</a>",\n' +
	 '\t"jQuery-SwapStyle": "<a href="http://btleffler.github.io/jQuery-SwapStyle" title="jQuery-SwapStyle">http://btleffler.github.io/jQuery-SwapStyle</a>",\n' +
	 '\t"Lunarized-Solo": "<a href="https://atom.io/themes/lunarized-solo-syntax" title="Lunarized-Solo">https://atom.io/themes/lunarized-solo-syntax</a>,\n' +
	 '\t"Node File-List": "<a href="https://www.npmjs.org/package/file-list" title="Node File-List">https://www.npmjs.org/package/file-list</a>,\n' +
	 '\t"RandomStream": "<a href="https://github.com/btleffler/RandomStream" title="RandomStream">https://github.com/btleffler/RandomStream</a>",\n' +
	 '\t"StarsTrack": "<a href="http://btleffler.github.io/StarsTrack" title="StarsTrack">http://btleffler.github.io/StarsTrack</a>"\n' +
	 '};\n\n' +
	 '/**\n' +
	 ' * light(); or dark(); or theme("light"|"dark"); // Defaults to dark\n' +
	 ' */\n\n',
	$console = $("#console"),
	$window = $(window),
	$title = $(document).find("title"),
	smartPhoneWidth = 800,
	initialWidth = $window.innerWidth();

	$console.css({
		"height": $window.innerHeight(),
		"width": initialWidth <= smartPhoneWidth ? initialWidth : Math.floor(initialWidth * 0.75)
	});

	$window.bind("resize", function () {
		var width = $window.innerWidth(),
			height = $window.innerHeight();

		$console.css({
			"height": height,
			"width": width <= smartPhoneWidth ? width : Math.floor(width * 0.75)
		});

		$console.children("div").scrollTop($console.children("div")[0].scrollHeight - height);
	});


	window.jqconsole = $console.jqconsole(null, ' \u003E ', '.. ');

	jqconsole.SetIndentWidth(2);
	jqconsole.RegisterMatching('{', '}', 'brace');
	jqconsole.RegisterMatching('(', ')', 'paran');
	jqconsole.RegisterMatching('[', ']', 'bracket');
	jqconsole.Write(header, null, false);

	// Track clicks on the initial links
	$('a').on("click", trackClick);

	function processResult (result) {
		if (!result || typeof result !== "string")
			return result;

		// url
		if (result.match(/^https?\:\/\//))
			return '<a href="' + result + '" title="' + result + '">' + result + '</a>';

		// email
		if (result.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
			return '<a href="mailto:' + result + '" title="Email ' + result + '">' + result + '</a>';

		// twitter
		if (result.match(/^@[A-Za-z0-9_]{1,15}$/))
			return '<a href="https://twitter.com/' + result + '" title="' + result + '">' + result + '</a>';

		return result;
	}

	// Handle a command.
	var handler = function(command) {
		var result;

		if (command) {
			try {
				result = window.eval(command);

				jqconsole.Write('==> ' + processResult(result) + '\n', null, false);

				// Sort of hacky, this way we don't care if the new line has a link in it.
				$console.find('a').last().off("click").on("click", trackClick);
			} catch (e) {
				jqconsole.Write('ERROR:\n' + e.stack + '\n');
			}
		}
		jqconsole.Prompt(true, handler, function(command) {
			// Continue line if can't compile the command.
			try {
				new Function(command);
			} catch (e) {
				if (/[\[\{\(]$/.test(command)) {
					return 1;
				} else {
					return 0;
				}
			}
			return false;
		});
	};

	// Initiate the first prompt.
	handler();

	// Title fun
	setInterval(function () {
		var title = $title.text();

		if (title.match(/_$/))
			title = title.replace(/_$/, ' ');
		else
			title = title.replace(/\s*$/, ' _');

		$title.text(title);
	}, 1000);

	/**
	 * Global stuff
	 */
	window.btleffler = {
		"contact": {
			"email": "btleffler@gmail.com",
			"twitter": "@bleff"
		},
		"Ajaxer": "http://btleffler.github.io/Ajaxer",
		"GitHub": "https://github.com/btleffler",
		"hash-cli": "http://btleffler.github.io./node-hash-cli",
		"jQuery-SwapStyle": "http://btleffler.github.io/jQuery-SwapStyle",
		"Lunarized-Solo": "https://atom.io/themes/lunarized-solo-syntax",
		"Node File-List": "https://www.npmjs.org/package/file-list",
		"RandomStream": "https://github.com/btleffler/RandomStream",
		"StarsTrack": "http://btleffler.github.io/StarsTrack",
	};

	window.theme = function (style) {
		var bgcolor, color;

		if (style == "light") {
			bgcolor = "#fdf6e3";
			color = "#657b83";
		} else {
			bgcolor = "#002b36";
			color = "#839496";
		}

		$("html, body, pre").css({
				"background-color": bgcolor,
				"color": color
			});
	};

	window.light = function () { theme("light"); };
	window.dark = function () { theme("dark"); };
});
