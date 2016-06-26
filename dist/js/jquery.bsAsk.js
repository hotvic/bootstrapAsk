/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function ($) {
    'use strict';

    $.bsAsk = function (element, options) {
        var defaults = {
            container: false,
            placement: 'right',
            title: 'jQuery bsAsk',
            trigger: 'click',
            content: 'Content goes here...',
            buttons: false,
            hideOnAction: true,
        }

        var plugin = this;

        var $element = $(element);

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            var pop_settings = {
                container: plugin.settings.container,
                placement: plugin.settings.placement,
                title: plugin.settings.title,
                trigger: plugin.settings.trigger,
                html: $.isPlainObject(plugin.settings.content) ? true : false,
                content: $.isPlainObject(plugin.settings.content) ? obect2html(plugin.settings.content) : plugin.settings.content,
            }

            if (!plugin.settings.buttons == false)
            {
                pop_settings['template'] = '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div style="padding: 5px; background-color: #f7f7f7; border-top: 1px solid #ebebeb; display: flex; justify-content: space-between;" class="popover-buttons"></div></div>'
            }

            var popover = $element.popover(pop_settings);

            if ($.isPlainObject(plugin.settings.buttons))
            {
                var buttons = popover.data('bs.popover').tip().find('.popover-buttons');

                for (var key in plugin.settings.buttons)
                {
                    if (key == 'callback')
                    {
                        popover.on('action', plugin.settings.buttons[key])
                    } else {
                        var button = $.extend({
                            type: 'btn-default',
                            class: 'pull-left',
                        }, plugin.settings.buttons[key]);

                        var $button = $('<a/>');
                        $button.addClass('btn btn-sm btn-flat').addClass(button.type).addClass(button.class)
                        $button.text(button.text)
                        $button.on('click', function(e) {
                            e.preventDefault();

                            popover.trigger('action', [key]);

                            if (plugin.settings.hideOnAction)
                                popover.popover('hide');
                        });

                        buttons.append($button);
                    }
                }
            }
        }

        var obect2html = function (object) {
            if ($.isPlainObject(object))
            {
                var $root = $('<div/>');

                for (var key in object)
                {
                    if ($.isPlainObject(object[key]))
                    {
                        $root.append(obect2html(obj[key]))
                    } else {
                        $root.append($('<' + key + '/>').text(obj[key]))
                    }
                }
            }

            return $root.html();
        }

        plugin.init();
    }

    $.fn.bsAsk = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('bsAsk'))
            {
                var plugin = new $.bsAsk(this, options);

                $(this).data('bsAsk', plugin);
            }
        });
    }
})(jQuery);