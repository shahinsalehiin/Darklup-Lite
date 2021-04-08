; (function ($) {
    "use strict";

    let a = {};

    a = {

        darkEnabledClass: 'darkluplite-admin-dark-mode-enabled',
        init: function() {

            // Color Picker
            $('.color-picker').wpColorPicker();
            // Select 2 support
            $(".darkluplite-select2").select2();
            //
            this.darkModeSwitchEvent();
            this.proFeaturePopup();
            this.proPopupClose();
            this.niceSelect();
            this.SettingsPageTab();
            this.MagnificPopup();
            this.customCSSEditor();
            this.fieldContation();
            this.windowOnLoad();
            this.repeaterField();
            this.mediaUploader();
            
        },
        windowOnLoad: function() {

            // 
            let getStorageData = localStorage.getItem("darklupModeEnabled"),
                getTriggerCheked = localStorage.getItem("triggerCheked"),
                $darkIcon   = $('.admin-dark-icon'),
                $lightIcon  = $('.admin-light-icon');
            //
            if( getStorageData && getTriggerCheked ) {
                $('html').toggleClass(this.darkEnabledClass);
                $('.switch-trigger').attr( 'checked', true );
                $('.darkluplite-mode-switcher').addClass( 'darkluplite-admin-dark-ignore' );
                $darkIcon.show();
                $lightIcon.hide();
                $("html").show() /*Solve to Issue 1*/
            }else{
                $("html").show() /*Solve to Issue 1*/
            }

        },
        darkModeSwitchEvent: function() {

            let $that = this;

            //
            $('.switch-trigger').on( 'click', function() {

                let $this = $(this),
                    $switcher = $this.closest('.darkluplite-mode-switcher'),
                    $darkIcon   = $('.admin-dark-icon'),
                    $lightIcon  = $('.admin-light-icon');

                $('html').toggleClass($that.darkEnabledClass);

                // Storage data
                if( $this.is(':checked') ) {
                    localStorage.setItem("darklupModeEnabled", $that.darkEnabledClass );
                    localStorage.setItem("triggerCheked", "checked");
                    $switcher.addClass('darkluplite-admin-dark-ignore');
                    $darkIcon.show();
                    $lightIcon.hide();
                    
                } else {
                    $switcher.removeClass('darkluplite-admin-dark-ignore');
                    localStorage.removeItem("darklupModeEnabled");
                    localStorage.removeItem("triggerCheked");
                    $darkIcon.hide();
                    $lightIcon.show();

                }

            } )
            
        },
        niceSelect: function() {

            if ($('.nice-select-active').length) {
                $('.nice-select-active').niceSelect();
            }

        },
        SettingsPageTab: function() {

            // Settings page tab
            $('[data-target-id]').on( 'click', function( e ) {

                e.preventDefault();
                var $this = $(this),
                    getId = $this.data('target-id');

                localStorage.setItem("tabActivation", getId);

                $('.active').removeClass('active');
                $this.addClass('active');

                $('.darkluplite-d-show').removeClass('darkluplite-d-show').addClass('darkluplite-d-hide');
                $('#'+getId).removeClass('darkluplite-d-hide').addClass('darkluplite-d-show');

            } )

            // Check active tab
            let activateTab = localStorage.getItem("tabActivation");

            if( activateTab ) {
                $('.active').removeClass('active');
                $('[data-target-id="'+activateTab+'"]').addClass('active');
                $('.darkluplite-d-show').removeClass('darkluplite-d-show').addClass('darkluplite-d-hide');
                $('#'+activateTab).removeClass('darkluplite-d-hide').addClass('darkluplite-d-show');

            }

        },
        MagnificPopup: function() {

            /* -------------------------------------------------
                Magnific JS 
            ------------------------------------------------- */
            $('.video-play-btn').magnificPopup({
              type: 'iframe',
              removalDelay: 260,
              mainClass: 'mfp-zoom-in',
            });
            $.extend(true, '', {
              iframe: {
                patterns: {
                  youtube: {
                    index: 'youtube.com/', 
                    id: 'v=', 
                    src: '' 
                  }
                }
              }
            });


        },
        customCSSEditor: function() {

            //
            var isEditor = document.getElementById('darklupEditor');

            if( isEditor != null ) {
                // Css Editor
                var cssEditor = ace.edit("darklupEditor");
                cssEditor.setTheme("ace/theme/monokai");
                cssEditor.session.setMode("ace/mode/css");

                $("form").on( 'submit', function( e ) {
                    document.getElementById("editortext").value = cssEditor.getValue();
                } )


            }

        },
        fieldContation: function() {

            /**
             *  Condition field
             */

            let condition = $( '[data-condition]' );

            condition.each( function() {

            let $this = $(this);

            let i = $(this).data('condition');

            if( !i ) {
                return;
            }

            let o = $('.'+i.key);

            o.on( 'click', function() {
                if( $( this ).is( ':checked' ) ) {
                    $this.show();
                } else {
                   $this.hide(); 
                }

            } )

            // On load event
            if( o.is(':checked') ) {
                $this.show();
            } else {
                $this.hide();
            }


            } )


        },
        mediaUploader: function () {

            // Media Upload
            var mediaUploader, t;

            $('.darkluplite_image_upload_btn').on('click', function (e) {

                e.preventDefault();

                t = $(this).parent().find('.darkluplite_image_uploader');

                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }
                mediaUploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    }, multiple: false
                });
                mediaUploader.on('select', function () {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();

                    t.val(attachment.url)

                });
                mediaUploader.open();
            });

        },
        repeaterField: function() {

            $(document).on('click', '.addtime', function (e) {

                console.log( 'say hello' );

                e.preventDefault();

                var $this = $(this);

                var inner = $this.parent().find('.field-wrapper');

                var $new_repeater = '';
                $new_repeater += '<div class="single-field">';
                $new_repeater += '<input type="text" name="darkluplite_settings[light_img][]" placeholder="Light Image Url" />';
                $new_repeater += '<input type="text" name="darkluplite_settings[dark_img][]" placeholder="Dark Image Url" />';
                $new_repeater += '<span class="removetime fb-admin-btn">Remove</span>';
                $new_repeater += '</div>';

                inner.append($new_repeater);

            })

            //
            $(document).on('click', '.removetime', function () {

                var $this = $(this);

                $this.parent().remove();


            })
        },
        proFeaturePopup: function() {

            $('.pro-feature').on( 'click', function() {
                $('.darklup-admin-popup-wrapper').fadeIn('4000');
                $('.darklup-single-popup-wrapper').show();
            } )

        },
        proPopupClose: function() {

            $('.darklup-admin-close').on( 'click', function(e) {
                
                e.preventDefault();

                $('.darklup-admin-popup-wrapper').fadeOut();
                $('.darklup-single-popup-wrapper').hide();
            } )
        }


    }

    a.init();
    
})(jQuery);