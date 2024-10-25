const { setIcon, Plugin, FuzzySuggestModal, 
  FuzzyMatch, getIconIds, requireApiVersion } = require('obsidian');
const CmdName = 'Open icon picker';

class IconPickerPlugin extends Plugin {
  constructor() {
    super(...arguments);
  }

  async onload() {
    this.addCommand({
      id: 'open-community-plugins',
      name: CmdName,
      callback: () => {
        this.pickIcon();
      },
    });
    // biome-ignore lint: Loading indicator, runs once only; // ⚠️
    console.log(`%c${this.manifest.name} ${this.manifest.version} loaded`, 
      'background-color: indianred; padding:4px; border-radius:4px');
  }

  pickIcon() {
    const picker = new ChooseIconModal(this);
    picker.awaitSelection().then((item) => {
      navigator.clipboard.writeText(item.split('|')[0]);
      new obsidian.Notice(`"${item}" copied to clipboard`, 3000);
    });
  }
}

module.exports = {
  default: IconPickerPlugin,
};

class ChooseIconModal extends FuzzySuggestModal {
	plugin;

	constructor(plugin) {
		super(app);
		this.plugin = plugin;
		this.setPlaceholder("Find the name of a Lucide icon");

		this.setInstructions([
			{
				command: "↑↓",
				purpose: "Navigate",
			},
			{
				command: "↵",
				purpose: "Copy name to clipboard",
			},
			{
				command: "esc",
				purpose: "Cancel",
			},
		]);
	}

	async awaitSelection() {
		this.open();
		return new Promise((resolve, reject) => {
			this.onChooseItem = (item) => resolve(item);
			//This is wrapped inside a setTimeout, because onClose is called before onChooseItem
			this.onClose = () => window.setTimeout(() => null, 0);
		});
	}

	renderSuggestion(item, el){
    const [display, ...related] = item.item.split('|');
		el.addClass("mod-complex");
		const content = el.createDiv({ cls: "suggestion-content" });
		const title = content
      .createDiv({ cls: "suggestion-title", attr: { 'data-after': related.join(' | ') } })
      .setText(
        display
        .replace('lucide-', '')
        .replace(/-/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
      );
		const aux = el.createDiv({ cls: "suggestion-aux" });
		setIcon(aux.createSpan({ cls: "suggestion-flair" }), display);
	}

	getItems() {
		return ICON_LIST;
	}

	getItemText(item) {
		return item;
	}

	onChooseItem() {}
}

const ICON_LIST = requireApiVersion("1.7.3") ? getIconIds() : [
	'accessibility|wheelchair|disabled|handicaped',
  'activity|wave|heart|pulse|health',
  'add-note-glyph|page',
  'air-vent|wind',
  'airplay',
  'alarm-check|clock',
  'alarm-clock',
  'alarm-clock-off',
  'alarm-minus|clock',
  'alarm-plus|clock',
  'album|book',
  'alert-circle|round|stop|halt',
  'alert-octagon|stop|halt',
  'alert-triangle|caution',
  'align-center-horizontal',
  'align-center-vertical',
  'align-end-horizontal',
  'align-end-vertical',
  'align-horizontal-distribute-center',
  'align-horizontal-distribute-end',
  'align-horizontal-distribute-start',
  'align-horizontal-justify-center',
  'align-horizontal-justify-end',
  'align-horizontal-justify-start',
  'align-horizontal-space-around',
  'align-horizontal-space-between',
  'align-justify|format',
  'align-left|format',
  'align-right|format',
  'align-start-horizontal',
  'align-start-vertical',
  'align-vertical-distribute-center',
  'align-vertical-distribute-end',
  'align-vertical-distribute-start',
  'align-vertical-justify-center',
  'align-vertical-justify-end',
  'align-vertical-justify-start',
  'align-vertical-space-around',
  'align-vertical-space-between',
  'anchor|ship',
  'angry|annoyed',
  'annoyed|angry',
  'any-key|plus|add',
  'aperture|camera',
  'apple|fruit|food',
  'archive|box|container',
  'archive-restore|box|container',
  'armchair|sofa',
  'arrow-big-down',
  'arrow-big-left',
  'arrow-big-right',
  'arrow-big-up',
  'arrow-down',
  'arrow-down-circle|round',
  'arrow-down-left',
  'arrow-down-right',
  'arrow-left',
  'arrow-left-circle|round',
  'arrow-left-right',
  'arrow-right',
  'arrow-right-circle|round',
  'arrow-up',
  'arrow-up-circle',
  'arrow-up-down',
  'arrow-up-left',
  'arrow-up-right',
  'asterisk|punctuation',
  'at-sign|@|puntuation',
  'audio-file|sound|headphone',
  'award|reward|medal',
  'axe|tool',
  'axis-3d|dimension',
  'baby|child|human',
  'backpack|rucksack|bag',
  'baggage-claim|suitcase',
  'banana|fruit|food',
  'banknote|money',
  'bar-chart',
  'bar-chart-2',
  'bar-chart-3',
  'bar-chart-4',
  'bar-chart-horizontal',
  'baseline|letter|char|format|underline',
  'bath|home|clean|wash',
  'battery|charge|power',
  'battery-charging',
  'battery-full',
  'battery-low',
  'battery-medium',
  'beaker|cup|glass',
  'bean|food',
  'bean-off|food',
  'bed|furniture',
  'bed-double|furniture',
  'bed-single|furniture',
  'beer|glass|drink',
  'bell|ring',
  'bell-minus',
  'bell-off|quiet',
  'bell-plus|noise',
  'bell-ring',
  'bike|bicycle|transport',
  'binary|number',
  'bitcoin|money',
  'blocks|check|tick|section',
  'bluetooth',
  'bluetooth-connected',
  'bluetooth-off',
  'bluetooth-searching',
  'bold|letter|char|format',
  'bold-glyph|letter|char|format',
  'bomb|weapon|explode',
  'bone|body',
  'book|read',
  'book-open|read',
  'book-open-check|read',
  'bookmark|favourite',
  'bookmark-minus|favourite',
  'bookmark-plus|favouritte',
  'bot|robot',
  'box|carton|container',
  'box-glyph|boxes|cartons|multi|many|group',
  'box-select|selection',
  'boxes|cartons|containers|group',
  'bracket-glyph|square|punctuation',
  'briefcase|bag|meeting',
  'broken-link',
  'brush|paint',
  'bug|debug',
  'building|construction',
  'building-2|construction',
  'bullet-list|format',
  'bullet-list-glyph|format',
  'bus|vehicle|car|transport',
  'cake|food',
  'calculator|number|count|formula',
  'calendar|days|month',
  'calendar-check|done|check|tick',
  'calendar-check-2|done|check|tick',
  'calendar-clock',
  'calendar-days',
  'calendar-glyph|days',
  'calendar-heart',
  'calendar-minus',
  'calendar-off',
  'calendar-plus',
  'calendar-range|days',
  'calendar-search',
  'calendar-with-checkmark',
  'calendar-x',
  'calendar-x-2',
  'camera|picture|image|photo',
  'camera-off|picture|image|photo',
  'candy|sweet|toffee|food',
  'candy-off|sweet|toffee|food',
  'car|transport|vehicle|travel',
  'carrot|veg|food',
  'cast|wifi|screen|rss',
  'cat|animal',
  'check|tick|done',
  'check-check|tick|done',
  'check-circle|ronud|tick|done',
  'check-circle-2|round|tick|done',
  'check-in-circle|round|tick|done',
  'check-small|tick|done',
  'check-square|tick|done',
  'checkbox-glyph|tick|done',
  'checkmark|tick|done',
  'chef-hat|cook|kitchen',
  'cherry|fruit|food',
  'chevron-down',
  'chevron-first',
  'chevron-last',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevrons-down',
  'chevrons-down-up',
  'chevrons-left',
  'chevrons-left-right',
  'chevrons-right',
  'chevrons-right-left',
  'chevrons-up',
  'chevrons-up-down',
  'chrome|browser',
  'cigarette|smoking',
  'cigarette-off|smoking',
  'circle|round|shape',
  'circle-dot|round|round',
  'circle-ellipsis|round',
  'circle-slashed|round',
  'citrus|fruit|food',
  'clapperboard|film|movie|start',
  'clipboard',
  'clipboard-check',
  'clipboard-copy',
  'clipboard-edit|pen|pencil',
  'clipboard-list',
  'clipboard-signature',
  'clipboard-type',
  'clipboard-x',
  'clock',
  'clock-1|time',
  'clock-2|time',
  'clock-3|time',
  'clock-4|time',
  'clock-5|time',
  'clock-6|time',
  'clock-7|time',
  'clock-8|time',
  'clock-9|time',
  'clock-10|time',
  'clock-11|time',
  'clock-12|time',
  'clock-glyph|time',
  'cloud|weather',
  'cloud-cog|weather',
  'cloud-drizzle|weather|rain',
  'cloud-fog|weather',
  'cloud-hail|weather',
  'cloud-lightning|weather|thunder',
  'cloud-moon|weather',
  'cloud-moon-rain|weather',
  'cloud-off|weather',
  'cloud-rain|weather',
  'cloud-rain-wind|weather',
  'cloud-snow|weather',
  'cloud-sun|weather',
  'cloud-sun-rain|weather',
  'cloudy|weather',
  'clover|plant|flower',
  'code|html',
  'code-2|html',
  'code-glyph|html',
  'codepen|box|transparent',
  'codesandbox',
  'coffee|drink|cup|hot|food',
  'cog|machine',
  'coins|money',
  'columns|side',
  'command|mac',
  'command-glyph|line|cmd|dos',
  'compass|direction',
  'component|piece|part|group',
  'compress-glyph|opposite|together',
  'concierge-bell',
  'contact|address|person',
  'contrast',
  'cookie|food|sweet',
  'copy|page|two|2|pair',
  'copyleft',
  'copyright',
  'corner-down-left|arrow',
  'corner-down-right|arrow',
  'corner-left-down|arrow',
  'corner-left-up|arrow',
  'corner-right-down|arrow',
  'corner-right-up|arrow',
  'corner-up-left|arrow',
  'corner-up-right|arrow',
  'cpu|computer|processor',
  'create-new|pen|write|page|pencil',
  'credit-card|money',
  'croissant|breakfast|food',
  'crop|reduce|resize',
  'cross|close|off|shut|exit',
  'cross-in-box|close|off|shut|exit|no',
  'crossed-star',
  'crosshair|target',
  'crown|king|queen',
  'cup-soda|glass|drink',
  'curly-braces|punctuation|bracket',
  'currency|money',
  'database|container',
  'delete|remove',
  'diamond',
  'dice',
  'dice-1',
  'dice-2',
  'dice-3',
  'dice-4',
  'dice-5',
  'dice-6',
  'dice-glyph',
  'dices',
  'diff|plus|minus',
  'disc|disk|record',
  'divide',
  'divide-circle|round',
  'divide-square',
  'dna|gene',
  'dna-off|gene',
  'document|page|file',
  'documents|pages|files',
  'dog|face|animal',
  'dollar-sign|money',
  'dot-network|connect',
  'double-down-arrow-glyph',
  'double-up-arrow-glyph',
  'down-arrow-with-tail',
  'down-chevron-glyph',
  'down-curly-arrow-glyph',
  'download|inbox',
  'download-cloud',
  'dribbble|basketball|sport',
  'droplet|water|rain',
  'droplets|water|rain',
  'drumstick|chicken|food',
  'dumbbell|weight|heavy',
  'duplicate-glyph|double|two',
  'ear|listen|hear',
  'ear-off|listen|hear',
  'edit|edit|modify|pen|pencil|page|paper',
  'edit-2|edit|modify|pen|pencil',
  'edit-3|edit|modify|pen|pencil',
  'egg|food|chicken',
  'egg-fried|food|chicken',
  'egg-off',
  'enlarge-glyph|grow|expand|stretch',
  'enter|room|door',
  'equal',
  'equal-not',
  'eraser|rubber',
  'euro|money|currency',
  'exit-fullscreen',
  'expand|full',
  'expand-vertically',
  'external-link',
  'eye|look|see',
  'eye-off|look|see',
  'facebook',
  'factory|building|manufacture',
  'fan|blow|blade',
  'fast-forward|right',
  'feather|bird',
  'figma',
  'file|page',
  'file-archive|page',
  'file-audio|page',
  'file-audio-2|page',
  'file-axis-3d|page',
  'file-badge|page',
  'file-badge-2|page',
  'file-bar-chart|page',
  'file-bar-chart-2|page',
  'file-box|page',
  'file-check|page',
  'file-check-2|page',
  'file-clock|page|time',
  'file-code|page|dev',
  'file-cog|page|machine',
  'file-cog-2|page',
  'file-diff|page',
  'file-digit|page|number',
  'file-down|page',
  'file-edit|page|modify',
  'file-explorer-glyph|page',
  'file-heart|page',
  'file-image|page|picture',
  'file-input|page|add|new',
  'file-json|page',
  'file-json-2|page',
  'file-key|page',
  'file-key-2|page',
  'file-line-chart|page',
  'file-lock|page',
  'file-lock-2|page',
  'file-minus|remove|page',
  'file-minus-2|remove|page',
  'file-output|page',
  'file-pie-chart|page',
  'file-plus|add|page',
  'file-plus-2|add|page',
  'file-question|page',
  'file-scan|page',
  'file-search|page',
  'file-search-2|page',
  'file-signature|page',
  'file-spreadsheet|page',
  'file-symlink|page',
  'file-terminal|page|command|cmd',
  'file-text|page',
  'file-type|page',
  'file-type-2|page',
  'file-up|page',
  'file-video|page|film|movie',
  'file-video-2|page|film|movie',
  'file-volume|page|sound',
  'file-volume-2|page|sound',
  'file-warning',
  'file-x|page||close|exit',
  'file-x-2|page||close|exit',
  'files|pages|many|multi',
  'filled-pin|tack',
  'film|video|movie',
  'filter',
  'fingerprint',
  'flag',
  'flag-off',
  'flag-triangle-left',
  'flag-triangle-right',
  'flame|fire|hot',
  'flashlight|torch|light',
  'flashlight-off|torch|light',
  'flask-conical|lab|science|sample',
  'flask-conical-off|lab|science|sample',
  'flask-round|lab|science|sample',
  'flip-horizontal',
  'flip-horizontal-2',
  'flip-vertical',
  'flip-vertical-2',
  'flower|plant',
  'flower-2|plant',
  'focus|target',
  'folder|directory|path',
  'folder-archive|directory|path',
  'folder-check|directory|path',
  'folder-clock|directory|path',
  'folder-closed|directory|path',
  'folder-cog|directory|path',
  'folder-cog-2|directory|path',
  'folder-down|directory|path',
  'folder-edit|directory|path|modify|modify',
  'folder-heart|directory|path',
  'folder-input|directory|path',
  'folder-key|directory|path',
  'folder-lock|directory|path',
  'folder-minus|directory|path|remove',
  'folder-open|directory|path',
  'folder-output|directory|path',
  'folder-plus|directory|path|add|new',
  'folder-search|directory|path',
  'folder-search-2|directory|path',
  'folder-symlink|directory|path',
  'folder-tree|directory|path|hierarchy',
  'folder-up|directory|path',
  'folder-x|directory|path|close|exit',
  'folders|paths|directories',
  'form-input|password|textbox|searchbox',
  'forward|arrow',
  'forward-arrow',
  'frame|grid|mesh',
  'framer|spiral',
  'frown|face|unhappy',
  'fuel|petrol|gas|transport',
  'fullscreen',
  'function-square',
  'gamepad|controller',
  'gamepad-2|controller',
  'gauge|measure|indicator',
  'gavel|court|decision|judge',
  'gear|cog|machine|setting',
  'gem|jewel|facet',
  'ghost',
  'gift|present|reward',
  'git-branch',
  'git-branch-plus',
  'git-commit',
  'git-compare',
  'git-fork',
  'git-merge',
  'git-pull-request',
  'git-pull-request-closed',
  'git-pull-request-draft',
  'github',
  'github-glyph',
  'gitlab|fox',
  'glass-water|drink',
  'glasses|spectacles|eye|see|loo',
  'globe|earth|planet',
  'globe-2|earth|planet',
  'go-to-file',
  'grab|hand',
  'graduation-cap|school|university',
  'grape|fruit|food',
  'graph-glyph|connect|network',
  'grid|mesh|squares|table',
  'grip-horizontal',
  'grip-vertical',
  'hammer|tool',
  'hand',
  'hand-metal',
  'hard-drive|device',
  'hard-hat|safety|construction',
  'hash|punctuation',
  'hashtag|punctuation',
  'haze|weather|sunrise',
  'heading|letter|char|format',
  'heading-1|format',
  'heading-2|format',
  'heading-3|format',
  'heading-4|format',
  'heading-5|format',
  'heading-6|format',
  'heading-glyph|letter|char',
  'headphones|sound|music',
  'heart|body|health',
  'heart-crack|body|health|sickness|disease|illness',
  'heart-handshake|friendship|agreement',
  'heart-off',
  'heart-pulse|health',
  'help|question|query',
  'help-circle|round|question|query',
  'hexagon|shape',
  'highlight-glyph',
  'highlighter',
  'history|recent|back',
  'home|house',
  'hop|plant|beer|food',
  'hop-off|plant|beer|food',
  'horizontal-split',
  'hourglass|time|duration',
  'ice-cream|food',
  'image|picture',
  'image-file|picture',
  'image-glyph|picture|paperclip',
  'image-minus|picture',
  'image-off|picture',
  'image-plus|picture',
  'import|load',
  'import-glyph|load',
  'inbox|tray',
  'indent|format',
  'indent-glyph|format',
  'indian-rupee|money|currency',
  'infinity|symbol',
  'info',
  'inspect',
  'instagram|camera',
  'install|download|cloud',
  'italic|letter|char|format',
  'italic-glyph|letter|char|format',
  'japanese-yen|money|currency',
  'joystick|game',
  'key|lock',
  'keyboard',
  'keyboard-glyph',
  'lamp|light',
  'lamp-ceiling|light',
  'lamp-desk|light',
  'lamp-floor|light',
  'lamp-wall-down|light',
  'lamp-wall-up|light',
  'landmark|place|location|building|court',
  'languages|text',
  'laptop|computer',
  'laptop-2|computer',
  'lasso',
  'lasso-select',
  'laugh',
  'layers|many|multi|stack',
  'layout|dialog',
  'layout-dashboard',
  'layout-grid|squares',
  'layout-list',
  'layout-template',
  'leaf|plant',
  'left-arrow',
  'left-arrow-with-tail',
  'left-chevron-glyph',
  'library|books',
  'life-buoy',
  'lightbulb|idea|think',
  'lightbulb-off|idea',
  'line-chart',
  'lines-of-text',
  'link|hyper|url',
  'link-2',
  'link-2-off',
  'link-glyph|hyper|url',
  'linkedin',
  'links-coming-in',
  'links-going-out',
  'list|bullet|line',
  'list-checks|line',
  'list-end|line',
  'list-minus|line',
  'list-music|line',
  'list-ordered|line',
  'list-plus|line',
  'list-start|line',
  'list-video|line',
  'list-x|line',
  'loader|bright|sun',
  'loader-2',
  'locate|target',
  'locate-fixed|target',
  'locate-off|target',
  'lock',
  'log-in',
  'log-out',
  'logo-crystal',
  'luggage|suitcase|baggage',
  'magnet',
  'magnifying-glass',
  'mail|envelope|email',
  'mail-check',
  'mail-minus',
  'mail-open',
  'mail-plus|add|new',
  'mail-question',
  'mail-search',
  'mail-warning',
  'mail-x|close',
  'mails|emails',
  'map|navigate',
  'map-pin|locate|location',
  'map-pin-off|locate|location',
  'martini|drink',
  'maximize',
  'maximize-2',
  'medal|award',
  'megaphone|sound',
  'megaphone-off|sound',
  'meh|unhappy',
  'menu',
  'merge-files',
  'merge-files-glyph',
  'message-circle|round|chat|bubble',
  'message-square|chat|bubble',
  'mic|sound|voice',
  'mic-2|sound|voice',
  'mic-off|sound|voice',
  'microphone|sound|voice',
  'microphone-filled|sound|voice',
  'microscope',
  'microwave',
  'milestone|goal|sign|direction',
  'milk|drink|food',
  'milk-off|drink|food',
  'minimize',
  'minimize-2',
  'minus',
  'minus-circle|round',
  'minus-square',
  'minus-with-circle|round',
  'monitor|screen|display',
  'monitor-off|screen|display',
  'monitor-smartphone|screen|display',
  'monitor-speaker|screen|display',
  'moon|night',
  'more-horizontal|menu',
  'more-vertical|menu',
  'mountain',
  'mountain-snow',
  'mouse',
  'mouse-pointer',
  'mouse-pointer-2',
  'mouse-pointer-click',
  'move',
  'move-3d',
  'move-diagonal',
  'move-diagonal-2',
  'move-horizontal',
  'move-vertical',
  'music',
  'music-2',
  'music-3',
  'music-4',
  'navigate-glyph',
  'navigation',
  'navigation-2',
  'navigation-2-off',
  'navigation-off',
  'network|connect',
  'newspaper|page|magazine',
  'note-glyph|page',
  'number-list-glyph',
  'nut|food',
  'nut-off|food',
  'octagon|shape',
  'open-elsewhere-glyph|out',
  'open-vault',
  'option|choice|junction',
  'outdent|format',
  'package|box|carton',
  'package-2|box|carton',
  'package-check|box|carton',
  'package-minus|box|carton',
  'package-open|box|carton',
  'package-plus|box|carton',
  'package-search|box|carton',
  'package-x|box|carton|close',
  'paint-bucket',
  'paintbrush',
  'paintbrush-2',
  'palette|color|colour',
  'palmtree',
  'pane-layout',
  'paper-plane',
  'paper-plane-glyph',
  'paperclip',
  'party-popper',
  'paste',
  'paste-text',
  'pause',
  'pause-circle|round',
  'pause-octagon',
  'paused',
  'pdf-file|page',
  'pen-tool',
  'pencil',
  'percent',
  'percent-sign-glyph',
  'person-standing',
  'phone|call',
  'phone-call',
  'phone-forwarded|call',
  'phone-incoming|call',
  'phone-missed|call',
  'phone-off|call',
  'phone-outgoing|call',
  'pie-chart',
  'piggy-bank|money',
  'pilcrow|paragraph|punctuation',
  'pin|tack',
  'pin-off|tack',
  'pipette|lab|test',
  'pizza|food',
  'plane|transport|fly',
  'play',
  'play-audio-glyph',
  'play-circle|round',
  'plug|power',
  'plug-2|power',
  'plug-zap|power',
  'plus|add|new',
  'plus-circle|round|add|new',
  'plus-minus-glyph',
  'plus-square|add|new',
  'plus-with-circle|round|add|new',
  'pocket',
  'podcast|transmit|radio',
  'pointer|finger|hand',
  'popup-open',
  'pound-sterling|money|currency',
  'power|on|start',
  'power-off',
  'presentation|screen|display',
  'presentation-glyph|screen|display',
  'price-tag-glyph|label',
  'printer',
  'puzzle|jigsaw',
  'qr-code',
  'question-mark-glyph',
  'quote|punctuation',
  'quote-glyph|punctuation',
  'radio|signal|transmit',
  'radio-receiver|device',
  'reading-glasses|spctacles|see|look',
  'rectangle-horizontal',
  'rectangle-vertical',
  'recycle',
  'redo',
  'redo-2',
  'redo-glyph',
  'refresh-ccw',
  'refresh-cw',
  'refrigerator|fridge',
  'regex',
  'repeat',
  'repeat-1',
  'reply',
  'reply-all',
  'reset',
  'restore-file-glyph',
  'rewind|back',
  'right-arrow',
  'right-arrow-with-tail',
  'right-chevron-glyph',
  'right-triangle|down|arrow',
  'rocket|space',
  'rocking-chair|furniture',
  'rotate-3d',
  'rotate-ccw',
  'rotate-cw',
  'rss',
  'ruler|measure',
  'run-command|cmd|dos',
  'russian-ruble|money|currency',
  'sailboat|sea|transport',
  'save',
  'scale|weight|compare',
  'scale-3d',
  'scaling',
  'scan',
  'scan-face',
  'scan-line',
  'scissors|cut',
  'scissors-glyph|cut',
  'screen-share',
  'screen-share-off',
  'scroll',
  'search',
  'search-glyph',
  'select-all-text',
  'send',
  'separator-horizontal',
  'separator-vertical',
  'server|device',
  'server-cog|device',
  'server-crash|device',
  'server-off|device',
  'settings',
  'settings-2',
  'share',
  'share-2',
  'sheet',
  'sheets-in-box',
  'shield',
  'shield-alert',
  'shield-check',
  'shield-close',
  'shield-off',
  'shirt',
  'shopping-bag',
  'shopping-cart|buy|store',
  'shovel|tool',
  'shower-head',
  'shrink',
  'shrub|plant',
  'shuffle',
  'sidebar',
  'sidebar-close',
  'sidebar-open',
  'sigma',
  'signal',
  'signal-high',
  'signal-low',
  'signal-medium',
  'signal-zero',
  'siren|flashing',
  'skip-back',
  'skip-forward',
  'skull',
  'slack',
  'slash|punctuation',
  'slice|knife',
  'sliders|settings',
  'sliders-horizontal|settings',
  'smartphone|mobile',
  'smartphone-charging|mobile',
  'smile|face',
  'smile-plus|face',
  'snowflake|weather',
  'sofa|furniture',
  'sort-asc',
  'sort-desc',
  'speaker',
  'spline',
  'split',
  'sprout|plant',
  'square|box|shape',
  'stacked-levels|tree|hierarchy|folders',
  'star',
  'star-glyph',
  'star-half',
  'star-list',
  'star-off',
  'stethoscope|health|doctor',
  'sticker',
  'sticky-note',
  'stop-audio-glyph',
  'stop-circle|round',
  'stretch-horizontal',
  'stretch-vertical',
  'strikethrough|format',
  'strikethrough-glyph|format',
  'subscript|format',
  'subtitles|message',
  'sun|weather|bright|day',
  'sun-dim|weather|bright',
  'sun-medium|weather|bright',
  'sun-moon|weather|night',
  'sun-snow|weather',
  'sunrise|weather',
  'sunset|weather',
  'superscript',
  'swiss-franc',
  'switch',
  'switch-camera',
  'sword|weapon',
  'swords|weapon',
  'sync',
  'sync-small',
  'syringe|health|medicine',
  'table',
  'table-2',
  'tablet',
  'tag',
  'tag-glyph',
  'tags',
  'target',
  'tent',
  'terminal',
  'terminal-square',
  'text-cursor|caret',
  'text-cursor-input|caret',
  'thermometer|hot',
  'thermometer-snowflake|cold',
  'thermometer-sun|hot|warm',
  'three-horizontal-bars',
  'thumbs-down',
  'thumbs-up',
  'ticket',
  'timer|stopwatch',
  'timer-off|stopwatch',
  'timer-reset|stopwatch',
  'toggle-left',
  'toggle-right',
  'tomorrow-glyph',
  'tornado|weather',
  'toy-brick|lego',
  'train|transport',
  'trash|bin',
  'trash-2|bin',
  'tree-deciduous',
  'tree-pine',
  'trees',
  'trello',
  'trending-down',
  'trending-up',
  'triangle|shape',
  'trophy|reward|award',
  'truck|transport',
  'tv',
  'tv-2',
  'twitch',
  'twitter',
  'two-blank-pages',
  'type|format',
  'umbrella',
  'underline|format',
  'undo',
  'undo-2',
  'undo-glyph',
  'unindent-glyph',
  'unlink',
  'unlink-2',
  'unlock',
  'up-and-down-arrows',
  'up-arrow-with-tail',
  'up-chevron-glyph',
  'up-curly-arrow-glyph',
  'upload',
  'upload-cloud',
  'uppercase-lowercase-a|letter|char|format',
  'usb|port',
  'user|person',
  'user-check|person',
  'user-cog|person',
  'user-minus|person|remove',
  'user-plus|person|add|new',
  'user-x|close|exit|leave',
  'users|persons|people',
  'utensils|food',
  'utensils-crossed|food',
  'vault',
  'vegan|food',
  'venetian-mask',
  'verified',
  'vertical-split',
  'vertical-three-dots',
  'vibrate',
  'vibrate-off',
  'video|camera|movie',
  'video-off|camera|movie',
  'view|eye|look',
  'voicemail',
  'volume',
  'volume-1',
  'volume-2',
  'volume-x',
  'wallet|money',
  'wand|magic',
  'wand-2|magic',
  'wand-glyph|magic',
  'watch|time|clocl',
  'waves|sea|water',
  'webcam|camera',
  'webhook',
  'wheat|plant|food',
  'wheat-off|plant|food',
  'wifi',
  'wifi-off',
  'wind|weather',
  'wine|drink',
  'wine-off',
  'workspace-glyph',
  'wrap-text',
  'wrench|tool|setting',
  'wrench-screwdriver-glyph|tool|setting',
  'x|close|exit|leave',
  'x-circle|round|close|exit|leave',
  'x-octagon|close|exit|leave',
  'x-square|close|exit|leave',
  'yesterday-glyph',
  'youtube',
  'zap|power',
  'zap-off|power',
  'zoom-in',
  'zoom-out',
];