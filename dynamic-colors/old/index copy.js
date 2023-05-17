// import tinycolor from "tinycolor2";

// let MyGrad = `linear-gradient(180deg, rgba(39, 40, 39, 0.6) 0%, rgba(36, 37, 37, 0.6) 32%)`;
let excludeSelectors = [];
// let excludeSelectors = DarklupJs.exclude_element;

// excludeSelectors = ["#adminmenuwrap", "#adminmenuwrap *"];
// let elementThree = ".elementor-element-6109eb5 .elementor-background-overlay";
// excludeSelectors = [...excludeSelectors, elementThree];

// excludeSelectors = [...excludeSelectors, ...DarklupJs.exclude_element];

excludeSelectors = [...DarklupJs.exclude_element];
// console.log(excludeSelectors);
console.log("Hello Hi 83");
console.log(excludeSelectors);

// let myElements = document.querySelectorAll(selectStr);

// return;
// console.log("returned");

class Darklup {
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

    this.bodyWidth = this.getElementWidth(bodyElement);
    let bodyBg = this.hasBgColor(bodyElement);
    let htmlBg = this.hasBgColor(this.htmlElement);
    if (bodyBg) {
      this.primaryBg = bodyBg;
    } else if (htmlBg) {
      this.primaryBg = htmlBg;
    } else {
      this.primaryBg = "rgb(255, 255, 255)";
      bodyElement.classList.add("darklup--bg");
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
      // this.addDarkModeIgnoreClass(excludeSelectors);
      this.darkModeIgnoreInheritedBg(excludeSelectors);
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
    // console.log(this.allElements);
    for (let element of this.allElements) {
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
        element.classList.add("darklup-element");
        this.handleCommonElement(element);
      }
      // 1s
      this.handleBoxShadow(element);
    }

    // console.log(this.elementsWithRealBgColor);

    // this.elementsWithRealBgColor.forEach((element) => {
    //   this.applyBgColor(element);
    // });
  }

  handleCommonElement(element) {
    let BgImage, bgColor;
    // For BG Image and Color
    BgImage = this.hasBgImage(element);
    if (BgImage) {
      console.log(BgImage);
      this.elementsWithBgImage.push(element);
    }
    // For BG Color
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

    /************************************************************ */
    // For Text
    if (this.hasOwnText(element)) {
      this.elementsWithText.push(element);
      element.classList.add("darklup--text");
    }

    let sudoElements = ["after", "before"];
    sudoElements.forEach((e) => {
      let sudoStyle = window.getComputedStyle(element, `:${e}`);
      if (sudoStyle.content !== "none") {
        element.classList.add(`darklup--text-${e}`);
      }
    });

    /************************************************************ */
    // For border Color
    if (this.hasBorderWidth(element)) {
      this.elementsWithRealBorder.push(element);
      element.classList.add("darklup--border");
    }
  }
  handleBoxShadow(element) {
    let boxShadow = getComputedStyle(element).boxShadow;
    if (boxShadow !== "none") {
      this.elementsWithBoxShadow.push(element);
      element.classList.add("wpc--darklup-box-shadow");
      let bgColor = this.hasBgColor(element);
      if (!bgColor) {
        element.classList.add("wpc--darklup-non-bg-box-shadow");
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
          let element = document.querySelector(e);
          if (element) {
            if (!this.hasBgColor(element)) {
              let inheritedBg = this.getCloseParentBg(element);
              element.dataset.inheritedBg = inheritedBg;
            }
            element.classList.add("darklup-excluded");
          }
        }

        // thisElement = document.querySelector(e);
        // e.classList?.add("darklup-dark-ignore");
        // document.querySelector(e)?.classList.add("darklup-dark-ignore");
      });
    }
  }
  handleDarklupExcluded() {
    let allExcluded = document.querySelectorAll(".darklup-excluded");
    allExcluded.forEach((e) => {
      e.style.backgroundColor = e.dataset.inheritedBg;
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
      this.windowOnLoaded();
      this.prevHandleOSDark();
      // this.isActiveTimeBasedDarkMode();
    }
  }

  dashboardWindowOnLoad() {
    let adminDarkMode = this.isAdminDarkModeEnabled();
    if (adminDarkMode) {
      this.enableAdminDarkMode();
    }
    // this.htmlElement.style.display = "block";
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
  darkModeImages(mode) {
    const getImgUrl = frontendObject.sitelogo;
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
    const getImgUrl = frontendObject.sitelogo;
    const lightUrl = getImgUrl.light;
    const darkUrl = getImgUrl.dark;

    const darkLogo = document.querySelector('[src="' + darkUrl + '"]');
    if (darkLogo) {
      darkLogo.src = lightUrl;
      darkLogo.srcset = lightUrl;
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
    const getImgUrl = frontendObject.sitelogo;
    const lightUrl = getImgUrl.light;
    const darkUrl = getImgUrl.dark;

    const lightLogo = document.querySelector('[src="' + lightUrl + '"]');
    if (lightLogo) {
      lightLogo.src = darkUrl;
      lightLogo.srcset = darkUrl;
    }
    frontendObject.darkimages?.forEach(function (item) {
      const lightImg = document.querySelector('[src="' + item[0] + '"]');
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
    document.addEventListener("DOMContentLoaded", function () {});
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
    // let element = document.getElementById('your-element-id');
    let parent = element.parentNode;
    let parentBg = false;
    while (parent) {
      let thisParentBg = this.hasBgColor(parent);
      if (thisParentBg) {
        parentBg = thisParentBg;
        break;
        // return parentBg;
      }

      // const backgroundColor = getComputedStyle(parent).backgroundColor;
      // if (backgroundColor !== "rgba(0, 0, 0, 0)" && backgroundColor !== "transparent") {
      //   // Found a parent with a real background color
      //   console.log(parent);
      //   break;
      // }

      parent = parent.parentNode;
    }
    return parentBg;
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
        e.classList.add("darklup--alpha-bg");
      } else if (elementWidth == this.bodyWidth) {
        if (bgColor == this.primaryBg) {
          e.classList.add("darklup--bg");
        } else {
          e.classList.add("darklup--secondary-bg");
        }
        e.classList.add("darklup--bg-applied");
      } else if (this.bodyWidth > elementWidth && elementWidth > 0) {
        if (this.parentHasTertiary(e)) {
          e.classList.add("darklup--secondary-bg");
          // e.classList.add("darklup--tertiary-bg");
        } else {
          e.classList.add("darklup--tertiary-bg");
        }
        e.classList.add("darklup--bg-applied");
      } else {
        e.classList.add("darklup--bg");
        e.classList.add("darklup--bg-applied");
      }
    }
  }
  getBgColor(e) {
    let style = window.getComputedStyle(e);
    let appliedBgColor = style.getPropertyValue("background-color");
    return appliedBgColor;
  }
  applyBgColorGood(e) {
    let elementWidth = this.getElementWidth(e);
    let bgColor = this.hasBgColor(e);
    if (bgColor) {
      let alphaValue = this.hasAlphaBgColor(e);
      if (alphaValue) {
        e.classList.add("darklup--alpha-bg");
      } else if (elementWidth == this.bodyWidth) {
        let prevSibling = false;
        if (e !== document.body && document.body.contains(e)) {
          prevSibling = e.previousElementSibling;
        }
        // prettier-ignore
        if (prevSibling) {
          if(prevSibling.classList.contains('darklup--bg')){
            e.classList.add("darklup--secondary-bg");
          }else if(prevSibling.classList.contains('darklup--secondary-bg')){
            e.classList.add("darklup--bg");
          }else{
            if (bgColor == this.primaryBg) {
              e.classList.add("darklup--bg");
            } else {
              e.classList.add("darklup--secondary-bg");
            }
          }
        }else{
          if (bgColor == this.primaryBg) {
            e.classList.add("darklup--bg");
          } else {
            e.classList.add("darklup--secondary-bg");
          }
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
        // e.classList.add("darklup--secondary-bg");
        e.classList.add("darklup--bg");
        e.classList.add("darklup--bg-applied");
      }
    }
  }
  applyBgColorInnerSame(e) {
    let elementWidth = this.getElementWidth(e);
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
        if (bgColor == this.primaryBg) {
          e.classList.add("darklup--bg");
        } else {
          let parentBg = this.getParentBg(e);
          if (parentBg == "primary" || parentBg == "secondary") {
            e.classList.add("darklup--tertiary-bg");
          } else {
            // e.classList.add("darklup--secondary-bg");
            e.classList.add("darklup--bg");
          }
        }

        e.classList.add("darklup--bg-applied");
      } else {
        // e.classList.add("darklup--bg");
        e.classList.add("darklup--bg-applied");
        e.classList.add("darklup--tertiary-bg");
      }
    }
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
    // let style = getComputedStyle(e);
    // console.log(style);
    let bgImage = getComputedStyle(e).backgroundImage;
    if (bgImage !== "none" && (bgImage.includes("linear-gradient") || bgImage.includes("url"))) {
      // console.log(bgImage);
      return bgImage;
    } else {
      return false;
    }
  }
  applyBgImage(element) {
    let BgImage = this.hasBgImage(element);
    if (BgImage) {
      if (BgImage.includes("linear-gradient") && BgImage.includes("url")) {
        element.classList.add("darklup-bg-gradient--image");
      } else if (BgImage.includes("url")) {
        element.classList.add("darklup-bg--image");
        if (!this.alreadyHasOverlay(element)) {
          let imgGrad = `linear-gradient(rgba(0, 0, 0, ${DarklupJs.bg_image_dark_opacity}), rgba(0, 0, 0,${DarklupJs.bg_image_dark_opacity}))`;
          let imgOverlay = `${imgGrad}, ${BgImage}`;
          element.style.setProperty("background-image", imgOverlay);
          // element.dataset.add
        }
        this.addDarkenClassToChild(element);
      } else if (BgImage.includes("linear-gradient")) {
        element.classList.add("darklup-bg-gradient");
        // element.classList.add("darklup-bg-gradient--rgb");
        this.applyGradientBgImage(element);
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
    this.enableDarkMedia();
    this.handleDarklupExcluded();
  }
  resetDynamicStyles() {
    this.elementsWithBgImage?.forEach((element) => this.resetBgImage(element));
    this.elementsWithAlphaBg?.forEach((element) => this.resetAlphaBgColor(element));
    this.elementsWithBoxShadow?.forEach((element) => this.resetBoxShadow(element));
    this.disableDarkMedia();
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
// let darklup = new Darklup();
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error("Invalid hex color: " + hex);
  }
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Document on Ready
document.addEventListener("DOMContentLoaded", function () {
  let darklup = new Darklup();
  // console.log(`Document is Ready`);
  // hexToRgb('#272827');
  // console.log(hexToRgb('#272827'));
});

// Window On Load
window.addEventListener("load", function () {
  // let darklup = new Darklup();
  // console.log(`Window On Load`);
  // const filteredElements = [];
});

// console.log(`Hi Mahbub, your darkup calculation is complete`);
