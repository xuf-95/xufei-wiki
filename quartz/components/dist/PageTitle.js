"use strict";
exports.__esModule = true;
var path_1 = require("../util/path");
var lang_1 = require("../util/lang");
var i18n_1 = require("../i18n");
var PageTitle = function (_a) {
    var _b;
    var fileData = _a.fileData, cfg = _a.cfg, displayClass = _a.displayClass;
    var title = (_b = cfg === null || cfg === void 0 ? void 0 : cfg.pageTitle) !== null && _b !== void 0 ? _b : i18n_1.i18n(cfg.locale).propertyDefaults.title;
    var baseDir = path_1.pathToRoot(fileData.slug);
    return (React.createElement("h2", { "class": lang_1.classNames(displayClass, "page-title") },
        React.createElement("a", { href: baseDir }, title)));
};
PageTitle.css = "\n.page-title {\n  font-size: 1.75rem;\n  margin: 0;\n}\n";
exports["default"] = (function () { return PageTitle; });
satisfies;
QuartzComponentConstructor;
