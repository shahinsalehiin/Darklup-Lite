let excludeSelectors = [];
excludeSelectors = ["#adminmenuwrap", "#adminmenuwrap *"];
let applyBgOverlay = false;
if (DarklupJs.apply_bg_overlay == "yes") {
  applyBgOverlay = true;
}
// console.log("free dynamic presets 5");
// console.log("free dynamic presets 2");
class Darkluplite {
  constructor() {
    this.setRequiredVariables();
    if (this.isGutenburg) {
      this.htmlElement.style.display = "block";
      return;
    }
    this.getAllElements();
    this.applyDarklupDarkModeToAll();

    if (this.isWpAdmin) {
      this.dashboardDarkMode();
    } else {
      this.frontEndDarkMode();
    }
    this.htmlElement.style.display = "block";
  }
  dashboardDarkMode() {
    this.dashboardWindowOnLoad();
    this.dashboardDarkModeSwitchEvent();
    this.windowOnLoaded();
  }
  frontEndDarkMode() {
    this.prevWindowOnLoad();
    this.prevDarkModeSwitchEvent();
    this.prevHandleKeyShortcut();
    this.windowOnLoaded();
    this.prevHandleOSDark();
  }
  setRequiredVariables() {
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
    this.bodyWidth = this.getElementWidth(bodyElement);
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
      ".darkluplite-mode-switcher",
      ".darkluplite-mode-switcher *",
      ".darkluplite-menu-switch",
      ".darkluplite-menu-switch *",
      ".darkluplite-switch-preview-inner",
      ".darkluplite-switch-preview-inner *",
      ".darkluplite-admin-settings-area .on-off-toggle",
      ".darkluplite-admin-settings-area .on-off-toggle *",
      ".wp-core-ui .darkluplite-section-title .button",
      ".darklup-pro-ribbon",
      ".wpc-color-picker--input",
      ".wpc-color-picker--input *",
      ".darklup-single-popup-wrapper .darklup-single-popup",
      "iframe",
      // ".darkluplite-settings-area",
      // '.darkluplite-dark-ignore',
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
      // '.elementor-element-overlay',
      // '.elementor-background-overlay',
      "#wpadminbar",
      "#wpadminbar *",
      "#wpadminbar a",
      "noscript",
    ];

    if (excludeSelectors.length > 0) {
      excludes = [...excludeSelectors, ...excludes];
    }

    selectAll = this.excludeAndSelect(excludes, "html, html *");
    this.allElements = document.querySelectorAll(selectAll);
  }

  dashboardWindowOnLoad() {
    let adminDarkMode = this.isAdminDarkModeEnabled();
    if (adminDarkMode) {
      this.enableAdminDarkMode();
    }
    this.elementsWithRealBgColor.forEach((element) => {
      this.applyBgColor(element);
    });
  }
  prevWindowOnLoad() {
    if (this.isActiveDarkMode()) {
      this.enableDarkMode();
    }
    this.elementsWithRealBgColor.forEach((element) => {
      this.applyBgColor(element);
    });
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
          } else {
            this.deactivateAdminDarkMode();
          }
        }
      });
    });
  }
  prevDarkModeSwitchEvent() {
    this.switchWrappers.forEach((s) => {
      s?.addEventListener("click", (e) => {
        if (e.target.classList.contains("switch-trigger")) {
          // this.htmlElement.classList.toggle(this.darkEnabledClass);
          let thisTrigger = e.target;
          if (thisTrigger.checked) {
            this.activateDarkMode();

            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
              localStorage.removeItem("lightOnOSDarkChecked");
            }
            if (this.switchWrapper.contains(thisTrigger)) {
              if (this.menuSwitch) this.menuSwitch.checked = true;
            } else {
              if (this.floatingSwitch) this.floatingSwitch.checked = true;
            }
            // if (this.switchWrapper.contains(thisTrigger)) {
            //   if (this.adminSwitch) this.adminSwitch.checked = true;
            // } else {
            //   if (this.floatingSwitch) this.floatingSwitch.checked = true;
            // }
          } else {
            this.deactivateDarkMode();

            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
              localStorage.setItem("lightOnOSDarkChecked", true);
            }

            if (isDefaultDarkModeEnabled) {
              localStorage.setItem("lightOnDefaultDarkMode", true);
            }

            // if (frontendObject.timeBasedMode) {
            if (frontendObject.time_based_mode_active) {
              localStorage.setItem("lightOnTimeBasedDarkMode", true);
            }

            if (this.switchWrapper.contains(thisTrigger)) {
              if (this.menuSwitch) this.menuSwitch.checked = false;
            } else {
              if (this.floatingSwitch) this.floatingSwitch.checked = false;
            }
            // if (this.switchWrapper.contains(thisTrigger)) {
            //   if (this.adminSwitch) this.adminSwitch.checked = false;
            // } else {
            //   if (this.floatingSwitch) this.floatingSwitch.checked = false;
            // }
          }
        }
      });
    });
  }

  prevHandleOSDark() {
    if (typeof isOSDarkModeEnabled !== "undefined") {
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
  }

  prevHandleKeyShortcut() {
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
          } else {
            this.activateDarkMode();
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
    document.addEventListener("DOMContentLoaded", function () {});
  }
  windowOnLoaded() {
    // Window On Load
    window.addEventListener("load", () => {
      // this.prevWindowOnLoad();
      this.handleDynamicContents();
    });
  }

  applyDarklupDarkModeToAll() {
    for (let element of this.allElements) {
      let tag = element.tagName?.toLowerCase();
      if (tag == "a") {
        let bgColor = this.hasBgColor(element);
        if (!bgColor) {
          element.classList.add("darkluplite--link");
        }
      } else if (tag == "button") {
        element.classList.add("darkluplite--btn");
      } else if (tag == "img") {
        element.classList.add("darkluplite--img");
      } else if (tag == "svg") {
        element.classList.add("darkluplite--inline-svg");
      } else if (tag == "input" || tag == "textarea" || tag == "select") {
        element.classList.add("darkluplite--input");
      } else if (tag == "del") {
        element.classList.add("darkluplite--text");
      } else {
        element.classList.add("wpc--darkluplite-element");
        this.handleCommonElement(element);
      }
      this.handleBoxShadow(element);
    }
  }
  handleCommonElement(element) {
    let BgImage, bgColor;
    // For BG Image and Color
    BgImage = this.hasBgImage(element);
    if (BgImage) {
      this.elementsWithBgImage.push(element);
    }
    // For BG Color
    bgColor = this.hasBgColor(element);
    if (bgColor) {
      // console.log(bgColor);
      if (this.hasAlphaBgColor(element)) {
        this.elementsWithAlphaBg.push(element);
        element.classList.add("darkluplite--alpha-bg");
      } else {
        this.elementsWithRealBgColor.push(element);
      }
    }

    /************************************************************ */
    // For Text
    if (this.hasOwnText(element)) {
      this.elementsWithText.push(element);
      element.classList.add("darkluplite--text");
    }

    let sudoElements = ["after", "before"];
    sudoElements.forEach((e) => {
      let sudoStyle = window.getComputedStyle(element, `:${e}`);
      if (sudoStyle.content !== "none") {
        element.classList.add(`darkluplite--text-${e}`);
      }
    });

    /************************************************************ */
    // For border Color
    if (this.hasBorderWidth(element)) {
      this.elementsWithRealBorder.push(element);
      element.classList.add("darkluplite--border");
    }
  }
  handleBoxShadow(element) {
    let boxShadow = getComputedStyle(element).boxShadow;
    if (boxShadow !== "none") {
      this.elementsWithBoxShadow.push(element);
      element.classList.add("wpc--darkluplite-box-shadow");
      let bgColor = this.hasBgColor(element);
      if (!bgColor) {
        element.classList.add("wpc--darkluplite-non-bg-box-shadow");
      }
    }
  }
  applyBoxShadow(e) {
    let boxShadow = getComputedStyle(e).boxShadow;
    let newShadow = this.replaceRgbColorValue(boxShadow);
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
  applyDarkModeToDynamicElement(element) {
    let tag = element.tagName?.toLowerCase();
    if (tag == "a") {
      element.classList.add("darkluplite--link");
    } else if (tag == "button") {
      element.classList.add("darkluplite--btn");
    } else if (tag == "img") {
      element.classList.add("darkluplite--img");
    } else if (tag == "svg") {
      element.classList.add("darkluplite--inline-svg");
    } else if (tag == "input" || tag == "textarea" || tag == "select") {
      element.classList.add("darkluplite--input");
    } else if (tag == "del") {
      element.classList.add("darkluplite--text");
    } else {
      if (this.hasOwnText(element)) {
        element.classList.add("darkluplite--text");
      }
      element.classList.add("wpc--darkluplite--observed");
    }
  }
  getElementArea(element) {
    let area = 0;
    let dimensions = element.getBoundingClientRect();
    if (dimensions) area = dimensions.width * dimensions.height;
    return area;
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
    this.htmlElement.style.display = "block";
    let width = 0;
    let dimensions = element?.getBoundingClientRect();
    if (dimensions) width = dimensions.width;
    this.htmlElement.style.display = "none";
    // console.log(width);
    return width;
  }
  getParentBg(element) {
    let parentBg = "primary";
    const closeBg = element.closest(".darkluplite--bg-applied");
    if (closeBg) {
      if (closeBg.classList.contains("darkluplite--bg")) {
        parentBg = "primary";
      } else if (closeBg.classList.contains("darkluplite--secondary-bg")) {
        parentBg = "secondary";
      } else if (closeBg.classList.contains("darkluplite--tertiary-bg")) {
        parentBg = "tertiary";
      }
    }

    return parentBg;
  }
  parentHasTertiary(element) {
    let hasTertiary = false;
    let closeBg = element.closest(".darkluplite--bg-applied");
    if (closeBg) {
      if (closeBg.classList.contains("darkluplite--tertiary-bg")) {
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

  hasBgColor(e) {
    let style = window.getComputedStyle(e);
    let bgColor = style.getPropertyValue("background-color");
    let isRealBgColor = bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent" && bgColor !== "inherit";
    if (isRealBgColor) {
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
  OpApplyBgColor(e) {
    let elementWidth = this.getElementWidth(e);
    let bgColor = this.hasBgColor(e);
    if (bgColor) {
      let alphaValue = this.hasAlphaBgColor(e);
      if (alphaValue) {
        e.classList.add("darkluplite--alpha-bg");
      } else if (elementWidth == this.bodyWidth) {
        if (bgColor == this.primaryBg) {
          e.classList.add("darkluplite--bg");
        } else {
          e.classList.add("darkluplite--secondary-bg");
        }
        e.classList.add("darkluplite--bg-applied");
      } else if (this.bodyWidth > elementWidth && elementWidth > 0) {
        if (this.parentHasTertiary(e)) {
          e.classList.add("darkluplite--secondary-bg");
          // e.classList.add("darkluplite--tertiary-bg");
        } else {
          e.classList.add("darkluplite--tertiary-bg");
        }
        e.classList.add("darkluplite--bg-applied");
      } else {
        e.classList.add("darkluplite--bg");
        e.classList.add("darkluplite--bg-applied");
      }
    }
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
        e.classList.add("darkluplite--alpha-bg");
      } else if (elementWidth == this.bodyWidth) {
        if (bgColor == this.primaryBg) {
          e.classList.add("darkluplite--bg");
        } else {
          e.classList.add("darkluplite--secondary-bg");
        }
        e.classList.add("darkluplite--bg-applied");
      } else if (this.bodyWidth > elementWidth && elementWidth > 0) {
        let parentBg = this.getParentBg(e);
        if (parentBg == "primary" || parentBg == "secondary") {
          e.classList.add("darkluplite--tertiary-bg");
        } else {
          // e.classList.add("darkluplite--secondary-bg");
          e.classList.add("darkluplite--bg");
        }
        e.classList.add("darkluplite--bg-applied");
      } else {
        // e.classList.add("darkluplite--bg");
        e.classList.add("darkluplite--bg-applied");
        e.classList.add("darkluplite--tertiary-bg");
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
    // let bgImage = getComputedStyle(e).getPropertyValue("background-image");
    let bgImage = getComputedStyle(e).backgroundImage;
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
        element.classList.add("darkluplite-bg-gradient--image");
      } else if (BgImage.includes("url")) {
        element.classList.add("darkluplite-bg--image");
        if (!this.alreadyHasOverlay(element)) {
          if (applyBgOverlay) {
            let imgGrad = `linear-gradient(rgba(0, 0, 0, ${DarklupJs.bg_image_dark_opacity}), rgba(0, 0, 0,${DarklupJs.bg_image_dark_opacity}))`;
            let imgOverlay = `${imgGrad}, ${BgImage}`;
            element.style.setProperty("background-image", imgOverlay);
          }
        }
        this.addDarkenClassToChild(element);
      } else if (BgImage.includes("linear-gradient")) {
        element.classList.add("darkluplite-bg-gradient");
        this.applyGradientBgImage(element);
        this.addDarkenClassToChild(element);
      }
      element.dataset.lightbg = BgImage;
    }
  }
  alreadyHasOverlay(element) {
    let hasOverlay = false;
    if (element.classList.contains("darkluplite-under-darken-bg")) {
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
  applyGradientBgImage(element) {
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
        e.classList.add("darkluplite-under-darken-bg");
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
    this.elementsWithBgImage?.forEach((element) => this.applyBgImage(element));
    this.elementsWithAlphaBg?.forEach((element) => this.applyAlphaBgColor(element));
    this.elementsWithBoxShadow?.forEach((element) => this.applyBoxShadow(element));
  }
  resetDynamicStyles() {
    this.elementsWithBgImage?.forEach((element) => this.resetBgImage(element));
    this.elementsWithAlphaBg?.forEach((element) => this.resetAlphaBgColor(element));
    this.elementsWithBoxShadow?.forEach((element) => this.resetBoxShadow(element));
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
          node.classList?.add("wpc-darklup-observer--node");
          this.applyDarkModeToDynamicElement(node);
          const childNodes = node.querySelectorAll("*");
          childNodes.forEach((childNode) => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              this.applyDarkModeToDynamicElement(childNode);
            }
          });
        });
      });
    });

    newObserver.observe(parentElement.parentNode, observerConfig);
  }
}

// Document on Ready
document.addEventListener("DOMContentLoaded", function () {
  let darkluplite = new Darkluplite();
});

// Window On Load
window.addEventListener("load", function () {
  // let darkluplite = new Darkluplite();
});

// console.log(`Hi Mahbub, your darkup calculation is complete`);
