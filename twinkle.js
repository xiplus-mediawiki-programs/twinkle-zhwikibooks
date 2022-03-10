/**
 * vim: set noet sts=0 sw=8:
 * +-------------------------------------------------------------------------+
 * |                       === 警告：全局小工具文件 ===                      |
 * |                      对此文件的修改会影响许多用户。                     |
 * |                           修改前请联系维护者。                          |
 * +-------------------------------------------------------------------------+
 *
 * 从Github导入[https://github.com/Xi-Plus/twinkle]
 * 基於 [https://github.com/jimmyxu/twinkle] 和 [https://github.com/vjudge1/twinkle] 的修改
 *
 * ----------
 *
 * 这是经过亂改的Twinkle，是让維護者自己方便使用维基百科的
 * 好帮手。请参见[[WP:TW]]以获取更多信息。
 */

// <nowiki>

/* global Morebits */

(function (window, document, $) { // Wrap with anonymous function

// Check if account is experienced enough to use Twinkle
if (!Morebits.userIsInGroup('autoconfirmed') && !Morebits.userIsInGroup('confirmed')) {
	return;
}

var Twinkle = {};
window.Twinkle = Twinkle;  // allow global access

// for use by custom modules (normally empty)
Twinkle.initCallbacks = [];
Twinkle.addInitCallback = function twinkleAddInitCallback(func) {
	Twinkle.initCallbacks.push(func);
};

Twinkle.defaultConfig = {};
/**
 * This holds the default set of preferences used by Twinkle.
 * It is important that all new preferences added here, especially admin-only ones, are also added to
 * |Twinkle.config.sections| in twinkleconfig.js, so they are configurable via the Twinkle preferences panel.
 * For help on the actual preferences, see the comments in twinkleconfig.js.
 *
 * Formerly Twinkle.defaultConfig.twinkle and Twinkle.defaultConfig.friendly
 */
Twinkle.defaultConfig = {
	// General
	summaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	deletionSummaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	protectionSummaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	blockSummaryAd: ' ([[User:Xiplus/Twinkle|TW]])',
	userTalkPageMode: 'tab',
	dialogLargeFont: false,
	disabledModules: [],
	disabledSysopModules: [],

	// Block
	blankTalkpageOnIndefBlock: false,
	customBlockReasonList: [],
	// Fluff (revert and rollback)
	openTalkPage: [ ],
	openTalkPageOnAutoRevert: false,
	markRevertedPagesAsMinor: [ 'vand' ],
	watchRevertedPages: [ ],
	offerReasonOnNormalRevert: true,
	confirmOnFluff: false,
	showRollbackLinks: [ 'diff', 'others' ],
	customRevertSummary: [],
	// DI (twinkleimage)
	notifyUserOnDeli: true,
	deliWatchPage: 'default',
	deliWatchUser: 'default',
	// CSD
	speedySelectionStyle: 'buttonClick',
	watchSpeedyPages: [ ],
	markSpeedyPagesAsPatrolled: true,
	// these next two should probably be identical by default
	notifyUserOnSpeedyDeletionNomination: [ 'db', 'g1', 'g2', 'g3', 'g5', 'g11', 'g12', 'g13', 'g16', 'a1', 'a2', 'a5', 'a6', 'f6', 'r2', 'r3' ],
	welcomeUserOnSpeedyDeletionNotification: [ 'db', 'g1', 'g2', 'g3', 'g5', 'g11', 'g12', 'g13', 'g16', 'a1', 'a2', 'a5', 'a6', 'f6', 'r2', 'r3' ],
	promptForSpeedyDeletionSummary: [],
	openUserTalkPageOnSpeedyDelete: [ ],
	deleteTalkPageOnDelete: true,
	deleteRedirectsOnDelete: true,
	deleteSysopDefaultToTag: false,
	speedyWindowHeight: 500,
	speedyWindowWidth: 800,
	logSpeedyNominations: false,
	speedyLogPageName: 'CSD日志',
	noLogOnSpeedyNomination: [ 'o1' ],
	enlargeG11Input: false,
	// Unlink
	unlinkNamespaces: [ '0', '10', '100', '118' ],
	// Warn
	defaultWarningGroup: '1',
	showSharedIPNotice: true,
	watchWarnings: false,
	customWarningList: [],
	// XfD
	xfdWatchDiscussion: 'default',
	xfdWatchPage: 'default',
	xfdWatchUser: 'default',
	markXfdPagesAsPatrolled: true,
	FwdCsdToXfd: Morebits.userIsSysop,
	afdDefaultCategory: 'delete',
	XfdClose: Morebits.userIsSysop ? 'all' : 'hide',
	// Copyvio
	copyvioWatchPage: 'default',
	copyvioWatchUser: 'default',
	markCopyvioPagesAsPatrolled: true,
	markDraftCopyvioWithCSD: false,
	// Hidden preferences
	revertMaxRevisions: 50,
	batchMax: 5000,
	batchdeleteChunks: 50,
	batchProtectChunks: 50,
	batchundeleteChunks: 50,
	proddeleteChunks: 50,
	revisionTags: '',
	configPage: 'User:Xiplus/Twinkle/參數設置',
	projectNamespaceName: mw.config.get('wgFormattedNamespaces')[4],
	sandboxPage: 'Wiktionary:沙盒',

	// Formerly defaultConfig.friendly:

	// Tag
	groupByDefault: true,
	watchTaggedPages: false,
	watchMergeDiscussions: false,
	markTaggedPagesAsMinor: false,
	markTaggedPagesAsPatrolled: true,
	tagArticleSortOrder: 'cat',
	customTagList: [],
	// Talkback
	markTalkbackAsMinor: true,
	insertTalkbackSignature: true,  // always sign talkback templates
	talkbackHeading: wgULS('回复通告', '回覆通告'),
	mailHeading: wgULS('您有新邮件！', '您有新郵件！'),
	// Shared
	markSharedIPAsMinor: true
};

// now some skin dependent config.
switch (mw.config.get('skin')) {
	case 'vector':
		Twinkle.defaultConfig.portletArea = 'right-navigation';
		Twinkle.defaultConfig.portletId = 'p-twinkle';
		Twinkle.defaultConfig.portletName = 'TW';
		Twinkle.defaultConfig.portletType = 'menu';
		Twinkle.defaultConfig.portletNext = 'p-search';
		break;
	case 'timeless':
		Twinkle.defaultConfig.portletArea = '#page-tools .sidebar-inner';
		Twinkle.defaultConfig.portletId = 'p-twinkle';
		Twinkle.defaultConfig.portletName = 'Twinkle';
		Twinkle.defaultConfig.portletType = null;
		Twinkle.defaultConfig.portletNext = 'p-userpagetools';
		break;
	default:
		Twinkle.defaultConfig.portletArea = null;
		Twinkle.defaultConfig.portletId = 'p-cactions';
		Twinkle.defaultConfig.portletName = null;
		Twinkle.defaultConfig.portletType = null;
		Twinkle.defaultConfig.portletNext = null;
}


Twinkle.getPref = function twinkleGetPref(name) {
	// Temporarily disable summaryAd
	if ($.inArray(name, ['summaryAd', 'deletionSummaryAd', 'protectionSummaryAd', 'blockSummaryAd']) !== -1) {
		return '';
	}

	// Old preferences format
	if (typeof Twinkle.prefs === 'object' && typeof Twinkle.prefs.twinkle === 'object' && Twinkle.prefs.twinkle[name]) {
		return Twinkle.prefs.twinkle[name];
	}
	if (typeof Twinkle.prefs === 'object' && typeof Twinkle.prefs.friendly === 'object' && Twinkle.prefs.friendly[name]) {
		return Twinkle.prefs.friendly[name];
	}

	if (typeof Twinkle.prefs === 'object' && Twinkle.prefs[name] !== undefined) {
		return Twinkle.prefs[name];
	}
	// Old preferences format, used before twinkleoptions.js was a thing
	if (typeof window.TwinkleConfig === 'object' && window.TwinkleConfig[name] !== undefined) {
		return window.TwinkleConfig[name];
	}
	if (typeof window.FriendlyConfig === 'object' && window.FriendlyConfig[name] !== undefined) {
		return window.FriendlyConfig[name];
	}
	return Twinkle.defaultConfig[name];
};


/**
 * **************** Twinkle.addPortlet() ****************
 *
 * Adds a portlet menu to one of the navigation areas on the page.
 * This is necessarily quite a hack since skins, navigation areas, and
 * portlet menu types all work slightly different.
 *
 * Available navigation areas depend on the skin used.
 * Vector:
 *  For each option, the outer div class contains "vector-menu", the inner div class is "vector-menu-content", and the ul is "vector-menu-content-list"
 *  "mw-panel", outer div class contains "vector-menu-portal". Existing portlets/elements: "p-logo", "p-navigation", "p-interaction", "p-tb", "p-coll-print_export"
 *  "left-navigation", outer div class contains "vector-menu-tabs" or "vector-menu-dropdown". Existing portlets: "p-namespaces", "p-variants" (menu)
 *  "right-navigation", outer div class contains "vector-menu-tabs" or "vector-menu-dropdown". Existing portlets: "p-views", "p-cactions" (menu), "p-search"
 *  Special layout of p-personal portlet (part of "head") through specialized styles.
 * Monobook:
 *  "column-one", outer div class "portlet", inner div class "pBody". Existing portlets: "p-cactions", "p-personal", "p-logo", "p-navigation", "p-search", "p-interaction", "p-tb", "p-coll-print_export"
 *  Special layout of p-cactions and p-personal through specialized styles.
 * Modern:
 *  "mw_contentwrapper" (top nav), outer div class "portlet", inner div class "pBody". Existing portlets or elements: "p-cactions", "mw_content"
 *  "mw_portlets" (sidebar), outer div class "portlet", inner div class "pBody". Existing portlets: "p-navigation", "p-search", "p-interaction", "p-tb", "p-coll-print_export"
 *
 * @param String navigation -- id of the target navigation area (skin dependant, on vector either of "left-navigation", "right-navigation", or "mw-panel")
 * @param String id -- id of the portlet menu to create, preferably start with "p-".
 * @param String text -- name of the portlet menu to create. Visibility depends on the class used.
 * @param String type -- type of portlet. Currently only used for the vector non-sidebar portlets, pass "menu" to make this portlet a drop down menu.
 * @param Node nextnodeid -- the id of the node before which the new item should be added, should be another item in the same list, or undefined to place it at the end.
 *
 * @return Node -- the DOM node of the new item (a DIV element) or null
 */
Twinkle.addPortlet = function(navigation, id, text, type, nextnodeid) {
	// sanity checks, and get required DOM nodes
	var root = document.getElementById(navigation) || document.querySelector(navigation);
	if (!root) {
		return null;
	}

	var item = document.getElementById(id);
	if (item) {
		if (item.parentNode && item.parentNode === root) {
			return item;
		}
		return null;
	}

	var nextnode;
	if (nextnodeid) {
		nextnode = document.getElementById(nextnodeid);
	}

	// verify/normalize input
	var skin = mw.config.get('skin');
	if (skin !== 'vector' || (navigation !== 'left-navigation' && navigation !== 'right-navigation')) {
		type = null; // menu supported only in vector's #left-navigation & #right-navigation
	}
	var outerNavClass, innerDivClass;
	switch (skin) {
		case 'vector':
			// XXX: portal doesn't work
			if (navigation !== 'portal' && navigation !== 'left-navigation' && navigation !== 'right-navigation') {
				navigation = 'mw-panel';
			}
			outerNavClass = 'mw-portlet vector-menu vector-menu-' + (navigation === 'mw-panel' ? 'portal' : type === 'menu' ? 'dropdown vector-menu-dropdown-noicon' : 'tabs');
			innerDivClass = 'vector-menu-content';
			break;
		case 'modern':
			if (navigation !== 'mw_portlets' && navigation !== 'mw_contentwrapper') {
				navigation = 'mw_portlets';
			}
			outerNavClass = 'portlet';
			break;
		case 'timeless':
			outerNavClass = 'mw-portlet';
			innerDivClass = 'mw-portlet-body';
			break;
		default:
			navigation = 'column-one';
			outerNavClass = 'portlet';
			break;
	}

	// Build the DOM elements.
	var outerNav = document.createElement('nav');
	outerNav.setAttribute('aria-labelledby', id + '-label');
	outerNav.className = outerNavClass + ' emptyPortlet';
	outerNav.id = id;
	if (nextnode && nextnode.parentNode === root) {
		root.insertBefore(outerNav, nextnode);
	} else {
		root.appendChild(outerNav);
	}

	var h3 = document.createElement('h3');
	h3.id = id + '-label';
	var ul = document.createElement('ul');

	if (skin === 'vector') {
		ul.className = 'vector-menu-content-list';
		h3.className = 'vector-menu-heading';

		// add invisible checkbox to keep menu open when clicked
		// similar to the p-cactions ("More") menu
		if (outerNavClass.indexOf('vector-menu-dropdown') !== -1) {
			var chkbox = document.createElement('input');
			chkbox.className = 'vector-menu-checkbox';
			chkbox.setAttribute('type', 'checkbox');
			chkbox.setAttribute('aria-labelledby', id + '-label');
			outerNav.appendChild(chkbox);

			// Vector gets its title in a span; all others except
			// timeless have no title, and it has no span
			var span = document.createElement('span');
			span.appendChild(document.createTextNode(text));
			h3.appendChild(span);

			var a = document.createElement('a');
			a.href = '#';

			$(a).click(function(e) {
				e.preventDefault();
			});

			h3.appendChild(a);
		}
	} else {
		// Basically just Timeless
		h3.appendChild(document.createTextNode(text));
	}

	outerNav.appendChild(h3);

	if (innerDivClass) {
		var innerDiv = document.createElement('div');
		innerDiv.className = innerDivClass;
		innerDiv.appendChild(ul);
		outerNav.appendChild(innerDiv);
	} else {
		outerNav.appendChild(ul);
	}


	return outerNav;

};


/**
 * **************** Twinkle.addPortletLink() ****************
 * Builds a portlet menu if it doesn't exist yet, and add the portlet link.
 * @param task: Either a URL for the portlet link or a function to execute.
 */
Twinkle.addPortletLink = function(task, text, id, tooltip) {
	if (Twinkle.getPref('portletArea') !== null) {
		Twinkle.addPortlet(Twinkle.getPref('portletArea'), Twinkle.getPref('portletId'), Twinkle.getPref('portletName'), Twinkle.getPref('portletType'), Twinkle.getPref('portletNext'));
	}
	var link = mw.util.addPortletLink(Twinkle.getPref('portletId'), typeof task === 'string' ? task : '#', text, id, tooltip);
	if ($.isFunction(task)) {
		$(link).click(function (ev) {
			task();
			ev.preventDefault();
		});
	}
	if ($.collapsibleTabs) {
		$.collapsibleTabs.handleResize();
	}
	return link;
};


/**
 * **************** General initialization code ****************
 */

var scriptpathbefore = mw.util.wikiScript('index') + '?title=',
	scriptpathafter = '&action=raw&ctype=text/javascript&happy=yes';

// Retrieve the user's Twinkle preferences
$.ajax({
	url: scriptpathbefore + 'User:' + encodeURIComponent(mw.config.get('wgUserName')) + '/twinkleoptions.js' + scriptpathafter,
	dataType: 'text'
})
	.fail(function () {
		mw.notify('未能加载twinkleoptions.js');
	})
	.done(function (optionsText) {

		// Quick pass if user has no options
		if (optionsText === '') {
			return;
		}

		// Twinkle options are basically a JSON object with some comments. Strip those:
		optionsText = optionsText.replace(/(?:^(?:\/\/[^\n]*\n)*\n*|(?:\/\/[^\n]*(?:\n|$))*$)/g, '');

		// First version of options had some boilerplate code to make it eval-able -- strip that too. This part may become obsolete down the line.
		if (optionsText.lastIndexOf('window.Twinkle.prefs = ', 0) === 0) {
			optionsText = optionsText.replace(/(?:^window.Twinkle.prefs = |;\n*$)/g, '');
		}

		try {
			var options = JSON.parse(optionsText);
			if (options) {
				if (options.twinkle || options.friendly) { // Old preferences format
					Twinkle.prefs = $.extend(options.twinkle, options.friendly);
				} else {
					Twinkle.prefs = options;
				}
				// v2 established after unification of Twinkle/Friendly objects
				Twinkle.prefs.optionsVersion = Twinkle.prefs.optionsVersion || 1;
			}
		} catch (e) {
			mw.notify('未能解析twinkleoptions.js');
		}
	})
	.always(function () {
		$(Twinkle.load);
	});

// Developers: you can import custom Twinkle modules here
// For example, mw.loader.load(scriptpathbefore + "User:UncleDouggie/morebits-test.js" + scriptpathafter);

Twinkle.load = function () {
	// Don't activate on special pages other than those on the whitelist so that
	// they load faster, especially the watchlist.
	var specialPageWhitelist = [ 'Block', 'Contributions', 'AbuseLog' ]; // wgRelevantUserName defined for non-sysops on Special:Block
	if (Morebits.userIsSysop) {
		specialPageWhitelist = specialPageWhitelist.concat([ 'DeletedContributions', 'Prefixindex' ]);
	}
	if (mw.config.get('wgNamespaceNumber') === -1 &&
		specialPageWhitelist.indexOf(mw.config.get('wgCanonicalSpecialPageName')) === -1) {
		return;
	}

	// Prevent clickjacking
	if (window.top !== window.self) {
		return;
	}

	// Set custom Api-User-Agent header, for server-side logging purposes
	Morebits.wiki.api.setApiUserAgent('Twinkle~zh~/2.0 (' + mw.config.get('wgDBname') + ')');

	// Load all the modules in the order that the tabs should appear
	var twinkleModules = [
		// Deletion
		'xfd',
		// Misc. ones last
		'diff', 'fluff'
	];
	// Don't load modules users have disabled
	var disabledModules = Twinkle.getPref('disabledModules').concat(Twinkle.getPref('disabledSysopModules'));
	twinkleModules.filter(function(mod) {
		return disabledModules.indexOf(mod) === -1;
	}).forEach(function(module) {
		Twinkle[module]();
	});

	Twinkle.config.init(); // Can't turn off

	Twinkle.addPortletLink(mw.util.wikiScript('index') + '?title=' + Twinkle.getPref('configPage'), wgULS('设置', '設定'), 'tw-config', wgULS('设置Twinkle参数', '設定Twinkle參數'));

	// Run the initialization callbacks for any custom modules
	$(Twinkle.initCallbacks).each(function (k, v) {
		v();
	});
	Twinkle.addInitCallback = function (func) {
		func();
	};

	// Increases text size in Twinkle dialogs, if so configured
	if (Twinkle.getPref('dialogLargeFont')) {
		mw.util.addCSS('.morebits-dialog-content, .morebits-dialog-footerlinks { font-size: 100% !important; } ' +
			'.morebits-dialog input, .morebits-dialog select, .morebits-dialog-content button { font-size: inherit !important; }');
	}
};

}(window, document, jQuery)); // End wrap with anonymous function

// </nowiki>
