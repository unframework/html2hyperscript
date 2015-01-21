
var fs = require('fs');
var Parser = require('htmlparser2').Parser;

var elementStack = [];

function ItemList(parent) {
    this.parent = parent;
    this.content = '';
    this.spacer = '';
    this.isFirstItem = true;
}

ItemList.prototype.addSpace = function (space) {
    this.spacer += space;
}

ItemList.prototype.add = function (data, ignoreComma) {
    if (!ignoreComma) {
        if (!this.isFirstItem) {
            this.content += this.spacer.length ? ',' : ', ';
        }

        this.isFirstItem = false;
    }

    this.content += this.spacer;
    this.spacer = '';

    this.content += data;
}

var currentItemList = new ItemList(null);

var parser = new Parser({
    onopentag: function (name, attribs) {
        currentItemList = new ItemList(currentItemList);
        elementStack.unshift([ name, attribs ]);
    },
    ontext: function (text) {
        var lines = text.split("\n");

        var isFirst = true;

        lines.forEach(function (line) {
            var lineMatch = /^(\s*)(.*?)(\s*)$/.exec(line);

            var preSpace = lineMatch[1],
                mainText = lineMatch[2],
                postSpace = lineMatch[3];

            if (!isFirst) {
                currentItemList.addSpace("\n");
            }

            currentItemList.addSpace(preSpace);

            if (mainText.length > 0) {
                currentItemList.add(JSON.stringify(mainText));
            }

            isFirst = false;
        });
    },
    onclosetag: function (tagname) {
        var element = elementStack.shift();
        var elementContent = currentItemList.content + currentItemList.spacer;

        var item = 'h(' + JSON.stringify(element[0]) + (
            elementContent.length
                ? ', [' + elementContent + ']'
                : ''
        ) + ')';

        currentItemList = currentItemList.parent;
        currentItemList.add(item);
    },
    oncomment: function (text) {
        currentItemList.add('/*' + text + '*/', false); // @todo comment-safety
    }
}, {decodeEntities: true});

parser.write(fs.readFileSync(process.argv[2]));
parser.end();

process.stdout.write(currentItemList.content);
