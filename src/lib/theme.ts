export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: light by default, dark only if the visitor chose it.
 * Lives outside the client component so the server layout can inline it as a plain string.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;
