export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: a saved choice wins, otherwise follow the OS.
 * Lives outside the client component so the server layout can inline it as a plain string.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;
