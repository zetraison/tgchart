export const loadCss = (options, callback) => {
    callback   = callback || function() {};

    const css = document.createElement("link");
    css.type = "text/css";
    css.rel = "stylesheet";
    css.onload = css.onreadystatechange = function() {
        callback();
    };

    css.href = options.cssPath;
    document.getElementsByTagName("head")[0].appendChild(css);
};