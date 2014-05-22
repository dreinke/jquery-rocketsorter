/*!
 *  Project: jQuery RocketSorter
 *  Description: A recursive table sorter
 *  Author: Davi Reinke
 *  Contributor: Vinicius Ebersol
 *  Repository: https://github.com/dreinke/jquery-rocketsorter
 *  License: MIT License
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function ($, window, document) {
    var defaults = {
            parameters: [{
                coll: 0,
                method: 'alphabetic',
                reverse: false
            }],
            sorters: {
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
        this.sorters = $.extend(true, defaults.sorters, options.sorters);
        this.parameters = $.extend(true, defaults.parameters, options.parameters);

        this.table = $(element);
        this.tbody = this.table.find('tbody');
        this.tableRows = this.tbody.find('tr');

        if (options.parameters) {
            this.sortBy(this.parameters);
        }
    }

    Plugin.prototype = {
        sortBy: function (params) {
            var _this = this,
                parameters = $.extend(true, this.parameters, params),
                rowsLength = this.tableRows.length,
                rows = [],
                i = 0;

            for (i = 0; i < rowsLength; i++) {
                rows.push(this.tableRows[i]);
            }

            rows = this.sortRows(rows, parameters);

            for (i = 0; i < rowsLength; i++) {
                this.tbody.append(rows[i]);
            }
        },

        sortRows: function (rows, params) {
            var i,
                _this = this,
                parameters = [].concat(params),
                param = parameters.shift(),
                rowsLength = rows.length;

            rows.sort(function (rowA, rowB) {
                var a = $(rowA.cells[param.coll]),
                    b = $(rowB.cells[param.coll]);

                if (a.data('value') && b.data('value'))

                return _this.sorters[param.method](
                    a.data('value')? a.data('value') : a.html(),
                    b.data('value')? b.data('value') : b.html()
                );
            });

            if (param.reverse) {
                rows.reverse();
            }

            if (parameters.length > 0) {
                var equalRows = [rows[0]],
                    result = [];

                for (i = 1; i < rowsLength; i++) {
                    if (equalRows[0].cells[param.coll].innerHTML == rows[i].cells[param.coll].innerHTML) {
                        equalRows = equalRows.concat(rows[i]);
                    } else {
                        result = result.concat(equalRows.length > 1? this.sortRows(equalRows, parameters) : equalRows);
                        equalRows = [rows[i]];
                    }
                }

                result = result.concat(equalRows.length > 1? this.sortRows(equalRows, parameters) : equalRows);
                return result;
            } else {
                return rows;
            }
        }
    };

    $.fn.rocketSorter = function (options) {
        return new Plugin(this, options? options : {});
    };
})(jQuery, window, document);
