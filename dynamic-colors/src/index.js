// import tinycolor from "tinycolor2";
import tinycolor from "./../node_modules/tinycolor2/dist/tinycolor-min.js";

let excludeSelectors = [];
let excludeBgOverlay = [];
// console.log("free dynamic index");
// let defaultExcludes = [".button.wp-color-result", ".darkluplite-menu-switch"];
let defaultExcludes = [".button.wp-color-result"];
excludeSelectors = [...DarklupJs.exclude_element];
excludeSelectors = [...excludeSelectors, ...defaultExcludes];
let applyBgOverlay = false;
if (DarklupJs.apply_bg_overlay == "yes") {
  applyBgOverlay = true;
}
// console.log("Hello, Prio. Are you doing good?");
excludeBgOverlay = [...DarklupJs.exclude_bg_overlay];
let darklupDarkLogo = frontendObject.darklogo;
let darklupLightLogo = frontendObject.lightlogo;

let darkAmount = 80;

class Darklup {
  constructor() {
    this.setRequiredVariables();

    if (this.isGutenburg || this.isCustomizer) {
      this.htmlElement.style.display = "block";
      return;
    }

    this.getExcludedElements();
    this.getAllElements();

    // console.log(this.allElements);
    // this.getExcludedBgOverlay();
    // this.applyDarklupDarkModeToAll();
    // this.handleScrollEvent();
    // this.handleRootVariables();
    // this.htmlElement.style.display = "block";
    // return;

    this.getExcludedBgOverlay();

    this.handleRootVariables();
    // this.getAllCSSRules();
    // this.getCDNData();
    if (this.isWpAdmin) {
      this.dashboardDarkMode();
    } else {
      this.frontEndDarkMode();
    }

    this.htmlElement.style.display = "block";
  }
  setRequiredVariables() {
    this.allElements = [];
    this.cssAllSelectors = [];
    this.allAnchors = [];
    this.allButtons = [];
    this.allInputs = [];
    this.allImages = [];
    this.allInlineSvgs = [];
    this.elementsWithText = [];
    this.elementsWithRealBgColor = [];
    this.elementsWithRealBorder = [];
    this.elementsWithBgImage = [];
    this.elementsWithAlphaBg = [];
    this.elementsWithBoxShadow = [];
    this.isWpAdmin = false;
    this.isGutenburg = false;
    this.isCustomizer = false;
    this.bgColors = [];
    this.bgVars = [];
    this.colorVars = [];
    this.bgDarkenColors = [];
    this.bgTinyColors = [];
    this.excludedBgOverlays = [];
    this.excludedElements = [];
    this.bgColorsCount = 0;
    this.maxArea = 0;
    this.htmlElement = document.querySelector("html");
    this.switcherCheckbox = document.querySelector(".switch-trigger");
    // this.switcherFont = document.querySelector(".switch-font-trigger");
    this.switcherCheckboxes = document.querySelectorAll(".switch-trigger");
    this.switchTrigger = ".switch-trigger";
    this.switchWrapper = document.querySelector(".darkluplite-mode-switcher");
    this.switchWrapper2 = document.querySelector("#wp-admin-bar-darkluplite-admin-switch");
    this.switchWrapper3 = document.querySelector(".darkluplite-menu-switch");
    this.switchWrappers = [this.switchWrapper, this.switchWrapper2, this.switchWrapper3];
    this.floatingSwitch = this.switchWrapper?.querySelector(".switch-trigger");
    this.adminSwitch = this.switchWrapper2?.querySelector(".switch-trigger");
    this.menuSwitch = this.switchWrapper3?.querySelector(".switch-trigger");
    this.switches = [this.floatingSwitch, this.adminSwitch, this.menuSwitch];
    this.darkEnabledClass = "darkluplite-dark-mode-enabled";
    this.adminDarkEnabledClass = "darkluplite-admin-dark-mode-enabled";

    // Set Body Width And Primary BG
    let bodyElement = document.querySelector("body");
    if (bodyElement.classList.contains("wp-admin")) {
      this.isWpAdmin = true;
    }
    if (bodyElement.classList.contains("block-editor-page")) {
      this.isGutenburg = true;
    }
    if (bodyElement.classList.contains("site-editor-php")) {
      this.isGutenburg = true;
    }
    if (bodyElement.classList.contains("wp-customizer")) {
      this.isCustomizer = true;
    }

    let bodyBg = this.hasBgColor(bodyElement);
    let htmlBg = this.hasBgColor(this.htmlElement);
    if (bodyBg) {
      this.primaryBg = bodyBg;
    } else if (htmlBg) {
      this.primaryBg = htmlBg;
    } else {
      this.primaryBg = "rgb(255, 255, 255)";
      // bodyElement.classList.add("darklup--bg");
      bodyElement.classList.add("darklup_bg_0");
    }
  }
  PREVsetRequiredVariables() {
    this.allElements = [];
    this.allAnchors = [];
    this.allButtons = [];
    this.allInputs = [];
    this.allImages = [];
    this.allInlineSvgs = [];
    this.elementsWithText = [];
    this.elementsWithRealBgColor = [];
    this.elementsWithRealBorder = [];
    this.elementsWithBgImage = [];
    this.elementsWithAlphaBg = [];
    this.elementsWithBoxShadow = [];
    this.isWpAdmin = false;
    this.isGutenburg = false;
    this.maxArea = 0;
    this.htmlElement = document.querySelector("html");
    this.switcherCheckbox = document.querySelector(".switch-trigger");
    this.switcherCheckboxes = document.querySelectorAll(".switch-trigger");
    this.switchTrigger = ".switch-trigger";
    this.switchWrapper = document.querySelector(".darkluplite-mode-switcher");
    this.switchWrapper2 = document.querySelector("#wp-admin-bar-darkluplite-admin-switch");
    this.switchWrapper3 = document.querySelector(".darkluplite-menu-switch");
    this.switchWrappers = [this.switchWrapper, this.switchWrapper2, this.switchWrapper3];
    this.floatingSwitch = this.switchWrapper?.querySelector(".switch-trigger");
    this.adminSwitch = this.switchWrapper2?.querySelector(".switch-trigger");
    this.menuSwitch = this.switchWrapper3?.querySelector(".switch-trigger");
    this.switches = [this.floatingSwitch, this.adminSwitch, this.menuSwitch];
    this.darkEnabledClass = "darkluplite-dark-mode-enabled";
    this.adminDarkEnabledClass = "darkluplite-admin-dark-mode-enabled";

    // Set Body Width And Primary BG
    let bodyElement = document.querySelector("body");
    if (bodyElement.classList.contains("wp-admin")) {
      this.isWpAdmin = true;
    }
    if (bodyElement.classList.contains("block-editor-page")) {
      this.isGutenburg = true;
    }
    if (bodyElement.classList.contains("site-editor-php")) {
      this.isGutenburg = true;
    }
    // this.bodyWidth = this.getElementWidth(bodyElement);
    let bodyBg = this.hasBgColor(bodyElement);
    let htmlBg = this.hasBgColor(this.htmlElement);
    if (bodyBg) {
      this.primaryBg = bodyBg;
    } else if (htmlBg) {
      this.primaryBg = htmlBg;
    } else {
      this.primaryBg = "rgb(255, 255, 255)";
      bodyElement.classList.add("darkluplite--bg");
    }
  }
  getAllElements() {
    let excludes, selectAll;

    excludes = [
      "head",
      "meta",
      "link",
      "title",
      "style",
      "script",
      ".darklup-mode-switcher",
      ".darklup-mode-switcher *",
      ".darklup-menu-switch",
      ".darklup-menu-switch *",
      ".darklup-switch-preview-inner",
      ".darklup-switch-preview-inner *",
      ".darklup-admin-settings-area .on-off-toggle",
      ".darklup-admin-settings-area .on-off-toggle *",
      ".wp-core-ui .darklup-section-title .button",
      ".darklup-pro-ribbon",
      "#adminmenuwrap",
      "#adminmenuwrap *",
      ".wpc-color-picker--input",
      ".wpc-color-picker--input *",
      ".darklup-single-popup-wrapper .darklup-single-popup",
      ".darklup-main-area .darklup-menu-area ul li a",
      ".darklup-dark-ignore",
      ".darklup-switch-container",
      ".darklup-switch-container *",
      // ".darklup-dark-ignore *",
      // ".darklup-settings-area",
      // "a",
      // "a *",
      // "input",
      // "button",
      // "button *",
      // "select",
      // "textarea",
      // "svg",
      // "img",
      // "i",
      // '.elementor-element-overlay',
      // '.elementor-background-overlay',
      "video",
      "mark",
      "code",
      "pre",
      "ins",
      "option",
      "progress",
      "iframe",
      ".mejs-iframe-overlay",
      "svg *",
      "path",
      "canvas",
      "#wpadminbar",
      "#wpadminbar *",
      "#wpadminbar a",
      "noscript",
    ];
    if (excludeSelectors.length > 0) {
      excludes = [...excludeSelectors, ...excludes];
      this.darkModeIgnoreInheritedBg(excludeSelectors);
      this.darkModeIgnoreInheritedColor(excludeSelectors);
    }
    selectAll = this.excludeAndSelect(excludes, "html, html *");
    this.allElements = document.querySelectorAll(selectAll);
  }
  applyDarklupDarkModeToAll() {
    for (let element of this.allElements) {
      this.handleCommonElement(element);
      this.handleBoxShadow(element);
    }
    this.handleNewBgColors();
  }
  applyDarkModeToDynamicElement(element) {
    let tag = element.tagName?.toLowerCase();
    if (tag == "a") {
      let bgColor = this.hasBgColor(element);
      if (!bgColor) {
        element.classList.add("darklup--link");
      }
    } else if (tag == "button") {
      element.classList.add("darklup--btn");
    } else if (tag == "img") {
      element.classList.add("darklup--img");
    } else if (tag == "svg") {
      element.classList.add("darklup--inline-svg");
    } else if (tag == "input" || tag == "textarea" || tag == "select") {
      element.classList.add("darklup--input");
    } else if (tag == "del") {
      element.classList.add("darklup--text");
    } else {
      element.classList.add("darklup--observed");
    }
    this.handleCommonElement(element);
  }

  checkRgbColorValues(s) {
    let color = false;
    const parts = s.split(",");
    if (parts.length !== 3) {
      return color;
    }
    const [r, g, b] = parts.map((part) => parseInt(part));
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return color;
    } else {
      color = `rgb(${r}, ${g}, ${b})`;
    }
    return color;
  }
  getDarkenColorValues(c) {
    let color = "";
    let darkColor = this.getTinyDarkenBg(c).toRgb();
    color = `${darkColor.r}, ${darkColor.g}, ${darkColor.b}`;
    return color;
  }
  getRootCSSCustomProperties() {
    let cssString = "";
    let darkBg;
    let darkVal;
    for (const stylesheet of document.styleSheets) {
      try {
        for (const rule of stylesheet.cssRules) {
          if (rule.type === CSSRule.STYLE_RULE) {
            let properties = "";
            for (const propertyName of rule.style) {
              if (propertyName.startsWith("--")) {
                let proValue = rule.style.getPropertyValue(propertyName);
                let colorValues = this.checkRgbColorValues(proValue);
                let isColor = tinycolor(proValue.trim());
                darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
                if (isColor.isValid() && !propertyName.includes("darklup") && propertyName !== "") {
                  properties += `    ${darkBg}: ${this.getDarkenBg(proValue.trim())};\n`;
                } else if (proValue.includes("url")) {
                  properties += `    ${darkBg}: ${proValue};\n`;
                } else if (colorValues) {
                  properties += `    ${darkBg}: ${this.getDarkenColorValues(colorValues)};\n`;
                } else if (proValue.includes("var")) {
                  darkVal = this.addDarklupWithVars(proValue, "--darklup-bg");
                  properties += `    ${darkBg}: ${darkVal};\n`;
                  //--------------------------------------------------------------------- Optimization
                  // console.log(propertyName, proValue);
                  // console.log(darkBg, darkVal);
                }
              }
            }
            if (properties) {
              cssString += `${rule.selectorText} {\n${properties}}\n`;
            }
          }
        }
      } catch (error) {}
    }

    return cssString;
  }
  handleRootVariables() {
    const rootCSSCustomProperties = this.getRootCSSCustomProperties();
    this.addGlobalInlineCSS(rootCSSCustomProperties, "darklup-variables-css");
    // console.log(rootCSSCustomProperties);
  }

  handleCommonElement(element) {
    let BgImage, bgColor;
    BgImage = this.hasBgImage(element);
    if (BgImage) {
      this.elementsWithBgImage.push(element);
    }
    bgColor = this.hasBgColor(element);
    if (bgColor) {
      if (!this.bgColors.includes(bgColor)) {
        this.bgColors.push(bgColor);
        element.classList.add(`darklup_bg_${this.bgColorsCount}`);
        this.bgColorsCount++;
      } else {
        element.classList.add(`darklup_bg_${this.bgColors.indexOf(bgColor)}`);
      }
      // element.dataset.realBgColor = bgColor;
      element.classList.add("darklup_bg");
    }
  }

  getAllCSSRules() {
    const styleSheets = document.styleSheets;
    let cssRules = "body{background-color:#242525;}";
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      try {
        const rules = styleSheet.cssRules || styleSheet.rules;
        let element;

        if (rules) {
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            let filteredStyle = "";
            // console.log(rule.cssText);
            let darkenImg = true;

            /*************** Do Optimize Exclusion ****************** */
            /*************** Do Optimize Exclusion ****************** */

            if (excludeBgOverlay.length > 0) {
              if (rule.selectorText) {
                element = document.querySelector(rule.selectorText);
                if (element) {
                  if (this.excludedBgOverlays.includes(element)) darkenImg = false;
                }
              }
            }
            if (excludeSelectors.length > 0) {
              if (rule.selectorText) {
                element = document.querySelector(rule.selectorText);
                if (element) {
                  // if (!allElements.includes(element)) continue;
                  if (this.excludedElements.includes(element)) continue;
                }
              }
            }

            if (rule.style) {
              let darkBg;
              let darkImage;
              let bgApplied = false;
              let bgColor = rule.style.backgroundColor;
              let bgImage = rule.style.backgroundImage;
              // let color = rule.style.color;
              let boxShadow = rule.style.boxShadow;
              if (boxShadow && boxShadow !== "none") {
                let darkShadow = "0px 5px 10px rgba(255, 255, 255, 0.05);";
                filteredStyle += `box-shadow: ${darkShadow};`;
              }
              let borders = [rule.style.borderColor, rule.style.borderTopColor, rule.style.borderRightColor, rule.style.borderBottomColor, rule.style.borderLeftColor];
              borders.forEach((b, i) => {
                if (b) {
                  let side;
                  if (i == 0) {
                    side = "";
                  } else if (i == 1) {
                    side = "top-";
                  } else if (i == 2) {
                    side = "right-";
                  } else if (i == 3) {
                    side = "bottom-";
                  } else if (i == 4) {
                    side = "left-";
                  }
                  if (b.includes("var")) {
                    darkBg = this.addDarklupWithVars(b, "--darklup-bg");
                    filteredStyle += `border-${side}color: ${darkBg};`;
                  } else if (this.isRealColor(b)) {
                    filteredStyle += `border-${side}color: ${this.getDarkenBg(b)};`;
                    // filteredStyle += `border-${side}color: ${this.getDarkenBorder(b)} !important;`;
                  }
                }
              });
              // if (!bgColor && !bgImage && !this.isRealColor(bgColor) && !bgColor.includes("var") && !this.isBgImage(bgImage)) {

              let bg = rule.style.background;
              if (bg) {
                if (bg.includes("var")) {
                  darkBg = this.addDarklupWithVars(bg, "--darklup-bg");
                  filteredStyle += `background: ${darkBg} !important;`;
                  // } else if (this.isRealColor(bg)) {
                } else {
                  let bg2 = tinycolor(bg);
                  if (bg2.isValid()) {
                    filteredStyle += `background-color: ${this.getDarkenBg(bg)} !important;`;
                  }
                }
              }

              if (bgColor) {
                if (bgColor.includes("var")) {
                  darkBg = this.addDarklupWithVars(bgColor, "--darklup-bg");
                  filteredStyle += `background-color: ${darkBg} !important;`;
                  // } else if (this.isRealColor(bgColor)) {
                } else {
                  let bgColor2 = tinycolor(bgColor);
                  if (bgColor2.isValid()) {
                    filteredStyle += `background-color: ${this.getDarkenBg(bgColor)} !important;`;
                  }
                }
              }

              if (bgImage && this.isBgImage(bgImage)) {
                if (bgImage.includes("var")) {
                  // console.log(`Current Bg: ${bgImage}`);
                  darkImage = this.addDarklupWithManyVars(bgImage, "--darklup-bg");
                } else {
                  // Fix broken link from CSS files
                  if (!bgImage.includes("http")) {
                    if (bgImage.startsWith("url(")) {
                      let imageUrl = bgImage.slice(4, -1).replace(/["']/g, "");
                      let fullUrl = new URL(imageUrl, styleSheet.href).href;
                      bgImage = `url(${fullUrl})`;
                    } else if (bgImage.includes("url")) {
                      let urlRegex = /url\(["']?(.*?)["']?\)/g;
                      bgImage = bgImage.replace(urlRegex, this.replaceUrlWithFullUrl.bind({ styleSheetHref: styleSheet.href }));
                    }
                  }
                  if (darkenImg) {
                    darkImage = this.getDarkenBgImage(bgImage);
                  }
                }

                if (darkenImg && darkImage) {
                  filteredStyle += `background-image: ${darkImage} !important;`;
                  bgApplied = true;
                }
              }

              // if (color) {
              //   filteredStyle += `color: rgb(237 237 237) !important;`;
              // }
            }

            if (filteredStyle.length > 0) {
              // console.log(rule.selectorText);
              if (rule.selectorText.includes(",")) {
                const splitStr = rule.selectorText.split(", ");
                const modifiedStr = splitStr.map((s) => s + ":not(.darkluplite-dark-ignore)").join(", ");
                cssRules += `${modifiedStr} {${filteredStyle}}\n`;
              } else {
                cssRules += `${rule.selectorText}:not(.darkluplite-dark-ignore) {${filteredStyle}}\n`;
              }
            }
          }
        }
      } catch (e) {}
      // }
    }

    // console.log(cssRules);
    // console.log(this.cssAllSelectors);
    return cssRules;
    // const cssRules = getAllCSSRules();
    // console.log(bgRules);
    // console.log(this.bgVars);
    // console.log(this.colorVars);
    // this.addGlobalInlineCSS(cssRules);
  }

  getExcludedBgOverlay() {
    if (excludeBgOverlay.length > 0) {
      excludeBgOverlay.forEach((e) => {
        let thisElement = document.querySelectorAll(e);
        this.excludedBgOverlays = [...thisElement, ...this.excludedBgOverlays];
      });
      // console.log(this.excludedBgOverlays);
    }
  }
  getExcludedElements() {
    // console.log(excludeSelectors);
    if (excludeSelectors.length > 0) {
      excludeSelectors.forEach((e) => {
        let thisElement = document.querySelectorAll(e);
        this.excludedElements = [...thisElement, ...this.excludedElements];
      });
    }
    this.excludedElements.forEach((e) => {
      e.classList.add("darkluplite-dark-ignore");
    });
    // console.log(this.excludedElements);
  }

  replaceUrlWithFullUrl(match, p1, offset, string) {
    let fullUrl = new URL(p1, this.styleSheetHref).href;
    return `url(${fullUrl})`;
  }

  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  addGlobalInlineCSS(cssRules, id = "darklup-global-css") {
    const darklupStyle = document.createElement("style");
    darklupStyle.setAttribute("id", id);
    darklupStyle.textContent = cssRules;
    document.head.appendChild(darklupStyle);
  }
  removeGlobalInlineCSS(id = "darklup-global-css") {
    const darklupStyle = document.getElementById("darklup-global-css");
    darklupStyle.remove();
  }
  addDarklupWithVars(originalString, textToInsert) {
    return originalString.replace("--", `${textToInsert}--`);
  }
  addDarklupWithManyVars(originalString, textToInsert) {
    return originalString.replace(/(var\()\s*--/g, "$1--darklup-bg--");
  }

  isRealColor(color) {
    let isRealColor = color !== "rgba(0, 0, 0, 0)" && color !== "transparent" && color !== "inherit" && color !== "initial";
    // let isRealColor = color !== "rgba(0, 0, 0, 0)" && color !== "transparent" && color !== "inherit" && color !== "initial" && color !== "none" && color !== "none transparent" && color !== "0px 0px";
    if (isRealColor) {
      // if (color.includes("var")) {
      //   return color;
      // }
      if (color.includes("rgba")) {
        let alphaValue;
        alphaValue = this.getRgbaAlpha(color);
        if (alphaValue && alphaValue == 0) return false;
      }
      return color;
    } else {
      return false;
    }
  }

  handleNewBgColors() {
    this.bgColors.forEach((c) => {
      this.bgDarkenColors.push(this.getDarkenBg(c));
      this.bgDarkenColors.push(this.getDarkenBg(c));
    });
  }

  getDarkenBg(c) {
    let darkBg = tinycolor(c);
    if (darkBg.getLuminance() * 10 > 4) {
      darkBg = darkBg.darken(darkAmount).toRgbString();
    } else {
      darkBg = darkBg.darken(10).toRgbString();
    }
    return darkBg;
  }
  getDarkenBorder(c) {
    console.log(c);
    let darkBg = tinycolor(c);
    if (darkBg.getLuminance() * 10 > 4) {
      darkBg = darkBg.darken(15).toRgbString();
    } else {
      darkBg = darkBg.darken(10).toRgbString();
    }
    return darkBg;
  }
  getTinyDarkenBg(c) {
    let darkBg = tinycolor(c);
    if (darkBg.getLuminance() * 10 > 4) {
      darkBg = darkBg.darken(darkAmount);
    } else {
      darkBg = darkBg.darken(10);
    }
    return darkBg;
  }
  addInlineCSS() {
    const darklupStyle = document.createElement("style");
    darklupStyle.setAttribute("id", "darklup-inline-css");
    let darklupCSS = "";
    this.bgDarkenColors.forEach((c, i) => {
      darklupCSS += `.darklup_bg_${i}{background-color: ${c} !important;}`;
    });
    darklupStyle.textContent = darklupCSS;
    document.head.appendChild(darklupStyle);
  }
  removeInlineCSS() {
    let darklupStyle = document.getElementById("darklup-inline-css");
    if (darklupStyle) {
      darklupStyle.parentNode.removeChild(darklupStyle);
    }
  }

  handleBoxShadow(element) {
    let boxShadow = getComputedStyle(element).boxShadow;
    if (boxShadow !== "none") {
      this.elementsWithBoxShadow.push(element);
      element.classList.add("wpc--darklup-box-shadow");
      let bgColor = this.hasBgColor(element);
      if (!bgColor) {
        element.classList.add("darklup-non-bg-box-shadow");
      }
    }
  }

  addDarkModeIgnoreClass(excludes) {
    console.log(excludes);
    if (excludes.length > 0) {
      excludes.forEach((e) => {
        // thisElement = document.querySelector(e);
        // e.classList?.add("darklup-dark-ignore");
        document.querySelector(e)?.classList.add("darklup-dark-ignore");
      });
    }
  }
  darkModeIgnoreInheritedBg(excludes) {
    if (excludes.length > 0) {
      excludes.forEach((e) => {
        if (!e.includes("*")) {
          let elements = document.querySelectorAll(e);
          if (elements) {
            elements.forEach((element) => {
              if (!this.hasBgColor(element)) {
                let inheritedBg = this.getCloseParentBg(element);
                element.dataset.inheritedBg = inheritedBg;
              }
            });
          }
        }
      });
    }
  }
  darkModeIgnoreInheritedColor(excludes) {
    this.excludedElements.forEach((element) => {
      if (this.hasOwnText(element)) {
        if (!this.hasOwnColor(element)) {
          let inheritedColor = this.getCloseParentColor(element);
          element.dataset.inheritedColor = inheritedColor;
        }
      }
    });
  }

  handleDarklupExcluded() {
    let allExcluded = document.querySelectorAll(".darkluplite-dark-ignore");
    allExcluded.forEach((e) => {
      e.style.backgroundColor = e.dataset.inheritedBg;
      e.style.color = e.dataset.inheritedColor;
    });
  }
  dashboardDarkMode() {
    this.dashboardWindowOnLoad();
    this.dashboardDarkModeSwitchEvent();
    this.windowOnLoaded();
  }
  frontEndDarkMode() {
    if (typeof darklupPageExcluded == "undefined") {
      this.prevWindowOnLoad();
      this.prevDarkModeSwitchEvent();
      this.fontSwitchEvent();
      this.prevHandleKeyShortcut();
      this.windowOnLoaded();
      this.prevHandleOSDark();
    }
  }

  dashboardWindowOnLoad() {
    let adminDarkMode = this.isAdminDarkModeEnabled();
    if (adminDarkMode) {
      this.enableAdminDarkMode();
      this.addGlobalInlineCSS(this.getAllCSSRules());
    }
  }
  prevWindowOnLoad() {
    if (this.isActiveDarkMode()) {
      this.enableDarkMode();
      this.addGlobalInlineCSS(this.getAllCSSRules());
    }
  }
  isActiveDarkMode() {
    let darkModeActivity = false;
    let lightOnDefaultDarkMode = localStorage.getItem("lightOnDefaultDarkMode");
    let lightOnOSDarkChecked = localStorage.getItem("lightOnOSDarkChecked");
    let lightOnTimeBasedDarkMode = localStorage.getItem("lightOnTimeBasedDarkMode");
    let defaultDarkMode = false;
    if (typeof isDefaultDarkModeEnabled !== "undefined") {
      defaultDarkMode = isDefaultDarkModeEnabled;
    }
    let OSDarkMode = false;
    if (typeof isOSDarkModeEnabled !== "undefined") {
      OSDarkMode = isOSDarkModeEnabled;
    }

    let darkMode = this.isDarkModeEnabled();
    if (darkMode) {
      darkModeActivity = true;
    } else if (defaultDarkMode && !lightOnDefaultDarkMode) {
      darkModeActivity = true;
    } else if (OSDarkMode && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !lightOnOSDarkChecked) {
      darkModeActivity = true;
    } else if (this.isActiveTimeBasedDarkMode() && !lightOnTimeBasedDarkMode) {
      darkModeActivity = true;
    }
    return darkModeActivity;
  }

  isActiveTimeBasedDarkMode() {
    let darkModeActivity = false;
    if (frontendObject.time_based_mode_active == "yes") {
      let startTime = this.createDateObject(frontendObject.time_based_mode_start_time);
      let endTime = this.createDateObject(frontendObject.time_based_mode_end_time);
      let currentTime = new Date();
      // console.log(currentTime, startTime, endTime);
      currentTime = Date.parse(currentTime) / 1000;
      startTime = Date.parse(startTime) / 1000;
      endTime = Date.parse(endTime) / 1000;

      if (startTime > endTime) {
        if (currentTime <= endTime) {
          darkModeActivity = true;
        }
        endTime += 24 * 3600;
      }
      if (currentTime >= startTime && currentTime <= endTime) {
        darkModeActivity = true;
      }
      // console.log(currentTime, startTime, endTime, darkModeActivity);
    }
    return darkModeActivity;
  }
  createDateObject(timeString) {
    // Split the time string into hour and minute components
    var parts = timeString.split(":");
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);

    // Create a new Date object with today's date and the specified time
    var now = new Date();
    var dateObject = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    return dateObject;
  }

  dashboardDarkModeSwitchEvent() {
    this.switchWrappers.forEach((s) => {
      s?.addEventListener("click", (e) => {
        if (e.target.classList.contains("switch-trigger")) {
          let thisTrigger = e.target;
          if (thisTrigger.checked) {
            this.activateAdminDarkMode();
            this.addGlobalInlineCSS(this.getAllCSSRules());
          } else {
            this.deactivateAdminDarkMode();
            this.removeGlobalInlineCSS();
          }
        }
      });
    });
  }
  prevDarkModeSwitchEvent() {
    this.switchWrappers.forEach((s) => {
      s?.addEventListener("click", (e) => {
        if (e.target.classList.contains("switch-trigger")) {
          let thisTrigger = e.target;
          if (thisTrigger.checked) {
            this.activateDarkMode();
            this.addGlobalInlineCSS(this.getAllCSSRules());

            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
              localStorage.removeItem("lightOnOSDarkChecked");
            }
            if (this.switchWrapper.contains(thisTrigger)) {
              if (this.menuSwitch) this.menuSwitch.checked = true;
            } else {
              if (this.floatingSwitch) this.floatingSwitch.checked = true;
            }
          } else {
            this.deactivateDarkMode();
            this.removeGlobalInlineCSS();
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
              localStorage.setItem("lightOnOSDarkChecked", true);
            }

            if (isDefaultDarkModeEnabled) {
              localStorage.setItem("lightOnDefaultDarkMode", true);
            }

            if (frontendObject.time_based_mode_active) {
              localStorage.setItem("lightOnTimeBasedDarkMode", true);
            }

            if (this.switchWrapper.contains(thisTrigger)) {
              if (this.menuSwitch) this.menuSwitch.checked = false;
            } else {
              if (this.floatingSwitch) this.floatingSwitch.checked = false;
            }
          }
        }
      });
    });
  }
  fontSwitchEvent() {
    const switchFontTrigger = document.querySelector(".switch-font-trigger");
    switchFontTrigger?.addEventListener("click", () => {
      this.htmlElement.classList.toggle("darklup-font-mode-enabled");
    });
  }

  prevHandleOSDark() {
    if (typeof isOSDarkModeEnabled == "undefined") return;
    if (isOSDarkModeEnabled) {
      let lightOnOSDarkChecked = localStorage.getItem("lightOnOSDarkChecked");
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        const newColorScheme = e.matches ? "dark" : "light";
        if (newColorScheme === "dark") {
          if (!lightOnOSDarkChecked) {
            this.enableDarkMode();
          }
        } else {
          this.disableDarkMode();
        }
      });
    }
  }

  prevHandleKeyShortcut() {
    if (typeof isKeyShortDarkModeEnabled == "undefined") return;
    if (isKeyShortDarkModeEnabled) {
      let ctrlDown = false;
      document.addEventListener("keydown", (e) => {
        if (e.which === 17) ctrlDown = true;
      });
      document.addEventListener("keyup", (e) => {
        if (e.which === 17) ctrlDown = false;
      });
      document.addEventListener("keydown", (event) => {
        if (ctrlDown && event.altKey && event.which === 68) {
          let darkMode = this.isDarkModeEnabled();
          if (darkMode) {
            this.deactivateDarkMode();
            this.removeGlobalInlineCSS();
          } else {
            this.activateDarkMode();
            this.addGlobalInlineCSS(this.getAllCSSRules());
          }
        }
      });
    }
  }
  activateDarkMode() {
    this.saveDarkModeStatus();
    this.enableDarkMode();
  }
  deactivateDarkMode() {
    this.removeDarkModeStatus();
    this.disableDarkMode();
  }
  activateAdminDarkMode() {
    this.saveAdminDarkModeStatus();
    this.enableAdminDarkMode();
  }
  deactivateAdminDarkMode() {
    this.removeAdminDarkModeStatus();
    this.disableAdminDarkMode();
  }
  saveDarkModeStatus() {
    localStorage.setItem("darklupModeEnabled", this.darkEnabledClass);
    localStorage.setItem("triggerCheked", "checked");
  }
  removeDarkModeStatus() {
    localStorage.removeItem("darklupModeEnabled");
    localStorage.removeItem("triggerCheked");
  }
  saveAdminDarkModeStatus() {
    localStorage.setItem("adminDarklupModeEnabled", this.darkEnabledClass);
    localStorage.setItem("adminTriggerChecked", "checked");
  }
  removeAdminDarkModeStatus() {
    localStorage.removeItem("adminDarklupModeEnabled");
    localStorage.removeItem("adminTriggerChecked");
  }

  disableDarkMedia() {
    if (typeof frontendObject == "undefined") return;
    const darkLogo = document.querySelector('[src="' + darklupDarkLogo + '"]');
    if (darkLogo) {
      darkLogo.src = darklupLightLogo;
      darkLogo.srcset = darklupLightLogo;
    }
    frontendObject.darkimages.forEach(function (item) {
      const darkImg = document.querySelector('[src="' + item[1] + '"]');
      if (darkImg) {
        darkImg.src = item[0];
        darkImg.srcset = item[0];
      }
    });
  }
  enableDarkMedia() {
    if (typeof frontendObject == "undefined") return;
    var lightLogo = document.querySelector('[src="' + darklupLightLogo + '"]');
    if (lightLogo) {
      lightLogo.src = darklupDarkLogo;
      lightLogo.srcset = darklupDarkLogo;
    }
    frontendObject.darkimages?.forEach(function (item) {
      var lightImg = document.querySelector('[src="' + item[0] + '"]');
      if (lightImg) {
        lightImg.src = item[1];
        lightImg.srcset = item[1];
      }
    });
  }
  enableDarkMode() {
    this.htmlElement.classList.add(this.darkEnabledClass);
    this.applyDynamicStyles();
    this.switches.forEach((s) => {
      if (s) s.checked = true;
    });
  }
  disableDarkMode() {
    this.htmlElement.classList.remove(this.darkEnabledClass);
    this.resetDynamicStyles();
    this.switches.forEach((s) => {
      if (s) s.checked = false;
    });
  }
  enableAdminDarkMode() {
    this.htmlElement.classList.add(this.adminDarkEnabledClass);

    this.applyDynamicStyles();
    this.switches.forEach((s) => {
      if (s) s.checked = true;
    });

    let darkIcon = document.querySelectorAll(".admin-dark-icon");
    let lightIcon = document.querySelectorAll(".admin-light-icon");

    darkIcon.forEach((i) => {
      i.style.display = "block";
    });
    lightIcon.forEach((i) => {
      i.style.display = "none";
    });
  }
  disableAdminDarkMode() {
    this.htmlElement.classList.remove(this.adminDarkEnabledClass);
    this.resetDynamicStyles();
    this.switches.forEach((s) => {
      if (s) s.checked = false;
    });

    let darkIcon = document.querySelectorAll(".admin-dark-icon");
    let lightIcon = document.querySelectorAll(".admin-light-icon");
    darkIcon.forEach((i) => {
      i.style.display = "none";
    });
    lightIcon.forEach((i) => {
      i.style.display = "block";
    });
  }
  // removed, may need for dashboard support
  dynamicSwitchStyle() {
    if (this.isWpAdmin) {
      let adminDarkMode = this.isAdminDarkModeEnabled();
      if (adminDarkMode) {
        this.applyDynamicStyles();
      } else {
        this.resetDynamicStyles();
      }
    } else {
      let darkMode = this.isDarkModeEnabled();
      if (darkMode) {
        this.applyDynamicStyles();
      } else {
        this.resetDynamicStyles();
      }
    }
  }
  documentOnReady() {
    console.log("Document Ready");
    document.addEventListener("DOMContentLoaded", () => {});
  }
  windowOnLoaded() {
    window.addEventListener("load", () => {
      this.handleDynamicContents();
    });
  }

  applyBoxShadow(e) {
    let boxShadow = getComputedStyle(e).boxShadow;
    let newShadow = this.makeDarkenString(boxShadow);
    if (newShadow) {
      e.dataset.boxshadow = boxShadow;
      e.style.setProperty("box-shadow", newShadow, "important");
    }
  }
  handleOsDarkMode() {
    if (isOSDarkModeEnabled) {
      let WpcFrontEndSwitcherClicked = localStorage.getItem("WpcFrontEndSwitcherClicked");
      if (!WpcFrontEndSwitcherClicked) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          const newColorScheme = e.matches ? "dark" : "light";
          if (newColorScheme === "dark") {
            this.applyDynamicStyles();
          } else {
            this.resetDynamicStyles();
          }
        });
      }
    }
  }

  activateSwitches() {
    if (this.isWpAdmin) {
      let adminDarkMode = this.isAdminDarkModeEnabled();
      if (adminDarkMode) {
        this.switches.forEach((s) => {
          if (s) s.checked = true;
        });
      }
    } else {
      if (this.isActiveDarkMode()) {
        this.switches.forEach((s) => {
          if (s) s.checked = true;
        });
      }
    }
  }

  getParentBg(element) {
    let parentBg = "primary";
    const closeBg = element.closest(".darklup--bg-applied");
    if (closeBg) {
      if (closeBg.classList.contains("darklup--bg")) {
        parentBg = "primary";
      } else if (closeBg.classList.contains("darklup--secondary-bg")) {
        parentBg = "secondary";
      } else if (closeBg.classList.contains("darklup--tertiary-bg")) {
        parentBg = "tertiary";
      }
    }

    return parentBg;
  }
  getCloseParentBg(element) {
    let parent = element.parentNode;
    let parentBg = false;
    while (parent) {
      let thisParentBg = this.hasBgColor(parent);
      if (thisParentBg) {
        parentBg = thisParentBg;
        break;
        // return parentBg;
      }
      parent = parent.parentNode;
    }
    return parentBg;
  }
  getCloseParentColor(element) {
    let parent = element.parentNode;
    let parentColor = false;
    while (parent) {
      let thisParentColor = this.hasOwnColor(parent);
      if (thisParentColor) {
        parentColor = thisParentColor;
        break;
        // return parentColor;
      }
      parent = parent.parentNode;
    }
    return parentColor;
  }
  parentHasTertiary(element) {
    let hasTertiary = false;
    let closeBg = element.closest(".darklup--bg-applied");
    if (closeBg) {
      if (closeBg.classList.contains("darklup--tertiary-bg")) {
        hasTertiary = true;
      }
    }
    return hasTertiary;
  }
  hasBorderWidth(e) {
    let borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth;
    let style = window.getComputedStyle(e);
    borderTopWidth = parseFloat(style.getPropertyValue("border-top-width"));
    borderRightWidth = parseFloat(style.getPropertyValue("border-right-width"));
    borderBottomWidth = parseFloat(style.getPropertyValue("border-bottom-width"));
    borderLeftWidth = parseFloat(style.getPropertyValue("border-left-width"));

    if (borderTopWidth > 0 || borderRightWidth > 0 || borderBottomWidth > 0 || borderLeftWidth > 0) {
      return true;
    } else {
      return false;
    }
  }

  hasOwnBgColor(e) {
    const computedStyle = window.getComputedStyle(e);
    const color = computedStyle.backgroundColor;
    if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
      const parentElement = e.parentElement;
      const parentComputedStyle = parentElement ? window.getComputedStyle(parentElement) : null;
      const parentColor = parentComputedStyle ? parentComputedStyle.backgroundColor : null;
      if (color !== parentColor) {
        return color;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  hasBgColor(e) {
    let style = window.getComputedStyle(e);
    let bgColor = style.getPropertyValue("background-color");
    let isColored = bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent" && bgColor !== "inherit";
    if (isColored) {
      if (bgColor.includes("rgba")) {
        let alphaValue;
        alphaValue = this.getRgbaAlpha(bgColor);
        if (alphaValue && alphaValue == 0) return false;
      }
      return bgColor;
    } else {
      return false;
    }
  }
  hasColor(e) {
    let style = window.getComputedStyle(e);
    let color = style.color;

    const parentElement = e.parentElement;
    const parentComputedStyle = parentElement ? window.getComputedStyle(parentElement) : null;
    const parentColor = parentComputedStyle ? parentComputedStyle.color : null;

    if (color == parentColor) {
      return false;
    }
    // if (color !== "rgba(0, 0, 0, 1)" && color !== "black") {

    if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
      return color;
    } else {
      return false;
    }
  }
  hasOwnColor(e) {
    const computedStyle = window.getComputedStyle(e);
    const color = computedStyle.color;
    if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
      const parentElement = e.parentElement;
      const parentComputedStyle = parentElement ? window.getComputedStyle(parentElement) : null;
      const parentColor = parentComputedStyle ? parentComputedStyle.color : null;
      if (color !== parentColor) {
        return color;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  hasOwnText(e) {
    let txtVal;
    txtVal = e.childNodes[0]?.nodeValue?.trim();
    if (!txtVal) {
      txtVal = e.childNodes[e.childNodes.length - 1]?.nodeValue?.trim();
    }
    if (txtVal !== "" && typeof txtVal !== "undefined" && txtVal !== "inherit") {
      return true;
    } else {
      return false;
    }
  }
  getRgbaAlpha(color) {
    let alphaValue = false;
    let rgbaMatch = color.match(/rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3}),? ?([\d\.]*)?\)/);
    if (rgbaMatch) {
      alphaValue = rgbaMatch[4] ? rgbaMatch[4] : false;
    }
    return alphaValue;
  }
  hasAlphaBgColor(e) {
    let style = window.getComputedStyle(e);
    let bgColor = style.getPropertyValue("background-color");
    let rgbaMatch = bgColor.match(/rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3}),? ?([\d\.]*)?\)/);
    let alphaValue = false;
    if (rgbaMatch) {
      alphaValue = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : false;
    }
    return alphaValue;
  }

  getBgColor(e) {
    let style = window.getComputedStyle(e);
    let appliedBgColor = style.getPropertyValue("background-color");
    return appliedBgColor;
  }

  applyAlphaBgColor(e) {
    let alphaValue = this.hasAlphaBgColor(e);
    if (alphaValue) {
      let newBg = DarklupJs.secondary_bg;
      let style = window.getComputedStyle(e);
      let bgColor = style.getPropertyValue("background-color");
      e.dataset.alphabg = bgColor;
      let alphaBg = newBg.replace(")", `, ${alphaValue})`).replace("rgb", "rgba");
      e.style.backgroundColor = alphaBg;
    }
  }

  hasBgImage(e) {
    let bgImage = getComputedStyle(e).backgroundImage;
    if (bgImage !== "none" && (bgImage.includes("linear-gradient") || bgImage.includes("url"))) {
      return bgImage;
    } else {
      return false;
    }
  }
  isBgImage(bgImage) {
    if (bgImage !== "none" && (bgImage.includes("linear-gradient") || bgImage.includes("url"))) {
      return bgImage;
    } else {
      return false;
    }
  }
  applyBgImage(element) {
    let BgImage = this.hasBgImage(element);
    if (BgImage) {
      if (BgImage.includes("linear-gradient") && BgImage.includes("url")) {
        this.applyGradientBgImage(element, BgImage);
        element.classList.add("darklup-bg-gradient--image");
      } else if (BgImage.includes("url")) {
        element.classList.add("darklup-bg--image");
        if (!this.alreadyHasOverlay(element)) {
          if (this.excludedBgOverlays.includes(element)) {
          } else {
            if (applyBgOverlay) {
              let imgGrad = `linear-gradient(rgba(0, 0, 0, ${DarklupJs.bg_image_dark_opacity}), rgba(0, 0, 0,${DarklupJs.bg_image_dark_opacity}))`;
              let imgOverlay = `${imgGrad}, ${BgImage}`;
              element.style.setProperty("background-image", imgOverlay);
            }
          }
          // element.dataset.add
        }
        this.addDarkenClassToChild(element);
      } else if (BgImage.includes("linear-gradient")) {
        element.classList.add("darklup-bg-gradient");
        this.applyGradientBgImage(element, BgImage);
        this.addDarkenClassToChild(element);
      }
      // element.setAttribute("data-lightbg", BgImage);
      element.dataset.lightbg = BgImage;
    }
  }
  getDarkenBgImage(BgImage) {
    let newBg;
    if (BgImage.includes("linear-gradient") && BgImage.includes("url")) {
      newBg = this.getGradientBgImage(BgImage);
    } else if (BgImage.includes("url")) {
      if (applyBgOverlay) {
        let imgGrad = `linear-gradient(rgba(0, 0, 0, ${DarklupJs.bg_image_dark_opacity}), rgba(0, 0, 0,${DarklupJs.bg_image_dark_opacity}))`;
        let imgOverlay = `${imgGrad}, ${BgImage}`;
        newBg = imgOverlay;
      }
    } else if (BgImage.includes("linear-gradient")) {
      newBg = this.getGradientBgImage(BgImage);
    }
    return newBg;
  }

  getGradientBgImage(currentBg) {
    // console.log(`Current Gradient ${currentBg}`);
    let newGradient;
    const colorRegexMatch = /rgba?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*[0-9\.]+)?\)/g;
    const rgbaMatches = currentBg.match(colorRegexMatch);
    // console.log(rgbaMatches);
    rgbaMatches.forEach((c, i) => {
      let tinyBg = this.getTinyDarkenBg(c);
      let alphaValue = tinyBg.getAlpha();
      if (alphaValue < 0.4) {
        alphaValue = 0.4;
        tinyBg.setAlpha(alphaValue);
      }
      newGradient = currentBg?.replace(rgbaMatches[i], tinyBg.toRgbString());
      currentBg = newGradient;
    });
    // console.log(`newGradient ${newGradient}`);
    return newGradient;
  }

  alreadyHasOverlay(element) {
    let hasOverlay = false;
    if (element.classList.contains("darklup-under-darken-bg")) {
      hasOverlay = true;
    }
    let overlay = element.querySelector(":scope > .elementor-background-overlay");
    if (overlay) {
      let overlayBgImage = this.hasBgImage(overlay);
      let overlayBgColor = this.hasBgColor(overlay);
      if (overlayBgImage) {
        hasOverlay = true;
      } else if (overlayBgColor) {
        hasOverlay = true;
      }
    }

    return hasOverlay;
  }

  applyGradientBgImage(element, currentBg) {
    // console.log(`Current Gradient ${currentBg}`);
    if (currentBg !== "none" && currentBg.includes("linear-gradient")) {
      let newGradient;
      const colorRegexMatch = /rgba?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*[0-9\.]+)?\)/g;
      const rgbaMatches = currentBg.match(colorRegexMatch);
      // console.log(rgbaMatches);
      rgbaMatches.forEach((c, i) => {
        let tinyBg = this.getTinyDarkenBg(c);
        let alphaValue = tinyBg.getAlpha();
        if (alphaValue < 0.4) {
          alphaValue = 0.4;
          tinyBg.setAlpha(alphaValue);
        }
        newGradient = currentBg?.replace(rgbaMatches[i], tinyBg.toRgbString());
        currentBg = newGradient;
      });

      if (rgbaMatches) {
        if (newGradient) element.style.backgroundImage = newGradient;
      }
      // console.log(`newGradient ${newGradient}`);
    }
  }
  makeDarkenString(currentStr) {
    let newStr = "";
    const colorRegexMatch = /rgba?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*[0-9\.]+)?\)/g;
    const rgbaMatches = currentStr.match(colorRegexMatch);
    rgbaMatches.forEach((c, i) => {
      newStr = currentStr?.replace(rgbaMatches[i], this.getDarkenBg(c));
      currentStr = newStr;
    });
    // console.log(`New Str: ${newStr}`);
    return newStr;
  }

  addDarkenClassToChild(element) {
    let darkenChild = element.querySelectorAll(`*`);
    if (darkenChild) {
      darkenChild.forEach((e) => {
        e.classList.add("darklup-under-darken-bg");
      });
    }
  }

  resetBgImage(e) {
    e.style.backgroundImage = e.dataset.lightbg;
  }
  resetAlphaBgColor(e) {
    e.style.backgroundColor = e.dataset.alphabg;
  }
  resetBoxShadow(e) {
    e.style.boxShadow = e.dataset.boxshadow;
  }
  excludeAndSelect(excludes = [], selector = "html *") {
    selector += `:not(:is(${excludes.join(", ")}))`;
    return selector;
  }

  isDarkModeEnabled() {
    let darkMode = localStorage.getItem("darklupModeEnabled");
    let getTriggerChecked = localStorage.getItem("triggerCheked");
    if (darkMode && getTriggerChecked) {
      return true;
    } else {
      return false;
    }
  }
  isAdminDarkModeEnabled() {
    let darkMode = localStorage.getItem("adminDarklupModeEnabled");
    let getTriggerChecked = localStorage.getItem("adminTriggerChecked");
    if (darkMode && getTriggerChecked) {
      return true;
    } else {
      return false;
    }
  }

  applyDynamicStyles() {
    // console.log(this.elementsWithBoxShadow);
    this.elementsWithBgImage?.forEach((element) => this.applyBgImage(element));
    this.elementsWithBoxShadow?.forEach((element) => this.applyBoxShadow(element));
    this.addInlineCSS();

    this.enableDarkMedia();
    this.handleDarklupExcluded();
  }
  resetDynamicStyles() {
    this.elementsWithBgImage?.forEach((element) => this.resetBgImage(element));
    this.elementsWithBoxShadow?.forEach((element) => this.resetBoxShadow(element));
    this.disableDarkMedia();
    this.removeInlineCSS();
  }
  getDynamicExcluded(node) {
    let dynamicExcludes = [];
    if (excludeSelectors.length > 0) {
      excludeSelectors.forEach((e) => {
        let thisElement = node.parentElement?.querySelectorAll(e);
        dynamicExcludes = [...thisElement, ...dynamicExcludes];
      });
    }
    dynamicExcludes.forEach((element) => {
      element.classList.add("darkluplite-dark-ignore");
    });
    return dynamicExcludes;
  }
  // Initializes the mutation observer for dynamically added elements
  handleDynamicContents() {
    const observerConfig = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };

    const parentElement = document.querySelector("body");
    const newObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          node.classList?.add("darklup-observer--node");
          let nodeExclude = this.getDynamicExcluded(node);
          this.applyDarkModeToDynamicElement(node);
          const childNodes = node.querySelectorAll("*");
          childNodes.forEach((childNode) => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              this.applyDarkModeToDynamicElement(childNode);
              let nodeExclude2 = this.getDynamicExcluded(childNode);
            }
          });
        });
      });
    });

    newObserver.observe(parentElement.parentNode, observerConfig);
  }
}
// let darklup = new Darklup();

// Document on Ready
document.addEventListener("DOMContentLoaded", function () {
  let darklup = new Darklup();
});

// Window On Load
// window.addEventListener("load", function () {
//   // let darklup = new Darklup();
// });

// console.log(`Hi Mahbub, your darkup calculation is complete`);
