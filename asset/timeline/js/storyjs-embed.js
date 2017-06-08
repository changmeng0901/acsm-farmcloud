/*
    TimelineJS - ver. 2015-06-10-16-17-35 - 2015-06-10
    Copyright (c) 2012-2015 Northwestern University
    a project of the Northwestern University Knight Lab, originally created by Zach Wise
    https://github.com/NUKnightLab/TimelineJS
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
    If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
LazyLoad = function(doc) {
    var env, head, pending = {},
    pollCount = 0,
    queue = {
        css: [],
        js: []
    },
    styleSheets = doc.styleSheets;
    function createNode(name, attrs) {
        var node = doc.createElement(name),
        attr;
        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                node.setAttribute(attr, attrs[attr])
            }
        }
        return node
    }
    function finish(type) {
        var p = pending[type],
        callback,
        urls;
        if (p) {
            callback = p.callback;
            urls = p.urls;
            urls.shift();
            pollCount = 0;
            if (!urls.length) {
                callback && callback.call(p.context, p.obj);
                pending[type] = null;
                queue[type].length && load(type)
            }
        }
    }
    function getEnv() {
        var ua = navigator.userAgent;
        env = {
            async: doc.createElement("script").async === true
        }; (env.webkit = /AppleWebKit\//.test(ua)) || (env.ie = /MSIE/.test(ua)) || (env.opera = /Opera/.test(ua)) || (env.gecko = /Gecko\//.test(ua)) || (env.unknown = true)
    }
    function load(type, urls, callback, obj, context) {
        var _finish = function() {
            finish(type)
        },
        isCSS = type === "css",
        nodes = [],
        i,
        len,
        node,
        p,
        pendingUrls,
        url;
        env || getEnv();
        if (urls) {
            urls = typeof urls === "string" ? [urls] : urls.concat();
            if (isCSS || env.async || env.gecko || env.opera) {
                queue[type].push({
                    urls: urls,
                    callback: callback,
                    obj: obj,
                    context: context
                })
            } else {
                for (i = 0, len = urls.length; i < len; ++i) {
                    queue[type].push({
                        urls: [urls[i]],
                        callback: i === len - 1 ? callback: null,
                        obj: obj,
                        context: context
                    })
                }
            }
        }
        if (pending[type] || !(p = pending[type] = queue[type].shift())) {
            return
        }
        head || (head = doc.head || doc.getElementsByTagName("head")[0]);
        pendingUrls = p.urls;
        for (i = 0, len = pendingUrls.length; i < len; ++i) {
            url = pendingUrls[i];
            if (isCSS) {
                node = env.gecko ? createNode("style") : createNode("link", {
                    href: url,
                    rel: "stylesheet"
                })
            } else {
                node = createNode("script", {
                    src: url
                });
                node.async = false
            }
            node.className = "lazyload";
            node.setAttribute("charset", "utf-8");
            if (env.ie && !isCSS) {
                node.onreadystatechange = function() {
                    if (/loaded|complete/.test(node.readyState)) {
                        node.onreadystatechange = null;
                        _finish()
                    }
                }
            } else if (isCSS && (env.gecko || env.webkit)) {
                if (env.webkit) {
                    p.urls[i] = node.href;
                    pollWebKit()
                } else {
                    node.innerHTML = '@import "' + url + '";';
                    pollGecko(node)
                }
            } else {
                node.onload = node.onerror = _finish
            }
            nodes.push(node)
        }
        for (i = 0, len = nodes.length; i < len; ++i) {
            head.appendChild(nodes[i])
        }
    }
    function pollGecko(node) {
        var hasRules;
        try {
            hasRules = !!node.sheet.cssRules
        } catch(ex) {
            pollCount += 1;
            if (pollCount < 200) {
                setTimeout(function() {
                    pollGecko(node)
                },
                50)
            } else {
                hasRules && finish("css")
            }
            return
        }
        finish("css")
    }
    function pollWebKit() {
        var css = pending.css,
        i;
        if (css) {
            i = styleSheets.length;
            while (--i >= 0) {
                if (styleSheets[i].href === css.urls[0]) {
                    finish("css");
                    break
                }
            }
            pollCount += 1;
            if (css) {
                if (pollCount < 200) {
                    setTimeout(pollWebKit, 50)
                } else {
                    finish("css")
                }
            }
        }
    }
    return {
        css: function(urls, callback, obj, context) {
            load("css", urls, callback, obj, context)
        },
        js: function(urls, callback, obj, context) {
            load("js", urls, callback, obj, context)
        }
    }
} (this.document);
LoadLib = function(doc) {
    var loaded = [];
    function isLoaded(url) {
        var i = 0,
        has_loaded = false;
        for (i = 0; i < loaded.length; i++) {
            if (loaded[i] == url) {
                has_loaded = true
            }
        }
        if (has_loaded) {
            return true
        } else {
            loaded.push(url);
            return false
        }
    }
    return {
        css: function(urls, callback, obj, context) {
            if (!isLoaded(urls)) {
                LazyLoad.css(urls, callback, obj, context)
            }
        },
        js: function(urls, callback, obj, context) {
            if (!isLoaded(urls)) {
                LazyLoad.js(urls, callback, obj, context)
            }
        }
    }
} (this.document);
var WebFontConfig;
if (typeof embed_path == "undefined") {
    var _tmp_script_path = getEmbedScriptPath("storyjs-embed.js");
    var embed_path = _tmp_script_path.substr(0, _tmp_script_path.lastIndexOf("js/"))
}
function getEmbedScriptPath(scriptname) {
    var scriptTags = document.getElementsByTagName("script"),
    script_path = "",
    script_path_end = "";
    for (var i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].src.match(scriptname)) {
            script_path = scriptTags[i].src
        }
    }
    if (script_path != "") {
        script_path_end = "/"
    }
    return script_path.split("?")[0].split("/").slice(0, -1).join("/") + script_path_end
} (function() {
   /* if (typeof url_config == "object") {
        createStoryJS(url_config)
    } else if (typeof timeline_config == "object") {
        createStoryJS(timeline_config)
    } else if (typeof storyjs_config == "object") {
        createStoryJS(storyjs_config)
    } else if (typeof config == "object") {
        createStoryJS(config)
    } else {}*/
})();
var storyjs_embedjs,aaaaa;
function createStoryJS(c, src) {
    var t, te, x, isCDN = false,
    storyjs_e_config = {
        debug: false,
        type: "timeline",
        id: "storyjs",
        embed_id: "timeline-embed",
        embed: true,
        width: "100%",
        height: "100%",
        source: "https://docs.google.com/spreadsheet/pub?key=0Agl_Dv6iEbDadFYzRjJPUGktY0NkWXFUWkVIZDNGRHc&output=html",
        lang: "en",
        font: "default",
        api_keys: {
            google: "",
            flickr: "",
            twitter: ""
        },
        gmap_key: ""
    };
    if (typeof c == "object") {
        for (x in c) {
            if (Object.prototype.hasOwnProperty.call(c, x)) {
                storyjs_e_config[x] = c[x]
            }
        }
    }
    if (typeof src != "undefined") {
        storyjs_e_config.source = src
    }
    createEmbedDiv();
    buildEmbed();
    function createEmbedDiv() {
        var embed_classname = "storyjs-embed";
        t = document.createElement("div");
        if (storyjs_e_config.embed_id != "") {
            te = document.getElementById(storyjs_e_config.embed_id)
        } else {
            te = document.getElementById("timeline-embed")
        }
        te.appendChild(t);
        t.setAttribute("id", storyjs_e_config.id);
        if (storyjs_e_config.width.toString().match("%")) {
            te.style.width = storyjs_e_config.width.split("%")[0] + "%"
        } else {
            storyjs_e_config.width = storyjs_e_config.width - 2;
            te.style.width = storyjs_e_config.width + "px"
        }
        if (storyjs_e_config.height.toString().match("%")) {
            te.style.height = storyjs_e_config.height;
            embed_classname += " full-embed";
            te.style.height = storyjs_e_config.height.split("%")[0] + "%"
        } else if (storyjs_e_config.width.toString().match("%")) {
            embed_classname += " full-embed";
            storyjs_e_config.height = storyjs_e_config.height ;
            te.style.height = storyjs_e_config.height + "px"
        } else {
            embed_classname += " sized-embed";
            storyjs_e_config.height = storyjs_e_config.height - 16;
            te.style.height = storyjs_e_config.height + "px"
        }
        te.setAttribute("class", embed_classname);
        te.setAttribute("className", embed_classname);
        t.style.position = "relative"
    }
    function buildEmbed() {
        VMM.debug = false;
        //window.location.hash = 0 ;
        if(typeof(storyjs_embedjs) == "undefined"){
        	storyjs_embedjs = new VMM.Timeline(storyjs_e_config.id);
        	storyjs_embedjs.init(storyjs_e_config);
        }else{
        	storyjs_embedjs.reset();
        	storyjs_embedjs = new VMM.Timeline(storyjs_e_config.id);
        	storyjs_embedjs.init(storyjs_e_config);
        }
        if (isCDN) {
            VMM.bindEvent(global, onHeadline, "HEADLINE")
        }
    }
}