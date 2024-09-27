
    $(document).ready(function() {
        const csvUrl = 'https://library.lasalle.edu/ld.php?content_id=77990194';

        fetch(csvUrl)
            .then(response => response.text())
            .then(csvText => {
                fillHours(csvText);
            })
            .catch(error => console.error('Error:', error));


        function fillHours(csvText) {
            const rows = csvText.trim().split('\n')
            rows.shift()

            const $dynHours = $('#dyn-hours');
            $dynHours.empty();
            $dynHours.append($('<h2>').text('Hours:'));


            rows.forEach(row => {
                const cols = row.split(',')

                const type = cols[0]
                if (!type) return
                const day = cols[2];
                const hours = cols[3] + ' - ' + cols[4]

                const dayElement = $('<h3>').text(day);
                const timeElement = $('<p>').text(hours);

                const $elementToAppend = $dynHours;
                switch (cols[0].toUpperCase()) {
                    case 'HRS':
                        $elementToAppend.append(dayElement).append(timeElement)
                        break

                    case 'MSG':
                        $elementToAppend.append(dayElement)
                        break

                    default:
                        console.log('Error: No Type!')

                }
            });
        }
    });
