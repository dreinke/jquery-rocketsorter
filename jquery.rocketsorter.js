/*!
 *  Project: jQuery RocketSorter
 *  Description: A recursive table sorter
 *  Author: Davi Reinke
 *  Contributor: Vinicius Ebersol
 *  License: MIT License
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function ($, window, document) {
    var pluginName = "rocketSorter",
        defaults = {
            parameters: [{
                coll: 0,
                method: 'alphabetic',
                reverse: false
            }],
            customSorters: {
                'alphabetic': function (a, b) {
                    return a > b ? 1 : -1;
                },

                'numeric': function (a, b) {
                    a = parseInt(a, 10);
                    b = parseInt(b, 10);
                    return a - b;
                },

                'currency': function (a, b) {
                    var regex = new RegExp(/[£$€]/g);
                    a = parseFloat(a.replace(regex, ''));
                    b = parseFloat(b.replace(regex, ''));
                    return a - b;
                },

                'percent': function (a, b) {
                    var regex = new RegExp(/%/g);
                    a = parseFloat(a.replace(regex, ''));
                    b = parseFloat(b.replace(regex, ''));
                    return a - b;
                }
            }
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend(true, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.sorters = {};

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var _this = this;

            this.sorters = this.options.customSorters;

            this.element.each(function () {
                _this.parseTable(this, _this.options.parameters);
            });
        },

        parseTable: function (table, parameters) {
            var _this = this,
                tableObj = $(table),
                tbody = tableObj.find('tbody'),
                tableRows = tbody.find('tr'),
                rowsLength = tableRows.length,
                rows = [],
                i = 0;

            for (i = 0; i < rowsLength; i++) {
                rows.push(tableRows[i]);
            }

            rows = this.sortRows(rows, parameters);

            for (i = 0; i < rowsLength; i++) {
                tbody.append(rows[i]);
            }
        },

        sortRows: function (rows, params) {
            var i,
            _this = this,
                parameters = [].concat(params),
                param = parameters.shift(),
                rowsLength = rows.length;

            rows.sort(function (rowA, rowB) {
                var a = $(rowA.cells[param.coll]).html(),
                    b = $(rowB.cells[param.coll]).html();

                return _this.sorters[param.method](a, b);
            });

            if (param.reverse) {
                rows.reverse();
            }

            if (parameters.length > 0) {
                var equalRows = [rows[0]],
                    result = [];

                for (i = 0; i < rowsLength - 1; i++) {
                    if (rows[i].cells[param.coll].innerHTML == rows[i + 1].cells[param.coll].innerHTML) {
                        equalRows.push(rows[i + 1]);
                    } else {
                        result = result.concat(this.sortRows(equalRows, parameters));
                        equalRows = [rows[i + 1]];
                    }
                }

                result = result.concat(rows[rowsLength - 1]);
                return result;
            } else {
                return rows;
            }
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
