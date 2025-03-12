"use strict";
exports.__esModule = true;
exports.PageList = exports.byDateAndAlphabetical = void 0;
var path_1 = require("../util/path");
var Date_1 = require("./Date");
function byDateAndAlphabetical(cfg) {
    return function (f1, f2) {
        var _a, _b, _c, _d;
        if (f1.dates && f2.dates) {
            // sort descending
            return Date_1.getDate(cfg, f2).getTime() - Date_1.getDate(cfg, f1).getTime();
        }
        else if (f1.dates && !f2.dates) {
            // prioritize files with dates
            return -1;
        }
        else if (!f1.dates && f2.dates) {
            return 1;
        }
        // otherwise, sort lexographically by title
        var f1Title = (_b = (_a = f1.frontmatter) === null || _a === void 0 ? void 0 : _a.title.toLowerCase()) !== null && _b !== void 0 ? _b : "";
        var f2Title = (_d = (_c = f2.frontmatter) === null || _c === void 0 ? void 0 : _c.title.toLowerCase()) !== null && _d !== void 0 ? _d : "";
        return f1Title.localeCompare(f2Title);
    };
}
exports.byDateAndAlphabetical = byDateAndAlphabetical;
exports.PageList = function (_a) {
    var cfg = _a.cfg, fileData = _a.fileData, allFiles = _a.allFiles, limit = _a.limit, sort = _a.sort, isTagPage = _a.isTagPage;
    var sorter = sort !== null && sort !== void 0 ? sort : byDateAndAlphabetical(cfg);
    var list = allFiles.sort(sorter);
    if (limit) {
        list = list.slice(0, limit);
    }
    return (React.createElement("ul", { "class": "section-ul" }, list.map(function (page) {
        var _a, _b, _c, _d;
        var title = (_a = page.frontmatter) === null || _a === void 0 ? void 0 : _a.title;
        var unfilteredTags = (_c = (_b = page.frontmatter) === null || _b === void 0 ? void 0 : _b.tags) !== null && _c !== void 0 ? _c : [];
        var _excludeStrings = ["exclude"];
        var tags = unfilteredTags.filter(function (tag) { return !_excludeStrings.some(function (excludeString) { return tag.includes(excludeString); }); });
        var slugParts = (_d = page.slug) === null || _d === void 0 ? void 0 : _d.split("/");
        var trimmedSlug = slugParts === null || slugParts === void 0 ? void 0 : slugParts.slice(0, -1).join("/");
        return (React.createElement("li", { "class": "section-li" },
            React.createElement("div", { "class": "section" },
                React.createElement("p", { "class": "meta" }, page.dates && React.createElement(Date_1.Date, { date: Date_1.getDate(cfg, page), locale: cfg.locale })),
                React.createElement("div", { "class": "desc" },
                    React.createElement("h3", null,
                        React.createElement("a", { href: path_1.resolveRelative(fileData.slug, page.slug), "class": "internal" }, title),
                        isTagPage && (React.createElement("span", { "class": "slug-pagelist desktop-only", title: "Slug" },
                            "\u27E1 ",
                            trimmedSlug ? "/" + trimmedSlug + "/" : '/')))))));
    })));
};
exports.PageList.css = "\n.section h3 {\n  margin: 0;\n}\n\n.section > .tags {\n  margin: 0;\n}\n";
