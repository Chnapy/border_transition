

/**
 * 
 * @author Haddad Richard https://github.com/Chnapy
 * @version 0.1
 * 
 */
var BORDER_TRANSITION = (function () {

	/**
	 * JQuery is required !
	 * 
	 */
	if (!window.jQuery) {
		console.error("Border_transition can't work : JQuery is not present !");
		return;
	}

	/**
	 * 
	 * Private variables
	 * You can't modify them directly
	 * 
	 */

	var version = '0.1';

	//Default variables used for HTML manipulations
	//Not alterable, due to the CSS !
	var HTML_CLASS = {
		item: 'border-transition',
		content: 'bt-content',
		frame: 'bt-frame',
		animate: 'bt-animate',
		bttypes: {
			btdraw: 'bt-draw',
			btcenter: 'bt-center',
			btopposite: 'bt-opposite',
			btmeet: 'bt-meet'
		},
		bttriggers: {
			bthover: 'bt-hover',
			btfocus: 'bt-focus',
			btactive: 'bt-active'
		},
		btstyle: 'bt-stylised'
	};

	//Default variables used for animation manipulations
	var TRANSITION_VALUES = {
		stylised: false,
		remove_transition: false,
		remove_triggers: false,
		default_transition: '', //None
		default_trigger: ''	//None
	};

	var is_initialized = false;
	
	/**
	 * 
	 * Public functions
	 */

	this.transition = function (element, transition_values = TRANSITION_VALUES, recursive = false) {
		if (arguments.length === 0) {
			return transition($('body'), transition_values, true);
		}

		transition_values = checkTransitionValues(transition_values);

		if (!is_initialized)
			init();

		var classes = '.' + HTML_CLASS.item;

		if (recursive) {
			$(element).find(classes).each(function () {
				transition(this, transition_values, false);
			});
		}

		if (!$(element).is(classes))
			return;

		apply_border_transition(element, transition_values);
	};

	this.changeTRANSITIONvalues = function (values) {
		if (isInitialized())
			return error_change("changeTRANSITIONvalues");
		changeValues(TRANSITION_VALUES, values);
	};

	this.isInitialized = function () {
		return is_initialized;
	};

	//Return version of the library
	this.getVersion = function () {
		return version;
	};
	
	/**
	 * Private functions
	 * 
	 */

	function checkTransitionValues(transition_values) {
		for (var propertyName in TRANSITION_VALUES) {
			if (!transition_values.hasOwnProperty(propertyName)) {
				transition_values[propertyName] = TRANSITION_VALUES[propertyName];
			}
		}
		return transition_values;
	}

	function apply_border_transition(element, transition_values) {
		var content = $(element).children('.' + HTML_CLASS.content);
		if (content.length === 0) {
			content = defineContent(element);
		}
		var frame = $(element).children('.' + HTML_CLASS.frame);
		if (frame.length === 0) {
			frame = addFrame(element);
		}

		if (transition_values.remove_triggers) {
			var trigger_keys = Object.keys(HTML_CLASS.bttriggers);
			for (var key in trigger_keys) {
				$(element).removeClass(HTML_CLASS.bttriggers[trigger_keys[key]]);
			}
		}

		if (transition_values.remove_transition) {
			var types_keys = Object.keys(HTML_CLASS.bttypes);
			for (var key in types_keys) {
				$(element).removeClass(HTML_CLASS.bttypes[types_keys[key]]);
			}
		}

		$(element).addClass(transition_values.default_transition);
		$(element).addClass(transition_values.default_trigger);

		if (transition_values.stylised) {
			$(element).addClass(HTML_CLASS.btstyle);
		}
	}

	function defineContent(element) {
		$(element).children(':not(.' + HTML_CLASS.frame + ')').addClass(HTML_CLASS.content);
		return $(element).children('.' + HTML_CLASS.content);
	}

	function addFrame(element) {
		$(element).append('<span class="' + HTML_CLASS.frame + '"></span>');
		return $(element).children('.' + HTML_CLASS.frame);
	}

	//Used by all change functions
	function changeValues(default_values, values) {
		for (var propertyName in values) {
			if (default_values.hasOwnProperty(propertyName)) {
				if (default_values[propertyName] !== null && typeof default_values[propertyName] === 'object') {
					changeValues(default_values[propertyName], values[propertyName]);
				} else {
					default_values[propertyName] = values[propertyName];
				}
			}
		}
	}

	function init() {
		is_initialized = true;
	}

	return this;
})();
