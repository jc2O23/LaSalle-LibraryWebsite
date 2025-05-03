 $(document).ready(function () {

        // Get the content from the "Preview Hours" box and dynamically create and fill the fields in the "Change hours" box
        (function loadHours() {

            const $getHours = $('#set-hours').children();
            $('#fieldDiv').empty()

            let $newDiv
            let idNum = 0

            $getHours.each(function (index, type) {

                let setAttr
                if (type.tagName === 'H2') {

                    $('#titleInput').attr('value', ($(this).text()).trim())

                    return true
                }
                else if (type.tagName === 'H3') {

                    $newDiv = $('<div/>', { id: `div_${idNum}` }).appendTo($('#fieldDiv'));

                    setAttr = { id: `day_${idNum}`, text: 'Day/MSG: ' }
                }
                else {

                    setAttr = { id: `time_${idNum}`, text: 'Time: ' }

                    idNum++
                }

                $('<label/>', setAttr).appendTo($newDiv);
                $('<input/>', { type: 'text', id: setAttr.id, value: ($(this).text()).trim() }).appendTo($newDiv);

            });
            createDelBtn()
            colorDayOfWeek()
        })()

        // Highlight the current day of the week
        function colorDayOfWeek() {
            const date = new Date()
            const dayOfWeek = date.getDay() - 1

            $(`#div_${dayOfWeek}`).css({'background-color': '#82c5ff', 'border-radius': '5px', 'border': '1px solid gray'})

        }

        // Handle deleting a row 
        function LastDelButton(event) {

            const parentDiv = event.target.parentElement;
            parentDiv.remove();

            createDelBtn();
        };

        // Handle creating a new delete button on the last row
        function createDelBtn() {

            let $lastDiv = $('#fieldDiv').children().last()
            if ($lastDiv.length) {

                $('<button/>', { text: 'X', disabled: '',})
                    .appendTo($lastDiv)
                    .on('click', LastDelButton);

            };

        }

        // Handle creating a new row (Max 10)
        $('#newField').click(function () {

            let $fieldCount = $('#fieldDiv').children().length;
            if ($fieldCount == 10) {
                alert("Limit of rows reached")
                return
            }

            let $newDiv = $('<div/>', { id: `div_${String($fieldCount)}` }).appendTo($('#fieldDiv'))

            $('<label/>', { for: `day_${$fieldCount}`, text: 'Day/MSG: ' }).appendTo($newDiv);
            $('<input/>', { id: `day_${$fieldCount}`, type: 'text' }).appendTo($newDiv);

            $('<label/>', { for: `time_${$fieldCount}`, text: 'Time: ' }).appendTo($newDiv);
            $('<input/>', { id: `time_${$fieldCount}`, type: 'text' }).appendTo($newDiv);

            let $findDelBtn = $('#fieldDiv div button');
            $findDelBtn.length ? $findDelBtn.remove() : undefined;

            createDelBtn();

        });

        // Create and set fields to default semester hours
        $('#setDefault').click(function () {
            $('#fieldDiv').empty()

            let defaultDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            let defaultTimes = ['8:00 AM - 12:00 AM', '8:00 AM - 12:00 AM', '8:00 AM - 12:00 AM', '8:00 AM - 12:00 AM', '8:00 AM - 6:00 PM', '10:00 AM - 6:00 PM', '12:00 PM - 12:00 AM'];


            $('#titleInput').attr('value', 'Hours:')

            defaultDays.forEach(function (el, index) {
                $newDiv = $('<div/>', { id: `div_${index}` }).appendTo($('#fieldDiv'));

                $('<label/>', { for: `day_${index}`, text: 'Day/MSG: ' }).appendTo($newDiv);
                $('<input/>', { id: `day_${index}`, type: 'text', value: defaultDays[index] }).appendTo($newDiv);

                $('<label/>', { for: `time_${index}`, text: 'Time: ' }).appendTo($newDiv);
                $('<input/>', { id: `time_${index}`, type: 'text', value: defaultTimes[index] }).appendTo($newDiv);

            });
            createDelBtn()

        })

        // Handle saving the values from the "Change Hours" box and writing them to the "Preview Hours" box
        $('#saveHours').click(function () {

            // Open the text editor for the "Preview Hours" box
            springSpace.adminObj.openTextEditor({
                wysiwyg: 0,
                content_id: 79387355,
                box_id: 33788970,
                map_id: 39729352,
                pane_id: 0,
                col_id: 1
            });

            // Hides the text editor when opened
            $('html body.s-lg-guide-body div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable.ui-resizable').css('opacity', '0');

            const $titleInput = $('#titleInput');
            const $inputs = $('#fieldDiv input');
            const $dynDiv = $('<div/>', { id: 'set-hours', class: 'col-md-3'});

            $('<h2/>', { text: $titleInput.val() }).appendTo($dynDiv);

            $inputs.each(function (index) {
                if ($(this).val() != '') {
                    index % 2 == 0 ? elType = '<h3/>' : elType = '<p/>';
                    $(elType, { text: $(this).val() }).appendTo($dynDiv);
                }
            })

            // Observe when the text editor is in the DOM and save the hours wrapped in HTML into it 
            const observer = new MutationObserver((mutationsList, observer) => {
                const $textEditor = $('#s-lg-editor-content');
                if ($textEditor.length && $textEditor.is(':visible')) {
                    $textEditor.val($dynDiv[0].outerHTML);
                    observer.disconnect();
                    alert("Hours successfully updated")

                    // Click the save button and close the text editor
                    $('#s-lib-alert-btn-first').click()
                }
            });
            observer.observe(document.body, { childList: true, subtree: true })
        });
    })
