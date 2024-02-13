// ==UserScript==
// @name         osu!videlyalka
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  osu!выделялка, чтобы обсуджать карты всем селом)
// @author       You
// @match        http://osu.ppy.sh/*
// @match        https://osu.ppy.sh/*
// @run-at       document-idle

// @grant    GM_setValue
// @grant    GM_getValue
// @grant    GM_listValues

// @noframes
// ==/UserScript==

/*global $ */

/*
это дерьмо ебучее реально бета версия да епта альфа нахуй преальфа development-release :):)


reestick is gay btw!!!
*/

const TAGS = [
    {
        "id": 1,
        "name": "jump aim",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 237,
            "g": 21,
            "b": 9
        } // #ed1509
    },
    {
        "id": 2,
        "name": "anti aim",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 212,
            "g": 17,
            "b": 56
        } // #d41138
    },
    {
        "id": 3,
        "name": "flow aim",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 245,
            "g": 110,
            "b": 56
        } // #f56e38
    },
    {
        "id": 4,
        "name": "aim control",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 212,
            "g": 59,
            "b": 17
        } // #d43b11
    },
    {
        "id": 5,
        "name": "streams",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 245,
            "g": 115,
            "b": 152
        } // #f57398
    },
    {
        "id": 6,
        "name": "tapping stamina",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 9,
            "g": 237,
            "b": 17
        } // #09ed11
    },
    {
        "id": 7,
        "name": "speed",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 242,
            "g": 80,
            "b": 196
        } // #f250c4
    },
    {
        "id": 8,
        "name": "finger control",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 130,
            "g": 99,
            "b": 242
        } // #8263f2
    },
    {
        "id": 9,
        "name": "reading",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 9,
            "g": 9,
            "b": 237
        } // #0909ed
    },
    {
        "id": 10,
        "name": "tech",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 237,
            "g": 9,
            "b": 199
        } // #ed09c7
    },
    {
        "id": 11,
        "name": "fast sliders",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 143,
            "g": 46,
            "b": 179
        } // #8f2eb3
    },
    {
        "id": 12,
        "name": "accuracy",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 33,
            "g": 216,
            "b": 222
        } // #21d8de
    },
    {
        "id": 13,
        "name": "consistency",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 248,
            "g": 255,
            "b": 31
        } // #f8ff1f
    },
    {
        "id": 14,
        "name": "changing rhythm",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 242,
            "g": 187,
            "b": 99
        } // #f2bb63
    },
    {
        "id": 15,
        "name": "gimmick",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 52,
            "g": 227,
            "b": 148
        } // #34e394
    },
    {
        "id": 16,
        "name": "farm",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 223,
            "g": 229,
            "b": 232
        } // #dfe5e8
    },
    {
        "id": 17,
        "name": "alternate",
        "isActive": function() {
            return !!GM_getValue(`${getCurrentBeatmapId()}:${this.id}`);
        },
        "color": {
            "r": 38,
            "g": 255,
            "b": 31
        } // #26ff1f}
    }
];

const CONTAINER_CLASS = "osuvidelyalka-container";
const HEADER_CLASS = "osuvidelyalka-header";
const TAGS_CLASS = "osuvidelyalka-tag-list";
const TAGS_ITEM_CLASS = "osuvidelyalka-tag-item";

// SHIT SHIT SHIT ну реально говно ебучее не надо так
const hrefCheck = () => {
    var currentURL = window.location.href;

    setInterval(function() {
        if (window.location.href !== currentURL) {
            currentURL = window.location.href;

            window.location.reload(); // force reload
        }
    }, 300);
};

(() => {
    'use strict';

    hrefCheck();

    window.addEventListener('load', function() {
        console.log('осу выделялка загружена :3');

        main();
    }, false);
})();

const main = () => {
    addVidelyalkaContainer(TAGS);
};

const addVidelyalkaContainer = (tags) => {
    $(".beatmapset-header").after(
        $('<div>')
            .addClass(CONTAINER_CLASS)
            .css({
                '-webkit-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
                'display': 'flex',
                'flex-direction': 'column',
                'background-color': '#171A1C'
            })
            .append(
                $('<div>')
                    .addClass(HEADER_CLASS)
                    .css({
                        'font-size': '32px',
                        'height': '64px',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'background-color': '#242424',
                        'border-radius': '32px'
                    })
                    .text('osu!videlyalka')
            )
            .append(getVidelyalkaTags(tags))
    );
};

const getVidelyalkaTags = (tags) => {
    const itemsHTML = tags.reduce((acc, e) => {
        const html = $('<span>')
            .mouseover(function() {
                $(this).css('border-color', `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, 0.5)`);
            })
            .mouseout(function() {
                $(this).css('border-color', 'rgba(219, 219, 219, 0.5)');
            })
            .click(function() {
                GM_setValue(`${getCurrentBeatmapId()}:${e.id}`, !e.isActive());

                const currentBackgroundColor = $(this).css('background-color');
                const newBackgroundColor = e.isActive() ? `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, 0.5)` : '';
                $(this).css('background-color', newBackgroundColor);
            })
            .css({
                'text-align': 'center',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'border': 'solid',
                'background-color': e.isActive() ? `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, 0.5)` : '',
                'border-color': 'rgba(219,219,219,0.5)',
                'border-radius': '8px'
            })
            .addClass(TAGS_ITEM_CLASS)
            .text(e.name);

        return acc.append(html);
    }, $('<div>').css({
        'background-color': '#121212',
        'padding': '16px',
        'display': 'grid',
        'gap': '8px',
        'grid-template-columns': 'repeat(auto-fit, minmax(100px, 1fr))'
    }));

    return itemsHTML;
};

const getCurrentBeatmapId = () => {
    const url = document.URL ?? window.location.href;
    const regex = /\/beatmapsets\/(\d+).*\/(\d+)/;
    const match = url.match(regex);

    if (!match) {
        return -1;
    }

    return match[match.length - 1];
};
