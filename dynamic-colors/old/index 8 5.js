// import tinycolor from "tinycolor2";
import tinycolor from "./../node_modules/tinycolor2/dist/tinycolor-min.js";

// let MyGrad = `linear-gradient(180deg, rgba(39, 40, 39, 0.6) 0%, rgba(36, 37, 37, 0.6) 32%)`;

let excludeSelectors = [];
let excludeBgOverlay = [];

// let excludeSelectors = DarklupJs.exclude_element;
// excludeSelectors = ["#adminmenuwrap", "#adminmenuwrap *"];
// let elementThree = ".elementor-element-6109eb5 .elementor-background-overlay";
// excludeSelectors = [...excludeSelectors, elementThree];
// excludeSelectors = [...excludeSelectors, ...DarklupJs.exclude_element];
let defaultExcludes = [".button.wp-color-result"];
excludeSelectors = [...DarklupJs.exclude_element];
excludeSelectors = [...excludeSelectors, ...defaultExcludes];
// console.log(excludeSelectors);
// let excludeSelectors2 = [".elementor-element-2jil7fz", ".elementor-element-dq8izpp", ".wceazy_pf_product"];
// excludeSelectors = [];
// excludeSelectors = [".elementor-element-dq8izpp", ".elementor-element-2jil7fz"];
let applyBgOverlay = false;

if (DarklupJs.apply_bg_overlay == "yes") {
  applyBgOverlay = true;
}

excludeBgOverlay = [...DarklupJs.exclude_bg_overlay];
// frontendObject;
let darklupDarkLogo = frontendObject.darklogo;
let darklupLightLogo = frontendObject.lightlogo;
// console.log(darklupDarkLogo);
// console.log(darklupLightLogo);

console.log("Hello Hi 57");
// console.log(excludeSelectors);

// let myElements = document.querySelectorAll(selectStr);

// 2.34 in return
// return;
// console.log("returned");

function isInt(value) {
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x;
    })(parseFloat(value))
  );
}

let darkAmount = 75;
if (isInt(frontendObject.darkenLevel)) {
  darkAmount = +frontendObject.darkenLevel;
}

// console.log(darkAmount);

// let darkAmounts = {
//   global: 75,
//   noticeable: 10,
//   dark: 5,
// };

class Darklup {
  constructor() {
    // console.log("Hello Hi 05");
    this.setRequiredVariables();

    // this.htmlElement.style.display = "block";
    // return;
    // if (this.isGutenburg) {
    if (this.isGutenburg || this.isCustomizer) {
      this.htmlElement.style.display = "block";
      return;
    }

    this.getExcludedElements();
    this.getAllElements();

    // console.log(this.allElements);
    // 2.45 in return
    // this.getExcludedBgOverlay();

    // this.applyDarklupDarkModeToAll();
    // 3.40 in return
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
    this.switchWrapper = document.querySelector(".darklup-mode-switcher");
    this.switchWrapper2 = document.querySelector("#wp-admin-bar-darklup-admin-switch");
    this.switchWrapper3 = document.querySelector(".darklup-menu-switch");
    this.switchWrappers = [this.switchWrapper, this.switchWrapper2, this.switchWrapper3];
    this.floatingSwitch = this.switchWrapper?.querySelector(".switch-trigger");
    this.adminSwitch = this.switchWrapper2?.querySelector(".switch-trigger");
    this.menuSwitch = this.switchWrapper3?.querySelector(".switch-trigger");
    this.switches = [this.floatingSwitch, this.adminSwitch, this.menuSwitch];
    this.darkEnabledClass = "darklup-dark-mode-enabled";
    this.adminDarkEnabledClass = "darklup-admin-dark-mode-enabled";

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

    // this.bodyWidth = this.getElementWidth(bodyElement);
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
    // excludes = [];
    if (excludeSelectors.length > 0) {
      excludes = [...excludeSelectors, ...excludes];
      // this.addDarkModeIgnoreClass(excludeSelectors);
      this.darkModeIgnoreInheritedBg(excludeSelectors);
      this.darkModeIgnoreInheritedColor(excludeSelectors);
    }
    selectAll = this.excludeAndSelect(excludes, "html, html *");
    // console.log(selectAll);

    // this.allElements = document.querySelectorAll("html *");
    this.allElements = document.querySelectorAll(selectAll);
    // console.log(this.allElements);

    // let testAll = document.querySelectorAll("html *");
    // for (let element of testAll) {
    //   element.classList.add("darklup");
    // }
    // testAll.forEach((e) => {
    //   e.classList.add("darklup");
    // });
  }
  applyDarklupDarkModeToAll() {
    for (let element of this.allElements) {
      // let tag = element.tagName?.toLowerCase();
      // if (tag == "a") {
      //   let bgColor = this.hasBgColor(element);
      //   if (!bgColor) {
      //     element.classList.add("darklup--link");
      //   }
      // } else if (tag == "button") {
      //   element.classList.add("darklup--btn");
      // } else if (tag == "img") {
      //   element.classList.add("darklup--img");
      // } else if (tag == "svg") {
      //   element.classList.add("darklup--inline-svg");
      // } else if (tag == "input" || tag == "textarea" || tag == "select") {
      //   element.classList.add("darklup--input");
      // } else if (tag == "del") {
      //   element.classList.add("darklup--text");
      // } else {
      //   element.classList.add("darklup-element");
      // }
      this.handleCommonElement(element);
      this.handleBoxShadow(element);
    }

    this.handleNewBgColors();
    // console.log(this.bgColors);
    // console.log(this.bgDarkenColors);
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

  getCGPTRootCSSCustomProperties() {
    const customProperties = {};

    for (const stylesheet of document.styleSheets) {
      const isSameOrigin = stylesheet.href === null || new URL(stylesheet.href).origin === document.location.origin;

      if (isSameOrigin) {
        try {
          for (const rule of stylesheet.cssRules) {
            if (rule.type === CSSRule.STYLE_RULE) {
              const selector = rule.selectorText;
              if (!customProperties[selector]) {
                customProperties[selector] = {};
              }

              for (const propertyName of rule.style) {
                if (propertyName.startsWith("--")) {
                  let isColor = tinycolor(rule.style.getPropertyValue(propertyName).trim());
                  if (isColor.isValid() && !propertyName.includes("darklup")) {
                    customProperties[selector][propertyName] = rule.style.getPropertyValue(propertyName).trim();
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error accessing cssRules:", error);
        }
      }
    }

    return customProperties;
  }
  getMergedRootCSSCustomProperties() {
    const selectors = {};
    let selector;
    let darkBg;
    for (const stylesheet of document.styleSheets) {
      const isSameOrigin = stylesheet.href === null || new URL(stylesheet.href).origin === document.location.origin;
      if (isSameOrigin) {
        try {
          for (const rule of stylesheet.cssRules) {
            if (rule.type === CSSRule.STYLE_RULE) {
              for (const propertyName of rule.style) {
                if (propertyName.startsWith("--")) {
                  let isColor = tinycolor(rule.style.getPropertyValue(propertyName).trim());
                  if (isColor.isValid() && !propertyName.includes("darklup") && propertyName !== "") {
                    selector = rule.selectorText;
                    if (!selectors[selector]) {
                      selectors[selector] = "";
                    }
                    darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
                    // customProperties[darkBg] = [this.getDarkenBg(rule.style.getPropertyValue(propertyName).trim()), rule.selectorText];

                    selectors[selector] += `    ${darkBg}: ${this.getDarkenBg(rule.style.getPropertyValue(propertyName).trim())};\n`;
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error accessing cssRules:", error);
        }
      }
    }

    let cssString = "";
    for (const selector in selectors) {
      cssString += `${selector} {\n${selectors[selector]}}\n`;
    }

    return cssString;
  }

  getZZRootCSSCustomProperties() {
    const customProperties = {};
    let count = 0;
    for (const stylesheet of document.styleSheets) {
      const isSameOrigin = stylesheet.href === null || new URL(stylesheet.href).origin === document.location.origin;
      if (isSameOrigin) {
        // console.log(stylesheet);
        let darkBg;
        let selector;

        try {
          for (const rule of stylesheet.cssRules) {
            // if (rule.type === CSSRule.STYLE_RULE && rule.selectorText === ":root") {
            if (rule.type === CSSRule.STYLE_RULE) {
              for (const propertyName of rule.style) {
                if (propertyName.startsWith("--")) {
                  let isColor = tinycolor(rule.style.getPropertyValue(propertyName).trim());
                  if (isColor.isValid() && !propertyName.includes("darklup") && !propertyName == "") {
                    selector = rule.selectorText;
                    if (!customProperties[selector]) {
                      customProperties[selector] = {};
                    }

                    customProperties[selector][propertyName] = rule.style.getPropertyValue(propertyName).trim();
                    count++;
                    // customProperties[propertyName] = rule.style.getPropertyValue(propertyName).trim();
                    // darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
                    // customProperties[darkBg] = [this.getDarkenBg(rule.style.getPropertyValue(propertyName).trim()), rule.selectorText];
                    // customProperties[rule.selectorText] = rule.selectorText;
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error accessing cssRules:", error);
        }
      }
    }
    console.log(count);
    return customProperties;
  }
  getTryRootCSSCustomProperties() {
    const customProperties = {};
    for (const stylesheet of document.styleSheets) {
      const isSameOrigin = stylesheet.href === null || new URL(stylesheet.href).origin === document.location.origin;
      if (isSameOrigin) {
        // console.log(stylesheet);
        let darkBg;
        try {
          for (const rule of stylesheet.cssRules) {
            // if (rule.type === CSSRule.STYLE_RULE && rule.selectorText === ":root") {
            if (rule.type === CSSRule.STYLE_RULE) {
              for (const propertyName of rule.style) {
                if (propertyName.startsWith("--")) {
                  let isColor = tinycolor(rule.style.getPropertyValue(propertyName).trim());
                  if (isColor.isValid() && !propertyName.includes("darklup")) {
                    // customProperties[propertyName] = rule.style.getPropertyValue(propertyName).trim();
                    darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
                    customProperties[darkBg] = [this.getDarkenBg(rule.style.getPropertyValue(propertyName).trim()), rule.selectorText];
                    // customProperties[rule.selectorText] = rule.selectorText;
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error accessing cssRules:", error);
        }
      }
    }

    return customProperties;
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
      const isSameOrigin = stylesheet.href === null || new URL(stylesheet.href).origin === document.location.origin;
      // if (isSameOrigin) {
      try {
        for (const rule of stylesheet.cssRules) {
          if (rule.type === CSSRule.STYLE_RULE) {
            let properties = "";
            for (const propertyName of rule.style) {
              if (propertyName.startsWith("--")) {
                let proValue = rule.style.getPropertyValue(propertyName);
                let colorValues = this.checkRgbColorValues(proValue);
                let isColor = tinycolor(proValue.trim());
                if (isColor.isValid() && !propertyName.includes("darklup") && propertyName !== "") {
                  darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
                  properties += `    ${darkBg}: ${this.getDarkenBg(proValue.trim())};\n`;
                  // console.log(proValue);
                  // console.log(isColor);
                  // customProperties[darkBg] = [this.getDarkenBg(proValue.trim()), rule.selectorText];
                  // selectors[selector] += `    ${darkBg}: ${this.getDarkenBg(proValue.trim())};\n`;
                  // properties += `    ${propertyName}: ${proValue.trim()};\n`;
                } else if (colorValues) {
                  darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
                  properties += `    ${darkBg}: ${this.getDarkenColorValues(colorValues)};\n`;
                } else if (proValue.includes("var")) {
                  darkBg = this.addDarklupWithVars(propertyName, "--darklup-bg");
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
      } catch (error) {
        // console.log("Error accessing cssRules:", error);
      }
      // }
    }
    // console.log(cssString);

    return cssString;
  }
  handleRootVariables() {
    const rootCSSCustomProperties = this.getRootCSSCustomProperties();
    this.addGlobalInlineCSS(rootCSSCustomProperties, "darklup-variables-css");
    // console.log(rootCSSCustomProperties);
  }

  // handleScrollEvent() {
  //   window.addEventListener("scroll", this.onScrollAction);
  // Attach the event listener to the window object
  // }
  // onScrollAction() {
  //   console.log("You just scrolled!");
  // }

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
  applyCSSDarkMode() {}
  async getAllCSSRules2() {
    const styleSheets = document.styleSheets;
    // console.log(this.allElements);
    const allElements = [...this.allElements];
    // console.log(allElements);
    let cssRules = "";
    const bgRules = [];
    const allRules = [];
    let k = 0;
    // return;
    // console.log(styleSheets);
    let cssText = "";
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const isSameOrigin = styleSheet.href === null || new URL(styleSheet.href).origin === document.location.origin;
      let rules;

      if (isSameOrigin) {
        // try {
        //   rules = styleSheet.cssRules || styleSheet.rules;
        // } catch (e) {
        //   // console.error(`Error accessing stylesheet: ${e.message}`);
        //   console.log(`Error accessing stylesheet: ${e.message}`);
        // }
      } else {
        // console.log(`Error accessing CDN stylesheet`);
        try {
          // Fetch the stylesheet from its URL
          const response = await fetch(styleSheet.href);
          if (response.ok) {
            // cssText += await response.text();
            cssText = await response.text();
            // console.log(cssText);

            const parsedStyleSheet = new CSSStyleSheet();
            await parsedStyleSheet.replace(cssText);
            rules = parsedStyleSheet.cssRules;
          }
        } catch (e) {
          console.log(`Error fetching stylesheet: ${e.message}`);
        }
      }

      if (rules) {
        console.log(rules);
      }
      // if (rules) {
      //   for (let j = 0; j < rules.length; j++) {
      //     const rule = rules[j];
      //     let filteredStyle = "";
      //     // console.log(rule.cssText);
      //     let darkenImg = true;
      //     let element;
      //     /*************** Do Optimize Exclusion ****************** */
      //     /*************** Do Optimize Exclusion ****************** */

      //     if (excludeBgOverlay.length > 0) {
      //       if (rule.selectorText) {
      //         element = document.querySelector(rule.selectorText);
      //         if (element) {
      //           if (this.excludedBgOverlays.includes(element)) darkenImg = false;
      //         }
      //       }
      //     }
      //     if (excludeSelectors.length > 0) {
      //       if (rule.selectorText) {
      //         element = document.querySelector(rule.selectorText);
      //         if (element) {
      //           // if (!allElements.includes(element)) continue;
      //           if (this.excludedElements.includes(element)) continue;
      //         }
      //       }
      //     }

      //     // console.log(rule.style.propertyName);

      //     if (rule.style) {
      //       let darkBg;
      //       let darkImage;
      //       let bgColor = rule.style.backgroundColor;
      //       let bgImage = rule.style.backgroundImage;
      //       let color = rule.style.color;

      //       let boxShadow = rule.style.boxShadow;

      //       if (boxShadow && boxShadow !== "none") {
      //         // console.log(boxShadow);
      //         let darkShadow = "0px 5px 10px rgba(255, 255, 255, 0.05);";
      //         filteredStyle += `box-shadow: ${darkShadow};`;
      //       }
      //       let borders = [rule.style.borderColor, rule.style.borderTopColor, rule.style.borderRightColor, rule.style.borderBottomColor, rule.style.borderLeftColor];
      //       borders.forEach((b, i) => {
      //         if (b) {
      //           let side;
      //           if (i == 0) {
      //             side = "";
      //           } else if (i == 1) {
      //             side = "top-";
      //           } else if (i == 2) {
      //             side = "right-";
      //           } else if (i == 3) {
      //             side = "bottom-";
      //           } else if (i == 4) {
      //             side = "left-";
      //           }
      //           if (b.includes("var")) {
      //             darkBg = this.addDarklupWithVars(b, "--darklup-bg");
      //             filteredStyle += `border-${side}color: ${darkBg};`;
      //           } else if (this.isRealColor(b)) {
      //             filteredStyle += `border-${side}color: ${this.getDarkenBg(b)};`;
      //             // filteredStyle += `border-${side}color: ${this.getDarkenBorder(b)} !important;`;
      //           }
      //         }
      //       });

      //       if (bgColor) {
      //         if (bgColor.includes("var")) {
      //           // this.bgVars.push(bgColor);
      //           darkBg = this.addDarklupWithVars(bgColor, "--darklup-bg");
      //           filteredStyle += `background-color: ${darkBg} !important;`;
      //         } else if (this.isRealColor(bgColor)) {
      //           filteredStyle += `background-color: ${this.getDarkenBg(bgColor)} !important;`;
      //         }
      //       }

      //       if (bgImage && this.isBgImage(bgImage)) {
      //         if (bgImage.includes("var")) {
      //           // console.log(`Current Bg: ${bgImage}`);
      //           darkImage = this.addDarklupWithManyVars(bgImage, "--darklup-bg");
      //         } else {
      //           // Fix broken link from CSS files
      //           if (!bgImage.includes("http")) {
      //             if (bgImage.startsWith("url(")) {
      //               let imageUrl = bgImage.slice(4, -1).replace(/["']/g, "");
      //               let fullUrl = new URL(imageUrl, styleSheet.href).href;
      //               bgImage = `url(${fullUrl})`;
      //             } else if (bgImage.includes("url")) {
      //               let urlRegex = /url\(["']?(.*?)["']?\)/g;
      //               bgImage = bgImage.replace(urlRegex, this.replaceUrlWithFullUrl.bind({ styleSheetHref: styleSheet.href }));
      //             }
      //           }
      //           if (darkenImg) {
      //             darkImage = this.getDarkenBgImage(bgImage);
      //           }
      //         }

      //         if (darkenImg) filteredStyle += `background-image: ${darkImage} !important;`;
      //       }

      //       // if (color) {
      //       //   filteredStyle += `color: rgb(237 237 237) !important;`;
      //       // }
      //     }

      //     if (filteredStyle.length > 0) {
      //       // console.log(rule.selectorText);
      //       if (rule.selectorText.includes(",")) {
      //         const splitStr = rule.selectorText.split(", ");
      //         const modifiedStr = splitStr.map((s) => s + ":not(.darklup-excluded)").join(", ");

      //         // console.log(rule.selectorText);
      //         // console.log(modifiedStr);

      //         cssRules += `${modifiedStr} {${filteredStyle}}\n`;
      //       } else {
      //         cssRules += `${rule.selectorText}:not(.darklup-excluded) {${filteredStyle}}\n`;
      //       }
      //       // this.cssAllSelectors.push(rule.selectorText);
      //       // cssRules += `${rule.selectorText} { ${filteredStyle}} ${k++} \n`;
      //     }
      //   }
      // }
    }

    // console.log(cssRules);
    // console.log(this.cssAllSelectors);
    return cssText;
    // return cssRules;
    // const cssRules = getAllCSSRules();
    // console.log(bgRules);
    // console.log(this.bgVars);
    // console.log(this.colorVars);
    // this.addGlobalInlineCSS(cssRules);
  }
  getCDNData() {
    this.getAllCSSRules()
      .then((data) => {
        console.log("Data fetched--------------------");
        // console.log("Data fetched:", data);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
  }
  getAllCSSRules() {
    const styleSheets = document.styleSheets;
    // console.log(this.allElements);
    const allElements = [...this.allElements];
    // console.log(allElements);
    let cssRules = "body{background-color:#242525;}";
    const bgRules = [];
    const allRules = [];
    let k = 0;
    // return;
    // console.log(styleSheets);
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const isSameOrigin = styleSheet.href === null || new URL(styleSheet.href).origin === document.location.origin;
      // if (isSameOrigin) {
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

            // console.log(rule.style.propertyName);

            if (rule.style) {
              let darkBg;
              let darkImage;
              let bgApplied = false;
              let bgColor = rule.style.backgroundColor;
              let bgImage = rule.style.backgroundImage;
              let color = rule.style.color;

              let boxShadow = rule.style.boxShadow;

              if (boxShadow && boxShadow !== "none") {
                // console.log(boxShadow);
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
              // let bg = rule.style.background;
              // if (bg) {
              //   if (!bgApplied) {
              //     // console.log(bgColor);
              //     // console.log(bgImage);
              //     if (bg.includes("var")) {
              //       console.log(bg);
              //       // darkImage = this.addDarklupWithManyVars(bgImage, "--darklup-bg");
              //       darkBg = this.addDarklupWithVars(bg, "--darklup-bg");
              //       // console.log(darkBg);
              //       filteredStyle += `background: ${darkBg} !important;`;
              //     } else if (this.isRealColor(bg)) {
              //       console.log(bg);
              //       filteredStyle += `background: ${this.getDarkenBg(bg)} !important;`;
              //     }
              //   }
              // }
              // }

              if (bgColor) {
                if (bgColor.includes("var")) {
                  // this.bgVars.push(bgColor);
                  darkBg = this.addDarklupWithVars(bgColor, "--darklup-bg");
                  filteredStyle += `background-color: ${darkBg} !important;`;
                  bgApplied = true;
                } else if (this.isRealColor(bgColor)) {
                  filteredStyle += `background-color: ${this.getDarkenBg(bgColor)} !important;`;
                  bgApplied = true;
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
                const modifiedStr = splitStr.map((s) => s + ":not(.darklup-excluded)").join(", ");

                // console.log(rule.selectorText);
                // console.log(modifiedStr);

                cssRules += `${modifiedStr} {${filteredStyle}}\n`;
              } else {
                cssRules += `${rule.selectorText}:not(.darklup-excluded) {${filteredStyle}}\n`;
              }
              // this.cssAllSelectors.push(rule.selectorText);
              // cssRules += `${rule.selectorText} { ${filteredStyle}} ${k++} \n`;
            }
          }
        }
      } catch (e) {
        // console.error(`Error accessing stylesheet: ${e.message}`);
        // console.log(`Error accessing stylesheet: ${e.message}`);
      }
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
  getAllCSSRulesSame() {
    const styleSheets = document.styleSheets;
    // console.log(this.allElements);
    const allElements = [...this.allElements];
    // console.log(allElements);
    let cssRules = "";
    const bgRules = [];
    const allRules = [];
    let k = 0;
    // return;
    console.log(styleSheets);
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const isSameOrigin = styleSheet.href === null || new URL(styleSheet.href).origin === document.location.origin;
      if (isSameOrigin) {
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

              // console.log(rule.style.propertyName);

              if (rule.style) {
                let darkBg;
                let darkImage;
                let bgColor = rule.style.backgroundColor;
                let bgImage = rule.style.backgroundImage;

                let color = rule.style.color;

                let boxShadow = rule.style.boxShadow;

                if (boxShadow && boxShadow !== "none") {
                  // console.log(boxShadow);
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

                if (bgColor) {
                  if (bgColor.includes("var")) {
                    // this.bgVars.push(bgColor);
                    darkBg = this.addDarklupWithVars(bgColor, "--darklup-bg");
                    filteredStyle += `background-color: ${darkBg} !important;`;
                  } else if (this.isRealColor(bgColor)) {
                    filteredStyle += `background-color: ${this.getDarkenBg(bgColor)} !important;`;
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

                  if (darkenImg) filteredStyle += `background-image: ${darkImage} !important;`;
                }
                // if (!bgColor && !bgImage) {
                let bg = rule.style.background;
                if (bg) {
                  console.log(bg);
                  if (bg.includes("var")) {
                    darkBg = this.addDarklupWithVars(bg, "--darklup-bg");
                    filteredStyle += `background: ${darkBg} !important;`;
                  } else if (this.isRealColor(bg)) {
                    filteredStyle += `background: ${this.getDarkenBg(bg)} !important;`;
                  }
                }
                // }
                // if (color) {
                //   filteredStyle += `color: rgb(237 237 237) !important;`;
                // }
              }

              if (filteredStyle.length > 0) {
                // console.log(rule.selectorText);
                if (rule.selectorText.includes(",")) {
                  const splitStr = rule.selectorText.split(", ");
                  const modifiedStr = splitStr.map((s) => s + ":not(.darklup-excluded)").join(", ");

                  // console.log(rule.selectorText);
                  // console.log(modifiedStr);

                  cssRules += `${modifiedStr} {${filteredStyle}}\n`;
                } else {
                  cssRules += `${rule.selectorText}:not(.darklup-excluded) {${filteredStyle}}\n`;
                }
                // this.cssAllSelectors.push(rule.selectorText);
                // cssRules += `${rule.selectorText} { ${filteredStyle}} ${k++} \n`;
              }
            }
          }
        } catch (e) {
          // console.error(`Error accessing stylesheet: ${e.message}`);
          console.log(`Error accessing stylesheet: ${e.message}`);
        }
      }
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
      e.classList.add("darklup-excluded");
    });
    // console.log(this.excludedElements);
  }

  replaceUrlWithFullUrl(match, p1, offset, string) {
    let fullUrl = new URL(p1, this.styleSheetHref).href;
    return `url(${fullUrl})`;
  }
  addBorderColorCSS(styleRules, filteredStyle) {
    let borderTopColor = styleRules.borderTopColor;
    let borderRightColor = styleRules.borderRightColor;
    let borderBottomColor = styleRules.borderBottomColor;
    let borderLeftColor = styleRules.borderLeftColor;

    if (borderTopColor) {
      if (borderTopColor.includes("var")) {
        darkBg = this.addDarklupWithVars(borderTopColor, "--darklup-bg");
        filteredStyle += `border-top-color: ${darkBg};`;
      } else if (this.isRealColor(borderTopColor)) {
        // console.log(`OP Cute`);
        // console.log(borderTopColor);
        filteredStyle += `border-top-color: ${this.getDarkenBg(borderTopColor)};`;
      }
    }
    if (borderRightColor) {
      if (borderRightColor.includes("var")) {
        darkBg = this.addDarklupWithVars(borderRightColor, "--darklup-bg");
        filteredStyle += `border-right-color: ${darkBg};`;
      } else if (this.isRealColor(borderRightColor)) {
        filteredStyle += `border-right-color: ${this.getDarkenBg(borderRightColor)};`;
      }
    }
    if (borderBottomColor) {
      if (borderBottomColor.includes("var")) {
        darkBg = this.addDarklupWithVars(borderBottomColor, "--darklup-bg");
        filteredStyle += `border-bottom-color: ${darkBg};`;
      } else if (this.isRealColor(borderBottomColor)) {
        filteredStyle += `border-bottom-color: ${this.getDarkenBg(borderBottomColor)};`;
      }
    }
    if (borderLeftColor) {
      if (borderLeftColor.includes("var")) {
        darkBg = this.addDarklupWithVars(borderLeftColor, "--darklup-bg");
        filteredStyle += `border-left-color: ${darkBg};`;
      } else if (this.isRealColor(borderLeftColor)) {
        filteredStyle += `border-left-color: ${this.getDarkenBg(borderLeftColor)};`;
      }
    }
    return filteredStyle;
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

  getVarNameFromRule() {}
  getPrevAllCSSRules() {
    const styleSheets = document.styleSheets;
    const cssRules = [];
    const bgRules = [];
    // return;
    console.log(styleSheets);
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      const isSameOrigin = styleSheet.href === null || new URL(styleSheet.href).origin === document.location.origin;
      if (isSameOrigin) {
        try {
          const rules = styleSheet.cssRules || styleSheet.rules;

          if (rules) {
            for (let j = 0; j < rules.length; j++) {
              rule = rules[j];
              if (this.isRealColor(rule.style.backgroundColor)) {
                // console.log(rule.style.backgroundColor);
                console.log(rule.selectorText);
                console.log(rule.cssText);
                cssRules.push(rule.cssText);
              } else if (this.isRealColor(rule.style.color)) {
                // } else if (rule.style.color) {
                // console.log(rule.style.color);
                // cssRules.push(rule.cssText);
              }
            }
          }
        } catch (e) {
          // console.error(`Error accessing stylesheet: ${e.message}`);
          // console.log(`Error accessing stylesheet: ${e.message}`);
        }
      }
    }

    // return cssRules;
    // const cssRules = getAllCSSRules();
    console.log(bgRules);
    // console.log(cssRules);
  }

  handleHoverBg() {
    this.allElements.forEach((element) => {
      if (this.isActiveDarkMode()) {
        element.addEventListener("mouseenter", this.onElementHoverStart);
        element.addEventListener("mouseleave", this.onElementHoverEnd);
      } else {
        element.removeEventListener("mouseenter", this.onElementHoverStart);
        element.removeEventListener("mouseleave", this.onElementHoverEnd);
      }
    });
  }
  startHoverEvent() {
    this.allElements.forEach((element) => {
      if (this.isActiveDarkMode()) {
        element.addEventListener("mouseenter", this.onElementHoverStart);
        element.addEventListener("mouseleave", this.onElementHoverEnd);
      }
    });
  }
  endHoverEvent() {
    this.allElements.forEach((element) => {
      if (!this.isActiveDarkMode()) {
        element.removeEventListener("mouseenter", this.onElementHoverStart);
        element.removeEventListener("mouseleave", this.onElementHoverEnd);
      }
    });
  }
  onElementHoverStart = (event) => {
    let element = event.target;
    const computedStyle = getComputedStyle(element, ":hover");
    const hoverBg = computedStyle.backgroundColor;
    if (hoverBg !== "rgba(0, 0, 0, 0)") {
      element.dataset.darklupHover = hoverBg;
      element.style.backgroundColor = this.getDarkenBg(hoverBg);
      element.style.backgroundColor = this.getDarkenBg(hoverBg);
      // let darkenBG = this.getDarkenBg(hoverBg);
      // let darkenBG = this.getDarkenBg(hoverBg);
      // console.log(`HoverBG: ${hoverBg}, DarkenBg: ${darkenBG}`);
      // console.log(`Hello`);
    }

    const children = element.children;
    const initialChildBgColors = Array.from(children).map((child) => child.style.backgroundColor);
    Array.from(children).forEach((child, index) => {
      const childHoverStyles = getComputedStyle(child, ":hover");
      const childHoverBgColor = childHoverStyles.backgroundColor;

      if (childHoverBgColor !== "rgba(0, 0, 0, 0)" && childHoverBgColor !== "transparent") {
        child.style.backgroundColor = "green"; // Change to your desired color
      } else {
        child.style.backgroundColor = initialChildBgColors[index];
      }
    });
  };
  on2ElementHoverStart = (event) => {
    let element = event.target;
    // if (!event.target.classList.contains("event.target")) {
    const computedStyle = getComputedStyle(element, ":hover");
    const hoverBg = computedStyle.backgroundColor;
    if (hoverBg !== "rgba(0, 0, 0, 0)") {
      element.dataset.darklupHover = hoverBg;
      element.style.backgroundColor = this.getDarkenBg(hoverBg);
      element.style.backgroundColor = this.getDarkenBg(hoverBg);
      // let darkenBG = this.getDarkenBg(hoverBg);
      // let darkenBG = this.getDarkenBg(hoverBg);
      // console.log(`HoverBG: ${hoverBg}, DarkenBg: ${darkenBG}`);
      // console.log(`Hello`);
    }
    // element.addEventListener;
    // let allChildren = element.querySelectorAll("*");
    // allChildren.forEach((c) => {
    //   let hoverBg = getComputedStyle(e).backgroundColor;

    //   // element.addEventListener("mouseenter", this.onElementHoverStart);
    //   // element.addEventListener("mouseleave", this.onElementHoverEnd);

    //   // const computedStyle = getComputedStyle(c, ":hover");
    //   // const hoverBg = computedStyle.backgroundColor;
    //   if (hoverBg !== "rgba(0, 0, 0, 0)") {
    //     c.dataset.darklupHover = hoverBg;
    //     c.style.backgroundColor = this.getDarkenBg(hoverBg);
    //     c.style.backgroundColor = this.getDarkenBg(hoverBg);
    //     c.classList.add("darklup-hovered");
    //   }
    // });
    // }
  };
  onPrevElementHoverStart(event) {
    const computedStyle = getComputedStyle(event.target, ":hover");
    const hoverBackgroundColor = computedStyle.backgroundColor;
    if (hoverBackgroundColor !== "rgba(0, 0, 0, 0)") {
      event.target.dataset.darklupHover = event.target.style.backgroundColor;
      let tinyHover = tinycolor(hoverBackgroundColor);
      let hoverBg;
      if (tinyHover.getLuminance() * 10 > 4) {
        hoverBg = tinyHover.darken(darkAmount).toRgbString();
        event.target.style.backgroundColor = hoverBg;
      } else {
        hoverBg = tinyHover.darken(10).toRgbString();
        event.target.style.backgroundColor = hoverBg;
      }
    }
  }
  isRealColor(color) {
    // let isRealColor = color !== "rgba(0, 0, 0, 0)" && color !== "transparent" && color !== "inherit" && color !== "initial";
    let isRealColor = color !== "rgba(0, 0, 0, 0)" && color !== "transparent" && color !== "inherit" && color !== "initial" && color !== "none" && color !== "none transparent" && color !== "0px 0px";
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
  onElementHoverEnd(event) {
    let hoverBG = event.target.dataset.darklupHover;
    if (hoverBG) {
      // console.log(hoverBG);
      event.target.style.backgroundColor = "";
    }
  }
  getHoverBackgroundColors(elements) {
    // Create a temporary CSS rule for the hover state
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    // Loop through the NodeList and store the hover background colors
    const hoverBackgroundColors = [];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const tagName = element.tagName.toLowerCase();
      styleElement.sheet.insertRule(`${tagName}:hover { background-color: inherit; }`, 0);

      // Get the hover background color and store it
      // Get the current computed style of the element

      const computedStyle = getComputedStyle(element, ":hover");
      const hoverBackgroundColor = computedStyle.backgroundColor;
      hoverBackgroundColors.push(hoverBackgroundColor);

      // Remove the temporary CSS rule
      styleElement.sheet.deleteRule(0);
    }

    // Remove the temporary style element
    document.head.removeChild(styleElement);

    return hoverBackgroundColors;
  }

  getHoverBackgroundColor(element) {
    // Create a temporary CSS rule for the hover state
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(`${element.tagName.toLowerCase()}:hover { background-color: inherit; }`, 0);

    // Get the current computed style of the element
    const computedStyle = getComputedStyle(element, ":hover");

    // Get the hover background color
    const hoverBackgroundColor = computedStyle.backgroundColor;

    // Remove the temporary CSS rule and the style element
    styleElement.sheet.deleteRule(0);
    document.head.removeChild(styleElement);

    return hoverBackgroundColor;
  }

  handleNewBgColors() {
    this.bgColors.forEach((c) => {
      this.bgDarkenColors.push(this.getDarkenBg(c));
      this.bgDarkenColors.push(this.getDarkenBg(c));
    });
  }
  handleSNewBgColors() {
    this.bgColors.forEach((c, i) => {
      this.bgTinyColors[i] = tinycolor(c);
      if (this.bgTinyColors[i].getLuminance() * 10 > 4) {
        this.bgDarkenColors.push(this.bgTinyColors[i].darken(darkAmount).toRgbString());
      } else {
        this.bgDarkenColors.push(this.bgTinyColors[i].darken(10).toRgbString());
      }
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
  handlePrevCommonElement(element) {
    let BgImage, bgColor;
    BgImage = this.hasBgImage(element);
    if (BgImage) {
      this.elementsWithBgImage.push(element);
    }
    bgColor = this.hasBgColor(element);
    if (bgColor) {
      // console.log(bgColor);
      if (this.hasAlphaBgColor(element)) {
        this.elementsWithAlphaBg.push(element);
        element.classList.add("darklup--alpha-bg");
      } else {
        this.elementsWithRealBgColor.push(element);
      }
    }
  }
  handleBoxShadow(element) {
    let boxShadow = getComputedStyle(element).boxShadow;
    if (boxShadow !== "none") {
      // console.log(element);
      // console.log(boxShadow);
      // this.makeDarkenString(boxShadow);
      this.elementsWithBoxShadow.push(element);
      element.classList.add("wpc--darklup-box-shadow");
      let bgColor = this.hasBgColor(element);
      if (!bgColor) {
        // console.log(boxShadow);
        element.classList.add("darklup-non-bg-box-shadow");
      }
    }

    // Hover Box Shadow
    // const boxStyles = window.getComputedStyle(element, ":hover");
    // const hoverBoxShadow = boxStyles.getPropertyValue("box-shadow");
    // if (hoverBoxShadow !== "none") {
    //   element.classList.add("wpc--darklup-hover-box-shadow");
    //   element.dataset.hovershadow = hoverBoxShadow;
    //   console.log(`has Hover box shadow`, hoverBoxShadow);
    // } else {
    //   // console.log(`No Hover box shadow`, hoverBoxShadow);
    // }
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
      // if (!this.hasBgColor(element)) {
      //   // if (this.hasOwnBgColor(element)) {
      //   let inheritedBg = this.getCloseParentBg(element);
      //   element.dataset.inheritedBg = inheritedBg;
      //   // }
      // }

      if (this.hasOwnText(element)) {
        if (!this.hasOwnColor(element)) {
          let inheritedColor = this.getCloseParentColor(element);
          element.dataset.inheritedColor = inheritedColor;
        }
      }
    });
  }

  handleDarklupExcluded() {
    let allExcluded = document.querySelectorAll(".darklup-excluded");
    allExcluded.forEach((e) => {
      e.style.backgroundColor = e.dataset.inheritedBg;
      e.style.color = e.dataset.inheritedColor;
    });
  }
  resetExcludedBg() {}
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
      // this.documentOnReady();
      this.windowOnLoaded();
      this.prevHandleOSDark();
      // this.handleHoverBg();
      // this.startHoverEvent();
      // this.isActiveTimeBasedDarkMode();
    }
  }

  dashboardWindowOnLoad() {
    let adminDarkMode = this.isAdminDarkModeEnabled();
    if (adminDarkMode) {
      this.enableAdminDarkMode();
      this.addGlobalInlineCSS(this.getAllCSSRules());
    }
    // this.htmlElement.style.display = "block";
    // this.elementsWithRealBgColor.forEach((element) => {
    //   this.applyBgColor(element);
    // });
  }
  prevWindowOnLoad() {
    if (this.isActiveDarkMode()) {
      this.enableDarkMode();
      // this.activateSwitches();
      this.addGlobalInlineCSS(this.getAllCSSRules());
      // this.startHoverEvent();
    }
    // this.handleHoverBg();

    // this.htmlElement.style.display = "block";
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
  getUserTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    let time = hours + ":" + minutes;
    return time;
    // console.log(time);
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
            // this.startHoverEvent();
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
            // this.endHoverEvent();
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
  darkModeImages(mode) {
    const getImgUrl = frontendObject.sitelogo;
    console.log(frontendObject);
    console.log(getImgUrl);
    const lightUrl = getImgUrl.light;
    const darkUrl = getImgUrl.dark;

    if (mode) {
      // Logo
      const lightLogo = document.querySelector('[src="' + lightUrl + '"]');
      lightLogo.src = darkUrl;
      lightLogo.srcset = darkUrl;

      // Images
      frontendObject.darkimages.forEach(function (item) {
        const lightImg = document.querySelector('[src="' + item[0] + '"]');
        lightImg.src = item[1];
        lightImg.srcset = item[1];
      });
    } else {
      // Logo
      const darkLogo = document.querySelector('[src="' + darkUrl + '"]');
      darkLogo.src = lightUrl;
      darkLogo.srcset = lightUrl;

      // Images
      frontendObject.darkimages.forEach(function (item) {
        const darkImg = document.querySelector('[src="' + item[1] + '"]');
        darkImg.src = item[0];
        darkImg.srcset = item[0];
      });
    }
  }

  disableDarkMedia() {
    if (typeof frontendObject == "undefined") return;
    // const getImgUrl = frontendObject.sitelogo;
    // const lightUrl = getImgUrl.light;
    // const darkUrl = getImgUrl.dark;
    // console.log(`test dark image 46`);
    const darkLogo = document.querySelector('[src="' + darklupDarkLogo + '"]');
    if (darkLogo) {
      // darkLogo.src = lightUrl;
      // darkLogo.srcset = lightUrl;
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
    // var getImgUrl = frontendObject.sitelogo;
    // console.log(frontendObject);
    // console.log(getImgUrl);
    // var lightUrl = getImgUrl.light;
    // var darkUrl = getImgUrl.dark;

    // console.log(`test dark image 8`);
    // console.log(lightUrl);
    // console.log(frontendObject.sitelogo.dark);
    var lightLogo = document.querySelector('[src="' + darklupLightLogo + '"]');
    // console.log(lightLogo);

    if (lightLogo) {
      // console.log(frontendObject.sitelogo.dark);

      // lightLogo.src = darkUrl;
      // lightLogo.srcset = darkUrl;
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
    // this.prevWindowOnLoad();
    console.log("Document Ready");
    // this.getAllCSSRules();
    document.addEventListener("DOMContentLoaded", () => {});
  }
  windowOnLoaded() {
    // Window On Load
    window.addEventListener("load", () => {
      // this.prevWindowOnLoad();
      this.handleDynamicContents();
    });
  }

  applyBoxShadow(e) {
    let boxShadow = getComputedStyle(e).boxShadow;
    // let newShadow = this.replaceRgbColorValue(boxShadow);
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

  applyPrevDarkModeToDynamicElement(element) {
    let tag = element.tagName?.toLowerCase();
    if (tag == "a") {
      element.classList.add("darklup--link");
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
      if (this.hasOwnText(element)) {
        element.classList.add("darklup--text");
      }
      element.classList.add("darklup--observed");
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
  getElementWidth(element) {
    // this.activateSwitches();
    // this.htmlElement.style.display = "block";
    let width = 0;
    let dimensions = element?.getBoundingClientRect();
    if (dimensions) width = dimensions.width;
    // this.htmlElement.style.display = "none";
    // console.log(width);
    return width;
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
  hasOwnColor2(e) {
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

  applyBgColor(e) {
    let elementWidth = this.getElementWidth(e);
    // console.log(elementWidth);
    let bgColor = this.hasBgColor(e);
    if (bgColor) {
      let alphaValue = this.hasAlphaBgColor(e);
      if (alphaValue) {
        e.classList.add("darklup--alpha-bg");
      } else if (elementWidth == this.bodyWidth) {
        if (bgColor == this.primaryBg) {
          e.classList.add("darklup--bg");
        } else {
          e.classList.add("darklup--secondary-bg");
        }
        e.classList.add("darklup--bg-applied");
      } else if (this.bodyWidth > elementWidth && elementWidth > 0) {
        let parentBg = this.getParentBg(e);
        if (parentBg == "primary" || parentBg == "secondary") {
          e.classList.add("darklup--tertiary-bg");
        } else {
          // e.classList.add("darklup--secondary-bg");
          e.classList.add("darklup--bg");
        }
        e.classList.add("darklup--bg-applied");
      } else {
        // e.classList.add("darklup--bg");
        e.classList.add("darklup--bg-applied");
        e.classList.add("darklup--tertiary-bg");
      }
    }
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

  applyBgImages(element) {
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

  replaceRgbColorValue(currentStr) {
    let newColor1 = DarklupJs.primary_bg;
    let newColor2 = DarklupJs.secondary_bg;
    let newColor3 = DarklupJs.tertiary_bg;
    let newColors = [newColor1, newColor2, newColor3];
    let newStr = "";

    const colorRegexMatch = /rgba?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*[0-9\.]+)?\)/g;
    const rgbaMatches = currentStr.match(colorRegexMatch);

    newColors.forEach((color, i) => {
      if (!rgbaMatches[i]) return;
      if (color.includes("rgba")) {
        if (rgbaMatches[i]) {
          newStr = currentStr?.replace(rgbaMatches[i], color);
          currentStr = newStr;
        }
      } else if (color.includes("rgb") && rgbaMatches[i].includes("rgb") && !rgbaMatches[i].includes("rgba")) {
        if (rgbaMatches[i]) {
          newStr = currentStr?.replace(rgbaMatches[i], color);
          currentStr = newStr;
        }
      } else if (color.includes("rgb") && rgbaMatches[i].includes("rgba")) {
        let lastCommaPosition = rgbaMatches[i].lastIndexOf(",");
        let alphaStr = rgbaMatches[i].slice(lastCommaPosition);
        color = color.replace("rgb(", "rgba(").replace(")", alphaStr);
        newStr = currentStr?.replace(rgbaMatches[i], color);
        currentStr = newStr;
      }
    });
    return newStr;
    // console.log(newStr);
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
  applyPrevGradientBgImage(element) {
    let currentBg = getComputedStyle(element).getPropertyValue("background-image");
    // console.log(`Current Gradient ${currentBg}`);
    if (currentBg !== "none" && currentBg.includes("linear-gradient")) {
      // let newColors = ['rgba(23, 24, 25)', 'rgba(26, 27, 28)'];
      // let newColors = ['rgba(23, 24, 25, 0.5)', 'rgba(26, 27, 28, 0.6)'];
      let newColor1 = DarklupJs.primary_bg;
      let newColor2 = DarklupJs.secondary_bg;
      let newColors = [newColor1, newColor2];
      let newGradient;
      newGradient = `linear-gradient(${DarklupJs.primary_bg}, ${DarklupJs.secondary_bg})`;
      // newGradient = `linear-gradient(${DarklupJs.primary_bg_rgba}, ${DarklupJs.secondary_bg_rgba})`;
      const colorRegexMatch = /rgba?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*[0-9\.]+)?\)/g;
      const rgbaMatches = currentBg.match(colorRegexMatch);

      newColors.forEach((color, i) => {
        if (color.includes("rgba")) {
          if (rgbaMatches[i]) {
            newGradient = currentBg?.replace(rgbaMatches[i], color);
            currentBg = newGradient;
          }
        } else if (color.includes("rgb") && rgbaMatches[i].includes("rgb") && !rgbaMatches[i].includes("rgba")) {
          if (rgbaMatches[i]) {
            newGradient = currentBg?.replace(rgbaMatches[i], color);
            currentBg = newGradient;
          }
        } else if (color.includes("rgb") && rgbaMatches[i].includes("rgba")) {
          let lastCommaPosition = rgbaMatches[i].lastIndexOf(",");
          let alphaStr = rgbaMatches[i].slice(lastCommaPosition);
          color = color.replace("rgb(", "rgba(").replace(")", alphaStr);
          newGradient = currentBg?.replace(rgbaMatches[i], color);
          currentBg = newGradient;
        }
      });

      if (rgbaMatches) {
        if (newGradient) element.style.backgroundImage = newGradient;
      }
      // console.log(`newGradient ${newGradient}`);
    }
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
  excludePrevAndSelect(excludes = [], selector = "html *") {
    excludes.forEach(function (exclude) {
      selector += `:not(${exclude})`;
    });
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
    // console.log(excludeSelectors);
    let dynamicExcludes = [];
    if (excludeSelectors.length > 0) {
      excludeSelectors.forEach((e) => {
        let thisElement = node.parentElement?.querySelectorAll(e);
        dynamicExcludes = [...thisElement, ...dynamicExcludes];
      });
    }

    // let darklupStyle = document.getElementById("darklup-global-css");
    // darklupStyle.remove();
    dynamicExcludes.forEach((element) => {
      element.classList.add("darklup-excluded");

      // if (!this.hasBgColor(element)) {
      //   // if (this.hasOwnBgColor(element)) {
      //   let inheritedBg = this.getCloseParentBg(element);
      //   element.dataset.inheritedBg = inheritedBg;
      //   // }
      // }

      // if (this.hasOwnText(element)) {
      //   if (!this.hasOwnColor(element)) {
      //     let inheritedColor = this.getCloseParentColor(element);
      //     element.dataset.inheritedColor = inheritedColor;
      //   }
      // }
    });
    // darkStyle
    // document.head.appendChild(darklupStyle);
    // this.darkModeIgnoreInheritedColor(dynamicExcludes);
    return dynamicExcludes;

    // console.log(this.excludedElements);
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

          // console.log(nodeExclude);
          // console.log(node);

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
  // let testAll = document.querySelectorAll("*");
  // testAll.forEach((e) => {
  //   if (hasOwnColor(e)) {
  //     console.log(hasOwnColor(e));
  //   }
  // });
  let body = document.querySelector("body");

  let darklup = new Darklup();

  // console.log(`Document is Ready`);
  // hexToRgb('#272827');
  // console.log(hexToRgb('#272827'));
});
function hasOwnColor(e) {
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
// Window On Load
window.addEventListener("load", function () {
  // let darklup = new Darklup();
  // console.clear();
  // let darklup = new Darklup();
  // console.log(`Window On Load`);
  // const filteredElements = [];
});

// console.log(`Hi Mahbub, your darkup calculation is complete`);
