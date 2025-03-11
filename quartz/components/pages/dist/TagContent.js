"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var listPage_scss_1 = require("../styles/listPage.scss");
var PageList_1 = require("../PageList");
var path_1 = require("../../util/path");
var jsx_1 = require("../../util/jsx");
var i18n_1 = require("../../i18n");
var defaultOptions = {
    numPages: 10
};
exports["default"] = (function (opts) {
    var options = __assign(__assign({}, defaultOptions), opts);
    var TagContent = function (props) {
        var _a, _b, _c;
        var tree = props.tree, fileData = props.fileData, allFiles = props.allFiles, cfg = props.cfg;
        var slug = fileData.slug;
        if (!((slug === null || slug === void 0 ? void 0 : slug.startsWith("tags/")) || slug === "tags")) {
            throw new Error("Component \"TagContent\" tried to render a non-tag page: " + slug);
        }
        var tag = path_1.simplifySlug(slug.slice("tags/".length));
        var allPagesWithTag = function (tag) {
            return allFiles.filter(function (file) { var _a, _b; return ((_b = (_a = file.frontmatter) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : []).flatMap(path_1.getAllSegmentPrefixes).includes(tag); });
        };
        var content = tree.children.length === 0
            ? fileData.description
            : jsx_1.htmlToJsx(fileData.filePath, tree);
        var cssClasses = (_b = (_a = fileData.frontmatter) === null || _a === void 0 ? void 0 : _a.cssclasses) !== null && _b !== void 0 ? _b : [];
        var classes = cssClasses.join(" ");
        if (tag === "/") {
            var unfilteredtags = __spreadArrays(new Set(allFiles.flatMap(function (data) { var _a, _b; return (_b = (_a = data.frontmatter) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : []; }).flatMap(path_1.getAllSegmentPrefixes))).sort(function (a, b) { return a.localeCompare(b); });
            var _excludeStrings_1 = ["exclude"];
            var tags = unfilteredtags.filter(function (tag) { return !_excludeStrings_1.some(function (excludeString) { return tag.includes(excludeString); }); });
            var renderAllTagsList = function (tags, cfg) {
                return (React.createElement("div", { "class": "all-tags-list" },
                    React.createElement("p", { "class": "all-tags-list-p" }, tags.map(function (tag, index) { return (React.createElement(React.Fragment, null,
                        React.createElement("a", { "class": "internal tag-link", href: "../tags/" + tag }, tag),
                        index < tags.length - 1 && " ")); }))));
            };
            var tagItemMap_1 = new Map();
            for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                var tag_1 = tags_1[_i];
                tagItemMap_1.set(tag_1, allPagesWithTag(tag_1));
            }
            return (React.createElement("div", { "class": "popover-hint" },
                React.createElement("article", { "class": classes },
                    React.createElement("p", null, content)),
                React.createElement("p", null, i18n_1.i18n(cfg.locale).pages.tagContent.totalTags({ count: tags.length })),
                renderAllTagsList(tags, cfg),
                React.createElement("p", { "class": "page-sparkle-divider" }, " __________________________________ \u2731\u2731\u2731 ________________________________ "),
                React.createElement("div", null, tags.map(function (tag) {
                    var pages = tagItemMap_1.get(tag);
                    var listProps = __assign(__assign({}, props), { allFiles: pages });
                    var contentPage = allFiles.filter(function (file) { return file.slug === "tags/" + tag; }).at(0);
                    var root = contentPage === null || contentPage === void 0 ? void 0 : contentPage.htmlAst;
                    var content = !root || (root === null || root === void 0 ? void 0 : root.children.length) === 0
                        ? contentPage === null || contentPage === void 0 ? void 0 : contentPage.description : jsx_1.htmlToJsx(contentPage.filePath, root);
                    return (React.createElement("div", null,
                        React.createElement("h2", null,
                            React.createElement("a", { "class": "internal tag-link", href: "../tags/" + tag }, tag)),
                        content && React.createElement("p", null, content),
                        React.createElement("div", { "class": "page-listing" },
                            React.createElement("p", null,
                                i18n_1.i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length }),
                                pages.length > options.numPages && (React.createElement(React.Fragment, null,
                                    " ",
                                    React.createElement("span", null, i18n_1.i18n(cfg.locale).pages.tagContent.showingFirst({
                                        count: options.numPages
                                    }))))),
                            React.createElement(PageList_1.PageList, __assign({ limit: options.numPages }, listProps, { sort: options === null || options === void 0 ? void 0 : options.sort, isTagPage: "true" })))));
                }))));
        }
        else {
            var pages = allPagesWithTag(tag);
            var listProps = __assign(__assign({}, props), { allFiles: pages });
            // If baseUrl contains a pathname after the domain, use this as the home link
            var url = new URL("https://" + ((_c = cfg.baseUrl) !== null && _c !== void 0 ? _c : "example.com"));
            var baseDir = url.pathname;
            return (React.createElement("div", { "class": classes },
                React.createElement("article", { "class": "popover-hint" }, content),
                React.createElement("div", { "class": "page-listing" },
                    React.createElement("p", null, i18n_1.i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })),
                    React.createElement("p", { "class": "page-sparkle-divider" }, "\u2500\u2500\u2500 \u2731\u2731\u2731 \u2500\u2500\u2500"),
                    React.createElement("div", null,
                        React.createElement(PageList_1.PageList, __assign({}, listProps, { sort: options === null || options === void 0 ? void 0 : options.sort, isTagPage: "true" })))),
                React.createElement("a", { href: baseDir, "class": "internal" }, i18n_1.i18n(cfg.locale).pages.error.home)));
        }
    };
    TagContent.css = listPage_scss_1["default"] + PageList_1.PageList.css;
    return TagContent;
});
satisfies;
QuartzComponentConstructor;
